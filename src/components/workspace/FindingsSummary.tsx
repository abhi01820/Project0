import React, { useState } from 'react';
import { useReconciliation } from '../../context/ReconciliationContext';
import { FindingSeverity, ReviewStatus } from '../../types/insurance';
import { Badge } from '../common/Badge';
import { ShieldAlert, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export const FindingsSummary: React.FC = () => {
  const { findings, selectedFindingId, setSelectedFindingId } = useReconciliation();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filtered = findings.filter(f => {
    if (filterSeverity === 'ALL') return true;
    return f.severity === filterSeverity;
  });

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-4 shadow-lg space-y-4">
      {/* Header & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-surface-border">
        <div>
          <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Reconciled Findings ({findings.length})</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Select a finding below to inspect side-by-side evidence
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1 text-[11px]">
          {['ALL', 'CRITICAL_CONTRADICTION', 'HIGH_GAP', 'AMBIGUITY'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors ${
                filterSeverity === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              {sev === 'ALL' ? 'All' : sev.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-2.5">
        {filtered.map(finding => {
          const isSelected = finding.id === selectedFindingId;
          return (
            <div
              key={finding.id}
              onClick={() => setSelectedFindingId(finding.id)}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-cyan-950/30 border-cyan-500/50 shadow-md shadow-cyan-950/50'
                  : 'bg-surface-light/60 border-surface-border hover:border-slate-600 hover:bg-surface-light'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <Badge type="severity" value={finding.severity} />
                  <Badge type="status" value={finding.status} />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">
                  {finding.potentialExposureAmount}
                </span>
              </div>

              <h4 className="font-semibold text-white text-xs sm:text-sm line-clamp-2 leading-snug">
                {finding.title}
              </h4>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[200px]">{finding.category}</span>
                <span className="flex items-center gap-1 text-cyan-400 font-mono">
                  <span>Inspect</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
