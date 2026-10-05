'use client';

import React from 'react';
import { Search, Cpu, BarChart3, ArrowRight } from 'lucide-react';

export function LandingHowItWorks() {
  const steps = [
    {
      step: '01',
      icon: <Search className="w-5 h-5 text-brand-600" />,
      title: 'Enter Any Public URL',
      description: 'Submit your website domain. Our engine normalizes the URL and performs server-side safety checks.',
    },
    {
      step: '02',
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      title: 'Live Multi-Source Audit',
      description: 'We query Google PageSpeed Insights, inspect real server response headers, and parse on-page HTML architecture.',
    },
    {
      step: '03',
      icon: <BarChart3 className="w-5 h-5 text-emerald-600" />,
      title: 'Actionable SEO Intelligence',
      description: 'Review verified passes, flagged warnings, Core Web Vitals measurements, and prioritized developer recommendations.',
    },
  ];

  return (
    <section id="how-it-works-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How The SEO Analyzer Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Zero sign-up required. Instant verification using live Google standards and modern full-stack crawler diagnostics.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono">{s.step}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-2">{s.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                <span>Instant automated execution</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
