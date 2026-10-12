import React, { useState } from 'react';
import { useReconciliation } from '../../context/ReconciliationContext';
import { DocumentCard } from './DocumentCard';
import { SideBySideViewer } from './SideBySideViewer';
import { EvidenceInspector } from './EvidenceInspector';
import { FindingsSummary } from './FindingsSummary';
import { FileText, SlidersHorizontal, CheckSquare, Play } from 'lucide-react';

export const WorkspaceLayout: React.FC = () => {
  const { 
    documents, 
    selectedFinding, 
    setActiveTab, 
    runSimulation, 
    isSimulationRunning 
  } = useReconciliation();
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'sideBySide' | 'evidenceInspector' | 'documents'>('sideBySide');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Document Comparison Workspace
            </h1>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Interactive SaaS View
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Cross-examine broker representations against issued carrier policies and subsequent restrictive riders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab('simulation');
              runSimulation();
            }}
            disabled={isSimulationRunning}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Simulation</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className="px-4 py-2 rounded-lg bg-surface-light hover:bg-surface-hover text-white font-medium text-xs border border-surface-border flex items-center gap-1.5 transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Review Console</span>
          </button>
        </div>
      </div>

      {/* Top 3 Document Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Authorized Document Corpus (3 Documents Loaded)</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Fictional Commercial Property File &bull; Apex Global Logistics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className="cursor-pointer"
            >
              <DocumentCard 
                document={doc} 
                isFocused={doc.id === selectedDocId} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace Grid: Findings Left, Comparison / Evidence Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Findings Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <FindingsSummary />
        </div>

        {/* Right Column: Comparison / Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sub-tab Switcher */}
          <div className="flex items-center justify-between bg-surface-light p-1.5 rounded-xl border border-surface-border">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveWorkspaceTab('sideBySide')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeWorkspaceTab === 'sideBySide'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Side-by-Side Wording Diff
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('evidenceInspector')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeWorkspaceTab === 'evidenceInspector'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Evidence Traceability & Agent
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline px-2">
              Showing: {selectedFinding.id}
            </span>
          </div>

          {/* Active View */}
          {activeWorkspaceTab === 'sideBySide' ? (
            <SideBySideViewer 
              finding={selectedFinding} 
              onNavigateToReview={() => setActiveTab('review')}
            />
          ) : (
            <EvidenceInspector 
              finding={selectedFinding} 
              onOpenDocument={(docId) => setSelectedDocId(docId)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
