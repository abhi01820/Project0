export type DocumentType = 'QUOTE' | 'POLICY' | 'ENDORSEMENT' | 'COMMUNICATION';

export interface Passage {
  id: string;
  section: string;
  pageNumber: number;
  text: string;
  isHighlighted?: boolean;
}

export interface InsuranceDocument {
  id: string;
  title: string;
  documentNumber: string;
  type: DocumentType;
  version: string;
  effectiveDate: string;
  expirationDate: string;
  issuer: string;
  insuredEntity: string;
  description: string;
  passages: Passage[];
  confidenceScore: number;
}

export type FindingSeverity = 'CRITICAL_CONTRADICTION' | 'HIGH_GAP' | 'AMBIGUITY' | 'VERSION_MISMATCH';

export type ReviewStatus = 
  | 'PENDING_REVIEW' 
  | 'CONFIRMED_GAP' 
  | 'DISMISSED' 
  | 'INVESTIGATION_REQUESTED' 
  | 'RESOLVED';

export interface EvidenceSource {
  documentId: string;
  documentTitle: string;
  documentNumber: string;
  documentType: DocumentType;
  version: string;
  effectiveDate: string;
  section: string;
  pageNumber: number;
  exactQuote: string;
  highlightWords: string[];
}

export interface AgentInvestigationResult {
  triggeredAt: string;
  reason: string;
  stepsExecuted: string[];
  chronologySummary: string;
  endorsementPrecedenceFindings: string;
  sourceConfidence: number;
}

export interface Finding {
  id: string;
  title: string;
  category: string;
  severity: FindingSeverity;
  status: ReviewStatus;
  quoteEvidence: EvidenceSource;
  policyEvidence: EvidenceSource;
  comparisonAnalysis: string;
  potentialExposureAmount: string;
  uncertaintyExplanation: string;
  missingInformation: string;
  recommendedAction: string;
  agentInvestigation?: AgentInvestigationResult;
  reviewerNotes: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  findingId?: string;
  findingTitle?: string;
  action: string;
  actor: string;
  previousStatus?: ReviewStatus;
  newStatus?: ReviewStatus;
  notes?: string;
}

export type StageStatus = 'idle' | 'running' | 'completed' | 'failed';

export interface PipelineStage {
  id: string;
  stepNumber: number;
  name: string;
  shortDesc: string;
  detailedPurpose: string;
  inputs: string[];
  outputs: string[];
  status: StageStatus;
  isAgentBranch?: boolean;
  logOutputs: string[];
}

export type NavTab = 
  | 'overview' 
  | 'workspace' 
  | 'architecture' 
  | 'simulation' 
  | 'review' 
  | 'upload' 
  | 'audit' 
  | 'roadmap';
