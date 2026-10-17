import http, {
  IncomingHttpHeaders,
  IncomingMessage,
  OutgoingHttpHeaders,
  ServerResponse
} from 'node:http';

const UPSTREAM_IP = '50.62.144.72';
const UPSTREAM_HOST = 'boosavvy.com';
const PUBLIC_BLOG_PREFIX = '/blog';
const PUBLIC_BLOG_ORIGIN = 'https://www.boosavvy.com';
const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade'
]);

export const config = {
  api: {
    bodyParser: false
  }
};

function forwardHeaders(headers: IncomingHttpHeaders): OutgoingHttpHeaders {
  const forwarded: OutgoingHttpHeaders = {};

  for (const [name, value] of Object.entries(headers)) {
    const lowerCaseName = name.toLowerCase();
    if (value !== undefined && lowerCaseName !== 'host' && !HOP_BY_HOP_HEADERS.has(lowerCaseName)) {
      forwarded[lowerCaseName] = value;
    }
  }

  forwarded.host = UPSTREAM_HOST;
  forwarded['x-forwarded-host'] = UPSTREAM_HOST;
  forwarded['x-forwarded-proto'] = 'https';
  forwarded['x-forwarded-prefix'] = PUBLIC_BLOG_PREFIX;
  forwarded['accept-encoding'] = 'identity';

  return forwarded;
}

function relayHeaders(
  headers: IncomingHttpHeaders,
  rewriteHtml = false
): OutgoingHttpHeaders {
  const relayed: OutgoingHttpHeaders = {};

  for (const [name, value] of Object.entries(headers)) {
    const lowerCaseName = name.toLowerCase();
    if (
      value !== undefined &&
      !HOP_BY_HOP_HEADERS.has(lowerCaseName) &&
      !(rewriteHtml && ['content-length', 'content-encoding', 'etag', 'content-md5'].includes(lowerCaseName))
    ) {
      if (lowerCaseName === 'location') {
        relayed[name] = rewriteLocation(value);
      } else if (lowerCaseName === 'set-cookie') {
        relayed[name] = Array.isArray(value)
          ? value.map(rewriteCookiePath)
          : rewriteCookiePath(value);
      } else {
        relayed[name] = value;
      }
    }
  }

  return relayed;
}

function rewriteHtmlUrls(html: string): string {
  return html
    .replace(
      /https?:\/\/(?:www\.)?boosavvy\.com(\/[^"'\s<>]*)?/gi,
      (_match, path: string | undefined) => {
        const suffix = path || '/';
        const blogPath = suffix === PUBLIC_BLOG_PREFIX || suffix.startsWith(`${PUBLIC_BLOG_PREFIX}/`)
          ? suffix
          : `${PUBLIC_BLOG_PREFIX}${suffix}`;
        return `${PUBLIC_BLOG_ORIGIN}${blogPath}`;
      }
    )
    .replace(
      /((?:href|src|action|data-src)=["'])\/(?!blog(?:\/|["']))([^"']*)/gi,
      `$1${PUBLIC_BLOG_PREFIX}/$2`
    );
}

function rewriteLocation(value: string | string[]): string | string[] {
  const rewrite = (location: string): string => {
    try {
      const url = new URL(location, PUBLIC_BLOG_ORIGIN);
      if (url.hostname !== UPSTREAM_HOST && url.hostname !== `www.${UPSTREAM_HOST}`) {
        return location;
      }

      url.protocol = 'https:';
      url.hostname = 'www.boosavvy.com';
      url.pathname = blogPublicPath(url.pathname);

      for (const [key, target] of url.searchParams) {
        if (key === 'redirect_to') {
          url.searchParams.set(key, rewriteRedirectTarget(target));
        }
      }

      return url.toString();
    } catch {
      return location;
    }
  };

  return Array.isArray(value) ? value.map(rewrite) : rewrite(value);
}

function blogPublicPath(pathname: string): string {
  if (
    pathname === PUBLIC_BLOG_PREFIX ||
    pathname.startsWith(`${PUBLIC_BLOG_PREFIX}/`)
  ) {
    return pathname;
  }

  return `${PUBLIC_BLOG_PREFIX}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function rewriteRedirectTarget(target: string): string {
  try {
    const url = new URL(target, PUBLIC_BLOG_ORIGIN);
    if (url.hostname !== UPSTREAM_HOST && url.hostname !== `www.${UPSTREAM_HOST}`) {
      return target;
    }

    url.protocol = 'https:';
    url.hostname = 'www.boosavvy.com';
    url.pathname = blogPublicPath(url.pathname);
    return url.toString();
  } catch {
    return target;
  }
}

function rewriteCookiePath(cookie: string): string {
  return cookie.replace(/;\s*path=\/(?=;|$)/i, `; Path=${PUBLIC_BLOG_PREFIX}/`);
}

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  const requestUrl = new URL(req.url || '/', 'http://vercel.local');
  const requestedPath = requestUrl.searchParams.get('path');
  const blogPath = requestedPath?.replace(/^\/+|\/+$/g, '');
  const hasTrailingSlash = requestUrl.searchParams.get('trailingSlash') === '1';
  const upstreamPath = blogPath
    ? `/${blogPath}${hasTrailingSlash ? '/' : ''}`
    : '/';
  const upstreamQuery = new URLSearchParams(requestUrl.searchParams);
  upstreamQuery.delete('path');
  upstreamQuery.delete('trailingSlash');
  const queryString = upstreamQuery.toString();

  const upstreamRequest = http.request(
    {
      hostname: UPSTREAM_IP,
      port: 80,
      method: req.method,
      path: `${upstreamPath}${queryString ? `?${queryString}` : ''}`,
      headers: forwardHeaders(req.headers)
    },
    (upstreamResponse) => {
      const contentType = upstreamResponse.headers['content-type'] || '';
      if (contentType.includes('text/html')) {
        const chunks: Buffer[] = [];
        upstreamResponse.on('data', (chunk: Buffer | string) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        upstreamResponse.on('end', () => {
          const body = Buffer.from(rewriteHtmlUrls(Buffer.concat(chunks).toString('utf8')));
          res.writeHead(
            upstreamResponse.statusCode || 502,
            {
              ...relayHeaders(upstreamResponse.headers, true),
              'content-length': body.length
            }
          );
          res.end(body);
        });
        upstreamResponse.on('error', (error) => {
          console.error('WordPress response stream failed:', error);
          if (!res.headersSent) {
            res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
            res.end('The WordPress response could not be read.');
          } else {
            res.destroy(error);
          }
        });
        return;
      }

      res.writeHead(
        upstreamResponse.statusCode || 502,
        relayHeaders(upstreamResponse.headers)
      );
      upstreamResponse.pipe(res);
    }
  );

  upstreamRequest.on('error', (error) => {
    console.error('WordPress reverse proxy request failed:', error);
    if (!res.headersSent) {
      res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('The WordPress origin could not be reached.');
    } else {
      res.destroy(error);
    }
  });

  req.on('aborted', () => upstreamRequest.destroy());
  req.pipe(upstreamRequest);
}
