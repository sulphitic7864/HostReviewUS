import React, { useState, useMemo } from 'react';
import { HostProvider, HostingType, BestForCategory } from '../types/hosting';
import { StarRating } from '../components/StarRating';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ExternalLink,
  HardDrive,
  Zap,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Globe
} from 'lucide-react';

interface HostsPageProps {
  hosts: HostProvider[];
  onOpenHostProfile: (host: HostProvider) => void;
  onToggleCompare: (hostId: string) => void;
  comparedHostIds: string[];
}

export const HostsPage: React.FC<HostsPageProps> = ({
  hosts,
  onOpenHostProfile,
  onToggleCompare,
  comparedHostIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBestFor, setSelectedBestFor] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'name' | 'rank'>('rank');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Exactly 6 cards per page as requested

  // Filter & Sort Logic
  const filteredHosts = useMemo(() => {
    return hosts.filter((host) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = host.name.toLowerCase().includes(query);
        const matchesVerdict = host.verdict.toLowerCase().includes(query);
        const matchesBestFor = host.bestFor.toLowerCase().includes(query);
        if (!matchesName && !matchesVerdict && !matchesBestFor) return false;
      }

      // Type filter
      if (selectedType !== 'all') {
        if (!host.hostingTypes.includes(selectedType as HostingType)) return false;
      }

      // Best for filter
      if (selectedBestFor !== 'all') {
        if (host.bestFor !== selectedBestFor) return false;
      }

      // Min rating
      if (host.starRating < minRating) return false;

      // Max starting price
      if (host.startingPrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.starRating - a.starRating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (a.rank || 999) - (b.rank || 999);
    });
  }, [hosts, searchQuery, selectedType, selectedBestFor, minRating, maxPrice, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredHosts.length / itemsPerPage) || 1;
  const paginatedHosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredHosts.slice(start, start + itemsPerPage);
  }, [filteredHosts, currentPage, itemsPerPage]);

  const startItem = filteredHosts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredHosts.length);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedBestFor('all');
    setMinRating(0);
    setMaxPrice(50);
    setSortBy('rank');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 140, behavior: 'smooth' });
  };

  // Helper to calculate sliding window of visible page numbers
  const getVisiblePageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Mission */}
      <div>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
          Complete Provider Directory
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          All 100+ Web Hosting Providers Tested
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Search and filter the complete domestic US hosting database. Every provider features audited server benchmarks, transparent renewal pricing, and verified customer support ratings.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Top row: Search + Quick stats */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by provider name (e.g. Bluehost, SiteGround, Hostinger)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 whitespace-nowrap">
              Showing <strong className="text-slate-900">{startItem}–{endItem}</strong> of <strong className="text-slate-900">{filteredHosts.length}</strong> hosts
            </span>

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Tags & Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100 text-xs">
          {/* Hosting Type */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Hosting Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Types (Shared, VPS, Cloud)</option>
              <option value="shared">Shared Hosting</option>
              <option value="managed-wordpress">Managed WordPress</option>
              <option value="cloud">Cloud Hosting</option>
              <option value="vps">VPS Hosting</option>
            </select>
          </div>

          {/* Best For Tag */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Best For Focus</label>
            <select
              value={selectedBestFor}
              onChange={(e) => {
                setSelectedBestFor(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Use Cases</option>
              <option value="wordpress">WordPress Sites</option>
              <option value="ecommerce">E-Commerce & WooCommerce</option>
              <option value="budget">Budget-Friendly</option>
              <option value="high-traffic">High Traffic / Turbo</option>
              <option value="agencies">Agencies & Developers</option>
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => {
                setMinRating(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="0">Any Star Rating</option>
              <option value="4.3">4.3+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.7">4.7+ Stars (Top Rated)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Sort Providers</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="rank">Recommended Rank</option>
              <option value="rating">Highest Star Rating</option>
              <option value="price-asc">Starting Price: Low to High</option>
              <option value="price-desc">Starting Price: High to Low</option>
              <option value="name">Provider Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Grid / Stack */}
      {paginatedHosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="text-slate-400 font-medium text-lg">No hosting providers match your filters.</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your price threshold or search query to view the full 100+ host directory.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedHosts.map((host, idx) => {
            const isCompared = comparedHostIds.includes(host.id);
            const globalIndex = (currentPage - 1) * itemsPerPage + idx + 1;

            return (
              <div
                key={host.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenHostProfile(host)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onOpenHostProfile(host);
                  }
                }}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 cursor-pointer"
              >
                {/* Left: Identity & Verdict */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Brand Logo with Rank Badge */}
                  <div
                    className={`relative w-10 h-10 md:w-14 md:h-14 rounded-xl ${host.logoBg} text-white font-black text-lg flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {host.logoText}
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                      {globalIndex}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{host.name}</h3>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Best for {host.bestFor}
                      </span>
                      {host.staffPick && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Staff Pick
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <StarRating rating={host.starRating} size="sm" />
                      <span>·</span>
                      <span>{host.uptimeSla} Uptime</span>
                      <span>·</span>
                      <span>{host.serverSpeedMs}ms Avg TTFB</span>
                      <span>·</span>
                      <span>Audited {host.lastUpdated}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {host.verdict}
                    </p>

                    {/* Features row */}
                    <div className="pt-1 flex items-center gap-3 flex-wrap text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                        {host.storage}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        {host.bandwidth}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {host.moneyBackDays}d refund
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-indigo-600" />
                        {host.freeDomain ? 'Free Domain' : 'Paid Domain'}
                      </span>
                    </div>

                    {/* Short Pros highlight */}
                    <div className="pt-1 flex items-center gap-2 flex-wrap text-[11px] text-slate-500">
                      <span className="text-emerald-700 font-medium">✓ {host.pros[0]}</span>
                      <span>·</span>
                      <span className="text-slate-600">✓ {host.pros[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing & CTA */}
                <div className="lg:w-56 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-6 gap-3 shrink-0">
                  <div className="lg:text-right">
                    <div className="text-xs text-slate-400">Introductory</div>
                    <div className="text-xl font-black text-slate-900 font-mono">
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
                      onClick={(event) => event.stopPropagation()}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors text-center"
                    >
                      <span>View Deal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenHostProfile(host);
                        }}
                        className="text-xs text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2 py-0.5"
                      >
                        Full Profile
                      </button>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleCompare(host.id);
                        }}
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
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-xs text-slate-500">
            Showing <strong className="text-slate-900">{startItem}–{endItem}</strong> of{' '}
            <strong className="text-slate-900">{filteredHosts.length}</strong> hosts (Page{' '}
            <strong className="text-slate-900">{currentPage}</strong> of{' '}
            <strong className="text-slate-900">{totalPages}</strong>)
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {getVisiblePageNumbers().map((item, idx) => {
              if (item === 'ellipsis') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-1.5 text-slate-400 text-xs font-mono select-none"
                  >
                    …
                  </span>
                );
              }
              const isActive = currentPage === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePageChange(item)}
                  className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  aria-label={`Page ${item}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
