import { BlogPost } from '../types/blog';
import { INITIAL_BLOG_POSTS } from '../data/blogData';

// Standard public WordPress REST API interface
interface WPPostRaw {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
      description?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export async function fetchWordPressPostsFromEndpoint(endpointUrl: string): Promise<BlogPost[]> {
  try {
    // Ensure clean url
    let target = endpointUrl.trim();
    if (!target.includes('/wp-json/wp/v2/posts')) {
      target = target.replace(/\/+$/, '') + '/wp-json/wp/v2/posts?_embed=true&per_page=10';
    } else if (!target.includes('_embed=true')) {
      target += target.includes('?') ? '&_embed=true' : '?_embed=true';
    }

    const res = await fetch(target, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }

    const data: WPPostRaw[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid WordPress API response format');
    }

    return data.map((item, index) => {
      const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      const authorObj = item._embedded?.author?.[0];
      const categories = item._embedded?.['wp:term']?.[0] || [];
      const primaryCategory = categories[0]?.name || 'Guides';

      // Clean HTML from excerpt
      const cleanExcerpt = item.excerpt?.rendered
        ? item.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/g, '...').trim()
        : 'Read this WordPress article for detailed hosting and infrastructure insights.';

      return {
        id: `wp-${item.id}`,
        title: item.title?.rendered ? item.title.rendered.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"') : 'Untitled Post',
        slug: item.slug || `post-${item.id}`,
        excerpt: cleanExcerpt,
        content: item.content?.rendered || '<p>No content provided in this article.</p>',
        author: {
          name: authorObj?.name || 'WordPress Contributor',
          role: 'Staff Columnist',
          avatar: authorObj?.avatar_urls?.['96'] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        },
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        modifiedDate: new Date(item.modified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        category: (['Guides', 'Comparisons', 'Best-For Lists', 'Tutorials'].includes(primaryCategory) ? primaryCategory : 'Guides') as any,
        readTime: `${Math.max(4, Math.ceil((item.content?.rendered?.length || 1000) / 1200))} min read`,
        featuredImage: featuredMedia || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
        tags: categories.map(c => c.name),
        isWordPressPost: true
      };
    });
  } catch (error) {
    console.warn('Failed to fetch from live WordPress endpoint, falling back to local dataset:', error);
    throw error;
  }
}

export function getEditorialBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS;
}
