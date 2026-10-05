'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { CheckStatus } from '@/lib/seo/types';

interface FindingsOverviewProps {
  verifiedCount: number;
  warningCount: number;
  failedCount: number;
  unavailableCount: number;
  totalChecks: number;
  selectedFilter: 'all' | CheckStatus;
  onFilterChange: (filter: 'all' | CheckStatus) => void;
  executiveSummary: string;
}

export function FindingsOverview({
  verifiedCount,
  warningCount,
  failedCount,
  unavailableCount,
  totalChecks,
  selectedFilter,
  onFilterChange,
  executiveSummary,
}: FindingsOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Executive Summary Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800">
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300">
              Executive Audit Summary (Live Verification)
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {executiveSummary}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Distinct Status Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Verified Card */}
        <button
          type="button"
          onClick={() => onFilterChange(selectedFilter === 'verified' ? 'all' : 'verified')}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
            selectedFilter === 'verified'
              ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200 shadow-sm'
              : 'bg-white border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">
              {verifiedCount}
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-900">Verified</h4>
            <p className="text-xs text-slate-500 mt-0.5">Passed live audits</p>
          </div>
        </button>

        {/* Warning Card */}
        <button
          type="button"
          onClick={() => onFilterChange(selectedFilter === 'warning' ? 'all' : 'warning')}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
            selectedFilter === 'warning'
              ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-200 shadow-sm'
              : 'bg-white border-slate-200/80 hover:border-amber-200 hover:bg-amber-50/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-amber-600 tracking-tight">
              {warningCount}
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-900">Warning</h4>
            <p className="text-xs text-slate-500 mt-0.5">Opportunities</p>
          </div>
        </button>

        {/* Failed Card */}
        <button
          type="button"
          onClick={() => onFilterChange(selectedFilter === 'failed' ? 'all' : 'failed')}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
            selectedFilter === 'failed'
              ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200 shadow-sm'
              : 'bg-white border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-rose-600 tracking-tight">
              {failedCount}
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-900">Failed</h4>
            <p className="text-xs text-slate-500 mt-0.5">Critical gaps</p>
          </div>
        </button>

        {/* Not Available Card */}
        <button
          type="button"
          onClick={() => onFilterChange(selectedFilter === 'not_available' ? 'all' : 'not_available')}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
            selectedFilter === 'not_available'
              ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-200 shadow-sm'
              : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-2xl font-extrabold text-slate-700 tracking-tight">
              {unavailableCount}
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-900">Not Available</h4>
            <p className="text-xs text-slate-500 mt-0.5">Could not verify</p>
          </div>
        </button>
      </div>

      {/* Filter tab bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            All Checks ({totalChecks})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('verified')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'verified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'hover:text-emerald-600'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('warning')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'warning'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'hover:text-amber-600'
            }`}
          >
            Warnings ({warningCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('failed')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'failed'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'hover:text-rose-600'
            }`}
          >
            Failed ({failedCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('not_available')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'not_available'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'hover:text-slate-700'
            }`}
          >
            N/A ({unavailableCount})
          </button>
        </div>

        <span className="text-xs text-slate-500">
          Showing {selectedFilter === 'all' ? 'all' : selectedFilter} audit checks
        </span>
      </div>
    </div>
  );
}
