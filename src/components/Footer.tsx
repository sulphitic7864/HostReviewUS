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

  return (
    <footer className="bg-[#0B192C] text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">130+ Hosts Benchmarked</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                We maintain active live accounts to track server response times, uptime spikes, and renewal pricing daily.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% Editorial Independence</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Rankings are determined by our 5-pillar scoring methodology. Hosts cannot buy higher star ratings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">US Small Business Focus</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Testing nodes deployed in Ashburn, Chicago, Dallas, and San Jose to evaluate genuine domestic performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500 leading-relaxed">
          <p className="mb-2">
            <strong className="text-slate-400">FTC Affiliate Disclosure:</strong> HostReview US is an independent review and benchmark publication supported by reader referral commissions. When you click our affiliate links and purchase hosting plans, we may receive compensation from provider partners at no additional cost to you. We purchase and test hosting plans anonymously with our own funds. Compensation does not influence our test metrics, star ratings, or editorial conclusions.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-slate-500 text-xs">
            <div>
              © 2026 HostReview US. All rights reserved. Registered trademark of Infrastructure Media Lab LLC.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button type="button" onClick={() => handleNav('methodology')} className="hover:text-white">
                5-Pillar Score
              </button>
              <span>·</span>
              <button type="button" onClick={() => handleNav('disclosure')} className="hover:text-white">
                FTC Disclosure
              </button>
              <span>·</span>
              <button type="button" onClick={() => handleNav('privacy')} className="hover:text-white">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
