'use client';

import React from 'react';
import { SeoCategoryScore, SeoCategoryType } from '@/lib/seo/types';
import { Shield, FileText, Zap, Smartphone, Share2, Layers } from 'lucide-react';

interface CategoryCardProps {
  category: SeoCategoryScore;
  onClick?: () => void;
  isSelected?: boolean;
}

export function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  const getCategoryIcon = (id: SeoCategoryType) => {
    switch (id) {
      case 'technical':
        return <Shield className="w-5 h-5 text-indigo-600" />;
      case 'onpage':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'performance':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'content':
        return <Layers className="w-5 h-5 text-violet-600" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'social_schema':
        return <Share2 className="w-5 h-5 text-cyan-600" />;
      default:
        return <Shield className="w-5 h-5 text-slate-600" />;
    }
  };

  const getProgressBarColor = (score: number | null) => {
    if (score === null) return 'bg-slate-300';
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'border-brand-500 ring-2 ring-brand-100 shadow-md'
          : 'border-slate-200/80 hover:border-slate-300 shadow-subtle hover:shadow-card'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div>
        {/* Header with icon and score */}
        <div className="flex items-center justify-between gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            {getCategoryIcon(category.id)}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {category.score !== null ? category.score : 'N/A'}
            </span>
            {category.score !== null && (
              <span className="text-xs font-semibold text-slate-400">/100</span>
            )}
          </div>
        </div>

        {/* Title & Status */}
        <div className="mt-3.5">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {category.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {category.summary}
          </p>
        </div>
      </div>

      {/* Progress bar & Check stats */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getProgressBarColor(category.score)}`}
            style={{ width: `${category.score !== null ? category.score : 0}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <span
            className={
              category.score !== null
                ? category.score >= 75
                  ? 'text-emerald-700'
                  : 'text-amber-700'
                : 'text-slate-500'
            }
          >
            {category.statusText}
          </span>
          <span>
            {category.verifiedCount}/{category.totalCount} verified
          </span>
        </div>
      </div>
    </div>
  );
}
