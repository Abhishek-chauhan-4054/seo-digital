'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this SEO report really 100% free?',
      a: 'Yes. You can analyze any public website URL without creating an account, entering credit card information, or signing up. You receive an instant basic report with verified scores and actionable findings.',
    },
    {
      q: 'Are these real audit results or simulated scores?',
      a: 'We perform real live analysis. We query Google PageSpeed Insights for real Core Web Vitals (LCP, CLS, FCP) and perform server-side inspection of live HTML, title tags, meta descriptions, headings, images, and structured JSON-LD schema. If an external service is unavailable, we explicitly show "Not available" rather than inventing fake data.',
    },
    {
      q: 'What is the difference between this free report and the Deep SEO Report?',
      a: 'The free report audits your target landing page for core technical and on-page signals. The Deep SEO Report delivers a comprehensive multi-page site crawl, competitive gap benchmark, keyword revenue analysis, topical authority audit, and a prioritized developer remediation plan crafted by Pytron Digital SEO engineers.',
    },
    {
      q: 'Can Pytron Digital implement these recommendations for our team?',
      a: 'Yes. Pytron Digital provides full-stack technical SEO advisory and development services for startups and enterprise marketing teams across the US, UK, Canada, Australia, UAE, and India. We fix Core Web Vitals, restructure architectures, and execute organic growth strategies.',
    },
    {
      q: 'Can we integrate this audit engine into our existing workflows or CMS?',
      a: 'Yes. The application is built on an extensible provider architecture (SeoAnalyzerProvider) designed to connect custom crawlers, Google Search Console, Ahrefs, Semrush, or internal APIs without rebuilding the user interface.',
    },
  ];

  return (
    <section id="faq-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about our SEO analyzer and Pytron Digital services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-brand-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
