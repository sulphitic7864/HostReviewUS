import React from 'react';
import { HostProvider } from '../types/hosting';
import { BlogPost } from '../types/blog';
import { PageRoute } from '../components/Navbar';
import { StarRating } from '../components/StarRating';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  HardDrive,
  Award,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import heroImg from '../assets/images/hero_server_datacenter_1791290175004.jpg';
import labImg from '../assets/images/testing_lab_metrics_1791290207887.jpg';

interface HomePageProps {
  topHosts: HostProvider[];
  blogPosts: BlogPost[];
  onNavigate: (page: PageRoute) => void;
  onOpenHostProfile: (host: HostProvider) => void;
  onToggleCompare: (hostId: string) => void;
  comparedHostIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  topHosts,
  blogPosts,
  onNavigate,
  onOpenHostProfile,
  onToggleCompare,
  comparedHostIds
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B192C] text-white">
        {/* Measured Scrim over High-Fidelity Data Center Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Secure Enterprise Cloud Data Center"
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            {/* Value kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent US Small Business Lab · Updated October 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4">
              Independently Rated Web Hosting for Small Business
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              We monitor 130+ hosting providers around the clock. Compare audited server speed, real renewal pricing, uptime reliability, and customer service without sales spin.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('hosts')}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <span>Browse All 130 Hosts</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('compare')}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span>Side-by-Side Comparison Tool</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Proof Strip */}
          <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">130+</div>
              <div className="text-xs text-slate-400 mt-0.5">Active Providers Tracked</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">365 Days</div>
              <div className="text-xs text-slate-400 mt-0.5">Uptime & Latency Monitored</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">220 ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Fastest Benchmark TTFB</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">$0 Paid</div>
              <div className="text-xs text-slate-400 mt-0.5">Zero Sponsored Rankings</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP 5 PICKS SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              Top Ranked Providers
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Top 5 Web Hosts for Small Business in 2026
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Ranked after 12 months of uptime tests, server load spikes, and secret shopper customer support queries.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('hosts')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View complete 130 host directory</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Top 5 Cards Stack */}
        <div className="space-y-4">
          {topHosts.slice(0, 5).map((host, index) => {
            const isCompared = comparedHostIds.includes(host.id);
            return (
              <div
                key={host.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
              >
                {/* Left Column: Rank + Logo + Name + Verdict */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Brand Logo with Rank Badge */}
                  <div
                    className={`relative w-14 h-14 rounded-xl ${host.logoBg} text-white font-black text-lg flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {host.logoText}
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content details */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900">{host.name}</h3>
                      {host.staffPick && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Top Choice
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-medium">
                        Best for {host.bestFor}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <StarRating rating={host.starRating} size="sm" />
                      <span>·</span>
                      <span>{host.uptimeSla} Uptime</span>
                      <span>·</span>
                      <span>{host.serverSpeedMs}ms TTFB</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {host.verdict}
                    </p>

                    {/* Key features bullets */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap text-xs text-slate-700">
                      <span className="flex items-center gap-1 font-medium">
                        <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                        {host.storage}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        {host.bandwidth}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {host.moneyBackDays}-Day Guarantee
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Pricing & CTAs */}
                <div className="lg:w-64 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 gap-3 shrink-0">
                  <div className="lg:text-right">
                    <div className="text-xs text-slate-400">Starting from</div>
                    <div className="text-2xl font-black text-slate-900 font-mono">
                      ${host.startingPrice.toFixed(2)}
                      <span className="text-xs font-normal text-slate-500">/mo</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Renews at ${host.renewalPrice.toFixed(2)}/mo
                    </div>
                  </div>

                  <div className="flex flex-col w-full sm:w-auto gap-2">
                    <a
                      href={host.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors text-center"
                    >
                      <span>View Deal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenHostProfile(host)}
                        className="text-xs text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2 py-1"
                      >
                        Full Profile
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleCompare(host.id)}
                        className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                          isCompared
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isCompared ? '✓ Added' : '+ Compare'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW WE RATE TEASER BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Our Evaluation Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                How We Rate Hosting Providers
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Most affiliate sites assign 5 stars to the host paying the highest commission. At HostReview US, every provider is evaluated against our strict 5-pillar scoring model powered by independent server diagnostic hardware.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-xs">
                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-emerald-400 font-bold text-sm">30%</div>
                  <div className="font-semibold text-white mt-0.5">Uptime & Latency</div>
                  <div className="text-slate-400 mt-1">365-day ping logging across 6 domestic nodes</div>
                </div>

                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-emerald-400 font-bold text-sm">25%</div>
                  <div className="font-semibold text-white mt-0.5">Value & Renewals</div>
                  <div className="text-slate-400 mt-1">Audit of contract renewal jumps & hidden add-ons</div>
                </div>

                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-emerald-400 font-bold text-sm">20%</div>
                  <div className="font-semibold text-white mt-0.5">Support Response</div>
                  <div className="text-slate-400 mt-1">Live mystery-shopper phone & chat speed tests</div>
                </div>

                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-emerald-400 font-bold text-sm">25%</div>
                  <div className="font-semibold text-white mt-0.5">Ease & Security</div>
                  <div className="text-slate-400 mt-1">Firewall, staging, SSL, and onboarding tests</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('methodology')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <span>Read Complete Testing Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual proof: image of testing laboratory */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              <img
                src={labImg}
                alt="Independent Technical Testing Laboratory"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 text-xs text-slate-300">
                <span className="font-semibold text-white">Live Benchmark Lab:</span> Continuous monitoring of US server responses, memory leaks, and customer support queues.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BLOG PREVIEW (LATEST 3 POSTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              Editorial Insights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Latest Hosting Guides & Research
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              In-depth tutorials, price-spike protection strategies, and technical comparisons.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate('blog')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col group cursor-pointer"
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
      </section>

      {/* 5. SMALL BUSINESS HOSTING FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions for Small Business Owners
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Clear answers to the most common web hosting decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-sm">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                How much should a small business spend on hosting?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For a standard local business website or company blog, $2.95 to $8.00 per month is standard for reliable shared hosting. If you are running an e-commerce storefront with active checkouts, invest $15 to $35/mo in managed cloud or managed WordPress.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                What happens when introductory promo prices expire?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most hosts offer steep 60–80% introductory discounts. Upon renewal, plans revert to standard prices ($9.99–$17.99/mo). We display both the starting price and the renewal price on every host card so you are never caught unprepared.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Can I migrate my existing site to a new host for free?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes. Top providers like SiteGround, Hostinger, A2 Hosting, and InMotion provide free automated migration plugins or white-glove migration assistance so you transfer your site with zero downtime.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Why is phone support important for small businesses?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When your website goes down or transactional emails bounce, waiting 30 minutes in a chat queue costs sales. Hosts like SiteGround, Bluehost, and Liquid Web offer 24/7 dedicated phone lines for immediate human intervention.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
