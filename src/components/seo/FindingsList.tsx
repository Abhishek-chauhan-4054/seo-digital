'use client';

import React, { useState, useMemo } from 'react';
import { SeoFinding, SeoCategoryType, CheckStatus } from '@/lib/seo/types';
import { FindingCard } from './FindingCard';
import { Search, CheckCircle2 } from 'lucide-react';

interface FindingsListProps {
  findings: SeoFinding[];
  activeStatusFilter: 'all' | CheckStatus;
  onUnlockClick?: () => void;
}

export function FindingsList({
  findings,
  activeStatusFilter,
  onUnlockClick,
}: FindingsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | SeoCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesList: { id: 'all' | SeoCategoryType; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'technical', label: 'Technical' },
    { id: 'onpage', label: 'On-Page' },
    { id: 'performance', label: 'Performance' },
    { id: 'content', label: 'Content' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'social_schema', label: 'Social & Schema' },
  ];

  const filteredFindings = useMemo(() => {
    return findings.filter((f) => {
      // Status filter
      if (activeStatusFilter !== 'all' && f.status !== activeStatusFilter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && f.category !== selectedCategory) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = f.title.toLowerCase().includes(query);
        const matchesDesc = f.description.toLowerCase().includes(query);
        const matchesRec = f.recommendation.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesRec) return false;
      }
      return true;
    });
  }, [findings, activeStatusFilter, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search checks..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-3.5">
        {filteredFindings.length > 0 ? (
          filteredFindings.map((finding) => (
            <FindingCard
              key={finding.id}
              finding={finding}
              onUnlockClick={onUnlockClick}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-base font-semibold text-slate-800">
              No findings match your active filter
            </h4>
            <p className="text-xs text-slate-500">
              Try switching category or clearing the search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
