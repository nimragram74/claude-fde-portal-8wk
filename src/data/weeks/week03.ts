import type { Week } from '../../types'
import { LINKS, cookbook, ytSearch, udemySearch } from '../links'

const week: Week = {
  id: 3,
  code: 'MDL-D200 · Model & Prompt',
  title: 'Prompting depth, model economics & long context',
  goal: 'Treat the frontier model like a compute resource you right-size and budget. This week: prompt Claude with discipline, pick between Opus/Sonnet/Haiku on capability-vs-cost like GPU tiers, decide long-context vs RAG on recall/precision/freshness, and cut spend with caching and batch inference.',
  layer: 'Model Family & Intelligence',
  belt: 'Yellow (Prompting)',
  beltColor: '#efc76a',
  accent: '#c8266f',
  shipTitle: 'A model-routing service + a cost/quality scorecard',
  outcomes: [
    'Justify a default Claude model and an escalation rule from a capability-vs-cost matrix',
    'Write disciplined prompts: role/task/context/format/constraints, XML, multishot, chain-of-thought, prefill',
    'Decide when the 1M-token window beats RAG on cost, recall/precision and freshness',
    'Cut spend with prompt caching (≈ feature caching) and the Batches API (≈ batch inference)',
    'Ship a model router that emits a cost/latency/quality scorecard',
  ],
  resources: [
    LINKS.models,
    LINKS.promptEng,
    LINKS.caching,
    LINKS.batch,
    udemySearch('LLM cost optimization prompt caching batch inference', 'Udemy: LLM economics & FinOps courses'),
  ],
  days: [
    {
      id: '3.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'Opus 4.8 vs Sonnet 4.6 vs Haiku 4.5 — the capability/cost matrix',
      learn: {
        intro:
          'There is no single “best” Claude — there is the **right-sized** one, exactly like choosing a GPU tier for a job. Today you compare Opus 4.8, Sonnet 4.6 and Haiku 4.5 on capability, latency, context and price, then justify a **default** and an **escalation rule** to Opus.',
        steps: [
          'Read the models overview and rank the family on capability, speed, context window and per-token price.',
          'Map the fit: **Opus** for the hardest reasoning/agentic work, **Sonnet** as the balanced workhorse, **Haiku** for fast, cheap, high-volume rows.',
          'Frame selection as capability vs cost/latency chosen **per task** — not one default forever (the GPU-tier instinct, applied to a model).',
          'Decide how you would evidence a choice: quality, latency and cost measured on the *same* prompts.',
        ],
        resources: [
          LINKS.models,
          LINKS.console,
          LINKS.messages,
          ytSearch('Claude Opus vs Sonnet vs Haiku comparison', 'YouTube: choosing a Claude model'),
        ],
      },
      lab: {
        title: 'Capability/cost matrix',
        steps: [
          'Pick 5 data/AI prompts spanning easy → hard: a row classification, a field extraction, a table summarise, a multi-step reasoning, an agentic backfill plan.',
          'Run the same 5 prompts across **all three** models; record quality (0-3 rubric), latency and cost per model.',
          'Write a “default model” recommendation for an internal analytics assistant.',
          'Write an **escalation rule**: the signal that says “route this one to Opus”.',
        ],
        doneWhen: 'A 3-model matrix justifies a default model and an explicit escalation rule.',
        starter: [
          {
            title: 'matrix.py',
            lang: 'python',
            code: `import os, time
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
MODELS = ["claude-haiku-4-5", "claude-sonnet-4-6", "claude-opus-4-8"]
PROMPTS = [
    "Label this row's sentiment: 'pipeline failed again'",
    "Draft a 3-step plan to backfill a broken ETL partition",
]

for m in MODELS:
    for p in PROMPTS:
        t0 = time.time()
        r = client.messages.create(model=m, max_tokens=400,
            messages=[{"role": "user", "content": p}])
        dt = round(time.time() - t0, 2)
        print(m, dt, "s", r.usage.input_tokens, r.usage.output_tokens)`,
          },
        ],
        hints: [
          'Score “quality” with a quick 0-3 rubric so the matrix is comparable, not vibes.',
          'Cost = input_tokens and output_tokens times each model’s per-token price — keep both columns.',
        ],
        stretch: ['Add a 6th “trap” prompt only Opus gets right and use it as your escalation trigger.'],
      },
      quiz: [
        {
          q: 'Opus 4.8 is the right pick for…',
          options: ['Simple high-volume row classification', 'The hardest multi-step reasoning & agentic work', 'Everything, always'],
          answer: 1,
          why: 'Opus leads on hard reasoning/agents; simple high-volume rows are cheaper on Sonnet/Haiku.',
        },
        {
          q: 'Model selection is primarily a trade-off between…',
          options: ['Capability vs cost/latency', 'Colour vs size', 'Region vs key'],
          answer: 0,
          why: 'Right-sizing balances capability against cost and latency per task — the GPU-tier instinct.',
        },
      ],
      tools: ['Claude models', 'Console'],
      keyTakeaways: [
        'Match the model to the task — default to Sonnet/Haiku, escalate to Opus on hard reasoning.',
        'Evidence beats opinion: measure quality, latency and cost on the same prompts.',
      ],
    },
    {
      id: '3.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'Prompting depth: structure, XML, multishot, CoT & prefill',
      learn: {
        intro:
          'Prompting basics move fast — reliability comes from **structure**, not cleverness. In one pass you cover the full toolkit: the **role · task · context · format · constraints** skeleton, **XML tags** to delimit instructions from untrusted data, **multishot** examples, **chain-of-thought**, and **prefill** to lock the output shape.',
        steps: [
          'Fill five slots deliberately — role · task · context · format · constraints — and push durable rules + format into the **system prompt**.',
          'Wrap instructions, examples and input in **XML tags** so Claude separates commands from data (a first line of injection defence).',
          'Add **multishot** examples that show the exact label/format and the tricky boundary cases.',
          'Use **chain-of-thought** for multi-step tasks and **prefill** the assistant turn to force a clean, parseable start.',
        ],
        resources: [
          LINKS.promptEng,
          LINKS.xml,
          LINKS.cot,
          LINKS.prefill,
          ytSearch('Claude prompt engineering XML multishot chain of thought prefill', 'YouTube: prompt structure + prefill'),
        ],
      },
      lab: {
        title: 'A structured data-triage prompt',
        steps: [
          'Build a data-quality classifier using `<instructions>`, `<examples>`, `<input>` tags with the five-slot skeleton in the system prompt.',
          'Add 3 examples covering the boundary cases; prefill the assistant turn to force the label format.',
          'Test on 5 unseen row-issues and record results.',
          'Remove the examples, re-test the same 5, and quantify the drop.',
        ],
        doneWhen: 'The XML + multishot + prefill prompt beats the zero-shot version on 5 inputs and always returns a clean label.',
        starter: [
          {
            title: 'prompting.py',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

SYSTEM = (  # role + task + format + constraints
    "You are a data-quality triage bot. Classify each row issue as: "
    "schema, null, duplicate, or drift. Reply ONLY the label, else 'unknown'."
)
PROMPT = """<examples>
<input>col 'age' arrived as string not int</input><label>schema</label>
<input>30% of 'email' rows are empty today</input><label>null</label>
</examples>
<input>{row}</input>"""

def classify(row):
    r = client.messages.create(model="claude-haiku-4-5", max_tokens=10,
        system=SYSTEM, messages=[
            {"role": "user", "content": PROMPT.format(row=row)},
            {"role": "assistant", "content": "label:"}])  # prefill steers format
    return r.content[0].text.strip()

print(classify("same customer_id appears 4x in today's load"))`,
          },
        ],
        hints: [
          'Keep tag names identical between instructions and content — Claude keys off the exact names.',
          'Put untrusted row text in its own tag so injected “ignore instructions” text is treated as data, not commands.',
        ],
        stretch: [
          'Add a `<thinking>` step for the ambiguous rows and confirm accuracy rises without breaking the label parse.',
          'Add an adversarial example that tries to override the instructions and confirm the label holds.',
        ],
      },
      quiz: [
        {
          q: 'XML tags in a Claude prompt primarily…',
          options: ['Save cost', 'Structure the prompt so Claude separates instructions, data & examples', 'Speed the model'],
          answer: 1,
          why: 'Clear XML structure reduces ambiguity and injection risk and lifts reliability.',
        },
        {
          q: 'Prefilling the assistant response is used to…',
          options: ['Store secrets', 'Steer the output format by starting Claude’s reply', 'Train the model'],
          answer: 1,
          why: 'Prefill nudges the output into a required shape (e.g. a label or a JSON start) reliably.',
        },
      ],
      tools: ['Prompt engineering', 'XML', 'Prefill'],
      keyTakeaways: [
        'Reliability is structure: five slots, XML boundaries, a few examples.',
        'Let Claude reason first, then prefill to lock a clean, parseable final answer.',
      ],
    },
    {
      id: '3.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'Extended thinking + 1M-token context vs RAG',
      learn: {
        intro:
          'Two levers for hard, document-heavy work. **Extended thinking** gives Claude a reasoning budget — accuracy for latency/tokens. The **1M-token window** lets you drop whole datasets into one prompt — but bigger is not always better. Today you decide long-context vs RAG on **cost, recall/precision and freshness**.',
        steps: [
          'Enable **extended thinking** for genuine multi-step reasoning; keep it **off** for simple high-volume rows to protect latency and cost.',
          'Learn the long-context pattern: documents **first**, wrapped in **XML**, the question **last** — grounding improves.',
          'Weigh long-context vs RAG: long-context wins for bounded, self-contained inputs; RAG wins on large/changing corpora — higher **recall/precision** control, fresher data, lower per-call cost.',
          'Note the cost model: you pay for **every** context token on **every** call — the “load the whole feature store into RAM each request” anti-pattern.',
        ],
        resources: [
          LINKS.extThinking,
          LINKS.models,
          LINKS.xml,
          ytSearch('Claude long context 1M token window vs RAG when to use', 'YouTube: long-context vs RAG trade-offs'),
        ],
      },
      lab: {
        title: 'Long-context Q&A vs a RAG preview',
        steps: [
          'Load a bounded corpus (e.g. warehouse table schemas + data dictionary) into one long-context prompt, XML-tagged, question last.',
          'Turn on extended thinking for a multi-step question (e.g. “which joins risk fan-out?”) and check the answer is grounded.',
          'Ask a question the corpus cannot answer and confirm Claude declines rather than hallucinating.',
          'Log `input_tokens`; estimate cost vs a chunked/RAG approach (preview of Week 6) and note when RAG would be cheaper/fresher.',
        ],
        doneWhen: 'A long-context prompt answers accurately with thinking on, and you have costed when RAG would win.',
        starter: [
          {
            title: 'longctx.py',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
docs = open("warehouse_docs.txt").read()   # table schemas + data dictionary

prompt = (
    "<docs>\\n" + docs + "\\n</docs>\\n\\n"
    "Using ONLY the docs above, answer. If absent, say 'not documented'.\\n"
    "<question>Which columns in fact_orders are nullable?</question>"
)

# extended thinking helps multi-step reasoning over the corpus
r = client.messages.create(model="claude-sonnet-4-6", max_tokens=800,
    thinking={"type": "enabled", "budget_tokens": 1500},
    messages=[{"role": "user", "content": prompt}])
print(r.content[-1].text)                       # final answer block
print("input tokens:", r.usage.input_tokens)    # long-context cost per call`,
          },
        ],
        hints: [
          'Documents first, question last — burying the question inside the corpus hurts grounding.',
          'The answer is the last content block; earlier blocks may be the thinking trace.',
        ],
        stretch: ['Plot answer quality and cost as the corpus grows, and mark the token count where RAG becomes the cheaper choice.'],
      },
      quiz: [
        {
          q: 'RAG is preferable to the 1M-token window when…',
          options: ['The corpus is large/changing and you want lower per-call cost + fresh, recall-tuned retrieval', 'Always', 'Never'],
          answer: 0,
          why: 'RAG scales to large/fresh corpora cheaply with recall/precision control; long-context suits bounded, self-contained inputs.',
        },
        {
          q: 'You would skip extended thinking for…',
          options: ['Simple, high-volume row classification', 'A hard optimisation over the schema', 'Multi-step join planning'],
          answer: 0,
          why: 'Simple tasks do not need it — save the latency/token cost for genuinely multi-step reasoning.',
        },
      ],
      tools: ['Extended thinking', '1M context'],
      keyTakeaways: [
        'Extended thinking buys accuracy on hard tasks; long-context suits bounded inputs.',
        'Large, changing corpora belong in RAG — cheaper per call, fresher, recall-tunable.',
      ],
    },
    {
      id: '3.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Model economics & FinOps: caching, batch & token budgets',
      learn: {
        intro:
          'FDEs make model spend **defensible**. Two big levers map straight onto habits you already have: **prompt caching** ≈ feature caching (reuse a stable prefix), and the **Batches API** ≈ batch inference (trade latency for throughput/cost). Then price the workload per 1K tokens and set a budget from measured usage.',
        steps: [
          'Read prompt caching: put a large, stable prefix (a big system prompt or data dictionary) behind `cache_control` to cut cost and latency on repeated context.',
          'Read the Message Batches API: send high-volume, non-urgent jobs (e.g. classify a day of rows) for lower cost when the work can wait.',
          'Price a workload **per 1K tokens** and set a budget from measured `usage` — not a guess.',
          'Fit the levers: caching when many requests share a prefix; batch when latency does not matter.',
        ],
        resources: [
          LINKS.caching,
          LINKS.batch,
          cookbook('Prompt caching cookbook', 'misc/prompt_caching.ipynb'),
          ytSearch('Anthropic prompt caching batches API cost latency', 'YouTube: caching + batch cost wins'),
        ],
      },
      lab: {
        title: 'Cache + batch a data workload',
        steps: [
          'Take a workload with a big shared prefix (e.g. a large data dictionary or reference schema).',
          'Add **prompt caching** with `cache_control` on the stable prefix; confirm `cache_read_input_tokens` > 0 on the second call and measure the delta.',
          'Run a high-volume classification job through the **Batches API**.',
          'Produce a **per-1K-token** cost estimate and an annual budget for the workload.',
        ],
        doneWhen: 'Prompt caching shows a measured saving, a batch job completes, and you have a per-1K-token costed estimate.',
        starter: [
          {
            title: 'caching.py',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
DATA_DICT = open("data_dictionary.txt").read()   # large, stable across calls

r = client.messages.create(
    model="claude-sonnet-4-6", max_tokens=300,
    system=[{"type": "text", "text": DATA_DICT,
             "cache_control": {"type": "ephemeral"}}],   # cache the prefix
    messages=[{"role": "user", "content": "List the PII columns."}],
)
u = r.usage
print("cache_read:", u.cache_read_input_tokens,
      "cache_write:", u.cache_creation_input_tokens)`,
          },
          {
            title: 'batch.py',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# high-volume, non-urgent: classify a day's worth of rows overnight
batch = client.messages.batches.create(requests=[
    {"custom_id": f"row-{i}", "params": {
        "model": "claude-haiku-4-5", "max_tokens": 50,
        "messages": [{"role": "user", "content": f"Label row {i}"}]}}
    for i in range(1000)
])
print("batch id:", batch.id, "status:", batch.processing_status)`,
          },
        ],
        hints: [
          'The second call with the same prefix should report `cache_read_input_tokens` > 0 — that is your saving.',
          'Batch results are asynchronous: poll the batch id until `processing_status` is `ended`.',
        ],
        stretch: ['Estimate annual spend: requests/day × per-1K cost, with and without caching, and quantify the delta.'],
      },
      quiz: [
        {
          q: 'Prompt caching helps most when…',
          options: ['Every request is totally unique', 'Many requests share a large, stable prefix (e.g. a data dictionary)', 'You raise temperature'],
          answer: 1,
          why: 'Caching reuses a stable prefix across calls — the feature-caching instinct, cutting cost and latency.',
        },
        {
          q: 'The Batches API is ideal for…',
          options: ['High-volume, non-urgent jobs at lower cost', 'Real-time chat', 'Model training'],
          answer: 0,
          why: 'Batch trades latency for throughput/cost — batch inference over large asynchronous workloads.',
        },
      ],
      tools: ['Prompt caching', 'Batches API', 'FinOps'],
      keyTakeaways: [
        'Cache the stable prefix; batch the non-urgent volume.',
        'Price workloads per 1K tokens so spend is defensible, not guessed.',
      ],
    },
    {
      id: '3.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Ship: a model router + a cost/quality scorecard',
      learn: {
        intro:
          'Friday you ship the week: a **router** that picks Haiku/Sonnet/Opus by task-type and budget — toggling thinking and caching where they pay off — records per-call cost/latency, and emits a scorecard. One place to control cost and quality across the whole family.',
        steps: [
          'Design `route(task, prompt)` that picks Haiku/Sonnet/Opus by task-type and budget, optionally enabling thinking and caching.',
          'Decide what to record per call: model, cost, latency and a quality signal (rubric or eval pass/fail).',
          'Plan the scorecard that turns routing into **evidence** for the client — not opinion.',
          'Adopt the rule: no routing/model change ships without a scorecard number.',
        ],
        resources: [
          LINKS.evals,
          LINKS.caching,
          LINKS.console,
          ytSearch('LLM model router cost latency quality scorecard', 'YouTube: building a model router + scorecard'),
        ],
      },
      lab: {
        title: 'Model router + scorecard',
        steps: [
          'Build `route(task, prompt)` that chooses Haiku/Sonnet/Opus (plus thinking and caching where useful).',
          'Run **30 mixed requests** through the router.',
          'Emit a **cost/latency/quality scorecard** across the run.',
          'Write a README; push a `week-3` branch/tag to your repo.',
        ],
        doneWhen: 'One router spans the model family and emits a cost/latency/quality scorecard over 30 requests.',
        starter: [
          {
            title: 'router.py',
            lang: 'python',
            code: `import os, time, csv
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

ROUTES = {                       # task-type -> right-sized model
    "classify":  "claude-haiku-4-5",
    "summarise": "claude-sonnet-4-6",
    "reason":    "claude-opus-4-8",
}

def route(task, prompt, think=False):
    kw = {"model": ROUTES.get(task, "claude-sonnet-4-6"), "max_tokens": 600,
          "messages": [{"role": "user", "content": prompt}]}
    if think:
        kw["thinking"] = {"type": "enabled", "budget_tokens": 1500}
    t0 = time.time()
    r = client.messages.create(**kw)
    with open("scorecard.csv", "a", newline="") as f:
        csv.writer(f).writerow([task, kw["model"], round(time.time() - t0, 2),
            r.usage.input_tokens, r.usage.output_tokens])
    return r.content[-1].text
print(route("reason", "Diagnose why nightly ETL row counts dropped 12%", think=True))`,
          },
        ],
        hints: [
          'Keep routing rules in one dict/table so cost/quality is tuned in a single place.',
          'Add a quality column (a rubric score or an eval pass/fail) so the scorecard is not just cost.',
        ],
        stretch: [
          'Add a budget guard: if a task’s estimated cost exceeds a cap, downgrade the model or reject.',
          'Turn on caching for the shared prefix and add `cache_read` savings to the scorecard.',
        ],
      },
      quiz: [
        {
          q: 'A model router gives an FDE…',
          options: ['One model forever', 'One place to control cost/quality across the model family', 'A UI framework'],
          answer: 1,
          why: 'Centralising model choice tunes cost/quality without touching every caller.',
        },
        {
          q: 'The scorecard matters because…',
          options: ['It turns model choice into evidence for the client, not opinion', 'It looks nice', 'It lowers token count'],
          answer: 0,
          why: 'Cost/latency/quality data makes routing decisions defensible.',
        },
      ],
      tools: ['Model family', 'FinOps', 'GitHub'],
      keyTakeaways: [
        'A router centralises model choice so cost and quality are tuned in one place.',
        'A cost/latency/quality scorecard makes routing defensible to the client.',
      ],
    },
  ],
}

export default week
