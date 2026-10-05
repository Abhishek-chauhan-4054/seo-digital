'use client';

import React from 'react';
import {
  Lock,
  ArrowRight,
  Sparkles,
  FileSearch,
  KeyRound,
  TrendingUp,
  Layers,
  Network,
  Gauge,
  ListOrdered,
  MessageSquare,
  Flame,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface DeepReportPaywallProps {
  domain: string;
  onGetDeepReport: () => void;
  onTalkToExpert: () => void;
}

export function DeepReportPaywall({
  domain,
  onGetDeepReport,
  onTalkToExpert,
}: DeepReportPaywallProps) {
  const lockedFeatures = [
    {
      icon: <FileSearch className="w-4 h-4 text-brand-600" />,
      title: 'Technical SEO Deep Dive',
      description: 'Full crawl depth diagnostics, server logs, canonical loop checks, and edge CDN cache inspection.',
    },
    {
      icon: <Layers className="w-4 h-4 text-blue-600" />,
      title: 'Page-by-Page Analysis',
      description: 'Comprehensive multi-page crawl scoring individual templates, landing pages, and conversion funnels.',
    },
    {
      icon: <KeyRound className="w-4 h-4 text-amber-600" />,
      title: 'Keyword Opportunities',
      description: 'High-intent search volume analysis, unranked commercial keywords, and competitor SERP ranking targets.',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-violet-600" />,
      title: 'Content Gaps & Entity Audit',
      description: 'Topical authority modeling, NLP entity extraction, and missing semantic content clusters.',
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      title: 'Competitor Insights & Benchmark',
      description: 'Direct domain authority comparison, backlink profile benchmarks, and organic market share analysis.',
    },
    {
      icon: <Network className="w-4 h-4 text-indigo-600" />,
      title: 'Internal Linking Opportunities',
      description: 'PageRank equity distribution, click depth mapping, and orphaned page identification.',
    },
    {
      icon: <Gauge className="w-4 h-4 text-rose-600" />,
      title: 'Core Web Vitals In-Depth',
      description: 'Real-user field monitoring (CrUX), thread-blocking JS scripts, and automated CSS/JS optimization recipes.',
    },
    {
      icon: <ListOrdered className="w-4 h-4 text-cyan-600" />,
      title: 'Priority Action Plan',
      description: 'Prioritized developer tickets with estimated traffic ROI and sprint-ready remediation specifications.',
    },
  ];

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-white overflow-hidden shadow-floating">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-4">
        {/* Special Offer Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-black tracking-wide uppercase">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Special Offer: 1-Week Fast-Track Sprint for Just $99</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
          Want the Complete Multi-Page SEO Blueprint?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Your free audit covers the fundamentals for <strong className="text-white">{domain}</strong>. Get the full multi-page crawl, competitor search benchmark, and production developer patches delivered by Pytron Digital engineers.
        </p>

        {/* Locked Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 text-left">
          {lockedFeatures.map((feat) => (
            <div
              key={feat.title}
              className="relative p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm flex flex-col justify-between group hover:border-brand-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-300 transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight mt-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-brand-300 font-semibold">
                <span>Unlocked in Deep Audit</span>
              </div>
            </div>
          ))}
        </div>

        {/* High-Converting CTA Box */}
        <div className="pt-10 p-6 sm:p-8 rounded-3xl bg-slate-800/40 border border-slate-700/70 mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-950 px-2 py-0.5 rounded-full border border-orange-800">
                  Sprint Launch Deal
                </span>
                <span className="text-xs text-slate-400">7 Days Delivery</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                7-Day Technical SEO Sprint — <span className="text-orange-400 font-mono">$99</span> <span className="text-xs text-slate-400 font-normal line-through">$499</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Senior Pytron engineers fix your top 5 critical bugs, optimize Core Web Vitals, and send custom code patches.
              </p>
            </div>

            <button
              type="button"
              onClick={onGetDeepReport}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-orange-600 hover:bg-orange-500 text-white shadow-card flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>Claim $99 Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Consultation CTAs */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onTalkToExpert}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all text-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <span>Book 30-Min Strategy Call with Senior Engineer</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Money-Back Guarantee • Serving USA, UK, Canada, Australia, UAE & India</span>
        </div>
      </div>
    </div>
  );
}
