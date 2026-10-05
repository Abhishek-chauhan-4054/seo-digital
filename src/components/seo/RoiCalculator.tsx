'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface RoiCalculatorProps {
  onClaimSprint: () => void;
}

export function RoiCalculator({ onClaimSprint }: RoiCalculatorProps) {
  const [visitors, setVisitors] = useState<number>(25000);
  const [dealValue, setDealValue] = useState<number>(120);
  const [conversionRate, setConversionRate] = useState<number>(1.5);

  const currentMonthlyRevenue = Math.round(visitors * (conversionRate / 100) * dealValue);
  const estimatedLostRevenue = Math.round(currentMonthlyRevenue * 0.38); // 38% lost to speed & bounce
  const projectedPotentialRevenue = currentMonthlyRevenue + Math.round(currentMonthlyRevenue * 0.85);

  const formatCurrency = (val: number) => {
    return '$' + val.toLocaleString();
  };

  return (
    <section id="roi-calculator-section" className="py-16 sm:py-24 border-t border-slate-200/80 bg-slate-50/60 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lost Revenue Calculator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            How Much Revenue Is Slow Speed Costing You?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Google research shows every 1-second delay in page load drops conversions by up to 20%. Adjust your monthly numbers below to see what your website is losing right now.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Slider 1: Monthly Visitors */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-900">
                    Monthly Website Visitors
                  </label>
                  <span className="text-sm sm:text-base font-black text-blue-600 font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                    {visitors.toLocaleString()} visitors
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="250000"
                  step="1000"
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>2,000 / mo</span>
                  <span>100,000 / mo</span>
                  <span>250,000+ / mo</span>
                </div>
              </div>

              {/* Slider 2: Average Order Value / Deal Value */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-900">
                    Average Order Value or Deal Value
                  </label>
                  <span className="text-sm sm:text-base font-black text-blue-600 font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                    ${dealValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="2500"
                  step="25"
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>$25 (E-commerce)</span>
                  <span>$500 (B2B / SaaS)</span>
                  <span>$2,500+ (High-Ticket)</span>
                </div>
              </div>

              {/* Slider 3: Current Conversion Rate */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-900">
                    Current Conversion Rate
                  </label>
                  <span className="text-sm sm:text-base font-black text-blue-600 font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                    {conversionRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>0.5% (Slow Site)</span>
                  <span>2.0% (Average)</span>
                  <span>5.0% (Optimized)</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Based on Google Chromium Core Web Vitals telemetry and real-world conversion drop benchmarks.
              </span>
            </div>
          </div>

          {/* Results Outcome Card */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between border border-slate-800">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Estimated Financial Impact
                </span>
                <span className="text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Monthly Loss
                </span>
              </div>

              {/* Lost Revenue Number */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Estimated Lost Monthly Revenue:
                </span>
                <div className="text-4xl sm:text-5xl font-black text-rose-400 font-mono tracking-tight">
                  -{formatCurrency(estimatedLostRevenue)}
                  <span className="text-sm text-slate-400 font-normal">/mo</span>
                </div>
                <p className="text-xs text-slate-400 pt-1">
                  ~{formatCurrency(estimatedLostRevenue * 12)} lost every year due to slow load times and unranked commercial queries.
                </p>
              </div>

              {/* Potential Growth Number */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Target Revenue After Pytron Fixes:</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {formatCurrency(projectedPotentialRevenue)}
                  <span className="text-xs text-slate-400 font-normal font-sans ml-1">/month</span>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="pt-6 space-y-2.5">
              <button
                type="button"
                onClick={onClaimSprint}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Recover Revenue with $99 Fast Sprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                1-Week turnaround by Pytron Digital senior engineers • 100% money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
