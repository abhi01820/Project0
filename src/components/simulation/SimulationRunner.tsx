import React, { useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  Terminal, 
  ArrowRight, 
  ExternalLink,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useReconciliation } from '../../context/ReconciliationContext';
import confetti from 'canvas-confetti';

export const SimulationRunner: React.FC = () => {
  const { 
    isSimulationRunning, 
    simulationStep, 
    simulationCompleted, 
    simulationLogs, 
    runSimulation, 
    resetSimulation, 
    setActiveTab, 
    findings 
  } = useReconciliation();

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simulationLogs]);

  useEffect(() => {
    if (simulationCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore if canvas not supported
      }
    }
  }, [simulationCompleted]);

  const stepDescriptions = [
    { num: 1, title: 'Documents Received & Checksummed', detail: '3 documents ingested & hashed via SHA-256' },
    { num: 2, title: 'Coverage Statements Extracted', detail: '14 structured facts extracted with character spans' },
    { num: 3, title: 'Versions and Dates Checked', detail: 'Identified 17-day post-inception endorsement gap' },
    { num: 4, title: 'Deterministic Checks Completed', detail: 'Flagged 95% limit reduction ($1M -> $50k)' },
    { num: 5, title: 'Semantic Comparison Completed', detail: 'Contradiction confirmed between binder and rider' },
    { num: 6, title: 'Potential Discrepancy Flagged', detail: '$950,000 uninsured flood risk exposure flagged' },
    { num: 7, title: 'Supporting Evidence Attached', detail: 'Pinned to Page 4 Sec 3.B & Endorsement Cl. 2' },
    { num: 8, title: 'Finding Sent for Human Review', detail: 'Dispatched to Underwriting Review Queue' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              End-to-End Reconciliation Simulation
            </h1>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
              Demo Simulation
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Watch the 8-stage reconciliation engine process documents, calculate exposure, invoke agents, and prepare evidence.
          </p>
        </div>

        {/* Primary Run Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={runSimulation}
            disabled={isSimulationRunning}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-all ${
              isSimulationRunning
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-wait animate-pulse'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 hover:scale-105 active:scale-95'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulationRunning ? 'Reconciling Documents...' : 'Run Reconciliation Demo'}</span>
          </button>

          <button
            onClick={resetSimulation}
            className="px-4 py-2.5 rounded-lg bg-surface-light hover:bg-surface-hover text-slate-300 text-sm font-medium border border-surface-border flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Progress Stepper Grid (8 Steps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stepDescriptions.map((s) => {
          const isDone = simulationStep > s.num || simulationCompleted;
          const isCurrent = simulationStep === s.num && !simulationCompleted;

          return (
            <div
              key={s.num}
              className={`p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : isDone
                  ? 'bg-surface border-cyan-500/30'
                  : 'bg-surface/50 border-surface-border opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isCurrent 
                    ? 'bg-cyan-500 text-slate-950' 
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  Step {s.num}/8
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>

              <h4 className="font-semibold text-white text-xs line-clamp-1">
                {s.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                {s.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Simulation Terminal Logs */}
      <div className="rounded-xl border border-surface-border bg-black/90 shadow-2xl overflow-hidden">
        <div className="p-3 bg-surface-light/80 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-300 font-semibold">
              Live Reconciliation Execution Stream
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400">Sandbox Environment</span>
          </div>
        </div>

        <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 h-64 overflow-y-auto">
          {simulationLogs.length === 0 ? (
            <div className="text-slate-500 text-center py-16">
              Click <strong className="text-cyan-400">"Run Reconciliation Demo"</strong> to start the simulated 8-step pipeline execution.
            </div>
          ) : (
            simulationLogs.map((log, idx) => (
              <div 
                key={idx} 
                className={`leading-relaxed ${
                  log.includes('✓') 
                    ? 'text-emerald-400 font-bold' 
                    : log.includes('AGENT') 
                    ? 'text-violet-300' 
                    : log.includes('DETERMINISTIC')
                    ? 'text-cyan-300'
                    : 'text-slate-300'
                }`}
              >
                {log}
              </div>
            ))
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Post-Simulation Results Panel */}
      {simulationCompleted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-surface via-[#0d172a] to-surface border border-emerald-500/40 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-surface-border">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                  Simulation Finished Successfully
                </span>
                <h3 className="text-lg font-bold text-white">
                  3 Potential Contradictions Flagged & Routed to Human Underwriter
                </h3>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('review')}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/25 transition-colors self-start sm:self-center"
            >
              <span>Review Findings in Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-surface-light/60 border border-surface-border">
              <span className="text-slate-400 block font-mono">Discrepancies Flagged</span>
              <span className="text-xl font-bold text-white mt-1 block">3 Findings</span>
              <span className="text-[11px] text-rose-400 font-mono">1 Critical, 1 High, 1 Ambiguity</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-light/60 border border-surface-border">
              <span className="text-slate-400 block font-mono">Total Net Exposure Identified</span>
              <span className="text-xl font-bold text-cyan-400 mt-1 block">$5,150,000</span>
              <span className="text-[11px] text-slate-400 font-mono">Uninsured flood & inventory gap</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-light/60 border border-surface-border">
              <span className="text-slate-400 block font-mono">Agent Autonomous Steps</span>
              <span className="text-xl font-bold text-violet-400 mt-1 block">5 Deep Checks</span>
              <span className="text-[11px] text-slate-400 font-mono">Chronology & Form F.4 resolved</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            * This demonstration simulates backend execution using local sample contracts. No external AI APIs or remote databases are queried.
          </p>
        </div>
      )}
    </div>
  );
};
