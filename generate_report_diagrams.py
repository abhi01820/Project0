import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.family'] = 'sans-serif'

# 1. System Architecture
def create_architecture_diagram():
    fig, ax = plt.subplots(figsize=(12, 7), dpi=300)
    ax.set_facecolor('#0B0F19')
    fig.patch.set_facecolor('#0B0F19')
    ax.axis('off')

    # Title
    ax.text(6, 6.6, "Coverage Truth Layer — System Architecture", 
            ha='center', va='center', color='#00E5FF', fontsize=15, fontweight='bold')
    ax.text(6, 6.25, "Hybrid Deterministic & Semantic Pipeline with Bounded Agent Escalation", 
            ha='center', va='center', color='#94A3B8', fontsize=10)

    # Stages in main pipeline (Cyan / Blue boxes)
    stages = [
        ("1. Ingestion\n& Checksum", 0.8, 4.5),
        ("2. Fact Extraction\n& Provenance", 2.3, 4.5),
        ("3. Chronology\n& Alignment", 3.8, 4.5),
        ("4. Deterministic\nRules Check", 5.3, 4.5),
        ("5. LLM Semantic\nComparison", 6.8, 4.5),
        ("6. Escalation\nGate", 8.3, 4.5),
        ("7. Evidence\nReport Assembly", 9.8, 4.5),
        ("8. Human Review\n& Audit Desk", 11.3, 4.5),
    ]

    for label, x, y in stages:
        box = patches.FancyBboxPatch((x-0.6, y-0.6), 1.2, 1.2, boxstyle="round,pad=0.08",
                                     edgecolor='#00E5FF', facecolor='#0D1B2A', linewidth=1.5)
        ax.add_patch(box)
        ax.text(x, y, label, ha='center', va='center', color='#FFFFFF', fontsize=7.5, fontweight='bold')

    # Arrows for main pipeline
    for i in range(len(stages)-1):
        x1 = stages[i][1] + 0.6
        x2 = stages[i+1][1] - 0.6
        y = 4.5
        ax.annotate('', xy=(x2, y), xytext=(x1, y),
                    arrowprops=dict(arrowstyle="->", color='#00E5FF', lw=1.5))

    # Bounded Agent Branch (Violet Box at bottom)
    agent_box = patches.FancyBboxPatch((4.5, 1.2), 6.0, 1.8, boxstyle="round,pad=0.1",
                                      edgecolor='#A855F7', facecolor='#1F1035', linewidth=2)
    ax.add_patch(agent_box)
    ax.text(7.5, 2.6, "BOUNDED INVESTIGATION AGENT (Conditional Violet Branch)", 
            ha='center', va='center', color='#D8B4FE', fontsize=9.5, fontweight='bold')
    
    steps = [
        "1. Passage Retrieval",
        "2. Chronology Check",
        "3. Precedence (Sec F.4)",
        "4. Missing Records Audit",
        "5. Evidence Dossier"
    ]
    for i, step in enumerate(steps):
        bx = 5.0 + i*1.05
        s_box = patches.FancyBboxPatch((bx-0.45, 1.5), 0.9, 0.7, boxstyle="round,pad=0.04",
                                       edgecolor='#A855F7', facecolor='#2E1253', linewidth=1)
        ax.add_patch(s_box)
        ax.text(bx, 1.85, step.replace(" ", "\n", 1), ha='center', va='center', color='#F3E8FF', fontsize=6.5)

    # Conditional branch arrows from Gate (Stage 6) to Agent and back to Report (Stage 7)
    ax.annotate('Variance > 25% OR\nDate Delta > 14d', xy=(8.3, 3.0), xytext=(8.3, 3.9),
                ha='center', va='center', color='#E879F9', fontsize=7.5, fontweight='bold',
                arrowprops=dict(arrowstyle="->", color='#A855F7', lw=1.5, ls='--'))
    
    ax.annotate('Source-Linked Findings', xy=(9.8, 3.9), xytext=(9.8, 3.0),
                ha='center', va='center', color='#A855F7', fontsize=7.5, fontweight='bold',
                arrowprops=dict(arrowstyle="->", color='#A855F7', lw=1.5))

    # Governance Principle Banner
    p_box = patches.FancyBboxPatch((2.0, 0.2), 8.0, 0.6, boxstyle="round,pad=0.05",
                                   edgecolor='#334155', facecolor='#0F172A', linewidth=1)
    ax.add_patch(p_box)
    ax.text(6.0, 0.5, "Principle: \"Pipeline first. Agent when needed. Human judgment for the final decision.\"",
            ha='center', va='center', color='#38BDF8', fontsize=8.5, fontstyle='italic')

    ax.set_xlim(0, 12.2)
    ax.set_ylim(0, 7)
    plt.tight_layout()
    plt.savefig('project-report/figures/fig3_1_system_architecture.png', dpi=300, facecolor=fig.get_facecolor())
    plt.close()

# 2. Context DFD (Level 0)
def create_dfd_level0():
    fig, ax = plt.subplots(figsize=(10, 5), dpi=300)
    ax.set_facecolor('#FFFFFF')
    fig.patch.set_facecolor('#FFFFFF')
    ax.axis('off')

    ax.text(5, 4.6, "Data Flow Diagram — Level 0 (Context Level)", 
            ha='center', va='center', color='#0F172A', fontsize=14, fontweight='bold')

    # Entities
    entities = [
        ("Broker /\nRisk Manager", 1.5, 2.5),
        ("Insurance Carrier /\nUnderwriter", 8.5, 2.5),
    ]
    for name, x, y in entities:
        box = patches.Rectangle((x-1.0, y-0.7), 2.0, 1.4, edgecolor='#1E293B', facecolor='#F1F5F9', lw=1.5)
        ax.add_patch(box)
        ax.text(x, y, name, ha='center', va='center', color='#0F172A', fontsize=9, fontweight='bold')

    # Central System Process
    p_box = patches.Circle((5, 2.5), 1.3, edgecolor='#0284C7', facecolor='#E0F2FE', lw=2)
    ax.add_patch(p_box)
    ax.text(5, 2.65, "0.0\nCoverage Truth\nLayer System", ha='center', va='center', color='#0369A1', fontsize=9.5, fontweight='bold')

    # Flows
    ax.annotate('Broker Quotes & Binders', xy=(3.7, 2.8), xytext=(2.5, 2.8),
                arrowprops=dict(arrowstyle="->", color='#0284C7', lw=1.5), fontsize=8, ha='center', va='bottom')
    ax.annotate('Coverage Alerts & Reports', xy=(2.5, 2.2), xytext=(3.7, 2.2),
                arrowprops=dict(arrowstyle="->", color='#64748B', lw=1.2), fontsize=8, ha='center', va='top')

    ax.annotate('Issued Policies & Endorsements', xy=(6.3, 2.8), xytext=(7.5, 2.8),
                arrowprops=dict(arrowstyle="<-", color='#0284C7', lw=1.5), fontsize=8, ha='center', va='bottom')
    ax.annotate('Review Dispositions & Audits', xy=(7.5, 2.2), xytext=(6.3, 2.2),
                arrowprops=dict(arrowstyle="->", color='#16A34A', lw=1.5), fontsize=8, ha='center', va='top')

    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    plt.tight_layout()
    plt.savefig('project-report/figures/fig3_2_dfd_level0.png', dpi=300)
    plt.close()

# 3. DFD Level 1
def create_dfd_level1():
    fig, ax = plt.subplots(figsize=(11, 7), dpi=300)
    ax.set_facecolor('#FFFFFF')
    fig.patch.set_facecolor('#FFFFFF')
    ax.axis('off')

    ax.text(5.5, 6.5, "Data Flow Diagram — Level 1 (Decomposition)", 
            ha='center', va='center', color='#0F172A', fontsize=14, fontweight='bold')

    processes = [
        ("1.0 Ingest &\nChecksum", 1.8, 4.8),
        ("2.0 Extract &\nAlign Facts", 5.5, 4.8),
        ("3.0 Reconcile &\nDetect Gaps", 9.2, 4.8),
        ("4.0 Bounded Agent\nInvestigation", 9.2, 2.0),
        ("5.0 Review Triage\n& Audit Logging", 3.5, 2.0),
    ]

    for name, x, y in processes:
        box = patches.Circle((x, y), 0.9, edgecolor='#0284C7', facecolor='#F0F9FF', lw=1.5)
        ax.add_patch(box)
        ax.text(x, y, name, ha='center', va='center', color='#0369A1', fontsize=7.5, fontweight='bold')

    # Data Stores
    d1 = patches.Rectangle((4.5, 3.2), 2.0, 0.5, edgecolor='#475569', facecolor='#F8FAFC', lw=1)
    ax.add_patch(d1)
    ax.text(5.5, 3.45, "D1: Document Corpus ASTs", ha='center', va='center', color='#334155', fontsize=7, fontfamily='monospace')

    d2 = patches.Rectangle((4.5, 0.8), 2.0, 0.5, edgecolor='#475569', facecolor='#F8FAFC', lw=1)
    ax.add_patch(d2)
    ax.text(5.5, 1.05, "D2: Audit Ledger (LocalStorage)", ha='center', va='center', color='#334155', fontsize=7, fontfamily='monospace')

    # Connectors
    ax.annotate('Raw PDFs/Text', xy=(0.9, 4.8), xytext=(0.2, 4.8), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('AST Tokens', xy=(4.6, 4.8), xytext=(2.7, 4.8), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('Structured Facts', xy=(8.3, 4.8), xytext=(6.4, 4.8), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('Chronological Ambiguity', xy=(9.2, 2.9), xytext=(9.2, 3.9), arrowprops=dict(arrowstyle="->", color='#9333EA', lw=1.2))
    ax.annotate('Dossier Findings', xy=(4.4, 2.0), xytext=(8.3, 2.0), arrowprops=dict(arrowstyle="->", color='#9333EA', lw=1.2))
    ax.annotate('Log Event', xy=(5.5, 1.3), xytext=(3.5, 1.4), arrowprops=dict(arrowstyle="->", color='#16A34A', lw=1.2))

    ax.set_xlim(0, 11)
    ax.set_ylim(0, 7)
    plt.tight_layout()
    plt.savefig('project-report/figures/fig3_3_dfd_level1.png', dpi=300)
    plt.close()

# 4. UML Use Case Diagram
def create_uml_usecase():
    fig, ax = plt.subplots(figsize=(10, 6), dpi=300)
    ax.set_facecolor('#FFFFFF')
    fig.patch.set_facecolor('#FFFFFF')
    ax.axis('off')

    ax.text(5, 5.5, "UML Use Case Diagram — Coverage Truth Layer", 
            ha='center', va='center', color='#0F172A', fontsize=13, fontweight='bold')

    # Boundary Box
    b_box = patches.Rectangle((2.8, 0.4), 4.8, 4.6, edgecolor='#0284C7', facecolor='#F8FAFC', lw=1.5, ls='--')
    ax.add_patch(b_box)
    ax.text(5.2, 4.75, "System Boundary: Coverage Truth Layer", ha='center', va='center', color='#0369A1', fontsize=9, fontweight='bold')

    # Actor Left: Risk Manager / Underwriter
    ax.plot([1.2, 1.2], [3.0, 3.4], color='#0F172A', lw=2) # body
    ax.plot([1.2], [3.6], marker='o', markersize=14, color='#0F172A') # head
    ax.plot([0.9, 1.5], [3.2, 3.2], color='#0F172A', lw=2) # arms
    ax.plot([1.2, 0.9], [3.0, 2.5], color='#0F172A', lw=2) # leg
    ax.plot([1.2, 1.5], [3.0, 2.5], color='#0F172A', lw=2) # leg
    ax.text(1.2, 2.2, "Underwriter /\nRisk Reviewer", ha='center', va='center', color='#0F172A', fontsize=8, fontweight='bold')

    # Actor Right: System / Agent
    ax.plot([8.8, 8.8], [3.0, 3.4], color='#9333EA', lw=2)
    ax.plot([8.8], [3.6], marker='s', markersize=12, color='#9333EA')
    ax.plot([8.5, 9.1], [3.2, 3.2], color='#9333EA', lw=2)
    ax.plot([8.8, 8.5], [3.0, 2.5], color='#9333EA', lw=2)
    ax.plot([8.8, 9.1], [3.0, 2.5], color='#9333EA', lw=2)
    ax.text(8.8, 2.2, "Autonomous\nInvestigation Agent", ha='center', va='center', color='#9333EA', fontsize=8, fontweight='bold')

    use_cases = [
        ("Upload Insurance Contracts", 5.2, 4.2),
        ("Run 8-Stage Reconciliation", 5.2, 3.4),
        ("Inspect Side-by-Side Wording Diff", 5.2, 2.6),
        ("Verify Character-Level Citations", 5.2, 1.8),
        ("Execute Human Review Disposition", 5.2, 1.0),
    ]

    for uc, x, y in use_cases:
        ellipse = patches.Ellipse((x, y), 3.2, 0.55, edgecolor='#0284C7', facecolor='#E0F2FE', lw=1.2)
        ax.add_patch(ellipse)
        ax.text(x, y, uc, ha='center', va='center', color='#0F172A', fontsize=7.5, fontweight='bold')

    # Lines from Underwriter to use cases
    for _, x, y in use_cases:
        ax.plot([1.6, x-1.6], [3.2, y], color='#64748B', lw=1)

    # Line from Agent to Deep Verification
    ax.plot([8.4, 5.2+1.6], [3.2, 2.6], color='#A855F7', lw=1.2, ls='--')
    ax.plot([8.4, 5.2+1.6], [3.2, 3.4], color='#A855F7', lw=1.2, ls='--')

    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6)
    plt.tight_layout()
    plt.savefig('project-report/figures/fig3_4_uml_use_case.png', dpi=300)
    plt.close()

# 5. Methodology Flowchart
def create_methodology_flowchart():
    fig, ax = plt.subplots(figsize=(10, 8), dpi=300)
    ax.set_facecolor('#FFFFFF')
    fig.patch.set_facecolor('#FFFFFF')
    ax.axis('off')

    ax.text(5, 7.6, "Coverage Truth Layer — Processing Methodology Flowchart", 
            ha='center', va='center', color='#0F172A', fontsize=13, fontweight='bold')

    steps = [
        ("Document Intake (Quote BQ, Policy POL, Endorsement END)", 5, 7.0, 'rect'),
        ("SHA-256 Checksumming & Legal Clause Tokenization", 5, 6.1, 'rect'),
        ("Coverage Fact Extraction with Character Coordinates", 5, 5.2, 'rect'),
        ("Chronology Alignment & Date Delta Matrix", 5, 4.3, 'rect'),
        ("Deterministic Variance & Sub-Limit Check", 5, 3.4, 'rect'),
        ("Variance > 25% OR Date Delta > 14 Days?", 5, 2.3, 'diamond'),
        ("Bounded Agent Investigation (Precedence & Signatures)", 8.2, 1.4, 'rect_violet'),
        ("Package Evidence-Backed Report", 5, 1.2, 'rect'),
        ("Human Underwriter Review & Audit Ledger Persistence", 5, 0.4, 'rect_green'),
    ]

    for label, x, y, shape in steps:
        if shape == 'rect':
            b = patches.FancyBboxPatch((x-2.2, y-0.3), 4.4, 0.6, boxstyle="round,pad=0.05",
                                       edgecolor='#0284C7', facecolor='#F0F9FF', lw=1.2)
            ax.add_patch(b)
            ax.text(x, y, label, ha='center', va='center', color='#0F172A', fontsize=7.5, fontweight='bold')
        elif shape == 'rect_violet':
            b = patches.FancyBboxPatch((x-1.6, y-0.35), 3.2, 0.7, boxstyle="round,pad=0.05",
                                       edgecolor='#A855F7', facecolor='#FDF4FF', lw=1.5)
            ax.add_patch(b)
            ax.text(x, y, label.replace("(", "\n("), ha='center', va='center', color='#7E22CE', fontsize=7, fontweight='bold')
        elif shape == 'rect_green':
            b = patches.FancyBboxPatch((x-2.2, y-0.25), 4.4, 0.5, boxstyle="round,pad=0.05",
                                       edgecolor='#16A34A', facecolor='#F0FDF4', lw=1.5)
            ax.add_patch(b)
            ax.text(x, y, label, ha='center', va='center', color='#166534', fontsize=7.5, fontweight='bold')
        elif shape == 'diamond':
            # diamond
            diamond = patches.Polygon([[x, y+0.45], [x+2.2, y], [x, y-0.45], [x-2.2, y]],
                                      closed=True, edgecolor='#F59E0B', facecolor='#FEF3C7', lw=1.5)
            ax.add_patch(diamond)
            ax.text(x, y, label, ha='center', va='center', color='#92400E', fontsize=7.5, fontweight='bold')

    # Arrows
    ax.annotate('', xy=(5, 6.4), xytext=(5, 6.7), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('', xy=(5, 5.5), xytext=(5, 5.8), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('', xy=(5, 4.6), xytext=(5, 4.9), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('', xy=(5, 3.7), xytext=(5, 4.0), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate('', xy=(5, 2.75), xytext=(5, 3.1), arrowprops=dict(arrowstyle="->", lw=1.2))

    # Diamond branches
    ax.annotate('NO (Deterministic)', xy=(5, 1.5), xytext=(5, 1.85),
                ha='center', va='bottom', color='#0284C7', fontsize=7.5, fontweight='bold',
                arrowprops=dict(arrowstyle="->", lw=1.2))
    
    ax.annotate('YES (Escalate)', xy=(8.2, 1.75), xytext=(7.2, 2.3),
                ha='center', va='bottom', color='#A855F7', fontsize=7.5, fontweight='bold',
                arrowprops=dict(arrowstyle="->", color='#A855F7', lw=1.2))

    ax.annotate('Evidence Dossier', xy=(7.2, 1.2), xytext=(8.2, 1.05),
                ha='center', va='top', color='#A855F7', fontsize=7.5, fontweight='bold',
                arrowprops=dict(arrowstyle="->", color='#A855F7', lw=1.2))

    ax.annotate('', xy=(5, 0.65), xytext=(5, 0.9), arrowprops=dict(arrowstyle="->", color='#16A34A', lw=1.5))

    ax.set_xlim(0, 10.5)
    ax.set_ylim(0, 8)
    plt.tight_layout()
    plt.savefig('project-report/figures/fig4_1_methodology_flowchart.png', dpi=300)
    plt.close()

if __name__ == '__main__':
    create_architecture_diagram()
    create_dfd_level0()
    create_dfd_level1()
    create_uml_usecase()
    create_methodology_flowchart()
    print("All report diagrams generated successfully.")
