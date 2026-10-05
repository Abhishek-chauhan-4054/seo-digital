'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, Globe, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SerpPreviewProps {
  url: string;
  domain: string;
  title: string | null;
  metaDescription: string | null;
}

export function SerpPreview({ url, domain, title, metaDescription }: SerpPreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const displayTitle = title || `${domain} — Official Website`;
  const displayDesc =
    metaDescription ||
    `Visit ${domain} to explore services, products, and updates. Discover what makes ${domain} leading in search visibility and performance.`;

  const titleLength = displayTitle.length;
  const descLength = displayDesc.length;

  const isTitleLong = titleLength > 60;
  const isDescLong = descLength > 160;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle space-y-6">
      {/* Header with Device Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Google SERP Snippet Preview
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Live Simulation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            How your website appears to organic searchers on Google search results.
          </p>
        </div>

        {/* Desktop / Mobile Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              device === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop SERP</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              device === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile SERP</span>
          </button>
        </div>
      </div>

      {/* Google Preview Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
        <div className={`mx-auto bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-2 ${
          device === 'mobile' ? 'max-w-md' : 'max-w-2xl'
        }`}>
          {/* Breadcrumb row */}
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold text-slate-800">{domain}</span>
              <span className="text-[10px] text-slate-500 truncate max-w-xs">{url}</span>
            </div>
          </div>

          {/* Title in Google Blue */}
          <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
            {isTitleLong ? `${displayTitle.slice(0, 58)}...` : displayTitle}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
            {isDescLong ? `${displayDesc.slice(0, 155)}...` : displayDesc}
          </p>
        </div>
      </div>

      {/* Length & Quality Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Title Tag Length</span>
            <span className={`font-mono font-bold ${isTitleLong ? 'text-amber-600' : 'text-emerald-600'}`}>
              {titleLength} / 60 chars
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${isTitleLong ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            {isTitleLong ? '⚠️ May be truncated on smaller desktop viewports' : '✓ Fits Google pixel width limit'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Meta Description Length</span>
            <span className={`font-mono font-bold ${isDescLong ? 'text-amber-600' : 'text-emerald-600'}`}>
              {descLength} / 160 chars
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${isDescLong ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            {isDescLong ? '⚠️ Snippet exceeds 160 chars and may be shortened' : '✓ Optimal length for SERP snippet'}
          </p>
        </div>
      </div>
    </div>
  );
}
