'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  ArrowRight,
  Lightbulb,
  Server,
  Zap,
  Globe,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import { SeoFinding } from '@/lib/seo/types';

interface FindingCardProps {
  finding: SeoFinding;
  onUnlockClick?: () => void;
}

export function FindingCard({ finding, onUnlockClick }: FindingCardProps) {
  const [isExpanded, setIsExpanded] = useState(finding.status === 'failed');
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(
        `[Pytron Audit Fix - ${finding.title}]\nRecommendation: ${finding.recommendation}\n${
          finding.technicalDetails ? `Technical Info: ${finding.technicalDetails}` : ''
        }`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = () => {
    switch (finding.status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Verified
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            Warning
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            Failed
          </span>
        );
      case 'not_available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            Not Available
          </span>
        );
    }
  };

  const getProviderIcon = () => {
    switch (finding.sourceProvider) {
      case 'lighthouse':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <Zap className="w-3 h-3 text-amber-500" /> PageSpeed / Lighthouse
          </span>
        );
      case 'onpage':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <Globe className="w-3 h-3 text-blue-500" /> HTML DOM Parser
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <Server className="w-3 h-3 text-indigo-500" /> Server Inspection
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle hover:border-slate-300 transition-all overflow-hidden">
      {/* Clickable Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 cursor-pointer flex items-start sm:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            {getProviderIcon()}
            {finding.impact && (
              <span className="text-[11px] text-slate-400 font-semibold">
                • {finding.impact} Impact
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {finding.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {finding.description}
          </p>
        </div>

        <button
          type="button"
          aria-label={isExpanded ? 'Collapse finding details' : 'Expand finding details'}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
          {/* Recommendation */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Actionable Engineer Recommendation</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-950 px-2 py-1 rounded-md bg-white border border-slate-200 shadow-xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy Fix</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {finding.recommendation}
            </p>

            {finding.technicalDetails && (
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs font-mono text-slate-600 bg-white/70 p-2.5 rounded-lg border border-slate-200/50">
                <span className="font-bold text-slate-800">Audit Telemetry: </span>
                {finding.technicalDetails}
              </div>
            )}
          </div>

          {/* Deep Insight Teaser */}
          <div className="relative rounded-2xl border border-indigo-100 bg-gradient-to-r from-brand-50/40 via-indigo-50/30 to-purple-50/40 p-4 sm:p-5 overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                  <Lock className="w-3.5 h-3.5 text-brand-600" />
                  <span>Deep SEO Audit Blueprint</span>
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px]">
                    Locked
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {finding.status === 'failed'
                    ? 'Sprint-ready developer ticket & automated patch script available in Deep Report.'
                    : 'Competitive keyword search volume matrix and topical gap blueprint included in Deep Report.'}
                </p>

                <div className="relative mt-2 p-3 rounded-xl bg-white/70 border border-slate-200/60 select-none overflow-hidden font-mono text-xs text-slate-600">
                  <div className="filter blur-[3.5px] space-y-1">
                    <p>// Direct production patch code for dev team</p>
                    <p>export async function applyOptimizationDirectives() &#123; return true; &#125;</p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-center">
                <button
                  type="button"
                  onClick={onUnlockClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-950 text-white hover:bg-brand-600 transition-colors shadow-subtle cursor-pointer"
                >
                  <span>Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
