import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { FICTIONAL_DISCLAIMER_TEXT } from '../../data/fictionalDocuments';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-surface-light/80 border-b border-surface-border text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-slate-400">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span className="font-medium text-slate-300">DEMO ENVIRONMENT &bull; FICTIONAL ILLUSTRATION:</span>
        <span>{FICTIONAL_DISCLAIMER_TEXT}</span>
      </div>
      <div className="flex items-center gap-3 ml-auto text-[11px]">
        <span className="flex items-center gap-1 text-cyan-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Flarre Innovation Challenge 2026
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300 font-mono">Mekala Abhilash (CBIT)</span>
      </div>
    </div>
  );
};
