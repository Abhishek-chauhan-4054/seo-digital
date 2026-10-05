'use client';

import React from 'react';
import { Shield, FileText, Zap, Smartphone, Layers, Share2, Check } from 'lucide-react';

export function LandingFeatures() {
  const categories = [
    {
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      title: 'Technical SEO Signals',
      checks: [
        'HTTPS & SSL encryption cipher check',
        'Robots.txt crawl directive compliance',
        'XML Sitemap syntax and accessibility',
        'Canonical tag consistency',
        'Indexability and noindex detection',
        'HTTP to HTTPS redirect chains',
      ],
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      title: 'On-Page Architecture',
      checks: [
        'Title tag length & SERP pixel width',
        'Meta description completeness',
        'H1 primary tag presence & uniqueness',
        'H2-H6 subheading logical hierarchy',
        'Image ALT text attribute coverage',
        'Internal vs external link distribution',
      ],
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      title: 'Core Web Vitals & Speed',
      checks: [
        'Largest Contentful Paint (LCP ≤ 2.5s)',
        'Cumulative Layout Shift (CLS ≤ 0.1)',
        'First Contentful Paint (FCP ≤ 1.8s)',
        'Total Blocking Time (TBT ≤ 200ms)',
        'Time to First Byte (TTFB ≤ 800ms)',
        'Google PageSpeed Insights benchmarks',
      ],
    },
    {
      icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
      title: 'Mobile Usability & UX',
      checks: [
        'Responsive viewport meta configuration',
        'Touch target sizing & finger ergonomics',
        'Font legibility & typography scaling',
        'Mobile-first indexability readiness',
        'Horizontal scroll prevention',
        'CSS fluid layout constraints',
      ],
    },
    {
      icon: <Layers className="w-5 h-5 text-violet-600" />,
      title: 'Content & Semantic Structure',
      checks: [
        'HTML document language declarations',
        'Textual density and topical depth',
        'Semantic DOM structure inspection',
        'Heading keyword distribution',
        'Crawlable copy formatting',
        'Duplicate content risk flags',
      ],
    },
    {
      icon: <Share2 className="w-5 h-5 text-cyan-600" />,
      title: 'Social & Structured Data',
      checks: [
        'Open Graph protocol meta tags (og:*)',
        'Twitter / X card metadata verification',
        'JSON-LD Schema.org microdata parser',
        'Organization & WebSite schema',
        'Rich snippet search qualification',
        'Social share preview formatting',
      ],
    },
  ];

  return (
    <section id="what-we-check-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Complete Audit Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What We Check On Your Website
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our multi-provider engine evaluates real search readiness across technical infrastructure, on-page optimization, and official Google speed thresholds.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {cat.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/50 text-[11px] font-semibold text-slate-400">
                Audited via digital.pytron.io
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
