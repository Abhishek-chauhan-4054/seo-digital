'use client';

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Zap,
} from 'lucide-react';

interface AgencyServicesProps {
  onBookCall: () => void;
}

export function AgencyServices({ onBookCall }: AgencyServicesProps) {
  const serviceTiers = [
    {
      badge: 'Immediate Fix',
      title: 'Technical SEO Sprint',
      target: 'Fix critical errors & Core Web Vitals fast',
      timeline: '2-3 Weeks Delivery',
      features: [
        'Complete DOM & Server crawl of up to 10,000 URLs',
        'Direct developer code patches for LCP, CLS, and TTFB',
        'Canonical tag & 301 redirect loop elimination',
        'Advanced JSON-LD Schema graph deployment',
        'XML Sitemap & Robots.txt architectural overhaul',
        'Google Search Console indexing issue resolution',
      ],
      ctaText: 'Book Technical Sprint',
      highlighted: false,
    },
    {
      badge: 'Most Popular',
      title: 'Full Organic Growth Retainer',
      target: 'For companies scaling organic revenue & pipeline',
      timeline: 'Monthly Dedicated Engineering',
      features: [
        'Dedicated Senior Technical SEO & Growth Engineer',
        'Weekly Core Web Vitals & ranking surveillance',
        'High-intent commercial keyword gap takeover',
        'Semantic entity & topical authority expansion',
        'Internal link PageRank distribution engine',
        'Direct Slack/Teams channel with Pytron engineers',
        'Sprint-ready Jira/GitHub developer tickets',
      ],
      ctaText: 'Scale Organic Growth',
      highlighted: true,
    },
    {
      badge: 'High-Stakes',
      title: 'CMS & Framework Migration',
      target: 'Next.js, Shopify, Headless & Rebrand Projects',
      timeline: 'Custom Migration Roadmap',
      features: [
        '100% SEO traffic equity preservation guarantee',
        'Comprehensive 1:1 legacy URL redirect mapping',
        'Pre-launch staging environment crawler audit',
        'Post-launch real-time 404 & drop monitoring',
        'Structured data & international hreflang migration',
        'Executive board performance reporting',
      ],
      ctaText: 'Schedule Migration Advisory',
      highlighted: false,
    },
  ];

  return (
    <section id="agency-services-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Full-Stack Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            We Fix The Code For You
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Finding issues is only the first step. Pytron Digital is a technical SEO & engineering partner trusted by companies across <strong>USA, UK, Canada, Australia, UAE, and India</strong>.
          </p>
        </div>

        {/* Client Metrics Strip */}
        <div className="mt-10 py-5 px-6 sm:px-8 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white shrink-0">
              P
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight">
                Pytron Digital Engineering
              </div>
              <div className="text-xs text-slate-400">
                Senior SEO engineers, not account managers
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-8">
            <div>
              <div className="text-2xl font-black text-white font-mono">$45M+</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Client Revenue Driven</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Core Web Vitals Pass</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400 font-mono">180k+</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Top 3 Rankings</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 font-mono">&lt; 24h</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Response SLA</div>
            </div>
          </div>
        </div>

        {/* Service Tiers Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {serviceTiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all bg-white border ${
                tier.highlighted
                  ? 'border-blue-600 shadow-md ring-2 ring-blue-100'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      tier.highlighted
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    {tier.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 tracking-tight mt-2">
                  {tier.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {tier.target}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    What&apos;s Included:
                  </div>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onBookCall}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.highlighted
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Markets Served */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2.5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              🇺🇸 United States
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              🇬🇧 United Kingdom
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              🇨🇦 Canada
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              🇦🇺 Australia
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              🇦🇪 United Arab Emirates
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              🇮🇳 India
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            All engagements include custom non-disclosure agreements (NDA), multi-currency invoicing, and timezone-aligned engineering syncs.
          </p>
        </div>
      </div>
    </section>
  );
}
