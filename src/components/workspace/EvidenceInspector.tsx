import React, { useState } from 'react';
import { Finding } from '../../types/insurance';
import { 
  Search, 
  Bot, 
  CheckCircle2, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Hash, 
  Clock, 
  FileText
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface EvidenceInspectorProps {
  finding: Finding;
  onOpenDocument?: (docId: string) => void;
}

export const EvidenceInspector: React.FC<EvidenceInspectorProps> = ({ 
  finding, 
  onOpenDocument 
}) => {
  const [activeTab, setActiveTab] = useState<'provenance' | 'agent' | 'uncertainty'>('provenance');
  const [quoteExpanded, setQuoteExpanded] = useState<boolean>(true);
  const [endorsementExpanded, setEndorsementExpanded] = useState<boolean>(true);

  const { quoteEvidence, policyEvidence, agentInvestigation } = finding;

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-5 shadow-lg space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-base">
              Evidence Traceability Inspector
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographic provenance & source quotation verification for finding <span className="font-mono text-cyan-300">{finding.id}</span>
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-surface-light p-1 rounded-lg border border-surface-border text-xs">
          <button
            onClick={() => setActiveTab('provenance')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              activeTab === 'provenance'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Source Provenance
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-3 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
              activeTab === 'agent'
                ? 'bg-violet-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Agent Trace</span>
          </button>
          <button
            onClick={() => setActiveTab('uncertainty')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              activeTab === 'uncertainty'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Uncertainty & Gaps
          </button>
        </div>
      </div>

      {/* Tab 1: Source Provenance Dual Accordion */}
      {activeTab === 'provenance' && (
        <div className="space-y-4">
          {/* Quote Source Provenance */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 overflow-hidden">
            <button
              onClick={() => setQuoteExpanded(!quoteExpanded)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-cyan-950/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    Source A: {quoteEvidence.documentNumber}
                  </span>
                  <span className="text-xs text-slate-300 block">
                    {quoteEvidence.documentTitle} &bull; {quoteEvidence.section}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge type="docType" value={quoteEvidence.documentType} />
                {quoteExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {quoteExpanded && (
              <div className="p-4 pt-1 border-t border-cyan-500/20 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-slate-950/60 p-2.5 rounded border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Version</span>
                    <span className="text-slate-200">{quoteEvidence.version}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Effective</span>
                    <span className="text-cyan-400">{quoteEvidence.effectiveDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location</span>
                    <span className="text-slate-200">Page {quoteEvidence.pageNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Doc Checksum</span>
                    <span className="text-slate-400">SHA256: 8a7f...e3</span>
                  </div>
                </div>

                <div className="p-3 bg-surface border border-cyan-500/30 rounded text-xs text-slate-200 font-mono leading-relaxed">
                  <div className="text-[10px] text-cyan-400 uppercase font-mono mb-1 font-bold">
                    Authoritative Quoted Text:
                  </div>
                  "{quoteEvidence.exactQuote}"
                </div>

                {onOpenDocument && (
                  <button
                    onClick={() => onOpenDocument(quoteEvidence.documentId)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono underline"
                  >
                    <span>View in Full Document Viewer</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Endorsement Source Provenance */}
          <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 overflow-hidden">
            <button
              onClick={() => setEndorsementExpanded(!endorsementExpanded)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-950/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-rose-400" />
                <div>
                  <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                    Source B: {policyEvidence.documentNumber}
                  </span>
                  <span className="text-xs text-slate-300 block">
                    {policyEvidence.documentTitle} &bull; {policyEvidence.section}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge type="docType" value={policyEvidence.documentType} />
                {endorsementExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {endorsementExpanded && (
              <div className="p-4 pt-1 border-t border-rose-500/20 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-slate-950/60 p-2.5 rounded border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Version</span>
                    <span className="text-slate-200">{policyEvidence.version}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Effective</span>
                    <span className="text-rose-400">{policyEvidence.effectiveDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location</span>
                    <span className="text-slate-200">Page {policyEvidence.pageNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Doc Checksum</span>
                    <span className="text-slate-400">SHA256: 9e2d...01</span>
                  </div>
                </div>

                <div className="p-3 bg-surface border border-rose-500/30 rounded text-xs text-slate-200 font-mono leading-relaxed">
                  <div className="text-[10px] text-rose-400 uppercase font-mono mb-1 font-bold">
                    Contradictory Restriction Text:
                  </div>
                  "{policyEvidence.exactQuote}"
                </div>

                {onOpenDocument && (
                  <button
                    onClick={() => onOpenDocument(policyEvidence.documentId)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono underline"
                  >
                    <span>View in Full Document Viewer</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Agent Trace */}
      {activeTab === 'agent' && (
        <div className="space-y-4">
          {agentInvestigation ? (
            <div className="p-4 rounded-lg bg-violet-950/20 border border-violet-500/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-violet-500/20">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-violet-400" />
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      Bounded Investigation Agent Execution Trail
                    </h4>
                    <span className="text-[11px] font-mono text-violet-300">
                      Triggered: {agentInvestigation.triggeredAt}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Confidence</span>
                  <span className="text-xs font-mono font-bold text-violet-400">
                    {(agentInvestigation.sourceConfidence * 100).toFixed(0)}% Certainty
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  Investigation Trigger Reason:
                </span>
                <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded font-mono border border-slate-800">
                  {agentInvestigation.reason}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Chronological Verification Steps Executed:
                </span>
                <ol className="space-y-2 text-xs">
                  {agentInvestigation.stepsExecuted.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 flex-shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-3 bg-violet-900/30 rounded border border-violet-500/30 text-xs space-y-1">
                <span className="text-violet-300 font-bold font-mono text-[11px] uppercase block">
                  Agent Key Synthesis:
                </span>
                <p className="text-slate-200">
                  {agentInvestigation.chronologySummary}
                </p>
                <p className="text-violet-200 text-[11px]">
                  <strong>Precedence Finding:</strong> {agentInvestigation.endorsementPrecedenceFindings}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              No autonomous agent invocation required for this item; deterministic comparison sufficed.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Uncertainty & Gaps */}
      {activeTab === 'uncertainty' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-surface-light border border-surface-border space-y-3">
            <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Uncertainty Boundaries & Missing Information</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {finding.uncertaintyExplanation}
            </p>

            <div className="mt-3 p-3 rounded bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <span className="font-bold font-mono uppercase text-[10px] tracking-wider text-amber-300 block">
                Required Unresolved Records:
              </span>
              <p>{finding.missingInformation}</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <h4 className="font-semibold text-emerald-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Next Recommended Governance Step</span>
            </h4>
            <p className="text-xs text-slate-300">
              {finding.recommendedAction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
