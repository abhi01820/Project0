import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Bot, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  Info,
  GitBranch,
  ShieldCheck
} from 'lucide-react';
import { useReconciliation } from '../../context/ReconciliationContext';
import { PipelineStage } from '../../types/insurance';
import { AGENT_BRANCH_STAGES } from '../../data/pipelineStages';
import { StageDetailModal } from './StageDetailModal';

export const ArchitectureDiagram: React.FC = () => {
  const { 
    pipelineStages, 
    runSimulation, 
    resetSimulation, 
    isSimulationRunning, 
    simulationStep 
  } = useReconciliation();
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);

  // Main linear pipeline stages (non-agent branch)
  const linearStages = pipelineStages.filter(s => !s.isAgentBranch);
  const agentStage = pipelineStages.find(s => s.isAgentBranch);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Architecture Header & Principle Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Reconciliation Architecture
            </h1>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/30">
              Interactive System Map
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Engineered hybrid pipeline combining deterministic verification rules with bounded autonomous agent investigation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={runSimulation}
            disabled={isSimulationRunning}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulationRunning ? 'Simulating Pipeline...' : 'Animate Data Flow'}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="px-3 py-2 rounded-lg bg-surface-light hover:bg-surface-hover text-slate-300 text-xs border border-surface-border transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Principle Callout Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-surface to-violet-950/40 border border-cyan-500/30 shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
              Governing Design Principle
            </span>
            <p className="text-sm sm:text-base font-bold text-white">
              “Pipeline first. Agent when needed. Human judgment for the final decision.”
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">Deterministic Rules (90%)</span>
          <span className="text-slate-600">&bull;</span>
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-violet-300">Bounded Agent (10%)</span>
        </div>
      </div>

      {/* Interactive Main Pipeline Flow */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 mb-3">
            <Cpu className="w-4 h-4" />
            <span>Primary Deterministic & Semantic Pipeline (Stages 1 &rarr; 8)</span>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {linearStages.map((stage, idx) => {
              const isCurrentStep = simulationStep === stage.stepNumber;
              const isCompleted = stage.status === 'completed' || simulationStep > stage.stepNumber;

              return (
                <motion.div
                  key={stage.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStage(stage)}
                  className={`p-4 rounded-xl border cursor-pointer relative transition-all ${
                    isCurrentStep
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : isCompleted
                      ? 'bg-surface border-cyan-500/40'
                      : 'bg-surface/80 border-surface-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Step 0{stage.stepNumber}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrentStep ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">Click to Inspect</span>
                    )}
                  </div>

                  <h3 className="font-semibold text-white text-sm line-clamp-1">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {stage.shortDesc}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-surface-border/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate">{stage.inputs.length} inputs &bull; {stage.outputs.length} outputs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Violet Conditional Branch: Bounded Autonomous Investigation Agent */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#120B24] to-[#0A0716] border border-violet-500/40 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-violet-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-400">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/40">
                    Conditional Escalation Branch
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Invoked On Unresolved Chronological Conflict</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Bounded Investigation Agent
                </h3>
              </div>
            </div>

            {agentStage && (
              <button
                onClick={() => setSelectedStage(agentStage)}
                className="px-3 py-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 border border-violet-500/40 text-xs font-mono font-semibold transition-colors self-start sm:self-center"
              >
                Inspect Agent Protocol
              </button>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            When numerical variance exceeds thresholds and document effective dates conflict (e.g. Endorsement issued 17 days post-inception), the pipeline branches into this bounded autonomous agent. The agent executes targeted document investigations without open-ended loops.
          </p>

          {/* Agent 5-Step Process Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {AGENT_BRANCH_STAGES.map((step, idx) => (
              <div
                key={step.id}
                className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-violet-400 font-bold">
                    Phase 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{step.duration}</span>
                </div>
                <h4 className="font-semibold text-white text-xs leading-snug">
                  {step.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-3">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-violet-300/80 font-mono">
            <span>&bull; Strictly bounded context window &bull; Read-only authorized corpus &bull; Zero external web browsing</span>
            <span className="text-cyan-400">&rarr; Routes source-linked findings directly to human triage</span>
          </div>
        </div>
      </div>

      {/* Deep Inspection Modal */}
      <StageDetailModal 
        stage={selectedStage} 
        onClose={() => setSelectedStage(null)} 
      />
    </div>
  );
};
