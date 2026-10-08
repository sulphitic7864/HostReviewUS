import React from 'react';
import { ShieldCheck, Server, Award } from 'lucide-react';

const trustFeatures = [
  {
    icon: Server,
    color: 'emerald',
    title: '100+ Hosts Benchmarked',
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
] as const;

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

export const TrustSection: React.FC = () => (
  <section className="border-y border-slate-200/80 bg-gradient-to-br from-slate-100 via-white to-emerald-50/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Why Boo Savvy
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Built for clarity, not hype.
        </h2>
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
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
