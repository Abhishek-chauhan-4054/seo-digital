'use client';

import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, X, Sparkles, ShieldCheck } from 'lucide-react';

interface StickyClientMagnetProps {
  onClaimSprint: () => void;
}

export function StickyClientMagnet({ onClaimSprint }: StickyClientMagnetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-40 max-w-lg animate-in slide-in-from-bottom-5 duration-300 no-print">
      <div className="bg-slate-950 text-white rounded-2xl p-4 shadow-floating border border-slate-800 flex items-center justify-between gap-4 ring-1 ring-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 shadow-sm animate-pulse-subtle">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-800">
                Launch Offer
              </span>
              <span className="text-xs font-bold text-white truncate">
                1-Week Technical Sprint
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 truncate">
              Fix top 5 SEO & Core Web Vitals bugs for just <strong className="text-white font-mono">$99</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onClaimSprint}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <span>Claim $99</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-slate-500 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
