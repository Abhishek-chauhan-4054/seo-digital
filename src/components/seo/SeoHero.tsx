'use client';

import React from 'react';
import { UrlAnalyzer } from './UrlAnalyzer';
import { CheckCircle2, ArrowRight, Shield, Zap, Search, Clock } from 'lucide-react';

interface SeoHeroProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
}

export function SeoHero({ onAnalyze, isLoading }: SeoHeroProps) {
  return (
    <section id="seo-analyzer-section" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Subtle clean radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-slate-50 via-slate-50/50 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
        {/* Clean Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-bold text-slate-900">Pytron Digital</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">Live Website & Speed Audit</span>
        </div>

        {/* Clear, High-Impact Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          See what&apos;s hurting your Google rankings.{' '}
          <span className="text-brand-600 block sm:inline">
            Get the exact code to fix it.
          </span>
        </h1>

        {/* Human, Grounded Subheadline */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Pytron Digital tests your live website against official Google Core Web Vitals and search engine indexing rules. Real data, zero fake scores, and copy-paste code fixes in 30 seconds.
        </p>

        {/* URL Input Form */}
        <div className="pt-2">
          <UrlAnalyzer onAnalyze={onAnalyze} isLoading={isLoading} />
        </div>

        {/* High-Converting $99 Offer Banner */}
        <div className="pt-1">
          <a
            href="#pricing-section"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-slate-800 text-xs font-semibold hover:bg-orange-100/70 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-slate-700">Need urgent developer fixes?</span>
            <strong className="text-orange-600 font-bold">7-Day Technical Sprint for $99</strong>
            <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Realistic High-Craft Dashboard Preview */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl p-5 sm:p-6 text-left select-none relative">
          {/* Window Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="ml-2 text-xs font-mono text-slate-500">https://yourwebsite.com — Live Report Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Google Lighthouse Live
              </span>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Overall Health</div>
              <div className="my-1.5 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 font-mono">88</span>
                <span className="text-xs text-slate-400 font-bold">/100</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Quality
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Core Web Vitals</div>
              <div className="my-1.5 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 font-mono">1.9s</span>
                <span className="text-xs text-slate-400 font-bold">LCP</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fast Load Speed
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">On-Page Checks</div>
              <div className="my-1.5 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 font-mono">24/24</span>
                <span className="text-xs text-slate-400 font-bold">Passed</span>
              </div>
              <div className="text-[11px] text-brand-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Headings & Meta Valid
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 text-white">
              <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wide">7-Day Fast Sprint</div>
              <div className="my-1">
                <div className="text-sm font-black text-white">$99 Quick Fix</div>
                <div className="text-[11px] text-slate-300">Pytron Engineers Fix Bugs</div>
              </div>
              <div className="text-[11px] text-orange-400 font-semibold flex items-center gap-1">
                <span>1-Week Delivery</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
