import type { ResourceLink } from '../types'
import { LINKS, doc, cookbook, tool, article } from './links'

export const PROGRAM = {
  title: 'Claude FDE Academy — Data & AI',
  subtitle: 'The 8-week intensive · Forward Deployed Engineers for Data & AI teams',
  org: 'Wipro × Anthropic · AI Center of Excellence',
  meta: [
    { k: 'Cohort', v: 'Data & AI engineers → certified Claude FDEs' },
    { k: 'Pace', v: '~7 hrs/day · 5 days/week · 8 weeks (~320 hrs)' },
    { k: 'Assumes', v: 'Python · ML basics · Git · notebooks/data pipelines' },
    { k: 'Outcome', v: 'A shipped, governed Claude agent over real data + a reference' },
  ],
  mottos: [
    'Agents do work · people govern',
    'You know ML — now orchestrate models',
    'Ground & cite over recall',
    'Measure with evals, not vibes',
  ],
}

export const CADENCES = [
  {
    tag: 'Recommended · Intensive',
    title: '8 weeks · ~320 hrs',
    body: 'This track. For Data & AI engineers already fluent in Python, ML and Git — moves fast on fundamentals, deep on RAG, evals, agents and governance, capstone folded in.',
    bullets: ['Fastest route to a deployable Data-&-AI FDE', 'Two modules/week · Friday ship', 'Every lab framed on data/ML use cases'],
    highlight: true,
  },
  {
    tag: 'Jumpstart',
    title: '2 weeks · ~70 hrs',
    body: 'A leadership / architect taster: the model family, prompting, structured output, RAG, and one governed agent — enough to scope and sponsor work.',
    bullets: ['Orientation, not certification', 'Great before sponsoring a pod'],
    highlight: false,
  },
  {
    tag: 'Comprehensive',
    title: '16 weeks · ~560 hrs',
    body: 'The full-stack path (separate portal) — adds Experience, Adoption & Delivery-craft weeks and a two-week embed capstone. Best for engineers new to agentic AI.',
    bullets: ['Every layer, more delivery craft', 'Use when the fundamentals need more time'],
    highlight: false,
  },
]

export const FDE_DEFS = [
  {
    kicker: 'Embedded & outcome-led',
    title: 'Ship agents, not notebooks',
    body: 'Measured on value realised and agents in production — not experiments or accuracy on a holdout set. Closes the POC-to-production gap.',
  },
  {
    kicker: 'Full-stack Claude',
    title: 'Every layer, end to end',
    body: 'Experience, Agents, Models, Context Engine, Developer Platform, Enterprise Data — wrapped in always-on Trust, Security & Governance.',
  },
  {
    kicker: 'Code Monday, CXO Friday',
    title: 'Engineer + consultant',
    body: "Builds the agent over the client's data, then defends the business case, the ROI, and the guardrails to the CISO/CDO and CFO.",
  },
]

// ── Full-stack reference architecture ──────────────────────────────────────
export interface ArchLayer {
  key: string
  num: string
  name: string
  weeks: string
  cells: string[]
  color: string
  colorB: string
}

export const ARCH_LAYERS: ArchLayer[] = [
  { key: 'L1', num: '01', name: 'Experience & Engagement', weeks: 'Wk 6', cells: ['Chat', 'Claude Code', 'Cowork', 'Claude in Excel', 'Artifacts'], color: '#cc6a44', colorB: '#e0855f' },
  { key: 'L2', num: '02', name: 'Agents & Orchestration', weeks: 'Wk 6', cells: ['Agent SDK', 'Orchestration', 'Subagents', 'Skills', 'Tool Use'], color: '#7a3ea0', colorB: '#9257bd' },
  { key: 'L3', num: '03', name: 'Model Family & Intelligence', weeks: 'Wk 1·3', cells: ['Opus 4.8', 'Sonnet 4.6', 'Haiku 4.5', '1M Context', 'Vision'], color: '#c8266f', colorB: '#dc4d8c' },
  { key: 'L4', num: '04', name: 'Context Engine', weeks: 'Wk 5', cells: ['RAG', 'Vector Stores', 'MCP Connectors', 'Memory', 'Citations'], color: '#2ba0b0', colorB: '#3cb9c9' },
  { key: 'L5', num: '05', name: 'Developer Platform & Integration', weeks: 'Wk 1·7', cells: ['Messages API', 'MCP', 'SDKs', 'WIF', 'Bedrock / Vertex / Foundry'], color: '#3f3a8c', colorB: '#5751ad' },
  { key: 'L6', num: '06', name: 'Enterprise Data & Systems', weeks: 'Wk 4', cells: ['Warehouses', 'dbt / Feature store', 'Salesforce', 'ServiceNow', 'SharePoint'], color: '#6a5170', colorB: '#836a89' },
]

export const GOV_ITEMS = ['Identity', 'Security · ZDR', 'Privacy · PII', 'Observability', 'FinOps']
export const BUSINESS_OUTCOMES = ['Faster delivery', 'Cost capacity', 'Revenue mix', 'Rev / employee', 'Trust', 'Innovation']

// ── CoE pillars, engine, ladder ────────────────────────────────────────────
export const PILLARS = [
  { k: 'WIN', v: 'Sales, pre-sales & growth — solutioning & POCs' },
  { k: 'DELIVER', v: 'Delivery & governance — standards, guardrails, quality gates' },
  { k: 'BUILD', v: 'Solutions & reusable IP — templates & accelerators' },
  { k: 'INNOVATE', v: 'R&D & ecosystem — frontier radar & pilots' },
  { k: 'ENABLE', v: 'Talent, FDEs & certification — this Academy' },
]

export const ENGINE = ['Discover', 'Prioritize', 'Business-case', 'Build', 'Scale', 'Shift']

export const LADDER = [
  { k: 'Assist', v: 'Copilots draft & suggest', cls: 'r1' },
  { k: 'Augment', v: 'Agents do multi-step work', cls: 'r2' },
  { k: 'Automate', v: 'Agents own a workflow', cls: 'r3' },
  { k: 'Autonomous', v: 'Agents run, humans govern', cls: 'r4' },
]

// ── Belt ladder (compressed to 8 weeks) ────────────────────────────────────
export const BELTS = [
  { grad: 'linear-gradient(90deg,#c9c2b4,#e6e0d4)', name: 'White · Foundations', desc: 'FDE motion, Messages API, models, structured output & first evals', weeks: 'Week 1' },
  { grad: 'linear-gradient(90deg,#e0a92e,#efc76a)', name: 'Yellow · Build & Prompt', desc: 'Claude Code, prompting depth, model economics & long context', weeks: 'Weeks 2–3' },
  { grad: 'linear-gradient(90deg,#cc6a44,#e0855f)', name: 'Orange · Tools & Context', desc: 'Tool use, MCP to data systems, RAG, embeddings & memory', weeks: 'Weeks 4–5' },
  { grad: 'linear-gradient(90deg,#4f8a3a,#6fae54)', name: 'Green · Agents', desc: 'Agent SDK, Skills, orchestration & multi-agent', weeks: 'Week 6' },
  { grad: 'linear-gradient(90deg,#2ba0b0,#3cb9c9)', name: 'Blue · Trust & Platform', desc: 'Evals at scale, red-team, RBAC/ZDR, deploy & FinOps', weeks: 'Week 7' },
  { grad: 'linear-gradient(90deg,#2a2320,#4a3f38)', name: 'Black · Practitioner', desc: 'Capstone embed — discovered, built, proven & presented', weeks: 'Week 8' },
  { grad: 'linear-gradient(90deg,#c8266f,#cc6a44)', name: 'Claude Ready · FDE', desc: 'Full Data & AI specialization — deployable on the bench', weeks: 'Graduation' },
]

// ── Ground rules ───────────────────────────────────────────────────────────
export const RULES = [
  { h: 'Explain every line', p: "Never ship code — yours or Claude's — that you can't explain. Ask 'explain this' until you can." },
  { h: 'Measure, don’t vibe', p: 'You already trust eval metrics — apply the same rigor here. From Week 1, no prompt/model change ships without an eval number; from Week 7, deploys are gated on it.' },
  { h: 'Govern from the first prompt', p: 'ZDR, RBAC, identity, PII handling and eval gates are configured before go-live — not bolted on. Trust wraps every layer.' },
  { h: 'Ground & cite', p: 'For anything factual, prefer retrieval + citations over the model’s memory. Give users sources and lineage they can verify.' },
  { h: 'Agentify to the right rung', p: 'Assist → Augment → Automate → Autonomous. Target the next rung where value is highest — not maximum autonomy for its own sake.' },
  { h: 'Business-case everything', p: 'Value × feasibility, ROI & payback, confidence band. If it doesn’t pencil, it doesn’t ship.' },
  { h: 'Build once, reuse everywhere', p: 'Harvest every engagement into a reusable template so the next client starts at 70% done.' },
  { h: 'Design for handover', p: 'An FDE leaves the client able to run it — and leaves a published reference behind.' },
]

// ── One-time setup ─────────────────────────────────────────────────────────
export interface SetupCard {
  title: string
  role: string
  steps: string[]
  links?: ResourceLink[]
}

export const SETUP: SetupCard[] = [
  {
    title: 'Anthropic Console + API key',
    role: 'Your platform',
    steps: [
      'Get Console access + an API key from your pod lead (with a spend limit).',
      'Bookmark `docs.anthropic.com` and the Anthropic Cookbook.',
      'Confirm your workspace + which models are enabled.',
    ],
    links: [LINKS.console, LINKS.quickstart, cookbook('Anthropic Cookbook')],
  },
  {
    title: 'Claude Code',
    role: 'Week 2',
    steps: [
      'Install Claude Code (CLI) + the IDE extension.',
      'Authenticate; run it on a sample repo/notebook project.',
      'Enable Git + a repo `claude-fde`.',
    ],
    links: [LINKS.claudeCode, doc('Install Claude Code', 'docs/claude-code/setup')],
  },
  {
    title: 'Python / TS + SDK',
    role: 'The build stack',
    steps: [
      'Python 3.11+ (or Node 20+); a virtualenv (you likely have this already).',
      '`pip install anthropic` (or `npm i @anthropic-ai/sdk`), plus an MCP SDK.',
      'Verify a first Messages API call.',
    ],
    links: [
      tool('anthropic-sdk-python', 'https://github.com/anthropics/anthropic-sdk-python', 'GitHub'),
      tool('anthropic-sdk-typescript', 'https://github.com/anthropics/anthropic-sdk-typescript', 'GitHub'),
    ],
  },
  {
    title: 'Data sandbox',
    role: 'Weeks 4–5',
    steps: [
      'Read-only creds to a warehouse/DB (Snowflake/BigQuery/Postgres) or a sample dataset.',
      'A vector store (pgvector / a managed store) for RAG.',
      'A document/knowledge set to index (docs, dbt models, a data catalog).',
    ],
    links: [article('modelcontextprotocol.io', 'https://modelcontextprotocol.io/introduction', 'MCP'), tool('pgvector', 'https://github.com/pgvector/pgvector', 'GitHub')],
  },
  {
    title: 'Governance & secrets',
    role: 'Week 7',
    steps: [
      'Know your ZDR / data-handling, PII and Responsible-AI policy.',
      'A secret store for keys; never commit them.',
      "Read Anthropic's usage policies & safety guidance.",
    ],
    links: [LINKS.aup, LINKS.privacy, LINKS.rsp],
  },
  {
    title: 'Deployment targets',
    role: 'Week 7',
    steps: [
      'Console/Messages API access; optionally Claude on Bedrock or Vertex (near your data).',
      'WIF / workload identity for keyless auth.',
      'An observability sink (logs/metrics/traces).',
    ],
    links: [LINKS.bedrock, LINKS.vertex],
  },
  {
    title: 'Delivery & IP',
    role: 'Week 8',
    steps: [
      'Access to the CoE reusable-IP / template library.',
      'A value / cost-per-outcome sheet template.',
      'A data/AI use case (analytics, MLOps, data quality, governance) to anchor the capstone.',
    ],
  },
]

// ── Capability map (8 modules) ─────────────────────────────────────────────
export const CAPABILITY_MAP = [
  { code: 'FND-D100', cap: 'Claude foundations for Data & AI — Messages API, models, structured output & first evals', wk: 1, belt: 'White · Foundations' },
  { code: 'DEV-D150', cap: 'AI-native engineering with Claude Code — notebooks → tested modules', wk: 2, belt: 'Yellow' },
  { code: 'MDL-D200', cap: 'Prompting depth, model economics/FinOps & long context vs RAG', wk: 3, belt: 'Yellow · Prompting' },
  { code: 'TOOL-D400', cap: 'Tool use & the Model Context Protocol — hands on data systems', wk: 4, belt: 'Orange' },
  { code: 'CTX-D500', cap: 'Context Engine — RAG, embeddings, citations, memory & governed data', wk: 5, belt: 'Orange · Context' },
  { code: 'AGT-D700', cap: 'Agents — Agent SDK, Skills, orchestration & multi-agent', wk: 6, belt: 'Green · Agents' },
  { code: 'GOV-D1000', cap: 'Trust, governance, platform & FinOps — evals, red-team, RBAC/ZDR, deploy', wk: 7, belt: 'Blue' },
  { code: 'CAP-D1400', cap: 'Capstone — discover, build, evaluate, govern, prove & present', wk: 8, belt: 'Black · Claude Ready' },
]

// ── Assessment rubric ──────────────────────────────────────────────────────
export const ASSESSMENT = [
  { dim: 'Understanding', good: 'Explains model behaviour and the full-stack Claude architecture, and can defend the design + business case to a CISO/CDO and CFO.', weight: '20%' },
  { dim: 'Daily “done” & SDLC', good: 'Each day’s Done-when is met; Fridays ship; commits are daily; changes pass the AI-native review + test gates.', weight: '15%' },
  { dim: 'Evaluation rigor', good: 'Uses evals, LLM-as-judge, and gates; no change ships without a score.', weight: '15%' },
  { dim: 'Trust & governance', good: 'Applies evals, red-teaming, RBAC/ZDR, PII handling, Responsible-AI review; trust configured from the first prompt.', weight: '15%' },
  { dim: 'Adoption & value', good: 'Ships an adoption plan + a business case + cost-per-outcome value proof — the agent is used, not just deployed.', weight: '15%' },
  { dim: 'Capstone & delivery', good: 'A deployed, governed, evaluated, adopted Claude agent over real data — discovered, business-cased, shipped, referenced, and presented.', weight: '20%' },
]

// ── Mentor playbook ────────────────────────────────────────────────────────
export const MENTOR = [
  { h: 'Daily standup (15 min)', p: "Ask 'show me today's Done-when'. Have them run it live. Ask one 'why' about a design choice or a model behaviour." },
  { h: 'Don’t give answers', p: "When stuck: 'what have you tried?' and 'what does the error/eval say?'. Point to the day's Anthropic docs link. Rescue after ~20 min of real struggle." },
  { h: 'Friday ship review', p: "Friday's ship is the belt checkpoint — review the repo, run it, and confirm it cleared the review + eval gates." },
  { h: 'Guard the rigor habit', p: "From Week 1, ask 'what's the eval number?'. From Week 7, ask 'evals, red-team, RBAC, ZDR, PII — done?'. No claims without evidence." },
  { h: 'Leverage their ML instincts', p: 'This cohort knows train/test splits, metrics and overfitting. Map those instincts: eval sets, LLM-as-judge, recall@k, and "don’t tune on the test set" (golden evals).' },
  { h: 'Business-case everything', p: 'From Week 7, make them present the value story to a skeptical CFO and a cautious CISO/CDO. Every win becomes a reference and reusable IP.' },
]

// ── Prompt & command library ───────────────────────────────────────────────
export const PROMPT_LIBRARY = [
  { cat: 'Learn a concept', prompt: 'Explain <topic> to a data/ML engineer new to Claude, with an analogy to an ML concept I know and a Python example using the Messages API, then a 3-question quiz.' },
  { cat: 'NL → SQL (safe)', prompt: 'Given this warehouse schema, write a read-only SQL query for: "<question>". Return the SQL, assumptions, and how you would validate it before running.' },
  { cat: 'Design an eval', prompt: 'Given this task and 3 example outputs, propose an evaluation approach (metrics + 10 cases) and an LLM-as-judge rubric I can run — treat it like an ML eval set.' },
  { cat: 'Notebook → module', prompt: 'Refactor this notebook cell into a tested Python module: extract functions, add type hints, and generate pytest cases including the edge cases I probably missed.' },
  { cat: 'Understand a pipeline', prompt: 'Map this dbt/SQL/airflow project in plain English: sources, key models, lineage, and the 3 riskiest places to change.' },
  { cat: 'Design review', prompt: 'Here’s my Claude + RAG architecture for <use case>. What are the failure modes, the injection/PII/ZDR risks, and the simplest design that still works?' },
  { cat: 'Red-team', prompt: 'Act as an attacker. Given this agent’s tools and a document/record I control, craft a prompt-injection attempt — then how to block it.' },
  { cat: 'Business case', prompt: "Turn this agent's telemetry into a business case a CFO would fund: inputs, value, ROI & payback, and a conservative/base/aggressive confidence band." },
]

// ── Capstone / IP ideas (Data & AI) ────────────────────────────────────────
export const CAPSTONE_IDEAS = [
  { vertical: 'Analytics & BI', ideas: 'NL-to-SQL agent with query validation over the warehouse · analytics copilot grounded in the data catalog/dbt docs · automated insight & anomaly summariser with citations' },
  { vertical: 'Data engineering', ideas: 'Pipeline-incident RCA agent over logs + lineage · data-quality / expectations agent · dbt model + documentation generator' },
  { vertical: 'ML / MLOps', ideas: 'Experiment-run summariser & model-card generator · eval-harness (LLM-as-judge) copilot · feature documentation agent from schemas' },
  { vertical: 'Governance & knowledge', ideas: 'RAG over data-governance/policy with citations & lineage · PII classification & triage agent · schema-aware data-dictionary agent' },
]

export const OPERATING_SHIFT = [
  { dim: 'Delivery model', from: 'People doing tasks', to: 'Agents doing work, people governing' },
  { dim: 'Org shape', from: 'Tall pyramid, junior leverage', to: 'Flatter, expert-heavy, agent-leveraged' },
  { dim: 'Commercial model', from: 'Effort & time-and-materials', to: 'Outcome, per-transaction & platform' },
  { dim: 'Talent model', from: 'Hire to grow capacity', to: 'Certify to multiply capacity' },
  { dim: 'Cost base', from: 'Scales with headcount', to: 'Scales with consumption, not heads' },
  { dim: 'Value measure', from: 'Utilisation & billed hours', to: 'Revenue per employee & outcomes' },
]

export const NORTH_STARS = [
  '~$500M value realised (3 yrs)',
  '10,000+ MAU adoption (60%+ WAU)',
  'a 10,000-SME certified bench',
  'Global Premier partner tier',
]
