import { PipelineStage } from '../types/insurance';

export const RECONCILIATION_STAGES: PipelineStage[] = [
  {
    id: 'stage-ingestion',
    stepNumber: 1,
    name: 'Authorized Document Ingestion & Parsing',
    shortDesc: 'Ingest broker binder, master policy, and endorsements with cryptographic hash & OCR.',
    detailedPurpose: 'Loads authorized insurance document packages, verifies cryptographic checksums, strips OCR artifacts, and tokenizes legal clauses with paragraph-level bounding coordinates.',
    inputs: ['Broker Quote BQ-2025-8821.pdf', 'Master Policy POL-CP-99042.pdf', 'Endorsement END-04-WTR.pdf'],
    outputs: ['3 Normalized JSON ASTs', 'Token stream with line/page indices', 'Metadata manifests'],
    status: 'idle',
    logOutputs: [
      '[INGEST] Ingested BQ-2025-8821 (Broker Quote, 8 pages, SHA256: 8a7f...e3)',
      '[INGEST] Ingested POL-CP-99042 (Master Policy Form CP 00 10, 32 pages, SHA256: 4b1c...99)',
      '[INGEST] Ingested END-04-WTR (Water Limitation Endorsement, 4 pages, SHA256: 9e2d...01)',
      '[PARSER] Segmented 44 distinct coverage clauses with page & line coordinates'
    ]
  },
  {
    id: 'stage-extraction',
    stepNumber: 2,
    name: 'Coverage Fact Extraction with Provenance',
    shortDesc: 'Extract structured coverage limits, deductibles, perils, exclusions, and schedules.',
    detailedPurpose: 'Executes schema-guided extraction against natural language contract text, binding every extracted fact to exact page, paragraph, and character offsets.',
    inputs: ['Normalized Document ASTs', 'Insurance Coverage Ontology Schema v3.2'],
    outputs: ['14 Structured Coverage Entities', 'Line-level provenance links'],
    status: 'idle',
    logOutputs: [
      '[EXTRACT] Extracted Fact: Water/Sewer Backup -> Limit: $1,000,000 blanket (Source: BQ-2025-8821, Page 4, Sec 3.B)',
      '[EXTRACT] Extracted Fact: ISO Water Exclusion -> Base Form Excluded (Source: POL-CP-99042, Page 14, Sec B.1.g)',
      '[EXTRACT] Extracted Fact: Water Sub-Limit -> Limit: $50,000 aggregate (Source: END-04-WTR, Page 2, Clause 2)',
      '[PROVENANCE] 100% of facts pinned to authoritative source character spans'
    ]
  },
  {
    id: 'stage-normalization',
    stepNumber: 3,
    name: 'Structured Facts & Chronology Alignment',
    shortDesc: 'Reconcile document versions, effective dates, and endorsement precedence hierarchy.',
    detailedPurpose: 'Orders all instruments along an authoritative timeline, evaluating issuance dates, effective dates, and explicit priority-of-terms rules (such as ISO Form F.4).',
    inputs: ['Extracted Facts', 'Document Chronology Ledger'],
    outputs: ['Unified Chronological Fact Graph', 'Effective Date Delta Map'],
    status: 'idle',
    logOutputs: [
      '[CHRONO] Policy Inception Date: 2025-04-01',
      '[CHRONO] Broker Quote Bound Date: 2025-04-01 (Matches Inception)',
      '[CHRONO] Endorsement END-04-WTR Effective Date: 2025-04-18 (+17 days post-inception!)',
      '[HIERARCHY] Precedence clause detected: Master Policy Sec F.4 declares endorsements supersede base forms'
    ]
  },
  {
    id: 'stage-deterministic',
    stepNumber: 4,
    name: 'Deterministic Rules & Numerical Validation',
    shortDesc: 'Compute mathematical differences in sub-limits, deductibles, and geographic bounds.',
    detailedPurpose: 'Zero-hallucination computational layer that cross-checks numerical limits, deductibles, coinsurance percentages, and location codes using deterministic validation scripts.',
    inputs: ['Structured Fact Graph', 'Underwriting Validation Rules'],
    outputs: ['Numerical Variance Matrix', 'Deterministic Alert Triggers'],
    status: 'idle',
    logOutputs: [
      '[DETERMINISTIC] Delta Check: Water Limit Quote ($1,000,000) vs Endorsement ($50,000) -> Delta: -$950,000 (95% reduction)',
      '[DETERMINISTIC] Deductible Check: $25,000 Property Deductible consistent across Quote & Policy',
      '[DETERMINISTIC] Flagged: High numerical disparity requires semantic and chronology triage'
    ]
  },
  {
    id: 'stage-semantic',
    stepNumber: 5,
    name: 'LLM Semantic Comparison & Contradiction Analysis',
    shortDesc: 'Evaluate subtle linguistic shifts, conditionality clauses, and negative exclusions.',
    detailedPurpose: 'Applies fine-tuned insurance LLM to interpret conditional language ("notwithstanding any prior representation", "unless scheduled", "subject to") and detect subtle legal coverage gaps.',
    inputs: ['Deterministic Variance Matrix', 'Source Passage Snippets', 'Domain Legal Prompts'],
    outputs: ['Semantic Contradiction Findings', 'Confidence & Uncertainty Scores'],
    status: 'idle',
    logOutputs: [
      '[SEMANTIC] Analyzing Clause 2 of END-04-WTR against Quote Sec 3.B...',
      '[SEMANTIC] Identified direct contradiction: Quote affirmative promise ("Affirmative coverage included") contradicts Endorsement restriction ("Notwithstanding any prior representation")',
      '[SEMANTIC] Identified geographic conflict: Warehouse #2 surge coverage denied in Endorsement despite quote affirmation',
      '[SEMANTIC] Confidence: 0.94 | Uncertainty flagged: Unsigned endorsement document status'
    ]
  },
  {
    id: 'stage-agent-trigger',
    stepNumber: 6,
    name: 'Agent Escalation Check (Pipeline First, Agent When Needed)',
    shortDesc: 'Evaluate if findings require the bounded autonomous investigation agent.',
    detailedPurpose: 'Determines whether discrepancies can be closed by the deterministic pipeline or require bounded agentic tool-use to cross-examine versions, communications, and policy riders.',
    inputs: ['Semantic Findings', 'Uncertainty Thresholds'],
    outputs: ['Agent Dispatch Decision', 'Investigation Scope Parameters'],
    status: 'idle',
    logOutputs: [
      '[TRIAGE] Discrepancy #1 has high numerical variance (-$950k) and post-inception date disparity (+17d)',
      '[TRIAGE] Unresolved question: Did the insured authorize the endorsement change?',
      '[AGENT_DISPATCH] Invoking Bounded Investigation Agent for Deep Chronology & Rider Validation'
    ]
  },
  {
    id: 'stage-agent-branch',
    stepNumber: 7,
    name: 'Bounded Investigation Agent Execution',
    shortDesc: 'Agent inspects endorsement precedence, retrieves related riders, and confirms chronology.',
    detailedPurpose: 'An autonomous, bounded agent steps through 5 specific validation actions: retrieving authorized passages, cross-examining signature blocks, inspecting transmittal logs, and assessing legal exposure.',
    inputs: ['Authorized Document Repository', 'Broker Communication Transcripts'],
    outputs: ['Synthesized Chronology Report', 'Missing Information Proof Sheet'],
    status: 'idle',
    isAgentBranch: true,
    logOutputs: [
      '[AGENT] Action 1: Querying document store for signed acceptance of END-04-WTR... Result: NOT FOUND',
      '[AGENT] Action 2: Examining broker correspondence thread BQ-2025-COMM... Result: No disclosure of $50k sub-limit',
      '[AGENT] Action 3: Reviewing carrier precedence clause (POL-CP-99042 Sec F.4)... Result: Endorsements supersede, but unilateral post-binding change is legally contested',
      '[AGENT] Action 4: Formulating human review recommendation: Broker notice audit required before binding'
    ]
  },
  {
    id: 'stage-report',
    stepNumber: 8,
    name: 'Evidence-Backed Report & Human Triage Routing',
    shortDesc: 'Package findings with dual-pane citations, uncertainty scores, and route to reviewer console.',
    detailedPurpose: 'Constructs the immutable evidence package containing side-by-side citations, line numbers, document hashes, and routes the ticket to the human-in-the-loop review console.',
    inputs: ['Deterministic Flags', 'Semantic Findings', 'Agent Investigation Dossier'],
    outputs: ['Evidence-Backed Reconciliation Report', 'Review Console Ticket Queue'],
    status: 'idle',
    logOutputs: [
      '[REPORT] Packaged 3 evidence-linked findings into Review Queue',
      '[AUDIT] Generated cryptographic verification token: HASH-7719-CTL-2025',
      '[ROUTING] Finding #find-001 assigned to Commercial Lines Senior Underwriter review queue',
      '[COMPLETE] Reconciliation pipeline completed in 2.4s simulation time'
    ]
  }
];

export const AGENT_BRANCH_STAGES = [
  {
    id: 'agent-step-1',
    name: 'Passage Retrieval & Context Expansion',
    desc: 'Fetches full paragraph context surrounding the $50,000 sub-limit in END-04-WTR and $1,000,000 limit in BQ-2025-8821.',
    duration: '240ms'
  },
  {
    id: 'agent-step-2',
    name: 'Document Identity & Chronology Verification',
    desc: 'Analyzes date delta: Broker quote bound 2025-04-01 vs Endorsement issued 2025-04-18 (+17 days later).',
    duration: '180ms'
  },
  {
    id: 'agent-step-3',
    name: 'Contractual Precedence Examination',
    desc: 'Evaluates Policy Section F.4 endorsement precedence clause against state law requirements for bilateral binder modification.',
    duration: '310ms'
  },
  {
    id: 'agent-step-4',
    name: 'Uncertainty & Missing Information Audit',
    desc: 'Confirms absence of signed Form WA-9 (Policyholder Endorsement Acknowledgment) in the carrier repository.',
    duration: '190ms'
  },
  {
    id: 'agent-step-5',
    name: 'Source-Linked Underwriter Dossier Synthesis',
    desc: 'Formats structured finding with side-by-side excerpts, confidence rating (94%), and recommended underwriter remedy.',
    duration: '150ms'
  }
];
