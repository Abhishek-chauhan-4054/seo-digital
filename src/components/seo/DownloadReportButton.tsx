'use client';

import React, { useState } from 'react';
import { Download, Printer, FileText, ChevronDown, Check } from 'lucide-react';
import { SeoReport } from '@/lib/seo/types';
import { downloadTextReport, downloadJsonReport, printReport } from '@/lib/seo/exportUtils';

interface DownloadReportButtonProps {
  report: SeoReport;
}

export function DownloadReportButton({ report }: DownloadReportButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadMarkdown = () => {
    downloadTextReport(report);
    setDropdownOpen(false);
  };

  const handleDownloadJson = () => {
    downloadJsonReport(report);
    setDropdownOpen(false);
  };

  const handlePrint = () => {
    printReport();
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
        <button
          type="button"
          onClick={handleDownloadMarkdown}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none cursor-pointer"
        >
          <Download className="w-4 h-4 text-brand-600" />
          <span>Download Basic Report</span>
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 text-slate-500 hover:text-slate-800 focus:outline-none cursor-pointer"
          aria-expanded={dropdownOpen}
          aria-label="Export options"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-elevated py-1.5 z-30 animate-in fade-in duration-100">
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <div>
              <span className="font-semibold block">Download Report (Markdown)</span>
              <span className="text-[10px] text-slate-400">Structured text audit format</span>
            </div>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <div>
              <span className="font-semibold block">Print / Save as PDF</span>
              <span className="text-[10px] text-slate-400">Formatted browser print layout</span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <div>
              <span className="font-semibold block">Export Raw JSON</span>
              <span className="text-[10px] text-slate-400">Machine-readable audit signals</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
