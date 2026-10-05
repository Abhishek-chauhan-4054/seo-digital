'use client';

import React, { useState } from 'react';
import { Share2, Globe, Image as ImageIcon, Twitter, Linkedin, Facebook } from 'lucide-react';

interface SocialPreviewProps {
  domain: string;
  url: string;
  title: string | null;
  metaDescription: string | null;
}

export function SocialPreview({ domain, url, title, metaDescription }: SocialPreviewProps) {
  const [platform, setPlatform] = useState<'linkedin' | 'twitter' | 'facebook'>('linkedin');

  const displayTitle = title || `${domain} — Official Website`;
  const displayDesc = metaDescription || `Discover the latest insights, services, and growth opportunities at ${domain}.`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle space-y-6">
      {/* Platform Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Social Media Share Simulator
            </h3>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              Open Graph & Twitter Cards
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            How your link renders when shared on LinkedIn, X (Twitter), and Facebook.
          </p>
        </div>

        {/* Platform tabs */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPlatform('linkedin')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              platform === 'linkedin' ? 'bg-white text-blue-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-600" />
            <span>LinkedIn</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('twitter')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              platform === 'twitter' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Twitter className="w-3.5 h-3.5 text-slate-800" />
            <span>X / Twitter</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('facebook')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              platform === 'facebook' ? 'bg-white text-blue-800 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Facebook className="w-3.5 h-3.5 text-blue-600" />
            <span>Facebook</span>
          </button>
        </div>
      </div>

      {/* Social Card Preview */}
      <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
          {/* Mock Graphic Hero */}
          <div className="h-44 bg-gradient-to-tr from-slate-900 via-brand-950 to-indigo-900 flex flex-col items-center justify-center p-6 text-center text-white relative">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-xl mb-2">
              P
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">{domain}</span>
            <span className="text-[10px] text-brand-200 uppercase tracking-widest font-semibold mt-0.5">
              Verified Web Identity
            </span>
          </div>

          {/* Social Card Body */}
          <div className="p-4 space-y-1.5 bg-white">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              {domain}
            </span>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
              {displayTitle}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
