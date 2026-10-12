import React from 'react';
import { ReconciliationProvider, useReconciliation } from './context/ReconciliationContext';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { WorkspaceLayout } from './components/workspace/WorkspaceLayout';
import { ArchitectureDiagram } from './components/architecture/ArchitectureDiagram';
import { SimulationRunner } from './components/simulation/SimulationRunner';
import { ReviewConsole } from './components/review/ReviewConsole';
import { UploadZone } from './components/upload/UploadZone';
import { AuditDashboard } from './components/audit/AuditDashboard';
import { RoadmapSection } from './components/roadmap/RoadmapSection';
import { ShieldAlert, Heart, ExternalLink } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useReconciliation();

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Demo Disclaimer & Identity Banner */}
      <DisclaimerBanner />

      {/* Enterprise Global Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-12 pb-16">
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WorkspaceLayout />
            </div>
          </div>
        )}

        {activeTab === 'workspace' && <WorkspaceLayout />}
        {activeTab === 'architecture' && <ArchitectureDiagram />}
        {activeTab === 'simulation' && <SimulationRunner />}
        {activeTab === 'review' && <ReviewConsole />}
        {activeTab === 'upload' && <UploadZone />}
        {activeTab === 'audit' && <AuditDashboard />}
        {activeTab === 'roadmap' && <RoadmapSection />}
      </main>

      {/* Enterprise Footer */}
      <footer className="border-t border-surface-border bg-[#05080F] text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-surface-border/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">
                  Coverage<span className="text-cyan-400">Truth</span>Layer
                </span>
                <p className="text-xs text-slate-400">
                  Catch coverage contradictions before they become denied claims.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
              <button onClick={() => setActiveTab('overview')} className="hover:text-cyan-400 transition-colors">Overview</button>
              <button onClick={() => setActiveTab('workspace')} className="hover:text-cyan-400 transition-colors">Workspace</button>
              <button onClick={() => setActiveTab('architecture')} className="hover:text-cyan-400 transition-colors">Architecture</button>
              <button onClick={() => setActiveTab('simulation')} className="hover:text-cyan-400 transition-colors">Simulation</button>
              <button onClick={() => setActiveTab('review')} className="hover:text-cyan-400 transition-colors">Review Console</button>
              <button onClick={() => setActiveTab('upload')} className="hover:text-cyan-400 transition-colors">Upload</button>
              <button onClick={() => setActiveTab('audit')} className="hover:text-cyan-400 transition-colors">Audit & Metrics</button>
              <button onClick={() => setActiveTab('roadmap')} className="hover:text-cyan-400 transition-colors">Product Model</button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <span>Submitted by </span>
              <strong className="text-slate-300 font-semibold">Mekala Abhilash</strong>
              <span> &bull; </span>
              <span className="text-slate-400">Chaitanya Bharathi Institute of Technology (CBIT)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-surface border border-surface-border text-cyan-400 font-mono text-[11px]">
                Flarre AI Innovation Challenge 2026
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ReconciliationProvider>
      <AppContent />
    </ReconciliationProvider>
  );
}
