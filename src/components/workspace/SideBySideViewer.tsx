import React from 'react';
import { Finding } from '../../types/insurance';
import { 
  ArrowLeftRight, 
  AlertTriangle, 
  FileCheck2, 
  HelpCircle, 
  UserCheck, 
  Calendar, 
  Layers
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface SideBySideViewerProps {
  finding: Finding;
  onNavigateToReview?: () => void;
}

export const SideBySideViewer: React.FC<SideBySideViewerProps> = ({ 
  finding, 
  onNavigateToReview 
}) => {
  const { quoteEvidence, policyEvidence } = finding;

  // Helper to highlight terms
  const renderHighlightedText = (text: string, highlightWords: string[], highlightClass: string) => {
    let result = text;
    highlightWords.forEach(word => {
      // safe escape for regex
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      result = result.replace(regex, `<mark class="${highlightClass}">$1</mark>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="bg-surface rounded-xl border border-surface-border shadow-xl overflow-hidden">
      {/* Top Banner with Title and Discrepancy Amount */}
      <div className="p-5 border-b border-surface-border bg-gradient-to-r from-surface to-[#0e1628] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge type="severity" value={finding.severity} />
            <Badge type="status" value={finding.status} />
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              Exposure: {finding.potentialExposureAmount}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{finding.title}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Category: <strong className="text-slate-200">{finding.category}</strong> &bull; Finding ID: <span className="font-mono">{finding.id}</span>
          </p>
        </div>

        {onNavigateToReview && (
          <button
            onClick={onNavigateToReview}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
          >
            <UserCheck className="w-4 h-4" />
            <span>Open in Review Console</span>
          </button>
        )}
      </div>

      {/* Side-by-Side Dual Pane Passage Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-surface-border">
        {/* Left Pane: Broker Quote Passage */}
        <div className="p-5 bg-cyan-950/10">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="font-mono text-xs uppercase font-bold text-cyan-400">
                Broker Quote Representation (Promised)
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {quoteEvidence.documentNumber}
            </span>
          </div>

          <div className="space-y-2 mb-4 text-xs">
            <div className="text-white font-medium flex items-center gap-1.5">
              <span>{quoteEvidence.documentTitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px] font-mono">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                {quoteEvidence.version}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyan-400" />
                Effective: {quoteEvidence.effectiveDate}
              </span>
              <span className="text-cyan-300 font-semibold">
                {quoteEvidence.section} &bull; Page {quoteEvidence.pageNumber}
              </span>
            </div>
          </div>

          {/* Passage Quote Box */}
          <div className="p-4 rounded-lg bg-[#071322] border border-cyan-500/40 text-xs text-slate-200 font-mono leading-relaxed relative">
            <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-cyan-500 text-slate-950">
              Exact Extracted Text
            </span>
            <div className="mt-1">
              "{renderHighlightedText(quoteEvidence.exactQuote, quoteEvidence.highlightWords, "bg-cyan-400 text-slate-950 font-bold px-1 rounded")}"
            </div>
          </div>
        </div>

        {/* Right Pane: Issued Policy / Endorsement Passage */}
        <div className="p-5 bg-rose-950/10">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="font-mono text-xs uppercase font-bold text-rose-400">
                Issued Endorsement Restriction (Documented)
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {policyEvidence.documentNumber}
            </span>
          </div>

          <div className="space-y-2 mb-4 text-xs">
            <div className="text-white font-medium flex items-center gap-1.5">
              <span>{policyEvidence.documentTitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px] font-mono">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-rose-400" />
                {policyEvidence.version}
              </span>
              <span className="flex items-center gap-1 text-rose-300 font-semibold">
                <Calendar className="w-3 h-3 text-rose-400" />
                Effective: {policyEvidence.effectiveDate} (+17 days)
              </span>
              <span className="text-rose-300 font-semibold">
                {policyEvidence.section} &bull; Page {policyEvidence.pageNumber}
              </span>
            </div>
          </div>

          {/* Passage Endorsement Box */}
          <div className="p-4 rounded-lg bg-[#180a14] border border-rose-500/40 text-xs text-slate-200 font-mono leading-relaxed relative">
            <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-500 text-white">
              Restricted Policy Text
            </span>
            <div className="mt-1">
              "{renderHighlightedText(policyEvidence.exactQuote, policyEvidence.highlightWords, "bg-rose-500 text-white font-bold px-1 rounded")}"
            </div>
          </div>
        </div>
      </div>

      {/* Structured Analysis Grid: 4 Mandatory Sections */}
      <div className="p-5 border-t border-surface-border bg-surface-light/40 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Potential Discrepancy */}
          <div className="p-4 rounded-lg bg-surface border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2 text-rose-400 font-semibold text-xs uppercase tracking-wider font-mono">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>1. Potential Discrepancy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {finding.comparisonAnalysis}
            </p>
          </div>

          {/* 2. Supporting Evidence */}
          <div className="p-4 rounded-lg bg-surface border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider font-mono">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              <span>2. Supporting Evidence & Chronology</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <p>
                <strong>Quote Citation:</strong> {quoteEvidence.documentNumber} ({quoteEvidence.section}, Page {quoteEvidence.pageNumber}).
              </p>
              <p>
                <strong>Endorsement Citation:</strong> {policyEvidence.documentNumber} ({policyEvidence.section}, Page {policyEvidence.pageNumber}).
              </p>
              <p className="text-cyan-300 font-mono text-[11px]">
                Effective date disparity: Quote bound 2025-04-01 vs Endorsement issued 2025-04-18.
              </p>
            </div>
          </div>

          {/* 3. Missing Information or Ambiguity */}
          <div className="p-4 rounded-lg bg-surface border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-semibold text-xs uppercase tracking-wider font-mono">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>3. Missing Information / Ambiguity</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <p><strong>Unresolved questions:</strong> {finding.missingInformation}</p>
              <p className="text-slate-400 text-[11px]">{finding.uncertaintyExplanation}</p>
            </div>
          </div>

          {/* 4. Recommended Human-Review Action */}
          <div className="p-4 rounded-lg bg-surface border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider font-mono">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>4. Recommended Human Action</span>
            </div>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>{finding.recommendedAction}</p>
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-1.5 font-medium">
                <span>&bull; Requires qualified human underwriter review prior to legal binding.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fictional Disclaimer Label */}
        <div className="text-center text-[11px] text-slate-500 italic pt-1">
          Fictional illustration — not a real policy or coverage determination. Does not constitute legal advice or formal claims disposition.
        </div>
      </div>
    </div>
  );
};
