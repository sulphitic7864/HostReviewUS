import http, {
  IncomingHttpHeaders,
  IncomingMessage,
  OutgoingHttpHeaders,
  ServerResponse
} from 'node:http';

const UPSTREAM_IP = '50.62.144.72';
const UPSTREAM_HOST = 'boosavvy.com';
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

  return forwarded;
}

function relayHeaders(headers: IncomingHttpHeaders): OutgoingHttpHeaders {
  const relayed: OutgoingHttpHeaders = {};

  for (const [name, value] of Object.entries(headers)) {
    if (value !== undefined && !HOP_BY_HOP_HEADERS.has(name.toLowerCase())) {
      relayed[name] = value;
    }
  }

  return relayed;
}

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  const requestUrl = new URL(req.url || '/', 'http://vercel.local');
  const requestedPath = requestUrl.searchParams.get('path');
  const upstreamPath = requestedPath ? `/${requestedPath.replace(/^\/+/, '')}` : '/';
  const upstreamQuery = new URLSearchParams(requestUrl.searchParams);
  upstreamQuery.delete('path');
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
