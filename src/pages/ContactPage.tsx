import React, { useState } from 'react';
import { PageRoute } from '../components/Navbar';
import {
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Editorial Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
          Editorial & Research Desk
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Get in Touch with Our Review Team
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Have an inquiry regarding our benchmark data, host corrections, press inquiries, or small business recommendations? We review every inbound message within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Message Dispatched Successfully</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <strong>{name}</strong>. Our editorial team has received your inquiry regarding <em>{category}</em> and will follow up at <strong>{email}</strong> within 1 business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Miller"
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rachel@yourcompany.com"
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-category" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Editorial Inquiry">Editorial Question</option>
                    <option value="Data Correction">Benchmark / Price Correction</option>
                    <option value="Small Business Advice">Small Business Recommendation</option>
                    <option value="Press & Media">Press & Media Citation</option>
                    <option value="General">Other / Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Subject Line *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your query"
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide specifics regarding your hosting setup, question, or verification details..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {isSubmitting ? 'Transmitting Message...' : 'Send Message to Editorial Team'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Site / Company Information & Trust Links */}
        <div className="space-y-6">
          <div className="bg-[#0B192C] text-white rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Review Lab Headquarters</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">HostReview US Testing Lab</div>
                  {/* <div>Remote editorial review operations</div>
                  <div>United States</div> */}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Direct Editorial Email</div>
                  <div>contact@boosavvy.com</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Response Commitment</div>
                  <div>Mon–Fri, 9:00 AM – 6:00 PM CST</div>
                  <div className="text-slate-400">Guaranteed 24-hour reply SLA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links to Trust Pages */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Essential Trust Documentation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('methodology')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex items-center justify-between transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 5-Pillar Methodology
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('disclosure')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex items-center justify-between transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" /> FTC Affiliate Disclosure
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex items-center justify-between transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-600" /> About Our Analysts
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex items-center justify-between transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" /> Privacy Policy
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 flex items-center justify-between transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" /> Terms of Use
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
