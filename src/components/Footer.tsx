import React from 'react';
import { PageRoute } from './Navbar';
import logoImg from '../assets/images/logo.png';

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
              <img
                src={logoImg}
                alt="Boo Savvy US logo"
                className="w-40 object-contain rounded-lg"
              />
              {/* <span>Boo Savvy<span className="text-emerald-400">US</span></span> */}
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              Independently rated web hosting for US small business owners, freelancers, and growing agencies. Built to eliminate guesswork and protect your bottom line.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>US Infrastructure Testing Lab</div>
              {/* <div>100 S Wacker Dr, Suite 1400, Chicago, IL 60606</div> */}
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
              © 2026 Boo Savvy. All rights reserved. Registered trademark of Infrastructure Media Lab LLC.
        </div>
      </div>
    </footer>
  );
};
