import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Cpu, 
  ExternalLink,
  Lock,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { useReconciliation } from '../../context/ReconciliationContext';

export const HeroSection: React.FC = () => {
  const { setActiveTab, runSimulation } = useReconciliation();

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Flarre AI Innovation Challenge 2026</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-light border border-surface-border text-slate-300 text-xs"
          >
            <span>Submitted by:</span>
            <strong className="text-white font-medium">Mekala Abhilash</strong>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400">Chaitanya Bharathi Institute of Technology (CBIT)</span>
          </motion.div>
        </div>

        {/* Hero Title & Tagline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5 font-sans"
          >
            Catch coverage contradictions <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              before they become denied claims.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            An AI-powered insurance reconciliation and evidence-traceability layer that compares broker quotes against issued policies and endorsements, flags silent coverage gaps, and anchors every finding to verifiable document proof.
          </motion.p>

          {/* Quick 10-Second Problem & Solution Statement Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 p-4 rounded-xl bg-surface/90 border border-surface-border text-left shadow-lg max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-0.5">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <p className="text-slate-300 italic font-serif text-sm leading-snug">
                  “Insurance coverage information is scattered across broker communications, quotes, policies, and endorsements. Important differences can be difficult to identify and trace during manual review.”
                </p>
                <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-cyan-400 font-semibold uppercase tracking-wider">The Solution:</span>
                  <span>Deterministic validation + LLM semantic reconciliation + bounded chronology agent + human-in-the-loop review.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => setActiveTab('workspace')}
              className="px-6 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className="px-6 py-3.5 rounded-lg bg-surface-light hover:bg-surface-hover text-slate-200 border border-surface-border hover:border-slate-600 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>See How It Works (AI Architecture)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('simulation');
                runSimulation();
              }}
              className="px-5 py-3.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 font-medium text-sm flex items-center gap-2 transition-all"
            >
              <span>Simulate 8-Step Reconciliation</span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </button>
          </motion.div>
        </div>

        {/* Cinematic Main Visual: 3 Document Cards Flowing into Reconciliation Engine */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-5xl mx-auto mt-6"
        >
          {/* Section Heading above flow */}
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Live Document Traceability Stream
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Card 1: Broker Quote */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-5 rounded-xl bg-surface/90 border border-cyan-500/30 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                  1. Broker Quote & Binder
                </span>
                <span className="text-xs font-mono text-slate-400">BQ-2025-8821</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-slate-200 font-semibold text-sm">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Meridian Risk Partners</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Effective: 2025-04-01 &bull; v1.4 Final Bound</p>

              {/* Highlighted Quote Passage in Cyan */}
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-xs text-slate-200">
                <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold mb-1 flex items-center justify-between">
                  <span>Section 3.B &bull; Page 4</span>
                  <span className="text-cyan-300">Promised Limit</span>
                </div>
                <p className="leading-relaxed font-mono text-[11px] text-cyan-100 bg-cyan-900/40 p-1.5 rounded">
                  "Water Damage & Sewer Backup: Affirmative coverage included up to <mark className="bg-cyan-400 text-slate-950 font-bold px-1 rounded">$1,000,000 blanket limit</mark> per occurrence..."
                </p>
              </div>
            </motion.div>

            {/* Card 2: Issued Master Policy */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-5 rounded-xl bg-surface/90 border border-blue-500/30 shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-semibold">
                  2. Issued Policy
                </span>
                <span className="text-xs font-mono text-slate-400">POL-CP-99042</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-slate-200 font-semibold text-sm">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Continental Assurance</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Effective: 2025-04-01 &bull; Form CP 00 10</p>

              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30 text-xs text-slate-200">
                <div className="text-[10px] uppercase font-mono text-blue-400 font-bold mb-1 flex items-center justify-between">
                  <span>Section B.1.g &bull; Page 14</span>
                  <span className="text-blue-300">Base Exclusion</span>
                </div>
                <p className="leading-relaxed font-mono text-[11px] text-slate-300 bg-slate-900/60 p-1.5 rounded">
                  "We will not pay for water damage or sewer backup except as modified by affirmative schedule endorsement attached hereto."
                </p>
              </div>
            </motion.div>

            {/* Card 3: Later Endorsement */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-5 rounded-xl bg-surface/90 border border-violet-500/30 shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30 font-semibold">
                  3. Later Endorsement
                </span>
                <span className="text-xs font-mono text-slate-400">END-04-WTR</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-slate-200 font-semibold text-sm">
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Restricted Water Rider</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Effective: 2025-04-18 (+17 days later)</p>

              {/* Highlighted Endorsement Conflict */}
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-slate-200">
                <div className="text-[10px] uppercase font-mono text-rose-400 font-bold mb-1 flex items-center justify-between">
                  <span>Clause 2 &bull; Page 2</span>
                  <span className="text-rose-300">Drastic Sub-Limit</span>
                </div>
                <p className="leading-relaxed font-mono text-[11px] text-rose-100 bg-rose-950/60 p-1.5 rounded">
                  "...coverage for sewer backup is strictly subject to an <mark className="bg-rose-500 text-white font-bold px-1 rounded">aggregate sub-limit of $50,000</mark>. Excess is excluded."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Reconciliation Engine Alert Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-5 rounded-xl bg-gradient-to-r from-surface-light via-[#0D1829] to-surface-light border border-cyan-500/40 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      Potential Contradiction Detected
                    </span>
                    <span className="text-xs text-cyan-400 font-mono">$950,000 Uninsured Coverage Gap</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm sm:text-base mt-1">
                    Broker Promised $1,000,000 Blanket Water Limit &harr; Endorsement Caps at $50,000
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Endorsement END-04-WTR issued 17 days post-inception lacks signed policyholder consent. Deterministic and LLM checks flagged divergence.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('workspace')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>Inspect Evidence</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Promised → Documented → Paid Visual */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Insurance Truth Lifecycle & MVP Boundary
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Promised &bull; Documented &bull; Paid
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stage 1: Promised */}
            <div className="p-4 rounded-xl bg-surface/80 border border-cyan-500/40 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                  1. Promised
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  CTL Active Scope
                </span>
              </div>
              <h4 className="font-semibold text-white text-sm">Broker Quotes & Comms</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Binder indications, broker coverage summaries, emails, and pre-binding customer representations.
              </p>
            </div>

            {/* Stage 2: Documented */}
            <div className="p-4 rounded-xl bg-surface/80 border border-cyan-500/40 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                  2. Documented
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  CTL Active Scope
                </span>
              </div>
              <h4 className="font-semibold text-white text-sm">Issued Policies & Endorsements</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Carrier policy declarations, master ISO forms, subsequent restrictive riders, and effective date schedules.
              </p>
            </div>

            {/* Stage 3: Paid (Marked as Future Scope) */}
            <div className="p-4 rounded-xl bg-surface/40 border border-slate-800 relative opacity-75">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase font-bold text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  3. Paid
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Future Extension
                </span>
              </div>
              <h4 className="font-semibold text-slate-300 text-sm">Claims & Settlements</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Adjuster evaluations, loss reservation, and settlement reconciliations against historical promises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
