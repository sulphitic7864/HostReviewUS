import React from 'react';
import { HostProvider } from '../types/hosting';
import { StarRating } from './StarRating';
import {
  X,
  ExternalLink,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Server,
  Zap,
  Clock,
  HardDrive,
  Globe,
  Mail,
  Headphones,
  Check
} from 'lucide-react';

interface HostProfileModalProps {
  host: HostProvider | null;
  onClose: () => void;
  onToggleCompare?: (hostId: string) => void;
  isCompared?: boolean;
}

export const HostProfileModal: React.FC<HostProfileModalProps> = ({
  host,
  onClose,
  onToggleCompare,
  isCompared = false
}) => {
  if (!host) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-host-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-[#0B192C] text-white p-6 sm:p-8 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-12 sm:pr-14">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${host.logoBg} flex items-center justify-center text-white font-black text-xl shadow-md border border-white/10 shrink-0`}>
                {host.logoText}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 id="modal-host-title" className="text-2xl font-bold text-white tracking-tight">
                    {host.name}
                  </h3>
                  {host.staffPick && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Staff Pick #1
                    </span>
                  )}
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Best for: {host.bestFor.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-300">
                  <StarRating rating={host.starRating} size="sm" />
                  <span>·</span>
                  <span>Tested: {host.lastUpdated}</span>
                  <span>·</span>
                  <span>{host.uptimeSla} Uptime SLA</span>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="sm:text-right bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">Introductory Deal</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${host.startingPrice.toFixed(2)}<span className="text-xs font-normal text-slate-400">/mo</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Renews at ${host.renewalPrice.toFixed(2)}/mo
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          {/* Quick Verdict */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Our Independent Verdict
            </h4>
            <p className="text-slate-800 text-base leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
              {host.verdict}
            </p>
          </div>

          {/* 5-Pillar Score Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Laboratory Performance Ratings (Out of 10)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(host.scores).map(([category, score]) => {
                const labels: Record<string, string> = {
                  performance: 'Speed & TTFB Latency',
                  value: 'Value & Pricing Transparency',
                  support: '24/7 Customer Support',
                  easeOfUse: 'Ease of Use & Dashboard',
                  features: 'Security & Infrastructure'
                };
                const percentage = (score / 10) * 100;
                return (
                  <div key={category} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700">{labels[category] || category}</span>
                      <span className="font-bold text-slate-900 font-mono">{score.toFixed(1)}/10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Hardware & Package Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-xs">
                <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                  <HardDrive className="w-3.5 h-3.5 text-blue-600" /> Storage
                </div>
                <div className="font-semibold text-slate-900">{host.storage}</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-xs">
                <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600" /> Bandwidth
                </div>
                <div className="font-semibold text-slate-900">{host.bandwidth}</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-xs">
                <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Response TTFB
                </div>
                <div className="font-semibold text-slate-900">{host.serverSpeedMs} ms avg</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-xs">
                <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                  <Headphones className="w-3.5 h-3.5 text-purple-600" /> Support
                </div>
                <div className="font-semibold text-slate-900">{host.supportType}</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-xs">
                <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                  <Globe className="w-3.5 h-3.5 text-teal-600" /> Free Domain
                </div>
                <div className="font-semibold text-slate-900">
                  {host.freeDomain ? 'Included (Yr 1)' : 'Paid add-on'}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-xs">
                <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Money Back
                </div>
                <div className="font-semibold text-slate-900">{host.moneyBackDays} Days Guarantee</div>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What We Like (Pros)
              </h5>
              <ul className="space-y-2 text-xs text-slate-700">
                {host.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" /> Points to Consider (Cons)
              </h5>
              <ul className="space-y-2 text-xs text-slate-700">
                {host.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {onToggleCompare && (
              <button
                type="button"
                onClick={() => onToggleCompare(host.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  isCompared
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {isCompared ? '✓ Added to Compare' : '+ Add to Compare'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            >
              Close Window
            </button>
          </div>

          <a
            href={host.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Visit {host.name} & View Deal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
