'use client';

import React from 'react';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';

interface SeoScoreRingProps {
  score: number | null;
  grade: string;
  statusLabel: string;
  statusMessage: string;
}

export function SeoScoreRing({
  score,
  grade,
  statusLabel,
  statusMessage,
}: SeoScoreRingProps) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const safeScore = score !== null ? Math.max(0, Math.min(100, score)) : 0;
  const strokeDashoffset = score !== null ? circumference - (safeScore / 100) * circumference : circumference;

  const getColorClasses = (sc: number | null) => {
    if (sc === null) {
      return {
        stroke: '#94A3B8',
        text: 'text-slate-700',
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        badge: 'bg-slate-100 text-slate-700',
      };
    }
    if (sc >= 85) {
      return {
        stroke: '#10B981',
        text: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
      };
    }
    if (sc >= 70) {
      return {
        stroke: '#F59E0B',
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
      };
    }
    if (sc >= 50) {
      return {
        stroke: '#F97316',
        text: 'text-orange-700',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800',
      };
    }
    return {
      stroke: '#EF4444',
      text: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800',
    };
  };

  const colors = getColorClasses(score);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row items-center gap-6 sm:gap-10">
      {/* Circular Gauge Ring */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 148 148">
          <circle
            cx="74"
            cy="74"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="12"
            fill="transparent"
            className="opacity-70"
          />
          <circle
            cx="74"
            cy="74"
            r={radius}
            stroke={colors.stroke}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {score !== null ? score : 'N/A'}
            </span>
            {score !== null && <span className="text-base font-semibold text-slate-400 ml-1">/100</span>}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
            {score !== null ? 'Overall Score' : 'Audit Data'}
          </span>
        </div>
      </div>

      {/* Content & Status */}
      <div className="flex-1 space-y-3 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${colors.badge} ${colors.border}`}>
            {grade !== 'N/A' ? `Grade ${grade}` : 'Live Audit'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Live Data
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {statusLabel}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            {statusMessage}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-brand-600" />
            <span>Real HTML & Server Headers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Google PageSpeed & Core Web Vitals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
