import React from 'react';
import { FindingSeverity, ReviewStatus, DocumentType } from '../../types/insurance';

interface BadgeProps {
  type?: 'severity' | 'status' | 'docType' | 'custom';
  value: FindingSeverity | ReviewStatus | DocumentType | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type = 'custom', value, className = '' }) => {
  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  if (type === 'severity') {
    switch (value as FindingSeverity) {
      case 'CRITICAL_CONTRADICTION':
        colorClasses = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
        break;
      case 'HIGH_GAP':
        colorClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
        break;
      case 'AMBIGUITY':
        colorClasses = 'bg-violet-500/15 text-violet-300 border-violet-500/30';
        break;
      case 'VERSION_MISMATCH':
        colorClasses = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
        break;
    }
  } else if (type === 'status') {
    switch (value as ReviewStatus) {
      case 'PENDING_REVIEW':
        colorClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse';
        break;
      case 'CONFIRMED_GAP':
        colorClasses = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
        break;
      case 'DISMISSED':
        colorClasses = 'bg-slate-800 text-slate-400 border-slate-700';
        break;
      case 'INVESTIGATION_REQUESTED':
        colorClasses = 'bg-violet-500/15 text-violet-300 border-violet-500/30';
        break;
      case 'RESOLVED':
        colorClasses = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
        break;
    }
  } else if (type === 'docType') {
    switch (value as DocumentType) {
      case 'QUOTE':
        colorClasses = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
        break;
      case 'POLICY':
        colorClasses = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
        break;
      case 'ENDORSEMENT':
        colorClasses = 'bg-violet-500/15 text-violet-300 border-violet-500/30';
        break;
      case 'COMMUNICATION':
        colorClasses = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
        break;
    }
  }

  const formatText = (val: string) => {
    return val.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${colorClasses} ${className}`}
    >
      {formatText(value)}
    </span>
  );
};
