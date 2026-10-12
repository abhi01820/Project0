import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  InsuranceDocument, 
  Finding, 
  ReviewStatus, 
  AuditLogEntry, 
  NavTab, 
  PipelineStage 
} from '../types/insurance';
import { FICTIONAL_DOCUMENTS } from '../data/fictionalDocuments';
import { INITIAL_FINDINGS } from '../data/findingsSeed';
import { RECONCILIATION_STAGES } from '../data/pipelineStages';

export interface UploadedDocItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  status: 'Parsed' | 'Processing' | 'Demo Only';
}

interface ReconciliationContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  documents: InsuranceDocument[];
  findings: Finding[];
  selectedFinding: Finding;
  selectedFindingId: string;
  setSelectedFindingId: (id: string) => void;
  auditLogs: AuditLogEntry[];
  uploadedFiles: UploadedDocItem[];
  pipelineStages: PipelineStage[];
  isSimulationRunning: boolean;
  simulationStep: number;
  simulationCompleted: boolean;
  simulationLogs: string[];
  
  // Actions
  updateFindingStatus: (findingId: string, status: ReviewStatus, notes?: string) => void;
  updateReviewerNotes: (findingId: string, notes: string) => void;
  runSimulation: () => void;
  resetSimulation: () => void;
  resetAllData: () => void;
  uploadFile: (file: File) => void;
  removeUploadedFile: (id: string) => void;
}

const LOCAL_STORAGE_FINDINGS_KEY = 'ctl_findings_v1';
const LOCAL_STORAGE_AUDIT_KEY = 'ctl_audit_v1';

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2025-04-22 10:15:02 UTC',
    findingId: 'find-001',
    findingTitle: 'Water & Sewer Backup Limit Contradiction',
    action: 'Finding Discovered & Enqueued',
    actor: 'Coverage Truth Layer (Deterministic + LLM Engine)',
    newStatus: 'PENDING_REVIEW',
    notes: 'Discrepancy identified between BQ-2025-8821 ($1M) and END-04-WTR ($50k). Routed to triage.'
  },
  {
    id: 'log-002',
    timestamp: '2025-04-22 10:15:05 UTC',
    findingId: 'find-001',
    findingTitle: 'Water & Sewer Backup Limit Contradiction',
    action: 'Bounded Agent Chronology Investigation Completed',
    actor: 'Autonomous Chronology Agent',
    newStatus: 'PENDING_REVIEW',
    notes: 'Agent verified 17-day post-inception date discrepancy and missing policyholder signed acknowledgment.'
  },
  {
    id: 'log-003',
    timestamp: '2025-04-22 10:15:08 UTC',
    findingId: 'find-002',
    findingTitle: 'Warehouse Location #2 Flood Surge Exclusion Discrepancy',
    action: 'Finding Discovered & Enqueued',
    actor: 'Coverage Truth Layer (Deterministic Rules)',
    newStatus: 'PENDING_REVIEW',
    notes: 'Geographic conflict flagged for Des Plaines facility.'
  }
];

const ReconciliationContext = createContext<ReconciliationContextType | undefined>(undefined);

export const ReconciliationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [documents] = useState<InsuranceDocument[]>(FICTIONAL_DOCUMENTS);
  
  // Findings state with localStorage persistence
  const [findings, setFindings] = useState<Finding[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FINDINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved findings from localStorage', e);
    }
    return INITIAL_FINDINGS;
  });

  const [selectedFindingId, setSelectedFindingId] = useState<string>(findings[0]?.id || 'find-001');

  // Audit log with localStorage persistence
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_AUDIT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved audit logs', e);
    }
    return INITIAL_AUDIT_LOGS;
  });

  // Uploaded files list
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocItem[]>([
    {
      id: 'up-01',
      name: 'BQ-2025-8821_Meridian_Quote.pdf',
      size: '2.4 MB',
      type: 'PDF (Broker Binder)',
      uploadedAt: 'Today, 10:12 AM',
      status: 'Parsed'
    },
    {
      id: 'up-02',
      name: 'POL-CP-99042_Continental_Master.pdf',
      size: '5.8 MB',
      type: 'PDF (Policy Form CP 00 10)',
      uploadedAt: 'Today, 10:12 AM',
      status: 'Parsed'
    },
    {
      id: 'up-03',
      name: 'END-04-WTR_Water_Limitation.pdf',
      size: '1.1 MB',
      type: 'PDF (Endorsement)',
      uploadedAt: 'Today, 10:13 AM',
      status: 'Parsed'
    }
  ]);

  // Simulation State
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(RECONCILIATION_STAGES);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  // Sync findings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FINDINGS_KEY, JSON.stringify(findings));
    } catch (e) {
      console.warn('Failed to persist findings to localStorage', e);
    }
  }, [findings]);

  // Sync auditLogs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_AUDIT_KEY, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed to persist audit logs to localStorage', e);
    }
  }, [auditLogs]);

  const selectedFinding = findings.find(f => f.id === selectedFindingId) || findings[0] || INITIAL_FINDINGS[0];

  // Action: Update Finding Status
  const updateFindingStatus = (findingId: string, newStatus: ReviewStatus, notes?: string) => {
    const targetFinding = findings.find(f => f.id === findingId);
    if (!targetFinding) return;

    const previousStatus = targetFinding.status;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]} UTC`;

    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        return {
          ...f,
          status: newStatus,
          reviewerNotes: notes !== undefined ? notes : f.reviewerNotes,
          updatedAt: now.toISOString()
        };
      }
      return f;
    }));

    // Append to audit trail
    const actionLabel = 
      newStatus === 'CONFIRMED_GAP' ? 'Confirmed Coverage Gap for Remediation' :
      newStatus === 'DISMISSED' ? 'Dismissed Finding (Deemed Acceptable Risk)' :
      newStatus === 'INVESTIGATION_REQUESTED' ? 'Requested Additional Broker Investigation' :
      newStatus === 'RESOLVED' ? 'Marked Resolved via Correction Endorsement' :
      'Status Updated';

    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: formattedDate,
      findingId,
      findingTitle: targetFinding.title,
      action: actionLabel,
      actor: 'Underwriter Reviewer (Mekala Abhilash)',
      previousStatus,
      newStatus,
      notes: notes || `Changed status from ${previousStatus} to ${newStatus}`
    };

    setAuditLogs(prev => [newLogEntry, ...prev]);
  };

  // Action: Update Reviewer Notes
  const updateReviewerNotes = (findingId: string, notes: string) => {
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        return {
          ...f,
          reviewerNotes: notes,
          updatedAt: new Date().toISOString()
        };
      }
      return f;
    }));
  };

  // Action: Run Reconciliation Simulation
  const runSimulation = () => {
    if (isSimulationRunning) return;
    setIsSimulationRunning(true);
    setSimulationCompleted(false);
    setSimulationStep(1);
    setSimulationLogs(['[INIT] Initiating Coverage Truth Layer automated reconciliation engine...']);

    let current = 1;
    const totalSteps = RECONCILIATION_STAGES.length;

    const interval = setInterval(() => {
      if (current <= totalSteps) {
        const stage = RECONCILIATION_STAGES[current - 1];
        setSimulationStep(current);
        
        setPipelineStages(prev => prev.map((s, idx) => ({
          ...s,
          status: idx + 1 < current ? 'completed' : idx + 1 === current ? 'running' : 'idle'
        })));

        setSimulationLogs(prev => [...prev, ...stage.logOutputs]);
        current++;
      } else {
        clearInterval(interval);
        setPipelineStages(prev => prev.map(s => ({ ...s, status: 'completed' })));
        setIsSimulationRunning(false);
        setSimulationCompleted(true);
        setSimulationLogs(prev => [
          ...prev, 
          '════════════════════════════════════════════════════════════════',
          '✓ RECONCILIATION AUDIT COMPLETE — 3 POTENTIAL DISCREPANCIES DISPATCHED TO HUMAN TRIAGE',
          '✓ Evidence Cryptographic Provenance Verified'
        ]);
      }
    }, 900);
  };

  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setSimulationCompleted(false);
    setSimulationStep(0);
    setSimulationLogs([]);
    setPipelineStages(RECONCILIATION_STAGES.map(s => ({ ...s, status: 'idle' })));
  };

  const resetAllData = () => {
    setFindings(INITIAL_FINDINGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSelectedFindingId(INITIAL_FINDINGS[0].id);
    resetSimulation();
    try {
      localStorage.removeItem(LOCAL_STORAGE_FINDINGS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_AUDIT_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage', e);
    }
  };

  const uploadFile = (file: File) => {
    const newDoc: UploadedDocItem = {
      id: `up-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type || 'Document File',
      uploadedAt: 'Just now',
      status: 'Demo Only'
    };
    setUploadedFiles(prev => [newDoc, ...prev]);
  };

  const removeUploadedFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <ReconciliationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        documents,
        findings,
        selectedFinding,
        selectedFindingId,
        setSelectedFindingId,
        auditLogs,
        uploadedFiles,
        pipelineStages,
        isSimulationRunning,
        simulationStep,
        simulationCompleted,
        simulationLogs,
        updateFindingStatus,
        updateReviewerNotes,
        runSimulation,
        resetSimulation,
        resetAllData,
        uploadFile,
        removeUploadedFile,
      }}
    >
      {children}
    </ReconciliationContext.Provider>
  );
};

export const useReconciliation = () => {
  const context = useContext(ReconciliationContext);
  if (!context) {
    throw new Error('useReconciliation must be used within a ReconciliationProvider');
  }
  return context;
};
