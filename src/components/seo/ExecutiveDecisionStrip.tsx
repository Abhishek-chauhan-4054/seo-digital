'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Code2,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ExecutiveDecisionStripProps {
  onClaimSprint: () => void;
  onBookCall: () => void;
}

export function ExecutiveDecisionStrip({ onClaimSprint, onBookCall }: ExecutiveDecisionStripProps) {
  const [activePersona, setActivePersona] = useState<'ceo' | 'cto' | 'cfo'>('ceo');

  const personas = [
    {
      id: 'ceo' as const,
      icon: Briefcase,
      role: 'Founders & CEOs',
      tagline: 'High-Intent Organic Inbound',
      headline: 'Stop burning cash on rising Google Ads auctions.',
      metric: '+340%',
      metricLabel: 'Average inbound pipeline growth for client teams',
      description:
        'Pay-per-click ad costs are up 30% year-over-year. Pytron Digital turns your website into a compounding organic engine that brings qualified buyers directly to your sales team across the US, UK, Canada, Australia, UAE, and India.',
      points: [
        'Rank for high-intent buyer keywords instead of generic vanity terms',
        'International SEO targeting to capture US, UK & international buyers',
        'Direct connection between search rankings and monthly recurring revenue',
        'Clear executive reporting focused on leads and pipeline, not fluff',
      ],
      quote:
        '“Pytron Digital made SEO our #1 customer acquisition channel. We cut our paid ad budget by 40% while doubling inbound demo requests.”',
      quoteAuthor: 'B2B Software Founder',
      cta: 'Claim $99 Fix Sprint',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'cto' as const,
      icon: Code2,
      role: 'CTOs & Engineering',
      tagline: 'Ready-to-Merge Code Patches',
      headline: 'We write the code. We don’t dump 80-page slide decks.',
      metric: '0 Fluff',
      metricLabel: 'Direct code fixes for Next.js, React, HTML & CMS platforms',
      description:
        'Traditional SEO agencies hand you long PDF reports that your dev team ignores. Pytron Digital sends clean, branch-ready code patches for Google Core Web Vitals, server routing, and structured JSON-LD schemas.',
      points: [
        'Production patches for LCP (<2.5s), CLS (<0.1), and INP responsiveness',
        'Validated JSON-LD schema graphs that Google search crawlers love',
        'Clean canonical tags, redirect trees, and robots directives',
        'Direct async collaboration on GitHub or Slack with senior engineers',
      ],
      quote:
        '“Finally, an SEO partner that actually understands Next.js hydration and Edge caching. They cut our LCP from 3.6s to 0.9s in one sprint.”',
      quoteAuthor: 'VP of Engineering, High-Traffic E-commerce',
      cta: 'Test With $99 Sprint',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'cfo' as const,
      icon: BarChart3,
      role: 'CFOs & Finance',
      tagline: 'Quantified Revenue Recovery',
      headline: 'Lower CAC and zero lock-in agency contracts.',
      metric: '38% Lower',
      metricLabel: 'Blended customer acquisition cost over 6 months',
      description:
        'Slow websites lose paying customers at checkout. Pytron Digital recovers that revenue with transparent, flat-fee pricing. Test our engineering speed with a $99 7-day sprint backed by an unconditional 100% money-back guarantee.',
      points: [
        'Recover $10,000 to $80,000+ per month in bouncing website traffic',
        'No multi-month contracts — test our capability for just $99 first',
        'Data-backed financial models linking Core Web Vitals directly to conversion',
        'Flat, transparent pricing with clear milestone deliverables',
      ],
      quote:
        '“The $99 sprint proved their speed in week one. In month two, we recovered an estimated $42,000 in previously lost checkout traffic.”',
      quoteAuthor: 'Chief Financial Officer',
      cta: 'Start $99 Trial Sprint',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  const current = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <section
      id="executive-decision-section"
      className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Built For Decision Makers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why Teams Choose Pytron Digital
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Most SEO agencies deliver vague slide decks and excuses. We deliver real code fixes that pass Google audits and drive paying customers.
          </p>
        </div>

        {/* Persona Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            {personas.map((persona) => {
              const Icon = persona.icon;
              const isActive = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setActivePersona(persona.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{persona.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Persona Card */}
        <div className="mt-8 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border ${current.badge}`}>
                  {current.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {current.headline}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {current.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-2">
                {current.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <p className="italic text-slate-300">{current.quote}</p>
                <div className="text-[11px] font-semibold text-blue-400">
                  — {current.quoteAuthor}
                </div>
              </div>
            </div>

            {/* Right Metric & Offer */}
            <div className="lg:col-span-5 bg-slate-950 rounded-xl p-6 border border-slate-800 space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                  Measured Outcome
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {current.metric}
                </div>
                <div className="text-xs text-slate-400">
                  {current.metricLabel}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>The Low-Risk Entry Offer</span>
                </div>
                <p className="text-xs text-slate-300">
                  Try Pytron Digital with our <strong>$99 Fast-Track SEO Sprint</strong>. We fix your top 5 technical issues in 7 days. If not satisfied, 100% money-back guarantee.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={onClaimSprint}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>{current.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onBookCall}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer text-center"
                >
                  Schedule Strategy Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Market Strip */}
        <div className="mt-8 py-4 px-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">100% Confidential & Secure:</span>
            <span>No code or company data shared with third parties.</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-300 font-medium">
            <span>Serving Clients Globally:</span>
            <span>🇺🇸 US</span>
            <span>🇬🇧 UK</span>
            <span>🇨🇦 CA</span>
            <span>🇦🇺 AU</span>
            <span>🇦🇪 UAE</span>
            <span>🇮🇳 IN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
