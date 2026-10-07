/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TrustSection } from './components/TrustSection';
import { HostProfileModal } from './components/HostProfileModal';
import { HomePage } from './pages/HomePage';
import { HostsPage } from './pages/HostsPage';
import { ComparePage } from './pages/ComparePage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { TrustPages } from './pages/TrustPages';
import { ALL_HOSTS } from './data/hostsData';
import { INITIAL_BLOG_POSTS } from './data/blogData';
import { HostProvider } from './types/hosting';
import { ArrowRight, X, SlidersHorizontal } from 'lucide-react';

export default function App() {
  // Sync page route from URL query or default to 'home'
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page') as PageRoute;
    const validPages: PageRoute[] = [
      'home', 'hosts', 'compare', 'blog', 'contact',
      'methodology', 'disclosure', 'privacy', 'terms', 'about'
    ];
    return validPages.includes(p) ? p : 'home';
  });

  // Track compared hosts
  const [comparedHostIds, setComparedHostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hostreview_compare');
      return saved ? JSON.parse(saved) : ['host-1', 'host-2'];
    } catch {
      return ['host-1', 'host-2'];
    }
  });

  // Host detail modal state
  const [activeModalHost, setActiveModalHost] = useState<HostProvider | null>(null);

  // Sync route with URL history
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentPage === 'home') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', currentPage);
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentPage]);

  // Persist comparison selections
  useEffect(() => {
    localStorage.setItem('hostreview_compare', JSON.stringify(comparedHostIds));
  }, [comparedHostIds]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (hostId: string) => {
    setComparedHostIds((prev) => {
      if (prev.includes(hostId)) {
        return prev.filter((id) => id !== hostId);
      } else {
        if (prev.length >= 3) {
          // Replace last one if already 3
          return [prev[0], prev[1], hostId];
        }
        return [...prev, hostId];
      }
    });
  };

  const topPickHosts = ALL_HOSTS.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedCompareCount={comparedHostIds.length}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            topHosts={ALL_HOSTS}
            blogPosts={INITIAL_BLOG_POSTS}
            onNavigate={handleNavigate}
            onOpenHostProfile={setActiveModalHost}
            onToggleCompare={handleToggleCompare}
            comparedHostIds={comparedHostIds}
          />
        )}

        {currentPage === 'hosts' && (
          <HostsPage
            hosts={ALL_HOSTS}
            onOpenHostProfile={setActiveModalHost}
            onToggleCompare={handleToggleCompare}
            comparedHostIds={comparedHostIds}
          />
        )}

        {currentPage === 'compare' && (
          <ComparePage
            hosts={ALL_HOSTS}
            selectedHostIds={comparedHostIds}
            onSelectHostIds={setComparedHostIds}
            onOpenHostProfile={setActiveModalHost}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            posts={INITIAL_BLOG_POSTS}
            hosts={ALL_HOSTS}
            onOpenHostProfile={setActiveModalHost}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {(currentPage === 'methodology' ||
          currentPage === 'disclosure' ||
          currentPage === 'privacy' ||
          currentPage === 'terms' ||
          currentPage === 'about') && (
          <TrustPages type={currentPage} onNavigate={handleNavigate} />
        )}

        {currentPage === 'home' && <TrustSection />}
      </main>

      {/* Floating Comparison Tray (appears on hosts or home if 1+ hosts selected) */}
      {comparedHostIds.length > 0 && currentPage !== 'compare' && (
        <div className="fixed bottom-4 right-4 z-40 bg-[#0B192C] text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-700 max-w-sm w-full animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Comparison Tray ({comparedHostIds.length}/3)</span>
            </div>
            <button
              type="button"
              onClick={() => setComparedHostIds([])}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3 overflow-x-auto py-1">
            {comparedHostIds.map((id) => {
              const h = ALL_HOSTS.find((host) => host.id === id);
              if (!h) return null;
              return (
                <div
                  key={id}
                  className="bg-slate-800 px-2 py-1 rounded-lg text-xs flex items-center gap-1.5 shrink-0 border border-slate-700"
                >
                  <span className="font-semibold text-white">{h.name}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleCompare(id)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleNavigate('compare')}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Compare Selected Hosts Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Full Profile Deep Dive Modal */}
      <HostProfileModal
        host={activeModalHost}
        onClose={() => setActiveModalHost(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={activeModalHost ? comparedHostIds.includes(activeModalHost.id) : false}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
