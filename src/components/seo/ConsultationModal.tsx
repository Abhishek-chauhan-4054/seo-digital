'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail,
  Globe,
  User,
  Calendar,
  Phone,
  DollarSign,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  mode?: 'deep_report' | 'expert';
}

export function ConsultationModal({
  isOpen,
  onClose,
  domain,
  mode = 'deep_report',
}: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [region, setRegion] = useState('US');
  const [budget, setBudget] = useState('5k-15k');
  const [goal, setGoal] = useState('organic_traffic');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate lead registration and email webhook dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-floating border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-black text-base shadow-sm">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-950 tracking-tight">
                  {mode === 'deep_report' ? 'Get Complete SEO Deep Audit' : 'Book Pytron Digital Strategy Call'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                  Global Advisory
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                digital.pytron.io • Dedicated Technical SEO Engineering
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-subtle">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-slate-950 tracking-tight">
                  Strategy Session Confirmed!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our senior Technical SEO Engineering team has allocated an advisory slot for <strong>{domain || 'your website'}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 text-left space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200/50 font-bold text-slate-800">
                  <span>What happens next:</span>
                  <span className="text-brand-600 font-mono">Step 1 of 2</span>
                </div>
                <p>✓ We will send full audit notes to <strong>{email}</strong> within 4 business hours.</p>
                <p>✓ A senior partner will prepare your competitive search gap matrix before our call.</p>
                <p>✓ Direct calendar booking link dispatched to your inbox.</p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-8 py-3 rounded-xl text-sm font-bold bg-slate-950 text-white hover:bg-brand-600 transition-all cursor-pointer shadow-sm"
              >
                Return to Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Domain banner */}
              <div className="bg-brand-50/70 rounded-2xl p-3.5 border border-brand-200/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Globe className="w-4 h-4 text-brand-600 shrink-0" />
                  <div className="text-xs truncate">
                    <span className="text-slate-500">Audited Domain: </span>
                    <strong className="text-slate-950 font-bold">{domain || 'https://yourwebsite.com'}</strong>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-brand-700 bg-white px-2 py-0.5 rounded-full border border-brand-200 shrink-0">
                  Target Site
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Vance"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/40 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Business Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="david@company.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/40 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/40 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Country / Market */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Target Primary Market
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  >
                    <option value="US">🇺🇸 United States (Global)</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="AU">🇦🇺 Australia</option>
                    <option value="AE">🇦🇪 United Arab Emirates</option>
                    <option value="IN">🇮🇳 India</option>
                    <option value="EU">🇪🇺 European Union</option>
                  </select>
                </div>
              </div>

              {/* Monthly Investment / Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Estimated SEO & Engineering Budget
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  >
                    <option value="3.5k-sprint">One-Time Technical SEO Sprint ($3,500)</option>
                    <option value="2k-5k">$2,000 – $5,000 / month (Growth Tier)</option>
                    <option value="5k-15k">$5,000 – $15,000 / month (Scale Tier - Recommended)</option>
                    <option value="15k+">$15,000+ / month (Enterprise & Multi-Region)</option>
                  </select>
                </div>
              </div>

              {/* Priority Goal */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Primary Objective
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                >
                  <option value="organic_traffic">Scale High-Intent Commercial Organic Search Traffic</option>
                  <option value="core_web_vitals">Fix Google Core Web Vitals & Speed Bottlenecks</option>
                  <option value="technical_migration">Complete Architecture / Next.js / CMS Migration</option>
                  <option value="competitor_takeover">Outrank Enterprise Competitors in SERPs</option>
                  <option value="international_seo">Global / Multi-Country International Expansion</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Specific Challenges or Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your organic growth targets or urgent technical issues..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/40 focus:bg-white resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-xl font-bold text-sm text-white bg-slate-950 hover:bg-brand-600 active:scale-[0.98] transition-all shadow-card flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Advisory Session...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Strategy Call with Pytron Digital</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NDA Protected
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Response under 4 hours
                </span>
                <span>•</span>
                <span>Zero Sales Fluff</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
