'use client';

import React, { useState } from 'react';
import { SeoReport, CheckStatus } from '@/lib/seo/types';
import { ReportHeader } from './ReportHeader';
import { SeoScoreRing } from './SeoScoreRing';
import { CategoryCard } from './CategoryCard';
import { FindingsOverview } from './FindingsOverview';
import { FindingsList } from './FindingsList';
import { WebVitalsCard } from './WebVitalsCard';
import { SerpPreview } from './SerpPreview';
import { SocialPreview } from './SocialPreview';
import { DeepReportPaywall } from './DeepReportPaywall';
import { ConsultationModal } from './ConsultationModal';
import {
  BarChart3,
  Zap,
  CheckCircle2,
  Eye,
  Lock,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

interface ReportViewProps {
  report: SeoReport;
  onReset: () => void;
}

export type ReportTab = 'overview' | 'vitals' | 'findings' | 'previews' | 'deep_report';

export function ReportView({ report, onReset }: ReportViewProps) {
  const [activeTab, setActiveTab] = useState<ReportTab>('overview');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | CheckStatus>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'deep_report' | 'expert'>('deep_report');

  const handleOpenDeepReport = () => {
    setModalMode('deep_report');
    setModalOpen(true);
  };

  const handleOpenExpert = () => {
    setModalMode('expert');
    setModalOpen(true);
  };

  const categoryList = Object.values(report.categories);

  // Extract meta tags for preview components
  const pageTitle = report.findings.find((f) => f.id.includes('title'))?.description || null;
  const pageDesc = report.findings.find((f) => f.id.includes('desc'))?.description || null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Report Header */}
      <ReportHeader report={report} onReset={onReset} />

      {/* 2. Interactive SaaS Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Executive Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vitals')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'vitals'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Core Web Vitals & Speed</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('findings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'findings'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Audit Checks ({report.findings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('previews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'previews'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Eye className="w-4 h-4 text-brand-500" />
          <span>SERP & Social Previews</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('deep_report')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'deep_report'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-brand-700 bg-brand-50 hover:bg-brand-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Deep SEO Blueprint</span>
        </button>
      </div>

      {/* TAB CONTENT 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Overall Score & Status Gauge */}
          <SeoScoreRing
            score={report.overallScore}
            grade={report.overallGrade}
            statusLabel={report.statusLabel}
            statusMessage={report.statusMessage}
          />

          {/* Category Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                SEO Performance Categories
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Live audits & Google standards
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryList.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onClick={() => setActiveTab('findings')}
                />
              ))}
            </div>
          </div>

          {/* Core Web Vitals Summary Preview */}
          <WebVitalsCard webVitals={report.webVitals} />

          {/* Quick Findings Breakdown */}
          <FindingsOverview
            verifiedCount={report.quickStats.verifiedCount}
            warningCount={report.quickStats.warningCount}
            failedCount={report.quickStats.failedCount}
            unavailableCount={report.quickStats.unavailableCount}
            totalChecks={report.quickStats.totalChecks}
            selectedFilter={activeStatusFilter}
            onFilterChange={(f) => {
              setActiveStatusFilter(f);
              setActiveTab('findings');
            }}
            executiveSummary={report.executiveSummary}
          />
        </div>
      )}

      {/* TAB CONTENT 2: Core Web Vitals */}
      {activeTab === 'vitals' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <WebVitalsCard webVitals={report.webVitals} />

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Why Core Web Vitals Dictate Global Search Rankings
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Google uses real-user Chrome field data (CrUX) and lab measurements as ranking factors. Websites that achieve green thresholds across LCP (≤ 2.5s), CLS (≤ 0.1), and INP see significantly lower bounce rates and priority placement in Google Mobile Search results.
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Audit Findings */}
      {activeTab === 'findings' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <FindingsOverview
            verifiedCount={report.quickStats.verifiedCount}
            warningCount={report.quickStats.warningCount}
            failedCount={report.quickStats.failedCount}
            unavailableCount={report.quickStats.unavailableCount}
            totalChecks={report.quickStats.totalChecks}
            selectedFilter={activeStatusFilter}
            onFilterChange={setActiveStatusFilter}
            executiveSummary={report.executiveSummary}
          />

          <FindingsList
            findings={report.findings}
            activeStatusFilter={activeStatusFilter}
            onUnlockClick={handleOpenDeepReport}
          />
        </div>
      )}

      {/* TAB CONTENT 4: Previews */}
      {activeTab === 'previews' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <SerpPreview
            url={report.url}
            domain={report.domain}
            title={pageTitle}
            metaDescription={pageDesc}
          />

          <SocialPreview
            domain={report.domain}
            url={report.url}
            title={pageTitle}
            metaDescription={pageDesc}
          />
        </div>
      )}

      {/* TAB CONTENT 5: Deep Report Blueprint */}
      {activeTab === 'deep_report' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <DeepReportPaywall
            domain={report.domain}
            onGetDeepReport={handleOpenDeepReport}
            onTalkToExpert={handleOpenExpert}
          />
        </div>
      )}

      {/* Bottom Conversion Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-subtle text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored Growth Engineering</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ready to Improve Your Search Visibility?
        </h3>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Turn your SEO issues into measurable growth with a tailored optimization strategy and full-stack technical remediation from Pytron Digital.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={handleOpenDeepReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <span>Get Deep SEO Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleOpenExpert}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>Talk to Pytron Digital</span>
          </button>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Serving Global Enterprises across USA, UK, Canada, Australia, UAE & India</span>
        </div>
      </div>

      {/* Lead Generation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        domain={report.domain}
        mode={modalMode}
      />
    </div>
  );
}
