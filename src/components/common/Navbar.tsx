import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Layers, 
  Cpu, 
  Play, 
  CheckSquare, 
  UploadCloud, 
  BarChart3, 
  Compass, 
  Menu, 
  X,
  RotateCcw
} from 'lucide-react';
import { useReconciliation } from '../../context/ReconciliationContext';
import { NavTab } from '../../types/insurance';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    findings, 
    runSimulation, 
    isSimulationRunning,
    resetAllData 
  } = useReconciliation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingCount = findings.filter(f => f.status === 'PENDING_REVIEW').length;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'workspace', label: 'Comparison Workspace', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'simulation', label: 'Reconciliation Demo', icon: <Play className="w-4 h-4" /> },
    { id: 'architecture', label: 'AI Architecture', icon: <Cpu className="w-4 h-4" /> },
    { 
      id: 'review', 
      label: 'Review Console', 
      icon: <CheckSquare className="w-4 h-4" />, 
      badge: pendingCount > 0 ? pendingCount : undefined 
    },
    { id: 'upload', label: 'Upload Documents', icon: <UploadCloud className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit & Metrics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Product Model', icon: <Compass className="w-4 h-4" /> },
  ];

  const handleNavClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070A12]/90 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('overview')}
          >
            <div className="relative w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-sm -z-10 group-hover:bg-cyan-400/30 transition-all"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white font-sans">
                  Coverage<span className="text-cyan-400">Truth</span>Layer
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  MVP v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal hidden sm:block truncate max-w-xs">
                Catch coverage contradictions before denied claims
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-sm shadow-cyan-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => {
                setActiveTab('simulation');
                runSimulation();
              }}
              disabled={isSimulationRunning}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSimulationRunning
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-wait animate-pulse'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-500/20 active:scale-95'
              }`}
              title="Run end-to-end reconciliation demonstration"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulationRunning ? 'Reconciling...' : 'Run Demo'}</span>
            </button>

            <button
              onClick={resetAllData}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              title="Reset Demo Data to Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('simulation');
                runSimulation();
              }}
              className="px-2.5 py-1 rounded text-xs bg-cyan-500 text-slate-950 font-medium md:hidden"
            >
              Run Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0E1A] border-b border-surface-border px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-surface-border flex gap-2">
            <button
              onClick={resetAllData}
              className="flex-1 py-2 text-xs text-slate-400 hover:text-white text-center rounded bg-slate-800 border border-slate-700"
            >
              Reset Demo State
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
