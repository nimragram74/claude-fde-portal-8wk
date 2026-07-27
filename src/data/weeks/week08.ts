import type { Week } from '../../types'
import { LINKS, article, webSearch, courseraSearch, ytSearch } from '../links'

const week: Week = {
  id: 8,
  code: 'CAP-D1400 · Capstone',
  title: 'Capstone — discover, build, prove & present',
  goal: 'Run a full simulated embed in one week on a Data & AI use case — e.g. an NL-to-SQL analytics agent, a data-quality agent, a pipeline-RCA agent, or RAG over the data catalog. Discover and business-case it, build it grounded and cited, evaluate and govern it, deploy and prove cost-per-outcome, then publish a reference and present a demo.',
  layer: 'End-to-end · all layers',
  belt: 'Black (Claude Ready)',
  beltColor: '#4a3f38',
  accent: '#c8266f',
  shipTitle: 'A deployed, governed, evaluated Data/AI agent + value proof + reference',
  outcomes: [
    'Discover, prioritize on value × feasibility, and business-case a Data/AI agent into an approved charter',
    'Build a grounded, cited agent over real data by composing your Weeks 1-6 blocks, traced from the first run',
    'Prove quality with a 12-20 case eval set + gate and harden it against injection with RBAC/ZDR/PII controls',
    'Deploy behind a CI eval gate and prove value as cost-per-outcome against a measured manual baseline',
    'Publish a one-page reference + a reusable IP asset and present a 12-minute demo with a runbook handover',
  ],
  resources: [
    LINKS.agentSdk,
    LINKS.evals,
    article('Anthropic customer stories', 'https://www.anthropic.com/customers', 'Anthropic'),
    courseraSearch('AI business case ROI value realization', 'Coursera: business case, ROI & value realization'),
    webSearch('cost per outcome AI agent ROI baseline value proof', 'Search: cost-per-outcome & value proof'),
  ],
  days: [
    {
      id: '8.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'Discover, prioritize & business-case — the capstone charter',
      learn: {
        intro:
          'The capstone is a **simulated embed**, not a blank page. Day 1 is the consulting half: discover the quantified pain, **prioritize** candidate agents on value × feasibility, business-case the winner, and lock a charter. Anchor on a Data & AI use case — NL-to-SQL analytics, a data-quality agent, pipeline-RCA, or RAG over the data catalog.',
        steps: [
          'Discover: interview for pain, quantify it (who waits, how often, minutes per task, loaded cost), and separate the real problem from the stated ask.',
          'Prioritize your candidate agents on a value × feasibility 2×2 — **Do-now** (high/high), **Plan** (high value/low feasibility), **Fill-in** (low value/high feasibility), **Park** (low/low) — and fund the Do-now pick.',
          'Business-case it: seats × time saved × loaded cost = annual value; net against token + build + enablement cost, and attach a conservative/base/aggressive confidence band.',
          'Write the charter: the agent(s), minimum architecture, 5 success metrics, data source, and a governance + adoption plan.',
        ],
        resources: [
          LINKS.effectiveAgents,
          article('Claude for the enterprise', 'https://www.anthropic.com/claude', 'Anthropic'),
          courseraSearch('AI business case ROI payback confidence band', 'Coursera: business case, ROI & payback'),
          webSearch('value vs feasibility 2x2 prioritization matrix AI use case', 'Search: value × feasibility 2×2 matrix'),
          ytSearch('AI use case discovery prioritization business case workshop', 'YouTube: discovery, prioritization & business case'),
        ],
      },
      lab: {
        title: 'Capstone charter',
        steps: [
          'Pick a Data/AI anchor (NL-to-SQL analytics, data-quality, pipeline-RCA, or RAG over the catalog) and quantify its pain into a value hypothesis.',
          'Score 3-5 candidate agents on the value × feasibility 2×2 and name the Do-now pick with a 3-sentence justification.',
          'Fill in `capstone-charter.md`: agent(s) + ladder rung, minimum architecture, 5 success metrics, data source, and governance + adoption plan.',
          'Get pod-lead sign-off on the charter before any build starts.',
        ],
        doneWhen: 'An approved charter names the Do-now agent, its architecture, 5 metrics, data source, and governance + adoption plan, backed by a value × feasibility call.',
        starter: [
          {
            title: 'capstone-charter.md (template)',
            lang: 'markdown',
            code: "# Capstone Charter — <name>\n\n## Anchor use case\n<e.g. NL-to-SQL analytics agent over the sales warehouse>\n\n## Agent(s) + ladder rung\n1. <agent> — job it owns — Assist / Augment / Automate / Autonomous\n\n## Architecture (minimum stack — only what earns its place)\n<prompts | tools + MCP | RAG over the catalog | Skills>\n\n## 5 success metrics\n1. <quality>  2. <latency>  3. <cost/outcome>  4. <adoption>  5. <value $>\n\n## Data source\n<warehouse / catalog / table scope + who owns access>\n\n## Business case\nseats x time saved x loaded cost = <annual value>; all-in cost = <...>\n\n## Governance + adoption plan\nRBAC | ZDR | HITL for writes; champions, rollout, value-proof owner",
          },
        ],
        hints: [
          'If everything scores high value, your value axis is too coarse — add a dollar estimate to force separation.',
          'If you cannot name the metric that proves value, the scope is still too vague — narrow it.',
        ],
        stretch: [
          'Anchor a vertical (BFSI / Health / Manufacturing / Consumer) and note its domain constraints: regulatory, data sensitivity, residency, HITL.',
          'Draft the Friday demo outline now, so the whole week aims at it.',
        ],
      },
      quiz: [
        {
          q: 'The "Do-now" quadrant on a value × feasibility matrix is…',
          options: ['Low value + low feasibility', 'High value + high feasibility — fund it first', 'High value + low feasibility'],
          answer: 1,
          why: 'Do-now = high value and high feasibility; Plan/Fill-in/Park are sequenced behind it.',
        },
        {
          q: 'A business case is most credible to a CFO when it leads with…',
          options: ['The aggressive scenario', 'The conservative payback with a stated confidence band', 'The model size'],
          answer: 1,
          why: 'Winning on the downside case is far more credible than the best-case projection.',
        },
      ],
      tools: ['Discovery', 'Prioritization', 'Business case'],
      keyTakeaways: [
        'Quantify the pain and prioritize on value × feasibility before you build anything.',
        'The charter — agent, metrics, data, governance — is the brief the whole week executes.',
      ],
    },
    {
      id: '8.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'Build the core agent over real data — grounded, cited, traced',
      learn: {
        intro:
          'The capstone is **integration of tested components**, not new invention. Build the primary agent on the **Agent SDK** by composing your Weeks 1-6 blocks — prompts, tools/MCP, RAG, Skills — over the real data source. Ground every claim with a citation and turn **tracing on from the first run** so debugging and tomorrow’s evals ride on real traces.',
        steps: [
          'Stand up the agent loop: question → retrieve/tools → grounded, cited output; reuse your proven prompts, tool definitions, RAG retriever, and Skills rather than rewriting.',
          'Point the agent at real data (warehouse, catalog, or pipeline logs) via an MCP connector or tool; expose only the tools the job needs (least privilege).',
          'Instrument tracing early — capture each step, tool call, retrieved source, and token usage — and add a step cap + guardrail so the loop terminates safely.',
          'Treat any claim that cannot cite a source as a bug: ground the output on retrieved data, never free-form recall.',
        ],
        resources: [
          LINKS.agentSdk,
          LINKS.citations,
          LINKS.effectiveAgents,
          ytSearch('build agent SDK grounded citations tracing tool use over data', 'YouTube: building a grounded, traced agent'),
        ],
      },
      lab: {
        title: 'Working core agent',
        steps: [
          'Build end-to-end over your charter data source: input → retrieve/tools/agent loop → grounded, **cited** output.',
          'Add guardrails + a step cap; wire tracing so every run is observable.',
          'For an NL-to-SQL anchor, validate generated SQL (read-only, row limits) before execution; for RAG, cite the catalog entries used.',
          'Prove it on **3 real scenarios** drawn from the charter dataset, each with a citation.',
        ],
        doneWhen: 'The agent produces correct, grounded, cited output on 3 real scenarios from the charter data, with tracing on.',
        starter: [
          {
            title: 'reuse-map.txt (compose, do not rewrite)',
            lang: 'text',
            code: "Compose, don't rewrite — reuse your Weeks 1-6 building blocks:\n- system persona + structured / schema-valid output\n- tool definitions + MCP connectors (least privilege)\n- RAG retriever over the data catalog + citations\n- Skills / subagents for specialised sub-tasks\nWire them into an Agent SDK loop; add a step cap + a guardrail; tracing ON.\nGround every claim with a citation.\nSee LINKS.agentSdk for the loop shape and LINKS.citations for grounding.",
          },
        ],
        hints: [
          'If a scenario fails, read the trace first — the failing step is almost always retrieval or a tool arg, not the model.',
          'For NL-to-SQL, never let the agent run un-validated writes: parse + allowlist the SQL, cap rows, and require approval for anything beyond SELECT.',
        ],
        stretch: [
          'Add a cheap-model triage step that only escalates hard questions to Opus, and log the cost delta.',
          'Turn the 3 passing scenarios into the first rows of tomorrow’s eval set.',
        ],
      },
      quiz: [
        {
          q: 'Reusing your earlier-week modules in the capstone is…',
          options: ['Cheating', 'The point — the capstone is integration of tested components', 'Slower than rewriting'],
          answer: 1,
          why: 'Composing proven building blocks is exactly what the capstone rewards.',
        },
        {
          q: 'Turning tracing on from the first run matters because…',
          options: ['It lowers token cost', 'You debug and later build evals on real traces', 'It is decorative'],
          answer: 1,
          why: 'Early traces make debugging and evaluation far easier, and grounding failures visible.',
        },
      ],
      tools: ['Agent SDK', 'RAG', 'MCP connectors'],
      keyTakeaways: [
        'Compose your proven Weeks 1-6 components — integration beats invention.',
        'Ground every claim with a citation and trace from the first run.',
      ],
    },
    {
      id: '8.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'Evaluate, secure & govern — eval gate, red-team, RBAC/ZDR/PII',
      learn: {
        intro:
          'Trust is **always-on** — configured before go-live, not bolted on after. Build a **12-20 case eval set** and gate on it, red-team the agent and its retrieved sources for prompt injection, then put **RBAC, ZDR, and PII** controls in place. Evals give you objective evidence and a lever to improve; record the before/after lift.',
        steps: [
          'Build a 12-20 case eval set from real scenarios (input + expected answer or rubric); record a baseline score and wire a gate that fails the build below threshold.',
          'Red-team the agent and run prompt-injection tests against every tool AND every retrieved source — a poisoned catalog entry is a live attack surface, not just the user turn.',
          'Apply RBAC (who can call which tool / read which table), confirm a ZDR posture, and mask or minimise PII in prompts, logs, and traces.',
          'Improve until the eval score rises, and record the before/after so the lift is measured, not asserted.',
        ],
        resources: [
          LINKS.evals,
          LINKS.jailbreaks,
          LINKS.citations,
          ytSearch('LLM eval set gate red team prompt injection RBAC PII governance', 'YouTube: evals, red-team & governance'),
        ],
      },
      lab: {
        title: 'Quality, safety & governance pass',
        steps: [
          'Assemble a 12-20 case eval set; record a baseline; gate the pipeline on it.',
          'Red-team + injection test the agent and its retrieved data; harden every gap you surface.',
          'Apply RBAC + ZDR + PII masking and write a short RAI note on scope and limits.',
          'Improve the agent until the eval score rises; record before → after.',
        ],
        doneWhen: 'A measured eval lift, a passed red-team/injection test, and RBAC/ZDR/PII controls are all in place.',
        starter: [
          {
            title: 'eval-governance-pass.md (checklist)',
            lang: 'markdown',
            code: "# Eval, security & governance pass — <agent>\n\n## Eval set + gate\n- [ ] 12-20 real cases (input + expected / rubric)\n- [ ] baseline score recorded before tuning\n- [ ] gate fails the build below threshold\n\n## Red-team / injection\n- [ ] injection on the user turn AND retrieved docs / catalog\n- [ ] tool-arg abuse + data-exfil attempts hardened\n\n## Access & data\n- [ ] RBAC: who can call which tool / read which table\n- [ ] ZDR posture confirmed\n- [ ] PII masked / minimised in prompts, logs, traces\n\n## Record the lift\nEval score: before <x> -> after <y>",
          },
        ],
        hints: [
          'Write the eval set before you tune — otherwise you optimise to a moving target.',
          'Split the eval score by scenario type so you can see exactly where the agent is weak.',
        ],
        stretch: [
          'Add a FinOps optimisation (cheaper model tier or prompt caching) and prove the eval score holds.',
          'Add an injection case that hides an instruction inside a retrieved table description and confirm the agent ignores it.',
        ],
      },
      quiz: [
        {
          q: 'Prompt-injection testing must also cover…',
          options: ['Only the user message', 'Retrieved sources — a poisoned document/catalog entry is a live attack surface', 'Nothing but the system prompt'],
          answer: 1,
          why: 'Injected instructions can arrive through retrieved content, not just the user turn.',
        },
        {
          q: 'An eval set + gate turns quality into…',
          options: ['A feeling', 'Measured evidence and a lever to improve, enforced before promotion', 'A one-time check'],
          answer: 1,
          why: 'The gate blocks regressions and the before/after score proves the lift.',
        },
      ],
      tools: ['Evals', 'Red-team', 'RBAC / ZDR / PII'],
      keyTakeaways: [
        'An eval set + gate makes quality measured evidence, not opinion.',
        'Harden injection on retrieved data and put RBAC/ZDR/PII in before go-live — trust is always-on.',
      ],
    },
    {
      id: '8.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Deploy + prove value — CI eval gate, cost-per-outcome, 30/60/90',
      learn: {
        intro:
          'A live agent only counts if it **proves value**. Deploy behind a **CI eval gate** on the Messages API or Bedrock/Vertex, smoke-test the live path, then instrument **cost-per-outcome** against a measured manual baseline. Present the numbers on a one-page value dashboard and lay out a 30/60/90 adoption plan.',
        steps: [
          'Deploy the surface + backend through a pipeline whose CI eval gate only promotes a build that clears the quality bar; source secrets from a store, never code or logs.',
          'Smoke-test the live path end-to-end against the charter scenarios, with auth on the surface and tracing enabled.',
          'Instrument cost-per-outcome — token + infra cost per *completed* outcome, not per call — and compare it to a measured manual baseline (query turnaround, first-pass accuracy).',
          'Build a one-page value dashboard (before/after vs baseline) and a 30/60/90 adoption ramp with a target per stage.',
        ],
        resources: [
          LINKS.messages,
          LINKS.bedrock,
          LINKS.evals,
          webSearch('cost per outcome unit economics AI agent baseline 30 60 90 adoption', 'Search: cost-per-outcome & 30/60/90 adoption'),
          ytSearch('deploy LLM app CI eval gate cost per outcome dashboard', 'YouTube: CI eval-gate deploy & value dashboard'),
        ],
      },
      lab: {
        title: 'Deploy + value dashboard',
        steps: [
          'Deploy behind a CI eval gate with secrets from a secure store and auth on the surface; smoke-test the live path.',
          'Instrument the 3 KPIs + cost-per-outcome on the live deployment and capture numbers vs the measured baseline.',
          'Build the one-page value dashboard showing before/after and cost-per-outcome, reconciled to Monday’s business case.',
          'Draft a 30/60/90 adoption plan with a target for each stage (activate → habit → scale).',
        ],
        doneWhen: 'The agent is live behind an eval gate, smoke-tested, with a value dashboard (KPIs + cost-per-outcome vs baseline) and a 30/60/90 adoption plan.',
        starter: [
          {
            title: 'value-dashboard.md (one-page layout)',
            lang: 'markdown',
            code: "# Value Dashboard — <capstone>   (as of <date>)\n\n## Headline\nCost-per-outcome: $<x>  (manual baseline: $<y>)  ·  Payback: <n> weeks\n\n| KPI                | Baseline | Live now | Delta  | Target  |\n|--------------------|----------|----------|--------|---------|\n| Query turnaround   | 20 min   | 2 min    | -90%   | <= 3min |\n| First-pass correct | 70%      | 92%      | +22pt  | >= 90%  |\n| Cost per outcome   | $5.80    | $0.12    | -98%   | <= $0.50|\n\n## Cost-per-outcome math\n(input_tok + output_tok priced per model) / outcomes_completed = $/outcome\n\n## 30/60/90 adoption ramp\n| Stage       | Day 30   | Day 60    | Day 90       |\n|-------------|----------|-----------|--------------|\n| Users       | 50       | 300       | 1,000+       |\n| KPI vs base | captured | +25%      | target hit   |\n| Champions   | 3        | 10 active | self-running |",
          },
        ],
        hints: [
          'Cost-per-outcome divides spend by *completed outcomes*, not by API calls — retries and failures make the two diverge.',
          'Pull real token cost from the Console usage view so the dashboard reconciles with billing.',
        ],
        stretch: [
          'Add a post-deploy job that runs the smoke test against the live URL and rolls back on failure.',
          'Add a sensitivity row: what happens to cost-per-outcome if volume 10×’s or you switch model tiers?',
        ],
      },
      quiz: [
        {
          q: 'The honest unit of value for a CXO is…',
          options: ['Cost per API call', 'Cost per *completed outcome* vs a measured baseline', 'Token count'],
          answer: 1,
          why: 'Dividing spend by outcomes that actually succeeded — not attempts — is the number leadership acts on.',
        },
        {
          q: 'A CI eval gate at deploy ensures…',
          options: ['Every build promotes', 'Only a build meeting the quality bar goes live', 'Secrets are printed to logs'],
          answer: 1,
          why: 'Quality becomes a promotion condition, enforced at the moment of deploy.',
        },
      ],
      tools: ['Messages API / Bedrock', 'CI eval gate', 'Cost-per-outcome'],
      keyTakeaways: [
        'Live + secured + smoke-tested behind an eval gate is the deploy bar.',
        'Prove value as cost-per-outcome vs a baseline, and plan adoption as a 30/60/90 ramp.',
      ],
    },
    {
      id: '8.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Graduate — publish a reference + IP asset, demo, handover, certify',
      learn: {
        intro:
          'Graduation day. Turn the win into what you can **reuse**: publish a one-page reference and one reusable IP asset, deliver a 12-minute demo (problem → live agent → value → adoption → next step), hand over a runbook + cost model, complete belt-ladder readiness, and sign the certificate.',
        steps: [
          'Write a one-page reference (problem → approach → outcome → value) cleared for analyst and sales use, plus one reusable IP asset (a Skill, connector, or eval set) with docs.',
          'Structure and rehearse a 12-minute demo: problem, the live agent running, value evidence, governance + adoption, and a clear next step.',
          'Write a handover runbook + cost model a real client team could operate from — deploy/rollback, traces, on-call, cost-per-outcome, governance.',
          'Map your evidence to the belt ladder (Black / Claude Ready), pick one module you could teach as a trainer, and sign the certificate.',
        ],
        resources: [
          LINKS.console,
          LINKS.messages,
          article('Anthropic customer stories', 'https://www.anthropic.com/customers', 'Anthropic'),
          courseraSearch('stakeholder presentation storytelling technical demo', 'Coursera: demo & stakeholder storytelling'),
          ytSearch('product demo day live agent walkthrough handover runbook', 'YouTube: demo-day walkthrough & handover'),
        ],
      },
      lab: {
        title: 'Present, hand over & graduate',
        steps: [
          'Publish a one-page reference + one reusable IP asset (with a short "how to reuse" note) to the (mock) IP library.',
          'Deliver a 12-minute demo: the live agent, the value dashboard, and governance + adoption evidence.',
          'Hand over `runbook.md` + a cost model as if to a real client team.',
          'Complete a belt-ladder readiness self-assessment, add the project to your portfolio, and sign the certificate.',
        ],
        doneWhen: 'Demo delivered with value evidence; reference + IP asset published; runbook + cost model handed over; readiness mapped and certificate signed.',
        starter: [
          {
            title: 'reference-one-pager.md (template)',
            lang: 'markdown',
            code: "# Reference — <industry> · <Data/AI use case>\n\n## Problem\n<who waited on data, how often, what it cost — 2 lines, no client secrets>\n\n## Approach\n<agent: question -> grounded, cited answer over real data; Claude models + governance>\n\n## Outcome & value\nCost-per-outcome <x> (baseline <y>); KPI moved <metric> <before> -> <after>\n\n## Reusable IP harvested\nAsset: <Skill / MCP connector / eval set>  ·  next client starts ~70% done\n\n_Clearance: [ ] analyst use   [ ] sales use_",
          },
          {
            title: 'runbook.md (handover outline)',
            lang: 'markdown',
            code: "# Runbook — <capstone>\n\n## What it is\n<input -> agent -> output>  ·  Live: <url>  ·  Repo: <url>\n\n## Run & deploy\nSecrets: <names only, from store>  ·  Deploy: <job>  ·  Rollback: <how>\n\n## Operate\nTraces / dashboards: <links>  ·  Eval gate: <bar>  ·  On-call: first break + fix\n\n## Cost model\nCost-per-outcome: <x>  ·  Drivers: model tier, tokens, retries  ·  Monthly @ <vol>: $<...>\n\n## Governance\nWho approves writes  ·  guardrails  ·  escalation path",
          },
        ],
        hints: [
          'Rehearse against the clock — 12 minutes forces you to lead with the outcome, not the plumbing.',
          'A good handover reads as if the next engineer never met you: names, links, and the first thing that breaks.',
        ],
        stretch: [
          'Record the demo so the reference and walkthrough can travel to analysts and sales without you.',
          'Draft a 30-minute lesson plan for the one module you would teach as a trainer.',
        ],
      },
      quiz: [
        {
          q: 'A graduating Claude FDE’s strongest artifact is…',
          options: ['A screenshot', 'A live, evaluated, governed agent with value evidence, a reference, and a handover', 'A long chat log'],
          answer: 1,
          why: 'A deployed, proven, handed-over agent plus a reference is the credible proof of capability.',
        },
        {
          q: 'A win should always produce…',
          options: ['A one-off nobody reuses', 'A published reference (brand/pipeline) and a reusable IP asset (moat)', 'A secret'],
          answer: 1,
          why: 'Every win becomes pipeline and reusable IP so the next engagement starts at ~70% done.',
        },
      ],
      tools: ['Reference', 'IP library', 'Runbook'],
      keyTakeaways: [
        'The graduation artifact is a live, proven, handed-over agent — not a slide deck.',
        'Harvest every win into a reference and a reusable IP asset, and close the demo on the outcome.',
      ],
    },
  ],
}

export default week
