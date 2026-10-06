import React from 'react';
import { PageRoute } from './Navbar';
import { ShieldCheck, Server, Award, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trustFeatures = [
    {
      icon: Server,
      color: 'emerald',
      title: '130+ Hosts Benchmarked',
      text: 'We maintain active live accounts to track server response times, uptime spikes, and renewal pricing daily.'
    },
    {
      icon: ShieldCheck,
      color: 'blue',
      title: '100% Editorial Independence',
      text: 'Rankings are determined by our 5-pillar scoring methodology. Hosts cannot buy higher star ratings.'
    },
    {
      icon: Award,
      color: 'amber',
      title: 'US Small Business Focus',
      text: 'Testing nodes deployed in Ashburn, Chicago, Dallas, and San Jose to evaluate genuine domestic performance.'
    }
  ];

  const colorClasses = {
    emerald: {
      badge: 'bg-emerald-500/10 text-emerald-600 ring-emerald-200/80',
      glow: 'shadow-emerald-500/10'
    },
    blue: {
      badge: 'bg-blue-500/10 text-blue-600 ring-blue-200/80',
      glow: 'shadow-blue-500/10'
    },
    amber: {
      badge: 'bg-amber-500/10 text-amber-600 ring-amber-200/80',
      glow: 'shadow-amber-500/10'
    }
  } as const;

  return (
    <footer className="bg-[#0B192C] text-slate-400 border-t border-slate-800 text-sm">
      <div className="bg-gradient-to-br from-slate-100 via-white to-emerald-50/80 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Why HostReviewUS
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Built for clarity, not hype.
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {trustFeatures.map(({ icon: Icon, color, title, text }) => (
              <div
                key={title}
                className={`group rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colorClasses[color].glow}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${colorClasses[color].badge}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-3"
            >
              <span className="w-7 h-7 rounded bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xs font-black shadow-inner">
                HR
              </span>
              <span>HostReview<span className="text-emerald-400">US</span></span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              Independently rated web hosting for US small business owners, freelancers, and growing agencies. Built to eliminate guesswork and protect your bottom line.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>US Infrastructure Testing Lab</div>
              <div>100 S Wacker Dr, Suite 1400, Chicago, IL 60606</div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Explore</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('hosts')} className="hover:text-white transition-colors">
                  All 130 Hosts Directory
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('compare')} className="hover:text-white transition-colors">
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('blog')} className="hover:text-white transition-colors">
                  Guides & Research Blog
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Best Hosts For</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('hosts')} className="hover:text-white transition-colors">
                  WordPress Hosting
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('hosts')} className="hover:text-white transition-colors">
                  WooCommerce & E-Commerce
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('hosts')} className="hover:text-white transition-colors">
                  Budget Shared Hosting
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('hosts')} className="hover:text-white transition-colors">
                  High-Traffic Cloud VPS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('hosts')} className="hover:text-white transition-colors">
                  Agency Multi-Site Hosting
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Editorial & Trust</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('methodology')} className="hover:text-white transition-colors">
                  Our Testing Methodology
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('disclosure')} className="hover:text-white transition-colors">
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Our Team
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('terms')} className="hover:text-white transition-colors">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Notice Box */}
        <div className="mt-10 pt-5 text-center border-t border-slate-800 text-xs text-slate-500 leading-relaxed">
              © 2026 HostReview US. All rights reserved. Registered trademark of Infrastructure Media Lab LLC.
        </div>
      </div>
    </footer>
  );
};
