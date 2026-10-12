import React, { useState } from 'react';
import { InsuranceDocument } from '../../types/insurance';
import { Badge } from '../common/Badge';
import { FileText, Calendar, Building, ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentCardProps {
  document: InsuranceDocument;
  isFocused?: boolean;
  onSelectPassage?: (passageId: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  isFocused = false 
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div 
      className={`rounded-xl border transition-all ${
        isFocused
          ? 'bg-surface border-cyan-500/50 shadow-lg shadow-cyan-950/40'
          : 'bg-surface/80 border-surface-border hover:border-slate-700'
      }`}
    >
      {/* Document Header */}
      <div className="p-4 border-b border-surface-border/60">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge type="docType" value={document.type} />
          <span className="font-mono text-xs text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            {document.documentNumber}
          </span>
        </div>

        <h3 className="font-semibold text-white text-sm line-clamp-1 flex items-center gap-1.5" title={document.title}>
          <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>{document.title}</span>
        </h3>

        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
          {document.description}
        </p>

        {/* Metadata Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
          <div>
            <span className="text-slate-500 block font-mono">Issuer</span>
            <div className="flex items-center gap-1 text-slate-300 truncate mt-0.5" title={document.issuer}>
              <Building className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="truncate">{document.issuer}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block font-mono">Version</span>
            <span className="text-slate-300 font-medium truncate block mt-0.5">
              {document.version}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block font-mono">Effective Date</span>
            <div className="flex items-center gap-1 text-slate-300 font-mono mt-0.5">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{document.effectiveDate}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block font-mono">Expir. Date</span>
            <span className="text-slate-300 font-mono block mt-0.5">
              {document.expirationDate}
            </span>
          </div>
        </div>
      </div>

      {/* Passages Accordion */}
      <div className="p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 py-1 px-1 rounded transition-colors"
        >
          <span className="font-mono uppercase text-[10px] tracking-wider font-semibold">
            Extracted Key Passages ({document.passages.length})
          </span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="mt-2 space-y-2">
            {document.passages.map((passage) => (
              <div 
                key={passage.id}
                className={`p-2.5 rounded-lg text-xs transition-colors ${
                  passage.isHighlighted
                    ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-100 shadow-sm'
                    : 'bg-slate-900/50 border border-slate-800/60 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-cyan-400 font-semibold">{passage.section}</span>
                  <span>Page {passage.pageNumber}</span>
                </div>
                <p className="font-mono text-[11px] leading-relaxed select-text">
                  {passage.text}
                </p>
                {passage.isHighlighted && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Active Discrepancy Evidence Anchor</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
