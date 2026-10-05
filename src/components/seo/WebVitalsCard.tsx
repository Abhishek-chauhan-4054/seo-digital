'use client';

import React from 'react';
import { WebVitalsSummary, MetricValue } from '@/lib/seo/types';
import { Zap, HelpCircle, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface WebVitalsCardProps {
  webVitals: WebVitalsSummary;
}

export function WebVitalsCard({ webVitals }: WebVitalsCardProps) {
  const renderMetricBadge = (metric: MetricValue) => {
    switch (metric.status) {
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Good
          </span>
        );
      case 'needs-improvement':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> Needs Work
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3 text-rose-600" /> Poor
          </span>
        );
      case 'not_available':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <HelpCircle className="w-3 h-3 text-slate-400" /> N/A
          </span>
        );
    }
  };

  const metricsList = [
    {
      key: 'lcp',
      name: 'Largest Contentful Paint (LCP)',
      data: webVitals.lcp,
      ideal: '≤ 2.5s',
      desc: 'Measures perceived loading speed of the primary content block.',
    },
    {
      key: 'cls',
      name: 'Cumulative Layout Shift (CLS)',
      data: webVitals.cls,
      ideal: '≤ 0.1',
      desc: 'Measures unexpected visual layout movement during render.',
    },
    {
      key: 'fcp',
      name: 'First Contentful Paint (FCP)',
      data: webVitals.fcp,
      ideal: '≤ 1.8s',
      desc: 'Time until the browser renders the first piece of DOM content.',
    },
    {
      key: 'tbt',
      name: 'Total Blocking Time (TBT)',
      data: webVitals.tbt,
      ideal: '≤ 200ms',
      desc: 'Total duration between FCP and TTI where tasks blocked responsiveness.',
    },
    {
      key: 'speedIndex',
      name: 'Speed Index',
      data: webVitals.speedIndex,
      ideal: '≤ 3.4s',
      desc: 'How quickly page contents are visually populated.',
    },
    {
      key: 'ttfb',
      name: 'Time to First Byte (TTFB)',
      data: webVitals.ttfb,
      ideal: '≤ 800ms',
      desc: 'Latency for web server to return initial byte of HTML response.',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Google Core Web Vitals & Speed Signals
            </h3>
            <p className="text-xs text-slate-500">
              Live lab and field diagnostics powered by Google PageSpeed Insights & Lighthouse
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
          Official Google Thresholds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsList.map((m) => (
          <div
            key={m.key}
            className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700">{m.name}</span>
                {renderMetricBadge(m.data)}
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {m.data.value}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Target: {m.ideal}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/50 pt-2">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
