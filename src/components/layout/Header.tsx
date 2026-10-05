'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown, ShieldCheck, Zap, Search, Eye, DollarSign } from 'lucide-react';

interface HeaderProps {
  onAnalyzeClick?: () => void;
  onBookCallClick?: () => void;
}

export function Header({ onAnalyzeClick, onBookCallClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      {/* Clean Global Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-white">
              Limited Offer
            </span>
            <span className="text-slate-200 font-medium">
              <strong>7-Day Technical Sprint:</strong> We fix your top 5 SEO & speed issues for <span className="text-orange-400 font-bold">$99</span>.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="#pricing-section"
              className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">
              US • UK • Canada • Australia • UAE • India
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          {/* Brand Logo - Pytron Digital */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white font-black text-lg group-hover:bg-brand-600 transition-colors shadow-xs">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-slate-950 font-black text-lg tracking-tight leading-none group-hover:text-brand-600 transition-colors">
                Pytron Digital
              </span>
              <span className="text-slate-500 font-medium text-[11px] tracking-tight leading-none mt-1">
                SEO & Speed Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-slate-700">
            {/* Tools Dropdown with Catchy Names */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="flex items-center gap-1 hover:text-brand-600 transition-colors cursor-pointer py-2 font-semibold"
              >
                <span>Free Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full -left-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Instant SEO Tools
                  </div>
                  <button
                    onClick={() => handleNavClick('seo-analyzer-section')}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Site Audit</div>
                      <div className="text-[11px] text-slate-500">Live code, meta tags & indexing check</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('seo-analyzer-section')}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Speed Test</div>
                      <div className="text-[11px] text-slate-500">Real Google Core Web Vitals (LCP, CLS)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('serp-preview-section')}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Google Preview</div>
                      <div className="text-[11px] text-slate-500">Desktop & mobile search snippet preview</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('roi-calculator-section')}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer"
                  >
                    <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Lost Revenue</div>
                      <div className="text-[11px] text-slate-500">Calculate sales lost to slow load speeds</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('executive-decision-section')}
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Why Pytron
            </button>

            <button
              onClick={() => handleNavClick('pricing-section')}
              className="text-orange-600 hover:text-orange-700 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>$99 Sprint</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            </button>

            <button
              onClick={() => handleNavClick('agency-services-section')}
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('faq-section')}
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onBookCallClick}
              className="text-xs sm:text-[13px] font-semibold text-slate-700 hover:text-slate-950 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Book Strategy Call
            </button>

            <button
              type="button"
              onClick={() => {
                if (onAnalyzeClick) onAnalyzeClick();
                handleNavClick('seo-analyzer-section');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold bg-slate-950 text-white hover:bg-brand-600 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
            >
              <span>Audit Website Free</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1.5 text-sm font-semibold text-slate-800">
            <button
              onClick={() => handleNavClick('seo-analyzer-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
            >
              <Search className="w-4 h-4 text-brand-600" />
              <span>Site Audit & Speed Test</span>
            </button>
            <button
              onClick={() => handleNavClick('serp-preview-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
            >
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Google Search Preview</span>
            </button>
            <button
              onClick={() => handleNavClick('roi-calculator-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Lost Revenue Calculator</span>
            </button>
            <button
              onClick={() => handleNavClick('executive-decision-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50"
            >
              Why Pytron (For Decision Makers)
            </button>
            <button
              onClick={() => handleNavClick('pricing-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-orange-600 font-bold flex items-center gap-2"
            >
              <span>🔥 7-Day Sprint ($99 Offer)</span>
            </button>
            <button
              onClick={() => handleNavClick('agency-services-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50"
            >
              Agency Retainers & Services
            </button>
            <button
              onClick={() => handleNavClick('faq-section')}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50"
            >
              FAQ
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBookCallClick) onBookCallClick();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800"
            >
              Book Strategy Call
            </button>
            <button
              onClick={() => {
                if (onAnalyzeClick) onAnalyzeClick();
                handleNavClick('seo-analyzer-section');
              }}
              className="w-full py-3 rounded-xl text-xs font-bold bg-slate-950 text-white"
            >
              Audit Website Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
