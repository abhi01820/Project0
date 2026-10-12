import React from 'react';
import { PipelineStage } from '../../types/insurance';
import { X, CheckCircle2, ArrowRight, Terminal, Cpu, Bot } from 'lucide-react';

interface StageDetailModalProps {
  stage: PipelineStage | null;
  onClose: () => void;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({ stage, onClose }) => {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-2xl rounded-2xl border p-6 shadow-2xl relative transition-all ${
          stage.isAgentBranch 
            ? 'bg-[#0E0B1A] border-violet-500/40' 
            : 'bg-[#0A101D] border-cyan-500/40'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className={`p-3 rounded-xl border ${
            stage.isAgentBranch
              ? 'bg-violet-950/60 border-violet-500/40 text-violet-400'
              : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400'
          }`}>
            {stage.isAgentBranch ? <Bot className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded ${
                stage.isAgentBranch 
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' 
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}>
                Step 0{stage.stepNumber} &bull; {stage.isAgentBranch ? 'Autonomous Agent Branch' : 'Deterministic Pipeline'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {stage.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {stage.shortDesc}
            </p>
          </div>
        </div>

        {/* Detailed Purpose */}
        <div className="p-3.5 rounded-xl bg-surface-light/70 border border-surface-border text-xs text-slate-300 mb-5 leading-relaxed">
          <strong className="text-white block font-semibold mb-1">Architecture Function:</strong>
          {stage.detailedPurpose}
        </div>

        {/* Inputs vs Outputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold uppercase text-[11px] block">
              Stage Contract Inputs:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {stage.inputs.map((inp, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span>{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold uppercase text-[11px] block">
              Stage Contract Outputs:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {stage.outputs.map((out, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Execution Log Telemetry */}
        <div className="p-3.5 rounded-xl bg-black/80 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1 max-h-40 overflow-y-auto">
          <div className="flex items-center gap-1.5 text-slate-400 pb-1 mb-1 border-b border-slate-800">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Execution Telemetry Log:</span>
          </div>
          {stage.logOutputs.map((log, idx) => (
            <div key={idx} className="text-slate-400 leading-snug">
              <span className="text-cyan-400">&gt;</span> {log}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-light hover:bg-slate-800 text-white text-xs font-semibold border border-surface-border transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
