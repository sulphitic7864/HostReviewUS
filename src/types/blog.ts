export type BlogCategory = 'Guides' | 'Comparisons' | 'Best-For Lists' | 'Tutorials';

export interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or markdown formatted
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  modifiedDate: string;
  category: BlogCategory;
  readTime: string; // e.g. "6 min read"
  featuredImage: string;
  recommendedHostId?: string;
  tags: string[];
  isWordPressPost?: boolean;
}
