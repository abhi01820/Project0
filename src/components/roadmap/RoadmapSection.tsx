import React from 'react';
import { 
  Compass, 
  Layers, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Milestone
} from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Product Model & 3-Phase Roadmap
            </h1>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Strategic Vision
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            The architectural scope of Coverage Truth Layer across the lifecycle of insurance promises, contracts, and claims.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Flarre Innovation Challenge 2026</span>
        </div>
      </div>

      {/* The Promised → Documented → Paid Model */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>The Core Insurance Triad: Promised &bull; Documented &bull; Paid</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Understanding the boundaries of Coverage Truth Layer and where value is created before loss occurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Promised */}
          <div className="p-6 rounded-2xl bg-surface border border-cyan-500/40 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                Phase 1 (MVP Scope)
              </span>
              <span className="text-xs font-mono text-slate-400">Pre-Binding</span>
            </div>
            <h3 className="text-xl font-bold text-white">PROMISED</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Broker communications, formal quotation indications, proposal binders, and coverage summaries delivered to the corporate risk buyer.
            </p>
            <div className="pt-2 text-xs font-mono text-cyan-300 space-y-1">
              <div>&bull; Water damage blanket affirmation</div>
              <div>&bull; Agreed deductible representations</div>
              <div>&bull; Geographic territory assurances</div>
            </div>
          </div>

          {/* Card 2: Documented */}
          <div className="p-6 rounded-2xl bg-surface border border-cyan-500/40 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                Phase 1 (MVP Scope)
              </span>
              <span className="text-xs font-mono text-slate-400">Policy Inception</span>
            </div>
            <h3 className="text-xl font-bold text-white">DOCUMENTED</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Carrier issued policies, declaration pages, standard ISO form terms, subsequent restrictive endorsements, and effective date schedules.
            </p>
            <div className="pt-2 text-xs font-mono text-cyan-300 space-y-1">
              <div>&bull; ISO Form CP 00 10 terms</div>
              <div>&bull; Post-binding restrictive riders</div>
              <div>&bull; Precedence of terms (Sec F.4)</div>
            </div>
          </div>

          {/* Card 3: Paid (Marked clearly as Future Scope) */}
          <div className="p-6 rounded-2xl bg-surface/50 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Phase 3 (Future Scope)
              </span>
              <span className="text-xs font-mono text-slate-500">Post-Loss</span>
            </div>
            <h3 className="text-xl font-bold text-slate-300">PAID</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Claims adjuster determinations, reservation of rights letters, settlement negotiations, and loss payouts reconciled against original promises.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500 space-y-1">
              <div>&bull; Adjuster coverage interpretation</div>
              <div>&bull; Dispute mediation records</div>
              <div>&bull; Historical settlement auditing</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Phase Strategic Evolution Roadmap */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Milestone className="w-5 h-5 text-cyan-400" />
            <span>Product Roadmap & Release Milestones</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Structured delivery roadmap moving from initial document reconciliation into deep agency management system integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1 */}
          <div className="p-5 rounded-xl bg-surface border border-cyan-500/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                Phase 1: Current MVP
              </span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="font-bold text-white text-base">Document Comparison & Provenance</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>&bull; Ingestion of quotes, policies, and endorsements</li>
              <li>&bull; Character-level citation linking and side-by-side diff</li>
              <li>&bull; Deterministic limits and sub-limits comparison</li>
              <li>&bull; Bounded investigation agent for date chronology</li>
              <li>&bull; Human review triage console with audit persistence</li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="p-5 rounded-xl bg-surface border border-violet-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold">
                Phase 2: Next Stage
              </span>
              <span className="text-xs font-mono text-slate-400">Pilot Ready</span>
            </div>
            <h4 className="font-bold text-white text-base">Enterprise Workflow Integration</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>&bull; Real-time OCR document ingestion API</li>
              <li>&bull; Direct AMS/PAS connectors (Applied Epic, Guidewire)</li>
              <li>&bull; Granular endorsement precedence rules engine</li>
              <li>&bull; Multi-party underwriter & broker collaboration</li>
              <li>&bull; Enterprise pilot evaluation instrumentation</li>
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="p-5 rounded-xl bg-surface border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-bold">
                Phase 3: Extended Vision
              </span>
              <span className="text-xs font-mono text-slate-500">Ecosystem</span>
            </div>
            <h4 className="font-bold text-white text-base">Full Lifecycle Claims Truth</h4>
            <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
              <li>&bull; Claims First Notice of Loss (FNOL) cross-validation</li>
              <li>&bull; Settlement reconciliation against pre-bound terms</li>
              <li>&bull; Cross-carrier reinsurance treaty compliance</li>
              <li>&bull; Autonomous rider amendment negotiation drafts</li>
              <li>&bull; Industry-wide coverage truth benchmark network</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Layer & Neutrality Statement */}
      <div className="p-5 rounded-xl bg-surface-light border border-surface-border text-xs text-slate-400 space-y-2 leading-relaxed">
        <strong className="text-slate-300 block font-semibold text-sm flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Complementary Trust Layer Architecture</span>
        </strong>
        <p>
          Coverage Truth Layer is presented as a proposed concept and a complementary trust layer designed to augment existing insurance policy administration and broker systems. It introduces deterministic verification and bounded agent auditability to protect commercial insureds, brokers, and carriers from silent coverage contradictions before claims arise.
        </p>
      </div>
    </div>
  );
};
