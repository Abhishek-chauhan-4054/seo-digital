'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Zap, Sparkles, Mail, MapPin, PhoneCall, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column (2 cols) */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-card">
                P
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight block">
                  Pytron Digital
                </span>
                <span className="text-slate-400 text-xs tracking-wider uppercase font-semibold">
                  SEO Intelligence • digital.pytron.io
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Global Technical SEO & Full-Stack Growth Engineering agency. Helping venture-backed startups, high-growth brands, and enterprise marketing teams capture high-intent commercial search revenue.
            </p>

            {/* Global Node Regions */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Active Client Regions:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-semibold">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">🇺🇸 United States</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">🇬🇧 United Kingdom</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">🇨🇦 Canada</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">🇦🇺 Australia</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">🇦🇪 UAE / Middle East</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">🇮🇳 India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Audit Engine */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              SEO Audit Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#seo-analyzer-section" className="hover:text-white transition-colors">
                  Free Website Analyzer
                </a>
              </li>
              <li>
                <a href="#what-we-check-section" className="hover:text-white transition-colors">
                  Audit Methodology
                </a>
              </li>
              <li>
                <a href="#how-it-works-section" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-500 text-xs">Core Web Vitals 2026 Engine</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Agency Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Pytron Advisory Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#agency-services-section" className="hover:text-brand-400 transition-colors flex items-center gap-1 font-medium">
                  <span>Technical SEO Sprint</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#agency-services-section" className="hover:text-white transition-colors">
                  Organic Revenue Retainer
                </a>
              </li>
              <li>
                <a href="#agency-services-section" className="hover:text-white transition-colors">
                  Next.js & CMS Migrations
                </a>
              </li>
              <li>
                <a href="#agency-services-section" className="hover:text-white transition-colors">
                  Core Web Vitals Overhaul
                </a>
              </li>
              <li>
                <a href="#agency-services-section" className="hover:text-white transition-colors">
                  International SEO Strategy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Engagement */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Client Engagements
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:contact@pytron.io"
                  className="text-brand-400 hover:text-white transition-colors font-bold flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@pytron.io</span>
                </a>
              </li>
              <li className="text-xs text-slate-400">
                Direct Engineer Response: &lt; 4 Hours
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Strict NDA Guaranteed</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pytron Digital. All rights reserved. Powered by digital.pytron.io</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Enterprise Security</span>
            <span className="text-slate-400">Global SaaS v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
