import React, { useState } from 'react';
import { useReconciliation } from '../../context/ReconciliationContext';
import { ReviewStatus } from '../../types/insurance';
import { Badge } from '../common/Badge';
import { 
  CheckSquare, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Save, 
  User, 
  Clock, 
  RotateCcw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const ReviewConsole: React.FC = () => {
  const { 
    findings, 
    selectedFinding, 
    selectedFindingId, 
    setSelectedFindingId, 
    updateFindingStatus, 
    updateReviewerNotes, 
    auditLogs 
  } = useReconciliation();

  const [noteInput, setNoteInput] = useState<string>(selectedFinding.reviewerNotes || '');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<boolean>(false);

  // Sync note input if selected finding changes
  React.useEffect(() => {
    setNoteInput(selectedFinding.reviewerNotes || '');
    setSaveSuccessMessage(false);
  }, [selectedFindingId, selectedFinding.reviewerNotes]);

  const handleStatusChange = (newStatus: ReviewStatus) => {
    updateFindingStatus(selectedFinding.id, newStatus, noteInput);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3000);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    updateReviewerNotes(selectedFinding.id, noteInput);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3000);
  };

  const relevantAuditLogs = auditLogs.filter(log => log.findingId === selectedFinding.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Underwriter Human-Review Console
            </h1>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Human-in-the-Loop Triage
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Reconciliation findings require qualified human underwriter evaluation. Actions are logged to the immutable audit trail.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Reviewer:</span>
          <span className="text-white font-medium">Mekala Abhilash (CBIT)</span>
        </div>
      </div>

      {/* Main Review Grid: Finding Selector Left, Decision Desk Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Finding Selector (4 cols) */}
        <div className="lg:col-span-4 bg-surface rounded-xl border border-surface-border p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Findings Queue ({findings.length})
            </h3>
            <span className="text-[11px] text-cyan-400 font-mono">Live Sync</span>
          </div>

          <div className="space-y-2">
            {findings.map((finding) => {
              const isSelected = finding.id === selectedFindingId;
              return (
                <div
                  key={finding.id}
                  onClick={() => setSelectedFindingId(finding.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/30 border-cyan-500/50 shadow-md shadow-cyan-950/50'
                      : 'bg-surface-light/60 border-surface-border hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge type="severity" value={finding.severity} />
                    <Badge type="status" value={finding.status} />
                  </div>
                  <h4 className="font-semibold text-white text-xs line-clamp-2">
                    {finding.title}
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{finding.potentialExposureAmount}</span>
                    <span className="text-cyan-400">ID: {finding.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Finding Decision Desk (8 cols) */}
        <div className="lg:col-span-8 bg-surface rounded-xl border border-surface-border shadow-xl overflow-hidden space-y-6 p-6">
          {/* Finding Banner */}
          <div className="pb-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge type="severity" value={selectedFinding.severity} />
                <Badge type="status" value={selectedFinding.status} />
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {selectedFinding.potentialExposureAmount}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {selectedFinding.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Category: <strong className="text-slate-300">{selectedFinding.category}</strong> &bull; Last Modified: {selectedFinding.updatedAt}
              </p>
            </div>
          </div>

          {/* Core Findings Analysis Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-surface-light/80 border border-surface-border space-y-2">
              <span className="text-rose-400 font-mono uppercase text-[10px] font-bold block">
                Discrepancy Analysis:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedFinding.comparisonAnalysis}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-light/80 border border-surface-border space-y-2">
              <span className="text-amber-400 font-mono uppercase text-[10px] font-bold block">
                Uncertainty & Gaps:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedFinding.uncertaintyExplanation}
              </p>
              <div className="pt-1 text-[11px] text-amber-300">
                <strong>Missing:</strong> {selectedFinding.missingInformation}
              </div>
            </div>
          </div>

          {/* Source Document Citations Preview */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs font-mono">
            <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider block">
              Anchored Source Evidence Citations:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-500/20">
                <span className="text-cyan-400 font-semibold block">{selectedFinding.quoteEvidence.documentNumber}</span>
                <span className="text-[11px] text-slate-400">{selectedFinding.quoteEvidence.section} (P. {selectedFinding.quoteEvidence.pageNumber})</span>
                <p className="mt-1 text-[11px] italic text-cyan-200">"{selectedFinding.quoteEvidence.exactQuote}"</p>
              </div>

              <div className="p-2.5 rounded bg-rose-950/20 border border-rose-500/20">
                <span className="text-rose-400 font-semibold block">{selectedFinding.policyEvidence.documentNumber}</span>
                <span className="text-[11px] text-slate-400">{selectedFinding.policyEvidence.section} (P. {selectedFinding.policyEvidence.pageNumber})</span>
                <p className="mt-1 text-[11px] italic text-rose-200">"{selectedFinding.policyEvidence.exactQuote}"</p>
              </div>
            </div>
          </div>

          {/* Working Review Actions: 4 Distinct Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Execute Human Review Disposition:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Action 1: Confirm For Review */}
              <button
                onClick={() => handleStatusChange('CONFIRMED_GAP')}
                className="px-3 py-2.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Confirm Coverage Gap</span>
              </button>

              {/* Action 2: Request Investigation */}
              <button
                onClick={() => handleStatusChange('INVESTIGATION_REQUESTED')}
                className="px-3 py-2.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
                <span>Request Broker Audit</span>
              </button>

              {/* Action 3: Mark Resolved */}
              <button
                onClick={() => handleStatusChange('RESOLVED')}
                className="px-3 py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark as Resolved</span>
              </button>

              {/* Action 4: Dismiss */}
              <button
                onClick={() => handleStatusChange('DISMISSED')}
                className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Dismiss Finding</span>
              </button>
            </div>
          </div>

          {/* Reviewer Notes Editor */}
          <form onSubmit={handleSaveNotes} className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="notes" className="text-xs font-mono uppercase text-slate-400 font-bold">
                Underwriter Audit Notes:
              </label>
              {saveSuccessMessage && (
                <span className="text-xs text-emerald-400 font-mono animate-fadeIn flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved to Audit Trail & LocalStorage!
                </span>
              )}
            </div>

            <textarea
              id="notes"
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Record rationale, broker follow-up instructions, or rider binding conditions..."
              className="w-full rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-500 p-3 text-xs text-slate-200 placeholder-slate-600 outline-none transition-colors font-mono"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Note to Audit Ledger</span>
              </button>
            </div>
          </form>

          {/* Audit History Timeline for this finding */}
          <div className="pt-4 border-t border-surface-border space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audit History Timeline ({relevantAuditLogs.length} Events)</span>
            </span>

            <div className="space-y-2">
              {relevantAuditLogs.length === 0 ? (
                <div className="text-slate-500 text-xs italic">No specific actions logged yet.</div>
              ) : (
                relevantAuditLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">{log.action}</span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-300">{log.notes}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      By: <span className="text-slate-400">{log.actor}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-500 italic pt-2">
            Neutral Governance Notice: Reviewer actions represent workflow triage decisions and do not constitute an automated legal coverage determination or claim approval/denial.
          </div>
        </div>
      </div>
    </div>
  );
};
