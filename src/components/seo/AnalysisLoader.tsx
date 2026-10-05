'use client';

import React from 'react';
import { CheckCircle2, Loader2, Globe, Shield, Search, FileText, Zap, Award } from 'lucide-react';
import { AnalysisStage } from '@/lib/seo/types';
import { REAL_ANALYSIS_STAGES } from '@/lib/seo/analyzer';

interface AnalysisLoaderProps {
  url: string;
  domain: string;
  currentStage: AnalysisStage;
  progress: number;
}

export function AnalysisLoader({ url, domain, currentStage, progress }: AnalysisLoaderProps) {
  const getStageIcon = (stage: AnalysisStage) => {
    switch (stage) {
      case 'validating_security':
        return <Shield className="w-4 h-4" />;
      case 'fetching_html':
        return <Globe className="w-4 h-4" />;
      case 'inspecting_onpage':
        return <FileText className="w-4 h-4" />;
      case 'querying_lighthouse':
        return <Zap className="w-4 h-4" />;
      case 'calculating_scores':
        return <Award className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const currentStageIndex = REAL_ANALYSIS_STAGES.findIndex((s) => s.stage === currentStage);
  const activeStep = REAL_ANALYSIS_STAGES[currentStageIndex] || REAL_ANALYSIS_STAGES[0];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-elevated p-6 sm:p-10 my-8">
      {/* Domain Badge */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-wider text-slate-400 block">
              Target Website
            </span>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              {domain}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Live Server Inspection
          </span>
        </div>
      </div>

      {/* Main Status Headline */}
      <div className="mt-8 text-center space-y-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyzing your website
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          {activeStep?.description || 'Gathering live search signals, checking PageSpeed, and parsing on-page architecture...'}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-8 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className="text-brand-600 font-bold">{activeStep?.label}</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(10, progress)}%` }}
          />
        </div>
      </div>

      {/* Timeline Stages */}
      <div className="mt-8 space-y-3">
        {REAL_ANALYSIS_STAGES.map((step, idx) => {
          const isDone = currentStageIndex > idx || progress >= 100;
          const isCurrent = currentStageIndex === idx && progress < 100;
          const isPending = currentStageIndex < idx;

          return (
            <div
              key={step.stage}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                isCurrent
                  ? 'bg-brand-50/70 border-brand-200 shadow-xs'
                  : isDone
                  ? 'bg-slate-50/50 border-slate-200/60'
                  : 'bg-white border-transparent opacity-40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-700'
                      : isCurrent
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    getStageIcon(step.stage)
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isCurrent
                      ? 'text-brand-900 font-semibold'
                      : isDone
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              <div className="text-xs font-medium">
                {isDone && <span className="text-emerald-600 font-semibold">Done</span>}
                {isCurrent && <span className="text-brand-600 font-semibold animate-pulse">Running</span>}
                {isPending && <span className="text-slate-400">Queued</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 text-center text-xs text-slate-400">
        Live data sources: Google PageSpeed Insights & Server-Side DOM Parser • digital.pytron.io
      </div>
    </div>
  );
}
