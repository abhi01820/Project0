import { Finding } from '../types/insurance';

export const INITIAL_FINDINGS: Finding[] = [
  {
    id: 'find-001',
    title: 'Water & Sewer Backup Limit Contradiction ($1M Quote vs $50k Endorsement Sub-Limit)',
    category: 'Water & Flood Perils',
    severity: 'CRITICAL_CONTRADICTION',
    status: 'PENDING_REVIEW',
    potentialExposureAmount: '$950,000 Discrepancy',
    quoteEvidence: {
      documentId: 'doc-quote-01',
      documentTitle: 'Broker Quote & Coverage Binder Proposal',
      documentNumber: 'BQ-2025-8821',
      documentType: 'QUOTE',
      version: 'v1.4 (Final Bound Proposal)',
      effectiveDate: '2025-04-01',
      section: 'Section 3.B — Water & Sewer Backup Affirmation',
      pageNumber: 4,
      exactQuote: 'Water Damage & Sewer Backup: Affirmative coverage included up to $1,000,000 blanket limit per occurrence, subject to standard $25,000 property deductible. No separate water-borne loss exclusion applies to warehouse location #2.',
      highlightWords: ['$1,000,000 blanket limit', 'Affirmative coverage included', 'No separate water-borne loss exclusion applies']
    },
    policyEvidence: {
      documentId: 'doc-endorsement-01',
      documentTitle: 'Water Damage Sub-Limit & Backup Exclusion Endorsement',
      documentNumber: 'END-04-WTR',
      documentType: 'ENDORSEMENT',
      version: 'v2.1 (Post-Issuance Attachment)',
      effectiveDate: '2025-04-18',
      section: 'Clause 2 — Restrictive Sewer & Surface Water Sub-Limit',
      pageNumber: 2,
      exactQuote: 'Notwithstanding any prior representation, coverage for loss or damage resulting from sewer backup, subsurface water intrusion, or overflow is strictly subject to an aggregate sub-limit of $50,000 per policy period. Any loss exceeding $50,000 is expressly excluded.',
      highlightWords: ['aggregate sub-limit of $50,000', 'expressly excluded', 'Notwithstanding any prior representation']
    },
    comparisonAnalysis: 
      'The broker quote explicitly promised affirmative water and sewer backup coverage up to a $1,000,000 blanket limit. However, Endorsement END-04-WTR attaches a restrictive $50,000 annual aggregate sub-limit, introducing an acute $950,000 unhedged exposure for warehouse flooding. The policyholder was bound under representations made in BQ-2025-8821.',
    uncertaintyExplanation: 
      'Deterministic rule flagged 95% numerical variance ($1,000,000 vs $50,000). The semantic model evaluated whether "sub-limit" in the endorsement modifies or completely supersedes the blanket limit. Both documents are legally recognized within the policy file, creating contract ambiguity.',
    missingInformation: 
      'Missing signed policyholder endorsement acceptance form (Form WA-9) and written broker disclosure correspondence prior to binder confirmation.',
    recommendedAction: 
      'Underwriter must verify whether Endorsement END-04-WTR was accepted in writing by Apex Global Logistics LLC. If unagreed, issue Endorsement Correction Rider END-05-COR restoring the $1,000,000 blanket threshold before loss occurrence.',
    agentInvestigation: {
      triggeredAt: '2025-04-22T10:14:32Z',
      reason: 'Cross-document numerical conflict with divergent effective dates (2025-04-01 vs 2025-04-18).',
      stepsExecuted: [
        'Retrieved authorized quote BQ-2025-8821 and master policy POL-CP-99042',
        'Verified document chronology: Broker quote predates Endorsement by 17 calendar days',
        'Analyzed Policy Section F.4 (Precedence of Forms) which gives endorsements superiority over printed policy forms',
        'Discovered missing bilateral acceptance signature on Endorsement END-04-WTR',
        'Synthesized source-linked evidence report for human underwriter review'
      ],
      chronologySummary: 'Quote signed: 2025-04-01 | Policy issued: 2025-04-01 | Restrictive endorsement added: 2025-04-18 (17 days later).',
      endorsementPrecedenceFindings: 'Carrier form language attempts unilateral restriction post-binding without affirmative policyholder signature.',
      sourceConfidence: 0.94
    },
    reviewerNotes: '',
    updatedAt: '2025-04-22T10:15:00Z'
  },
  {
    id: 'find-002',
    title: 'Warehouse Location #2 Flood Surge Exclusion Discrepancy',
    category: 'Geographic Restrictions',
    severity: 'HIGH_GAP',
    status: 'PENDING_REVIEW',
    potentialExposureAmount: '$4,200,000 Inventory at Risk',
    quoteEvidence: {
      documentId: 'doc-quote-01',
      documentTitle: 'Broker Quote & Coverage Binder Proposal',
      documentNumber: 'BQ-2025-8821',
      documentType: 'QUOTE',
      version: 'v1.4 (Final Bound Proposal)',
      effectiveDate: '2025-04-01',
      section: 'Section 3.B — Water & Sewer Backup Affirmation',
      pageNumber: 4,
      exactQuote: 'No separate water-borne loss exclusion applies to warehouse location #2.',
      highlightWords: ['No separate water-borne loss exclusion applies']
    },
    policyEvidence: {
      documentId: 'doc-endorsement-01',
      documentTitle: 'Water Damage Sub-Limit & Backup Exclusion Endorsement',
      documentNumber: 'END-04-WTR',
      documentType: 'ENDORSEMENT',
      version: 'v2.1 (Post-Issuance Attachment)',
      effectiveDate: '2025-04-18',
      section: 'Clause 4 — Location #2 Flood Limitation',
      pageNumber: 3,
      exactQuote: 'Warehouse Location #2 (Des Plaines, IL) is designated as High Surface Water Exposure. Surface surge loss is excluded in its entirety unless separately scheduled under National Flood Insurance Program policy.',
      highlightWords: ['Warehouse Location #2', 'excluded in its entirety', 'National Flood Insurance Program']
    },
    comparisonAnalysis: 
      'Broker quote guaranteed that Des Plaines distribution warehouse #2 would not face localized water exclusions. In contrast, Endorsement END-04-WTR Clause 4 excludes surface water surge entirely, directing the insured to standalone NFIP coverage.',
    uncertaintyExplanation: 
      'The semantic parser detected a direct negative affirmation ("No exclusion" vs "excluded in its entirety"). Whether NFIP standalone coverage was actually secured off-system is undetermined in this repository.',
    missingInformation: 
      'Proof of standalone NFIP or excess flood policy documentation for Des Plaines, IL facility.',
    recommendedAction: 
      'Request current NFIP declaration page from insured broker or issue manuscript endorsement reinstating surface surge coverage for Location #2.',
    reviewerNotes: '',
    updatedAt: '2025-04-22T10:15:00Z'
  },
  {
    id: 'find-003',
    title: 'Post-Issuance Endorsement Precedence and Consideration Ambiguity',
    category: 'Contract Integrity & Versioning',
    severity: 'AMBIGUITY',
    status: 'PENDING_REVIEW',
    potentialExposureAmount: 'Legal Enforceability Exposure',
    quoteEvidence: {
      documentId: 'doc-quote-01',
      documentTitle: 'Broker Quote & Coverage Binder Proposal',
      documentNumber: 'BQ-2025-8821',
      documentType: 'QUOTE',
      version: 'v1.4 (Final Bound Proposal)',
      effectiveDate: '2025-04-01',
      section: 'Section 2.A — Property Coverage Overview',
      pageNumber: 2,
      exactQuote: 'Standard ISO Special Form coverage with agreed carrier manuscript endorsements attached at binding.',
      highlightWords: ['attached at binding']
    },
    policyEvidence: {
      documentId: 'doc-policy-01',
      documentTitle: 'Master Commercial Property Policy',
      documentNumber: 'POL-CP-99042',
      documentType: 'POLICY',
      version: 'v1.0 (Issued Master Policy)',
      effectiveDate: '2025-04-01',
      section: 'Section F.4 — Precedence of Forms',
      pageNumber: 28,
      exactQuote: 'In the event of conflict between the printed provisions of this policy and any endorsement attached hereto, the provisions of the endorsement shall supersede.',
      highlightWords: ['provisions of the endorsement shall supersede']
    },
    comparisonAnalysis: 
      'Master policy Section F.4 states endorsements supersede original terms. However, END-04-WTR was attached 17 days after inception date (2025-04-18 vs 2025-04-01), creating uncertainty regarding whether post-binding endorsements legally supersede prior binder agreements without bilateral consideration.',
    uncertaintyExplanation: 
      'Jurisdictional legal standard varies regarding carrier unilateral alteration of bound insurance binders without signed policyholder consent.',
    missingInformation: 
      'Endorsement transmittal letter and premium adjustment audit records.',
    recommendedAction: 
      'Legal counsel contract review regarding mid-term restrictive endorsement validity under state insurance department regulations.',
    reviewerNotes: '',
    updatedAt: '2025-04-22T10:15:00Z'
  }
];
