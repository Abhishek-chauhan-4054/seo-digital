'use client';

import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { ArrowRight, Search, AlertCircle, CheckCircle2, Shield, Sparkles, Globe } from 'lucide-react';
import { normalizeUrl } from '@/lib/utils';

interface UrlAnalyzerProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
  initialUrl?: string;
  className?: string;
}

export function UrlAnalyzer({
  onAnalyze,
  isLoading = false,
  initialUrl = '',
  className = '',
}: UrlAnalyzerProps) {
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    setErrorMessage(null);
    const { valid, normalized, error } = normalizeUrl(urlInput);

    if (!valid) {
      setErrorMessage(error || 'Please enter a valid website URL (e.g. yourwebsite.com).');
      return;
    }

    onAnalyze(normalized);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleExampleClick = (exampleDomain: string) => {
    setUrlInput(exampleDomain);
    setErrorMessage(null);
    const { normalized } = normalizeUrl(exampleDomain);
    onAnalyze(normalized);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 transition-all duration-300 border shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] ${
            errorMessage
              ? 'border-rose-400 ring-2 ring-rose-100'
              : 'border-slate-300/80 hover:border-slate-400 focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100/60'
          }`}
        >
          {/* Input field with icon */}
          <div className="relative flex-1 flex items-center min-w-0 px-3 sm:px-4 py-2 sm:py-0">
            <Globe className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Enter domain (e.g. stripe.com or yoursite.com)"
              aria-label="Target Website URL"
              className="w-full text-slate-900 placeholder:text-slate-400 text-sm sm:text-base bg-transparent border-none outline-none focus:outline-none focus:ring-0 disabled:opacity-50 font-medium"
              autoComplete="url"
              spellCheck="false"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-slate-950 hover:bg-brand-600 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm whitespace-nowrap cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Analyzing Live Signals...</span>
              </>
            ) : (
              <>
                <span>Generate Audit</span>
                <ArrowRight className="w-4 h-4 ml-0.5 text-slate-400" />
              </>
            )}
          </button>
        </div>

        {/* Validation Error Message */}
        {errorMessage && (
          <div className="mt-2.5 px-3 flex items-center gap-2 text-xs sm:text-sm text-rose-600 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>

      {/* Trust Text */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-y-1.5 gap-x-4 text-[12px] text-slate-500 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          No signup required
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          Live Google Core Web Vitals
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          Production code fixes
        </span>
      </div>

      {/* Quick Benchmark Presets */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <span className="text-slate-400 font-medium">Try benchmark:</span>
        {['stripe.com', 'linear.app', 'shopify.com'].map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => handleExampleClick(sample)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-slate-600 hover:text-slate-950 hover:border-slate-300 transition-all cursor-pointer text-xs font-mono disabled:opacity-50 shadow-2xs"
          >
            {sample}
          </button>
        ))}
      </div>
    </div>
  );
}
