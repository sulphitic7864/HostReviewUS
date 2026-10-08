import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../types/blog';
import { HostProvider } from '../types/hosting';
import { fetchWordPressPostsFromEndpoint } from '../services/wordpressApi';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Globe,
  RefreshCw,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface BlogPageProps {
  posts: BlogPost[];
  hosts: HostProvider[];
  onOpenHostProfile: (host: HostProvider) => void;
}

interface CommentItem {
  id: string;
  name: string;
  date: string;
  text: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  hosts,
  onOpenHostProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // WordPress API Live Integration state
  const [isWpMode, setIsWpMode] = useState(false);
  const [wpEndpoint, setWpEndpoint] = useState('https://techcrunch.com');
  const [wpPosts, setWpPosts] = useState<BlogPost[]>([]);
  const [wpLoading, setWpLoading] = useState(false);
  const [wpError, setWpError] = useState<string | null>(null);

  // Reader Comments State for active post
  const [comments, setComments] = useState<Record<string, CommentItem[]>>({
    'post-1': [
      {
        id: 'c1',
        name: 'Sarah Lindqvist',
        date: 'October 5, 2026',
        text: 'The breakdown on SiteGround’s Google Cloud infrastructure was very helpful. We switched our boutique ecommerce shop last month and saw our checkout TTFB drop from 650ms to 240ms.'
      },
      {
        id: 'c2',
        name: 'Carlos Mendez',
        date: 'October 6, 2026',
        text: 'Does Bluehost include staging environments on the basic $2.95 plan, or do you have to upgrade to Choice Plus?'
      }
    ]
  });
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  const activeDataset = isWpMode && wpPosts.length > 0 ? wpPosts : posts;

  // Filtered posts
  const filteredPosts = activeDataset.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleFetchWp = async (e: React.FormEvent) => {
    e.preventDefault();
    setWpLoading(true);
    setWpError(null);
    try {
      const results = await fetchWordPressPostsFromEndpoint(wpEndpoint);
      setWpPosts(results);
      setIsWpMode(true);
    } catch (err: any) {
      setWpError(err.message || 'Could not fetch from specified WordPress endpoint.');
    } finally {
      setWpLoading(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !authorName.trim() || !commentText.trim()) return;

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      name: authorName.trim(),
      date: 'Just now',
      text: commentText.trim()
    };

    setComments((prev) => ({
      ...prev,
      [activePost.id]: [...(prev[activePost.id] || []), newComment]
    }));

    setAuthorName('');
    setCommentText('');
  };

  const categories: { label: string; value: string }[] = [
    { label: 'All Articles', value: 'all' },
    { label: 'Guides', value: 'Guides' },
    { label: 'Comparisons', value: 'Comparisons' },
    { label: 'Best-For Lists', value: 'Best-For Lists' },
    { label: 'Tutorials', value: 'Tutorials' }
  ];

  // If viewing an individual article:
  if (activePost) {
    const recommendedHost = activePost.recommendedHostId
      ? hosts.find((h) => h.id === activePost.recommendedHostId)
      : hosts[0];

    const currentComments = comments[activePost.id] || [];

    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => {
            setActivePost(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all guides</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {activePost.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Published {activePost.date}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {activePost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {activePost.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {activePost.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <img
              src={activePost.author.avatar}
              alt={activePost.author.name}
              className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-sm font-bold text-slate-900">{activePost.author.name}</div>
              <div className="text-xs text-slate-500">{activePost.author.role} · Independent Lab</div>
            </div>
            <div className="ml-auto text-xs text-slate-400 hidden sm:block">
              Last audited: {activePost.modifiedDate}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-[420px] bg-slate-100">
          <img
            src={activePost.featuredImage}
            alt={activePost.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Inline Affiliate Callout Box */}
        {recommendedHost && (
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${recommendedHost.logoBg} text-white font-black text-lg flex items-center justify-center shrink-0 shadow-xs`}
              >
                {recommendedHost.logoText}
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Top Recommended Host for this Guide
                </div>
                <div className="text-lg font-bold text-slate-900">{recommendedHost.name}</div>
                <div className="text-xs text-slate-600">
                  Starting at <strong className="text-emerald-700 font-mono">${recommendedHost.startingPrice.toFixed(2)}/mo</strong> with {recommendedHost.uptimeSla} uptime SLA.
                </div>
              </div>
            </div>

            <a
              href={recommendedHost.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <span>View Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Main Content Body */}
        <div
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: activePost.content }}
        />

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold uppercase">Tags:</span>
          {activePost.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>Reader Discussion ({currentComments.length})</span>
            </h3>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            {currentComments.map((c) => (
              <div key={c.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
                  <span className="font-bold text-slate-900">{c.name}</span>
                  <span className="text-slate-400">{c.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Leave a question or feedback</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your Name (e.g. Alex M.)"
                className="p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <textarea
              required
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ask a question about server setup, hosting renewal terms, or speed benchmarks..."
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Post Comment
            </button>
          </form>
        </section>
      </article>
    );
  }

  // Blog Index View:
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
            Research & Advice
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Web Hosting Knowledge Center
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            In-depth guides, migration walkthroughs, renewal price fee analyses, and speed benchmark reports written by our testing team.
          </p>
        </div>

        {/* WordPress API Live Connector Switcher */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-w-md">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" /> WordPress REST API Feed
            </span>
            <button
              type="button"
              onClick={() => setIsWpMode(!isWpMode)}
              className="text-[11px] text-emerald-700 hover:underline font-bold"
            >
              {isWpMode ? 'Switch to Editorial Mode' : 'Connect WP Site'}
            </button>
          </div>

          {isWpMode && (
            <form onSubmit={handleFetchWp} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={wpEndpoint}
                  onChange={(e) => setWpEndpoint(e.target.value)}
                  placeholder="https://yourwordpresssite.com"
                  className="flex-1 p-1.5 text-xs rounded border border-slate-300 bg-white"
                />
                <button
                  type="submit"
                  disabled={wpLoading}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <RefreshCw className={`w-3 h-3 ${wpLoading ? 'animate-spin' : ''}`} />
                  Fetch
                </button>
              </div>
              {wpError && <div className="text-[11px] text-rose-600">{wpError}</div>}
              {wpPosts.length > 0 && (
                <div className="text-[11px] text-emerald-600 font-semibold">
                  ✓ Successfully loaded {wpPosts.length} posts from live WordPress API!
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides & tutorials..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Featured / Marquee Article (1st one if matching) */}
      {filteredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <div
          onClick={() => {
            setActivePost(filteredPosts[0]);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md cursor-pointer transition-all grid grid-cols-1 lg:grid-cols-2 group"
        >
          <div className="h-64 lg:h-auto overflow-hidden bg-slate-100 relative">
            <img
              src={filteredPosts[0].featuredImage}
              alt={filteredPosts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-xs font-bold bg-[#0B192C]/90 text-white">
              Featured Research
            </span>
          </div>

          <div className="p-6 sm:p-10 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                <span>{filteredPosts[0].date}</span>
                <span>·</span>
                <span>{filteredPosts[0].readTime}</span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">{filteredPosts[0].category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {filteredPosts[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
                {filteredPosts[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={filteredPosts[0].author.avatar}
                  alt={filteredPosts[0].author.name}
                  className="w-7 h-7 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="font-semibold text-slate-800">{filteredPosts[0].author.name}</span>
              </div>

              <span className="font-bold text-emerald-600 flex items-center gap-1">
                Read Complete Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => {
              setActivePost(post);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md cursor-pointer transition-all flex flex-col group"
          >
            <div className="h-48 overflow-hidden relative bg-slate-100">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0B192C]/85 text-white backdrop-blur-xs">
                {post.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-2">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-medium text-slate-700">{post.author.name}</span>
                </div>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
