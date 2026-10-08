import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export type PageRoute = 'home' | 'hosts' | 'compare' | 'blog' | 'contact' | 'methodology' | 'disclosure' | 'privacy' | 'terms' | 'about';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  selectedCompareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  selectedCompareCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Hosts', page: 'hosts' },
    { label: 'Compare', page: 'compare' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-700/80 shadow-lg shadow-black/10 py-0'
          : 'bg-[#0B192C] border-b border-slate-800 shadow-sm py-0.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between transition-all duration-300">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-xl font-bold tracking-tight text-white hover:text-slate-200 transition-colors text-left flex items-center gap-2"
        >
          <img
            src={logoImg}
            alt="HostReview US logo"
className="w-40 object-contain rounded-lg"          />
          {/* <span>HostReview<span className="text-emerald-400">US</span></span> */}
        </button>

        {/* Zone 2: Nav Links (Clean text links with active indicator) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('compare')}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <span>Compare Hosts</span>
            {selectedCompareCount > 0 ? (
              <span className="bg-slate-900 text-emerald-400 text-[11px] px-1.5 py-0.2 rounded font-bold">
                {selectedCompareCount}
              </span>
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          {selectedCompareCount > 0 && (
            <button
              type="button"
              onClick={() => handleNavClick('compare')}
              className="px-2.5 py-1 text-xs font-semibold bg-emerald-400 text-slate-900 rounded-md"
            >
              Compare ({selectedCompareCount})
            </button>
          )}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0B192C] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => handleNavClick(item.page)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentPage === item.page
                  ? 'bg-slate-800/80 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {currentPage === item.page && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('compare')}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Compare Hosting Providers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
