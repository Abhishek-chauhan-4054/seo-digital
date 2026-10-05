'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface PricingPlansProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'AED' | 'INR'>('USD');

  const currencies: Record<string, { symbol: string; sprint99: string; growth: string; scale: string }> = {
    USD: { symbol: '$', sprint99: '$99', growth: '$1,490', scale: '$4,500' },
    GBP: { symbol: '£', sprint99: '£79', growth: '£1,190', scale: '£3,600' },
    EUR: { symbol: '€', sprint99: '€92', growth: '€1,380', scale: '€4,200' },
    AED: { symbol: 'AED', sprint99: 'AED 365', growth: 'AED 5,470', scale: 'AED 16,500' },
    INR: { symbol: '₹', sprint99: '₹8,290', growth: '₹1,24,000', scale: '₹3,75,000' },
  };

  const curr = currencies[currency] || currencies.USD;

  return (
    <section id="pricing-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-orange-500" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Plans Built for Speed and Measurable ROI
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No expensive 6-month lock-ins. Test our engineering capability with our <strong>7-Day Technical Sprint for {curr.sprint99}</strong>, or scale with dedicated monthly retainers.
          </p>

          {/* Currency Switcher */}
          <div className="pt-2 flex items-center justify-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-1">Currency:</span>
            {(['USD', 'GBP', 'EUR', 'AED', 'INR'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currency === c
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* PLAN 1: The $99 7-Day Sprint */}
          <div className="relative rounded-2xl p-6 sm:p-7 bg-white border-2 border-orange-500 shadow-md flex flex-col justify-between">
            {/* Top Badge */}
            <div className="absolute -top-3 left-6 bg-orange-600 text-white px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              Popular Entry Sprint
            </div>

            <div>
              <div className="flex items-center justify-between pb-2 mt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Fast-Track Fix
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 7 Days Delivery
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                7-Day Technical Sprint
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                For founders and teams who need their top SEO and speed issues fixed immediately.
              </p>

              {/* Price */}
              <div className="my-5 pb-5 border-b border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950 font-mono tracking-tight">
                    {curr.sprint99}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Introductory Rate
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  One-time payment • Zero recurring commitment
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  What You Receive in 7 Days:
                </div>
                {[
                  '1-on-1 manual audit by a senior Pytron SEO engineer',
                  'Top 5 critical technical SEO & Core Web Vitals fixes',
                  'Branch-ready code patches (Next.js / React / HTML / CMS)',
                  'Personalized 15-minute video walkthrough of your code',
                  'Canonical & Sitemap.xml redirect loop remediation',
                  '7-day direct email support & verification re-audit',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('7-Day Technical Sprint', curr.sprint99)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-orange-600 hover:bg-orange-500 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Claim {curr.sprint99} Fast Sprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* PLAN 2: Growth Sprint ($1,490) */}
          <div className="relative rounded-2xl p-6 sm:p-7 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Complete Overhaul
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 2-3 Weeks Delivery
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                Growth Overhaul Sprint
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Full-scale technical rewrite and Core Web Vitals optimization for scaling companies.
              </p>

              {/* Price */}
              <div className="my-5 pb-5 border-b border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950 font-mono tracking-tight">
                    {curr.growth}
                  </span>
                  <span className="text-xs text-slate-400">one-time</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Fixed project fee • Milestone based
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Sprint Deliverables:
                </div>
                {[
                  'Full DOM crawl of up to 10,000 URLs',
                  'Guaranteed Core Web Vitals pass (LCP < 2.0s, CLS < 0.1)',
                  'Complete JSON-LD Schema.org rich snippet graph',
                  'Next.js / SSR edge caching & asset bundle slimming',
                  'Internal link PageRank distribution model',
                  'Google Search Console indexing error resolution',
                  '30 days of post-launch monitoring & support',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('Growth Overhaul Sprint', curr.growth)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-950 hover:bg-slate-800 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Select Growth Sprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NDA & Enterprise SLA Included</span>
              </div>
            </div>
          </div>

          {/* PLAN 3: Monthly Retainer ($4,500/mo) */}
          <div className="relative rounded-2xl p-6 sm:p-7 bg-slate-950 text-white border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Dedicated Team
                </span>
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  Monthly Engineering
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                Dedicated Growth Retainer
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your dedicated technical SEO engineer for high-growth tech firms.
              </p>

              {/* Price */}
              <div className="my-5 pb-5 border-b border-slate-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    {curr.scale}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Month-to-month • Cancel anytime
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Retainer Inclusions:
                </div>
                {[
                  'Dedicated Senior SEO & Growth Engineer on your team',
                  'Continuous Core Web Vitals surveillance',
                  'High-intent buyer keyword gap acquisition',
                  'Bi-weekly GitHub pull requests & Next.js patches',
                  'Private Slack or Microsoft Teams channel',
                  'Executive monthly board reporting with dollar ROI',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPlan('Dedicated Growth Retainer', curr.scale)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Partner With Pytron</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <span>Serving US, UK, Canada, Australia, UAE & India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
