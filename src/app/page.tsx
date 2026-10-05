'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SeoHero } from '@/components/seo/SeoHero';
import { AnalysisLoader } from '@/components/seo/AnalysisLoader';
import { ReportView } from '@/components/seo/ReportView';
import { LandingFeatures } from '@/components/seo/LandingFeatures';
import { RoiCalculator } from '@/components/seo/RoiCalculator';
import { ExecutiveDecisionStrip } from '@/components/seo/ExecutiveDecisionStrip';
import { PricingPlans } from '@/components/seo/PricingPlans';
import { SerpSimulatorInteractive } from '@/components/seo/SerpSimulatorInteractive';
import { AgencyServices } from '@/components/seo/AgencyServices';
import { LandingHowItWorks } from '@/components/seo/LandingHowItWorks';
import { LandingFaq } from '@/components/seo/LandingFaq';
import { StickyClientMagnet } from '@/components/seo/StickyClientMagnet';
import { ConsultationModal } from '@/components/seo/ConsultationModal';
import { SeoReport, AnalysisStage } from '@/lib/seo/types';
import { generateSeoReport } from '@/lib/seo/analyzer';
import { normalizeUrl } from '@/lib/utils';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [viewState, setViewState] = useState<'idle' | 'loading' | 'report' | 'error'>('idle');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentDomain, setCurrentDomain] = useState('');
  const [reportData, setReportData] = useState<SeoReport | null>(null);
  const [currentStage, setCurrentStage] = useState<AnalysisStage>('validating_security');
  const [progress, setProgress] = useState(15);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'deep_report' | 'expert'>('deep_report');

  const handleStartAnalysis = async (urlInput: string) => {
    const { valid, normalized, domain, error } = normalizeUrl(urlInput);
    if (!valid || !domain) {
      setErrorMessage(error || 'Enter a valid website URL to continue.');
      setViewState('error');
      return;
    }

    setCurrentUrl(normalized);
    setCurrentDomain(domain);
    setViewState('loading');
    setProgress(15);
    setCurrentStage('validating_security');
    setErrorMessage(null);

    // Scroll to top smoothly
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    try {
      const report = await generateSeoReport(normalized, {
        onProgress: (stage, prog) => {
          setCurrentStage(stage);
          setProgress(prog);
        },
      });

      setReportData(report);
      setViewState('report');

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "We couldn't analyze that URL. Please check the address and try again."
      );
      setViewState('error');
    }
  };

  const handleReset = () => {
    setViewState('idle');
    setReportData(null);
    setErrorMessage(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSprintModal = (planName?: string) => {
    setModalMode('deep_report');
    setConsultationModalOpen(true);
  };

  const handleOpenExpertModal = () => {
    setModalMode('expert');
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white relative">
      {/* Top Navigation */}
      <Header
        onAnalyzeClick={handleReset}
        onBookCallClick={handleOpenExpertModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: Loading State */}
        {viewState === 'loading' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <AnalysisLoader
              url={currentUrl}
              domain={currentDomain}
              currentStage={currentStage}
              progress={progress}
            />
          </div>
        )}

        {/* VIEW 2: Report View */}
        {viewState === 'report' && reportData && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <ReportView report={reportData} onReset={handleReset} />
          </div>
        )}

        {/* VIEW 3: Error State */}
        {viewState === 'error' && (
          <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-subtle">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                We couldn&apos;t analyze that URL
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                {errorMessage || 'Please check the address and try again.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-slate-950 hover:bg-brand-600 transition-colors cursor-pointer text-sm shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Ensure the domain is publicly accessible over HTTP/HTTPS and not behind a private intranet.
            </div>
          </div>
        )}

        {/* VIEW 4: Idle / Landing Page */}
        {viewState === 'idle' && (
          <>
            {/* Hero with live analyzer */}
            <SeoHero onAnalyze={handleStartAnalysis} isLoading={false} />

            {/* Executive Decision Strip for C-Suite Decision Makers (CEOs, CTOs, CFOs) */}
            <ExecutiveDecisionStrip
              onClaimSprint={() => handleOpenSprintModal('1-Week Technical Sprint')}
              onBookCall={handleOpenExpertModal}
            />

            {/* Interactive Lost Revenue / ROI Calculator */}
            <RoiCalculator onClaimSprint={() => handleOpenSprintModal('1-Week Technical Sprint')} />

            {/* What We Check Methodology */}
            <LandingFeatures />

            {/* Interactive SERP Simulator */}
            <section id="serp-preview-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SerpSimulatorInteractive onOptimizeClick={() => handleOpenSprintModal('Snippet Optimization')} />
              </div>
            </section>

            {/* Pricing Section with $99 Fast Sprint Offer */}
            <PricingPlans onSelectPlan={(plan) => handleOpenSprintModal(plan)} />

            {/* Agency Services & Client Acquisition Showcase */}
            <AgencyServices onBookCall={handleOpenExpertModal} />

            {/* How It Works */}
            <LandingHowItWorks />

            {/* FAQ */}
            <LandingFaq />
          </>
        )}
      </main>

      {/* Floating Bottom Client Magnet for the $99 Sprint */}
      <StickyClientMagnet onClaimSprint={() => handleOpenSprintModal('1-Week Technical Sprint')} />

      {/* Global Consultation Lead Capture Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        domain={currentDomain || 'https://yourwebsite.com'}
        mode={modalMode}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
