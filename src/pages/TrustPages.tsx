import React from 'react';
import { PageRoute } from '../components/Navbar';
import {
  ShieldCheck,
  CheckCircle2,
  Server,
  Scale,
  Award,
  Users,
  Lock,
  FileText,
  ArrowLeft
} from 'lucide-react';
import labImg from '../assets/images/testing_lab_metrics_1791290207887.jpg';

interface TrustPageProps {
  type: 'methodology' | 'disclosure' | 'privacy' | 'terms' | 'about';
  onNavigate: (page: PageRoute) => void;
}

export const TrustPages: React.FC<TrustPageProps> = ({ type, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back to Home button */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* 1. METHODOLOGY */}
      {type === 'methodology' && (
        <article className="space-y-6">
          <header className="space-y-2 border-b border-slate-200 pb-6">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Testing Rigor & Benchmarks
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our 5-Pillar Evaluation Methodology
            </h1>
            <p className="text-sm text-slate-600">
              Last revised: October 2026 · Standard Operating Procedure for US Small Business Hosting Reviews
            </p>
          </header>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-[300px]">
            <img
              src={labImg}
              alt="Review Testing Laboratory Setup"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              At <strong>HostReview US</strong>, our review scores are derived strictly from quantitative server monitoring, automated synthetic transactions, and mystery-shopper support tests. We do not accept free accounts from hosting vendors—all plans are purchased with our own testing budget under anonymous business entities.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Pillar 1: Uptime Reliability & Speed (30% of Overall Score)</h2>
            <p>
              We provision identical WordPress demo instances with standard e-commerce databases. Our monitoring agents ping these instances every 60 seconds from 6 domestic geographic nodes: Ashburn (VA), Atlanta (GA), Chicago (IL), Dallas (TX), San Jose (CA), and Seattle (WA). We log:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
              <li><strong>Time to First Byte (TTFB):</strong> The time taken for the server to process PHP and return the first byte of data. Sub-300ms is considered excellent.</li>
              <li><strong>Cumulative Uptime Percentage:</strong> Measured across 365 days. A single minute of unplanned downtime is recorded.</li>
              <li><strong>Concurrency Stress Test:</strong> Using k6 and Locust, we simulate 50 simultaneous visitors browsing and loading shopping cart sessions.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Pillar 2: Value & Renewal Transparency (25% of Overall Score)</h2>
            <p>
              The hosting industry is notorious for steep promotional pricing discounts followed by 300%+ renewal markups. We audit:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
              <li>Spread between introductory promotional pricing and mandatory renewal price.</li>
              <li>Unannounced cart add-ons pre-selected by default (e.g. backup tools, SEO checkers).</li>
              <li>Fairness of refund policies and money-back guarantee terms (30 days to 97 days).</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Pillar 3: Customer Support Competence (20% of Overall Score)</h2>
            <p>
              We conduct unannounced secret shopper inquiries across telephone, live chat, and support ticketing queues. Rather than asking simple questions, we pose real issues: restoring a corrupted database table, configuring DNS DKIM/DMARC records, and troubleshooting SSL handshake failures.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Pillar 4: Dashboard Ease of Use (15% of Overall Score)</h2>
            <p>
              Small business owners are busy running their companies, not configuring Apache virtual hosts. We assess whether onboarding wizards, domain configurations, email account creation, and 1-click staging environments can be operated without technical assistance.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Pillar 5: Infrastructure & Security (10% of Overall Score)</h2>
            <p>
              We test automated daily backup availability, free SSL certificate issuance, web application firewalls (WAF), malware scanning, and server hardware (NVMe vs SATA, CPU isolation).
            </p>
          </div>
        </article>
      )}

      {/* 2. AFFILIATE DISCLOSURE */}
      {type === 'disclosure' && (
        <article className="space-y-6">
          <header className="space-y-2 border-b border-slate-200 pb-6">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              FTC Compliance & Editorial Transparency
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Affiliate Disclosure
            </h1>
            <p className="text-sm text-slate-600">
              Published in accordance with Federal Trade Commission (FTC) 16 CFR Part 255 Guidelines
            </p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-950 font-medium text-sm">
              Summary: HostReview US is reader-supported. When you purchase web hosting plans through the affiliate links on our website, we may receive compensation at zero additional cost to you.
            </div>

            <h2 className="text-xl font-bold text-slate-900 pt-2">How We Earn Revenue</h2>
            <p>
              Producing ongoing 365-day uptime monitoring, purchasing server accounts, maintaining US testing infrastructure, and employing experienced systems analysts requires substantial capital. To keep our benchmark directory completely free to the public, we participate in affiliate marketing programs.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">Zero Impact on Editorial Independence</h2>
            <p>
              We operate an absolute separation between our editorial benchmarking team and our commercial affiliate partnerships:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
              <li><strong>Rankings cannot be bought:</strong> Providers cannot pay for higher star ratings, preferential placements, or favorable review copy.</li>
              <li><strong>Equal benchmarking standard:</strong> We review providers regardless of whether an affiliate program exists. If a host delivers poor uptime or aggressive renewal fees, our review states so plainly.</li>
              <li><strong>Pricing parity:</strong> Clicking our affiliate links will never increase your price. In many cases, our referral links apply exclusive small business partner discounts that lower your initial registration cost.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-2">Questions or Inquiries</h2>
            <p>
              If you have questions regarding our commercial arrangements or would like further information about our business operations, contact our compliance officer at <code>compliance@hostreviewus.com</code>.
            </p>
          </div>
        </article>
      )}

      {/* 3. ABOUT US */}
      {type === 'about' && (
        <article className="space-y-6">
          <header className="space-y-2 border-b border-slate-200 pb-6">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Our Mission & Testing Lab
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              About HostReview US
            </h1>
            <p className="text-sm text-slate-600">
              Dedicated to helping American small business owners choose honest, reliable infrastructure.
            </p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              HostReview US was established in Chicago with a clear objective: cut through deceptive affiliate marketing and provide small businesses with clear, audited technical facts about web hosting providers.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">Our Testing Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Marcus Vance"
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Marcus Vance</div>
                  <div className="text-xs text-slate-500">Lead Infrastructure Analyst</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">14+ years in datacenter operations</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Elena Rostova</div>
                  <div className="text-xs text-slate-500">DevOps & Cloud Systems Architect</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Specialist in Google Cloud & AWS</div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 pt-2">Our Commitments to Small Businesses</h2>
            <p>
              We treat your website with the same seriousness as your storefront. We pledge to maintain independent accounts, log uptime transparently, and continuously call out predatory renewal fees.
            </p>
          </div>
        </article>
      )}

      {/* 4. PRIVACY POLICY */}
      {type === 'privacy' && (
        <article className="space-y-6">
          <header className="space-y-2 border-b border-slate-200 pb-6">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Legal Compliance
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-600">
              Effective Date: October 1, 2026 · HostReview US
            </p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm leading-relaxed">
            <p>
              HostReview US respects the privacy of our visitors. This Privacy Policy details the information we collect and how we safeguard your information when you visit our website.
            </p>
            <h3 className="font-bold text-slate-900 text-base">1. Information We Collect</h3>
            <p>
              When you submit a contact inquiry or leave an article comment, we collect your name and email address. We also collect anonymized browser diagnostics (IP address, operating system, browser type) to improve page rendering and prevent automated spam.
            </p>
            <h3 className="font-bold text-slate-900 text-base">2. Cookie Policy</h3>
            <p>
              We use standard session cookies to remember comparison preferences and scratchpad notes. Third-party affiliate networks may drop attribution cookies when you click outbound referral links to track referral credit.
            </p>
            <h3 className="font-bold text-slate-900 text-base">3. Data Sharing</h3>
            <p>
              We never sell or rent your personal information to third parties. Information is only utilized to respond to your inquiries or comply with legal mandates.
            </p>
          </div>
        </article>
      )}

      {/* 5. TERMS OF USE */}
      {type === 'terms' && (
        <article className="space-y-6">
          <header className="space-y-2 border-b border-slate-200 pb-6">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Terms & Conditions
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Terms of Use
            </h1>
            <p className="text-sm text-slate-600">
              Effective Date: October 1, 2026 · HostReview US
            </p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm leading-relaxed">
            <p>
              By accessing HostReview US, you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
            <h3 className="font-bold text-slate-900 text-base">1. Informational Purposes Only</h3>
            <p>
              All reviews, benchmark data, and hosting price evaluations provided on this website are for general informational purposes. While we strive for absolute accuracy, web hosts frequently alter pricing promotions and plan terms without advance notice. Always confirm final specifications on the hosting provider’s official website prior to checkout.
            </p>
            <h3 className="font-bold text-slate-900 text-base">2. Intellectual Property</h3>
            <p>
              All original content, benchmark graphs, articles, and review ratings are the intellectual property of HostReview US and may not be reproduced without explicit written consent.
            </p>
          </div>
        </article>
      )}
    </div>
  );
};
