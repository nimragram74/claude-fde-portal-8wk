import type { Week } from '../../types'
import { LINKS, cookbook, ytSearch, udemySearch, tool } from '../links'

const week: Week = {
  id: 1,
  code: 'FND-D100 · Foundations',
  title: 'Claude foundations for Data & AI engineers',
  goal: 'You already train and serve models — this week reframes that instinct for orchestrating a frontier model: the FDE motion, the Claude model family, the Messages API, structured output, and your first golden eval set.',
  layer: 'Developer Platform · cross-cutting',
  belt: 'White (Foundations)',
  beltColor: '#e6e0d4',
  accent: '#cc6a44',
  shipTitle: 'A structured-extraction CLI + a first golden eval set',
  outcomes: [
    'Explain the FDE motion and place a data/AI function on the agentification ladder',
    'Make authenticated Messages API calls and read token usage as a cost signal',
    'Use system prompts, roles, temperature and multi-turn history correctly',
    'Force schema-valid JSON (Pydantic) and stream + read images (vision)',
    'Build a golden eval set and score a change — the ML habit, applied to prompts',
  ],
  resources: [
    LINKS.intro,
    LINKS.quickstart,
    cookbook('Anthropic Cookbook — starter notebooks'),
    udemySearch('Anthropic Claude API for data scientists', 'Udemy: Claude / Anthropic API courses'),
    ytSearch('Anthropic Claude API tutorial getting started', 'YouTube: Claude API getting-started walkthroughs'),
  ],
  days: [
    {
      id: '1.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'The FDE motion + agentification ladder (for data teams)',
      learn: {
        intro:
          'You are used to **training** a model on data. An FDE **orchestrates** a pretrained model around data and tools. Today: the FDE motion — discover → agentify → business-case → build → ship → scale — and the ladder every use case climbs.',
        steps: [
          'Frame the FDE motion end-to-end and contrast it with the ML lifecycle you know: no training loop — you compose prompts, context, tools and evals instead.',
          'Learn the agentification ladder — **Assist → Augment → Automate → Autonomous** — and pick the next rung where value is highest for a data/AI workflow.',
          'Skim the Claude overview and the six-layer stack so you have the mental map for the next 8 weeks.',
          'Note how an FDE is measured: value realised and agents in production — not model accuracy on a holdout set.',
        ],
        resources: [
          LINKS.intro,
          LINKS.effectiveAgents,
          ytSearch('agentic AI vs traditional machine learning explained', 'YouTube: agentic AI vs classic ML'),
        ],
      },
      lab: {
        title: 'FDE charter for a data/AI function',
        steps: [
          'Pick a real function you understand (e.g. NL-to-SQL for analysts, data-quality triage, experiment summarisation) and place it on the ladder today vs the target rung.',
          'Write a one-paragraph charter: the problem, the agent you would ship by Week 8, and who governs it.',
          'State a value hypothesis as a metric that moves (e.g. "analyst self-serve query time 20 min → 3 min").',
          'Commit `charter.md` to a fresh `claude-fde` folder.',
        ],
        doneWhen: '`charter.md` names a data/AI function, its current + target ladder rung, and a measurable value hypothesis.',
        starter: [
          {
            title: 'charter.md (template)',
            lang: 'markdown',
            code: `# FDE Charter — <your name>

## Function
<e.g. Natural-language analytics over the sales warehouse>

## Ladder placement
- Today: Assist        # analysts hand-write SQL
- Target (Wk8): Automate    # agent writes + validates SQL, human approves writes

## Problem (1 paragraph)
<who waits on data, how often, what it costs today>

## The agent I will ship
<input -> what it does over which data -> output + guardrail>

## Value hypothesis (a metric that moves)
<baseline -> target, e.g. "ad-hoc query turnaround 1 day -> 5 min">

## Who governs it
<role that approves writes / reviews consequential actions>`,
          },
        ],
        hints: ['Choose a workflow you could demo to a real analyst/engineer — realism beats novelty.'],
        stretch: ['Sketch the one-line business case: seats × time saved × loaded cost = annual value.'],
      },
      quiz: [
        {
          q: '“Autonomous” on the agentification ladder means…',
          options: ['Copilots draft & suggest', 'Agents do isolated multi-step tasks', 'Agents run the workflow; humans govern'],
          answer: 2,
          why: 'The top rung is agents running the work with humans governing — not humans doing tasks.',
        },
        {
          q: 'The biggest mental shift from classic ML to the FDE motion is…',
          options: ['You train a bigger model', 'You orchestrate a pretrained model with prompts, context, tools & evals — no training loop', 'You stop measuring quality'],
          answer: 1,
          why: 'FDE work is composition + evaluation around a frontier model, not model training.',
        },
      ],
      tools: ['Anthropic Console', 'Claude', 'Markdown'],
      keyTakeaways: ['Orchestrate, don’t train.', 'Target the highest-value rung, not maximum autonomy.'],
    },
    {
      id: '1.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'The model family & your first Messages API call',
      learn: {
        intro:
          'The **Messages API** is the substrate for everything you build. Learn the model family, get a key, and make your first call — reading `usage` so cost (your new "compute budget") is visible from day one.',
        steps: [
          'Read the models overview (Opus 4.8, Sonnet 4.6, Haiku 4.5) and pick a default; think capability vs cost/latency like GPU cost vs accuracy.',
          'Learn the Messages API shape: `system`, `messages`, roles, `max_tokens`, and the `usage` object (input/output tokens).',
          'Get an API key; load it from an environment variable — never hardcode or commit it.',
          'Understand tokens & pricing enough to estimate cost per call.',
        ],
        resources: [
          LINKS.models,
          LINKS.messages,
          LINKS.quickstart,
          tool('anthropic-sdk-python', 'https://github.com/anthropics/anthropic-sdk-python', 'GitHub'),
          ytSearch('Anthropic Messages API python first call tutorial', 'YouTube: first Messages API call'),
        ],
      },
      lab: {
        title: 'Hello, Claude',
        steps: [
          'Create a virtualenv and `pip install anthropic`.',
          'Write `hello_claude.py` that makes one call and prints the reply **and** `response.usage`.',
          'Read the key from `ANTHROPIC_API_KEY`; init a Git repo with `.env` git-ignored.',
        ],
        doneWhen: 'The script returns a response + token usage, and the repo is initialised with secrets ignored.',
        starter: [
          {
            title: 'hello_claude.py',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

resp = client.messages.create(
    model="claude-sonnet-4-6",          # right-size the model to the task
    max_tokens=300,
    system="You are a concise data-platform architect.",
    messages=[{"role": "user", "content": "In 3 bullets, how does an FDE differ from an ML engineer?"}],
)
print(resp.content[0].text)
print("usage:", resp.usage)             # input/output tokens -> cost`,
          },
        ],
        hints: ['On Windows PowerShell set the key with `$env:ANTHROPIC_API_KEY="sk-ant-..."`, not `export`.'],
        stretch: ['Add a `--model` flag; compare `usage` and answer across Haiku, Sonnet and Opus on one prompt.'],
      },
      quiz: [
        {
          q: 'For high-volume, latency-sensitive simple tasks, the cost-effective Claude model is…',
          options: ['Opus 4.8', 'Haiku 4.5', 'Always the newest model'],
          answer: 1,
          why: 'Haiku is the fast, economical tier; reserve Opus for the hardest reasoning. Match model to task.',
        },
        {
          q: 'The `usage` object matters because…',
          options: ['It is decorative', 'Tokens are your cost signal — like tracking compute spend on a training job', 'It changes the answer'],
          answer: 1,
          why: 'Reading usage on every call keeps cost visible and is the basis of FinOps later.',
        },
      ],
      tools: ['Messages API', 'Python SDK', 'Git'],
      keyTakeaways: ['Right-size the model per task.', 'Read `usage` on every call — cost is never invisible.'],
    },
    {
      id: '1.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'System prompts, multi-turn & structured output (JSON/Pydantic)',
      learn: {
        intro:
          'The API is **stateless** — you resend history. Today: roles, the system prompt, sampling controls, and forcing **schema-valid JSON** (the thing data engineers actually want out of an LLM).',
        steps: [
          'Learn roles (user/assistant), the system prompt, and that you resend the full message history each turn.',
          'Learn `temperature` and `stop_sequences`; use low temperature for deterministic extraction.',
          'Force reliable JSON with a tool schema and/or prefill; validate against a Pydantic model and null missing fields (no invention).',
          'Add an anti-hallucination instruction: “if a field isn’t present, return null”.',
        ],
        resources: [
          LINKS.systemPrompts,
          LINKS.toolUse,
          LINKS.prefill,
          ytSearch('Claude structured output pydantic json tool schema', 'YouTube: structured JSON with Claude'),
        ],
      },
      lab: {
        title: 'Deterministic extraction to a schema',
        steps: [
          'Define a Pydantic `Record` schema for a messy input (e.g. free-text incident notes → {system, severity, root_cause?, owner?}).',
          'Force schema-valid JSON via a tool schema (or prefill); set `temperature=0`.',
          'Null missing fields; test an out-of-scope input and confirm it declines/nulls rather than fabricating.',
        ],
        doneWhen: 'Every input yields schema-valid JSON; missing info returns null, not a hallucination.',
        starter: [
          {
            title: 'extract.py',
            lang: 'python',
            code: `import os, json
from anthropic import Anthropic
client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

TOOL = {"name": "record", "description": "Return the extracted incident record.",
  "input_schema": {"type": "object", "properties": {
    "system": {"type": "string"},
    "severity": {"type": "string", "enum": ["low", "med", "high", "unknown"]},
    "root_cause": {"type": ["string", "null"]},
  }, "required": ["system", "severity"]}}

def extract(text):
    r = client.messages.create(model="claude-sonnet-4-6", max_tokens=400, temperature=0,
        tools=[TOOL], tool_choice={"type": "tool", "name": "record"},
        system="Extract only what is present. Unknown fields = null. Do not invent.",
        messages=[{"role": "user", "content": text}])
    return next(b.input for b in r.content if b.type == "tool_use")

print(json.dumps(extract("prod api down since 2am, looks like the etl job OOMed"), indent=2))`,
          },
        ],
        hints: ['`tool_choice` forcing the tool guarantees the model returns your schema, not prose.'],
        stretch: ['Wrap the output in a Pydantic model and raise on validation failure, then retry once.'],
      },
      quiz: [
        {
          q: "How does Claude 'remember' earlier turns?",
          options: ['Anthropic stores them', 'You resend the full message history each request', 'Via cookies'],
          answer: 1,
          why: 'The Messages API is stateless; the client resends prior turns.',
        },
        {
          q: 'The most reliable way to get schema-valid JSON is…',
          options: ['Ask nicely once at high temperature', 'Force a tool schema (and/or prefill) at temperature 0', 'Post-process with regex only'],
          answer: 1,
          why: 'A forced tool schema constrains output to a parseable, validated shape.',
        },
      ],
      tools: ['Messages API', 'Tool use', 'Pydantic'],
      keyTakeaways: ['History is your responsibility (stateless API).', 'Force JSON with a tool schema; null unknowns to curb hallucination.'],
    },
    {
      id: '1.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Streaming, vision & multimodal inputs',
      learn: {
        intro:
          'Stream for responsive UX and use **vision** on the artefacts data teams live in — dashboards, chart screenshots, schema diagrams. Handle `stop_reason` so truncation never surprises you.',
        steps: [
          'Learn streaming and why it lowers perceived latency (time-to-first-token).',
          'Learn vision — send an image (a dashboard/chart/ER diagram) and ask Claude to read or critique it.',
          'Understand `stop_reason` values: `end_turn`, `max_tokens`, `tool_use`.',
        ],
        resources: [
          LINKS.streaming,
          LINKS.vision,
          cookbook('Vision cookbook examples', 'multimodal'),
          ytSearch('Claude vision api chart screenshot example', 'YouTube: vision on charts/dashboards'),
        ],
      },
      lab: {
        title: 'Stream + read a chart',
        steps: [
          'Stream tokens as they arrive and print live.',
          'Send a chart or dashboard screenshot and ask Claude to extract the key numbers and one anomaly.',
          'Handle `stop_reason == "max_tokens"` gracefully.',
        ],
        doneWhen: 'Chat streams live and answers a question about an image; you can read `stop_reason`.',
        starter: [
          {
            title: 'vision.py',
            lang: 'python',
            code: `import os, base64
from anthropic import Anthropic
client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
img = base64.standard_b64encode(open("chart.png", "rb").read()).decode()

resp = client.messages.create(model="claude-sonnet-4-6", max_tokens=500,
    messages=[{"role": "user", "content": [
        {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": img}},
        {"type": "text", "text": "Extract the key metrics and flag one anomaly."}]}])
print(resp.content[0].text)`,
          },
        ],
        hints: ['`media_type` must match the file (image/png vs image/jpeg).'],
        stretch: ['Feed an ER diagram and ask Claude to draft the CREATE TABLE statements.'],
      },
      quiz: [
        {
          q: 'Why stream responses in a user-facing app?',
          options: ['It reduces cost', 'It lowers perceived latency (time-to-first-token)', 'It improves accuracy'],
          answer: 1,
          why: 'Streaming shows text as it is generated; cost/accuracy are unchanged.',
        },
        {
          q: 'A `stop_reason` of `max_tokens` means…',
          options: ['Claude finished naturally', 'Output hit the token cap and was truncated', 'A tool was called'],
          answer: 1,
          why: 'It signals truncation — raise max_tokens or continue.',
        },
      ],
      tools: ['Messages API', 'Vision', 'Streaming'],
      keyTakeaways: ['Stream for UX; it doesn’t change cost/quality.', 'Vision reads the charts and diagrams data teams already use.'],
    },
    {
      id: '1.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Ship: structured-extraction CLI + a golden eval set',
      learn: {
        intro:
          'Ship day. Turn the week into a CLI extractor and — crucially for this cohort — a **golden eval set**. You know not to tune on the test set; the same discipline makes every prompt change measurable.',
        steps: [
          'Learn to build a small eval set and score prompt/model changes (code-graded + a model-graded judge).',
          'Learn why prompts deserve version control + golden tests, exactly like a model eval harness.',
        ],
        resources: [LINKS.evals, cookbook('Evaluations cookbook', 'misc'), LINKS.console],
      },
      lab: {
        title: 'Extractor + golden evals',
        steps: [
          'Wrap Wednesday’s extractor in a CLI; log token usage per call to `costs.csv`.',
          'Create a golden set: 8 inputs with expected fields/traits.',
          'Score two prompt versions with a tiny eval harness (exact-match on fields + one model-graded check); iterate to ≥7/8.',
          'README; push a `week-1` tag.',
        ],
        doneWhen: 'A versioned extractor passes ≥7/8 golden cases, compared via an eval harness, with cost logged.',
        starter: [
          {
            title: 'eval.py (sketch)',
            lang: 'python',
            code: `import json
from extract import extract   # from day 1.3

GOLDEN = [
  {"text": "prod api down, etl OOMed", "expect": {"system": "prod api", "severity": "high"}},
  # ... 7 more
]

def score(prompt_version):
    passed = 0
    for case in GOLDEN:
        got = extract(case["text"])
        ok = all(str(got.get(k, "")).lower().find(str(v).lower()) >= 0 for k, v in case["expect"].items())
        passed += int(ok)
    return passed / len(GOLDEN)

print("accuracy:", score("v1"))`,
          },
        ],
        hints: ['Keep the golden set fixed — don’t edit cases to make a prompt pass (that’s tuning on the test set).'],
        stretch: ['Add an LLM-as-judge check for a free-text field and compare its verdicts to your own on 5 cases.'],
      },
      quiz: [
        {
          q: 'From Week 1 on, the CoE rule is…',
          options: ['Ship on feeling', 'No prompt/model change ships without an eval number', 'Only use Opus'],
          answer: 1,
          why: 'Measure, don’t vibe — every change carries a score, just like an ML eval.',
        },
        {
          q: 'A golden eval set works because…',
          options: ['It’s large', 'It’s fixed and expected-labelled, so changes are measurable and regressions caught', 'It uses the newest model'],
          answer: 1,
          why: 'Held-fixed golden cases turn prompt edits into engineering with regression safety.',
        },
      ],
      tools: ['Evals', 'CLI', 'GitHub'],
      keyTakeaways: ['Ship something runnable every Friday.', 'Golden evals = your ML eval discipline applied to prompts.'],
    },
  ],
}

export default week
