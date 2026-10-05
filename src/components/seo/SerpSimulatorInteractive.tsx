'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, Globe, Copy, Check, Eye } from 'lucide-react';

interface SerpSimulatorInteractiveProps {
  initialTitle?: string;
  initialDescription?: string;
  initialUrl?: string;
  onOptimizeClick?: () => void;
}

export function SerpSimulatorInteractive({
  initialTitle = 'Pytron Digital — Global Technical SEO & Speed Intelligence',
  initialDescription = 'Discover how Pytron Digital scales organic search revenue for high-growth tech companies and global brands with full-stack technical remediation and Core Web Vitals optimization.',
  initialUrl = 'https://digital.pytron.io',
  onOptimizeClick,
}: SerpSimulatorInteractiveProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [url, setUrl] = useState(initialUrl);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const titleLength = title.length;
  const descLength = description.length;

  const isTitleOptimal = titleLength >= 45 && titleLength <= 60;
  const isTitleOver = titleLength > 60;

  const isDescOptimal = descLength >= 135 && descLength <= 160;
  const isDescOver = descLength > 160;

  const handleCopyCode = () => {
    const snippet = `<title>${title}</title>\n<meta name="description" content="${description}" />`;
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const domain = url.replace(/^https?:\/\//i, '').split('/')[0] || 'yourwebsite.com';

  return (
    <div id="serp-preview-section" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-950 tracking-tight">
              Google Search Preview
            </h3>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Live Simulator
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Preview exactly how your page title and meta description appear in Google search results before deploying.
          </p>
        </div>

        {/* Device Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              device === 'desktop' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-950'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              device === 'mobile' ? 'bg-white text-slate-950 shadow-xs' : 'hover:text-slate-950'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Inputs */}
        <div className="lg:col-span-6 space-y-4">
          {/* Target URL */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Destination URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 focus:bg-white font-mono"
            />
          </div>

          {/* Title Tag */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800">
                SEO Title Tag
              </label>
              <span
                className={`text-[11px] font-mono font-bold ${
                  isTitleOver
                    ? 'text-rose-600'
                    : isTitleOptimal
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}
              >
                {titleLength} / 60 chars {isTitleOver ? '(Truncated on Google)' : isTitleOptimal ? '(Optimal)' : '(Too short)'}
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 focus:bg-white font-medium"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800">
                Meta Description
              </label>
              <span
                className={`text-[11px] font-mono font-bold ${
                  isDescOver
                    ? 'text-rose-600'
                    : isDescOptimal
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}
              >
                {descLength} / 160 chars {isDescOver ? '(Truncated)' : isDescOptimal ? '(Optimal)' : '(Too short)'}
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 focus:bg-white resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="pt-1 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy HTML Meta Tags</span>
                </>
              )}
            </button>

            {onOptimizeClick && (
              <button
                type="button"
                onClick={onOptimizeClick}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Have Pytron Rewrite Your Snippets →
              </button>
            )}
          </div>
        </div>

        {/* Live Google SERP Output Card */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              Live Search Snippet
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              {device === 'mobile' ? 'Mobile View' : 'Desktop View'}
            </span>
          </div>

          {/* Google Result Card */}
          <div
            className={`mx-auto bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-1.5 ${
              device === 'mobile' ? 'max-w-sm' : 'w-full'
            }`}
          >
            {/* Breadcrumb */}
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
            <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] leading-snug hover:underline cursor-pointer">
              {isTitleOver ? `${title.slice(0, 58)}...` : title || 'Add page title...'}
            </h4>

            {/* Description in Google Grey */}
            <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
              {isDescOver
                ? `${description.slice(0, 155)}...`
                : description || 'Add meta description to see live preview...'}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
            <span>Standard Google Snippet Width</span>
            <span className="text-emerald-600 font-medium">Valid Format</span>
          </div>
        </div>
      </div>
    </div>
  );
}
