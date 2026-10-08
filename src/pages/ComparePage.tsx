import React, { useState } from 'react';
import { HostProvider } from '../types/hosting';
import { POPULAR_COMPARISONS } from '../data/hostsData';
import { StarRating } from '../components/StarRating';
import {
  ExternalLink,
  Plus,
  Trash2,
  Check,
  X,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

interface ComparePageProps {
  hosts: HostProvider[];
  selectedHostIds: string[];
  onSelectHostIds: (ids: string[]) => void;
  onOpenHostProfile: (host: HostProvider) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  hosts,
  selectedHostIds,
  onSelectHostIds,
  onOpenHostProfile
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Guarantee at least 2 hosts initially
  const activeHostIds = selectedHostIds.length >= 2
    ? selectedHostIds.slice(0, 3)
    : selectedHostIds.length === 1
      ? [selectedHostIds[0], 'host-2']
      : ['host-1', 'host-2'];

  const comparedHosts = activeHostIds
    .map((id) => hosts.find((h) => h.id === id))
    .filter((h): h is HostProvider => Boolean(h));

  const handleHostChange = (index: number, newId: string) => {
    const updated = [...activeHostIds];
    updated[index] = newId;
    onSelectHostIds(updated);
  };

  const handleAddThirdHost = () => {
    if (activeHostIds.length < 3) {
      const thirdHost = hosts.find((h) => !activeHostIds.includes(h.id)) || hosts[2];
      onSelectHostIds([...activeHostIds, thirdHost.id]);
    }
  };

  const handleRemoveHost = (index: number) => {
    if (activeHostIds.length > 2) {
      const updated = activeHostIds.filter((_, idx) => idx !== index);
      onSelectHostIds(updated);
    }
  };

  const loadPresetComparison = (hostIds: [string, string]) => {
    onSelectHostIds([hostIds[0], hostIds[1]]);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
          Side-by-Side Evaluation
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Compare Web Hosting Providers
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Pick 2 or 3 hosts to compare side-by-side. Inspect renewal price disparities, server latency, storage caps, and customer support channels.
        </p>
      </div>

      {/* Host Selectors Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <span>Select Hosts to Compare (Max 3)</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Highlight Differences</span>
            </label>

            {activeHostIds.length < 3 && (
              <button
                type="button"
                onClick={handleAddThirdHost}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add 3rd Host</span>
              </button>
            )}
          </div>
        </div>

        {/* Picker Dropdowns Grid */}
        <div className={`grid grid-cols-1 gap-4 ${comparedHosts.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {comparedHosts.map((host, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Host #{idx + 1}</span>
                {comparedHosts.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveHost(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove host"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={host.id}
                onChange={(e) => handleHostChange(idx, e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {hosts.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} (${h.startingPrice.toFixed(2)}/mo)
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full text-left text-sm border-collapse">
            {/* Header Cards Row */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="p-4 sm:p-6 w-1/4 min-w-[180px] text-xs font-bold text-slate-400 uppercase tracking-wider align-top">
                  Features & Metrics
                </th>
                {comparedHosts.map((host) => (
                  <th
                    key={host.id}
                    className="p-4 sm:p-6 w-1/3 min-w-[240px] align-top border-l border-slate-200 cursor-pointer"
                    onClick={() => onOpenHostProfile(host)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${host.logoBg} text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {host.logoText}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900">{host.name}</div>
                          <div className="text-xs text-slate-500">Best for {host.bestFor}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <StarRating rating={host.starRating} size="sm" />
                        <span className="text-xs text-slate-400 font-mono">({host.starRating}/5)</span>
                      </div>

                      <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-xs">
                        <div className="text-slate-500">Starting price:</div>
                        <div className="text-xl font-black text-slate-900 font-mono">
                          ${host.startingPrice.toFixed(2)}<span className="text-xs font-normal text-slate-500">/mo</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Renews at <strong>${host.renewalPrice.toFixed(2)}/mo</strong>
                        </div>
                      </div>

                      <a
                        href={host.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <span>View {host.name} Deal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenHostProfile(host);
                        }}
                        className="w-full text-center text-xs text-slate-600 hover:text-slate-900 underline py-0.5"
                      >
                        Read Full Profile
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Rows Body */}
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {/* SECTION: PRICING & GUARANTEE */}
              <tr className="bg-slate-100/60 font-semibold text-slate-900">
                <td colSpan={comparedHosts.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-slate-600">
                  Pricing & Terms
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Introductory Monthly Rate</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono font-bold text-slate-900">
                    ${h.startingPrice.toFixed(2)} / month
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Renewal Monthly Rate</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono text-slate-700">
                    ${h.renewalPrice.toFixed(2)} / month
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Money-Back Guarantee</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-semibold text-slate-900">
                    {h.moneyBackDays} Days
                  </td>
                ))}
              </tr>

              {/* SECTION: PERFORMANCE & SERVER SPECS */}
              <tr className="bg-slate-100/60 font-semibold text-slate-900">
                <td colSpan={comparedHosts.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-slate-600">
                  Performance & Infrastructure
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Uptime SLA</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono font-semibold text-emerald-700">
                    {h.uptimeSla}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Average US TTFB Latency</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono">
                    {h.serverSpeedMs} ms
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Storage Quota</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-medium">
                    {h.storage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Bandwidth</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200">
                    {h.bandwidth}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Data Center Locations</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 text-slate-600">
                    {h.dataCenters.join(', ')}
                  </td>
                ))}
              </tr>

              {/* SECTION: INCLUDED FEATURES */}
              <tr className="bg-slate-100/60 font-semibold text-slate-900">
                <td colSpan={comparedHosts.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-slate-600">
                  Included Features & Tooling
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Free 1st-Year Domain Name</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200">
                    {h.freeDomain ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Included Free
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Paid Add-on
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Free SSL Certificate</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 text-emerald-700 font-semibold">
                    <Check className="w-4 h-4 inline mr-1" /> Auto-Renewed SSL
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Business Email Accounts</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200">
                    {h.freeEmail ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Included Free
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Third-party paid
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">1-Click Staging Environment</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200">
                    {h.stagingEnvironment ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Built-in Staging
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Not Available
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Support Channels</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-medium">
                    {h.supportType}
                  </td>
                ))}
              </tr>

              {/* SECTION: SCORES RADAR */}
              <tr className="bg-slate-100/60 font-semibold text-slate-900">
                <td colSpan={comparedHosts.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-slate-600">
                  Audited Scores (Out of 10)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Speed & Performance</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono font-bold">
                    {h.scores.performance} / 10
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Value for Money</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono font-bold">
                    {h.scores.value} / 10
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Customer Support</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono font-bold">
                    {h.scores.support} / 10
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800">Dashboard & Ease of Use</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200 font-mono font-bold">
                    {h.scores.easeOfUse} / 10
                  </td>
                ))}
              </tr>

              {/* Final CTA Row */}
              <tr className="bg-slate-50">
                <td className="p-4 font-semibold text-slate-800">Affiliate Direct Deal</td>
                {comparedHosts.map((h) => (
                  <td key={h.id} className="p-4 border-l border-slate-200">
                    <a
                      href={h.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      <span>Claim Deal at {h.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pre-built Popular Comparisons List */}
      <section className="space-y-4 pt-6">
        <div>
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
            One-Click Benchmarks
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Popular Small Business Head-to-Head Comparisons
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Click any pairing below to immediately populate the side-by-side comparison matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_COMPARISONS.map((comp) => (
            <div
              key={comp.id}
              onClick={() => loadPresetComparison(comp.hostIds)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    {comp.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-emerald-600">
                    VS
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                <span>Load Comparison</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
