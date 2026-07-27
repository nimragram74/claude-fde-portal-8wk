import type { Week } from '../../types'
import { LINKS, doc, cookbook, ytSearch, udemySearch, article, tool } from '../links'

const week: Week = {
  id: 6,
  code: 'AGT-D700 · Agents',
  title: 'Agents, Skills & multi-agent orchestration',
  goal: 'You build DAGs that run a fixed path. An agent decides its own path at runtime. This week: the agent loop vs a pipeline, the Claude Agent SDK, tools + MCP + a sandboxed environment, guardrails and tracing, Skills, subagents, orchestration patterns, and when multi-agent genuinely pays off — all on an analysis/research use case.',
  layer: 'Agents & Orchestration',
  belt: 'Green (Agents)',
  beltColor: '#6fae54',
  accent: '#7a3ea0',
  shipTitle: 'An orchestrated multi-agent analysis/research system',
  outcomes: [
    'Contrast the agent loop (gather → act → verify) with a fixed data pipeline / DAG and know when each fits',
    'Scaffold an agent on the Claude Agent SDK and run a bounded, step-capped task',
    'Equip an agent with data tools + MCP and a sandboxed environment, with guardrails and a full trace',
    'Package a reusable capability as an Agent Skill and delegate scoped work to subagents when it earns its cost',
    'Apply the four orchestration patterns and ship a bounded, evaluator-checked multi-agent analysis system',
  ],
  resources: [
    LINKS.effectiveAgents,
    LINKS.agentSdk,
    LINKS.agentSkills,
    cookbook('Anthropic Cookbook — agent & orchestration patterns'),
    udemySearch('build AI agents Claude Agent SDK multi-agent orchestration', 'Udemy: AI agents & orchestration'),
  ],
  days: [
    {
      id: '6.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'What is an agent? The loop vs a DAG, and the Agent SDK',
      learn: {
        intro:
          'You already ship **pipelines**: a fixed DAG where every node and edge is decided at authoring time. An **agent** flips that — it decides its own next step and tool **at runtime**, looping **gather context → act → verify** until the task is done or a cap is hit. Today you read “Building effective agents”, feel where a DAG is still the right answer, and meet the Claude Agent SDK — the harness that runs the loop for you.',
        steps: [
          'Read “Building effective agents”: a **workflow/DAG** follows a fixed, pre-declared path; an **agent** chooses steps and tools dynamically. Reach for the simplest thing that works — a DAG if the path is known.',
          'Learn the agent loop — **gather context → act (call a tool) → verify** — and see it as a *data-dependent* DAG whose next node is chosen by the model, not by you.',
          'Map the analogy for your domain: an ETL job is a static DAG; an analysis agent that decides which query, source or check to run next is the loop. Same primitives, different control flow.',
          'Skim the Claude Agent SDK overview — it owns the loop, tool dispatch and context management, so you write the task, not the plumbing you would hand-roll around `stop_reason == "tool_use"`.',
        ],
        resources: [
          LINKS.effectiveAgents,
          LINKS.agentSdk,
          LINKS.toolUse,
          ytSearch('Claude Agent SDK agent loop vs workflow tutorial', 'YouTube: the agent loop & Agent SDK'),
        ],
      },
      lab: {
        title: 'A bounded analysis loop + an SDK agent',
        steps: [
          'Hand-build a bounded loop that keeps calling Claude while `stop_reason == "tool_use"`, capped by `MAX_STEPS` — the cap is what stops an agent from spiralling the way a DAG never can.',
          'Give it one grounding tool (e.g. `query_metrics`) and pose an analysis question that needs 2–3 steps to answer.',
          'Scaffold a second agent with the Claude Agent SDK on the same task and note what the SDK handled for you (loop, dispatch, context) vs what you wrote by hand.',
          'Record both runs — steps taken, tools called, final answer — in a short `notes.md`, and state when a fixed DAG would have been the simpler choice.',
        ],
        doneWhen: 'A bounded hand-built loop and an Agent SDK agent both answer the analysis question, and `notes.md` contrasts the loop with a DAG.',
        starter: [
          {
            title: 'bounded_loop.py (hand-built agent loop)',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
MAX_STEPS = 6                              # the cap a free-running DAG never needs

def run(task, tools, dispatch):
    msgs = [{"role": "user", "content": task}]
    for step in range(MAX_STEPS):
        r = client.messages.create(model="claude-sonnet-4-6",
            max_tokens=1024, tools=tools, messages=msgs)
        msgs.append({"role": "assistant", "content": r.content})
        if r.stop_reason != "tool_use":
            return r.content[-1].text        # model chose to answer: loop ends
        results = [dispatch(b) for b in r.content if b.type == "tool_use"]
        msgs.append({"role": "user", "content": results})
    return "stopped: hit MAX_STEPS"`,
          },
        ],
        hints: [
          'The loop ends when `stop_reason != "tool_use"` — the model stopped asking for tools and gave its answer.',
          'Return all `tool_result` blocks in one `user` message so the model sees every result on the next turn.',
        ],
        stretch: [
          'Print the step number and tool name each iteration so you can watch the agent reason — your first trace.',
          'Take a real ETL step you own and argue in one paragraph whether it should stay a DAG or become an agent.',
        ],
      },
      quiz: [
        {
          q: 'The core difference between a data pipeline/DAG and an agent is…',
          options: ['Agents are always faster', 'A DAG follows a fixed pre-declared path; an agent chooses its next step/tool at runtime', 'DAGs cannot use tools'],
          answer: 1,
          why: 'A DAG’s path is authored up front; an agent decides steps dynamically. Use the simplest pattern that works.',
        },
        {
          q: 'The Claude Agent SDK gives you…',
          options: ['The harness — the loop, tool dispatch and context management', 'A new model', 'A vector database'],
          answer: 0,
          why: 'The SDK is the agent harness so you build the task, not the loop plumbing.',
        },
      ],
      tools: ['Agent SDK', 'Python / TS', 'Messages API'],
      keyTakeaways: [
        'A DAG runs a fixed path; an agent picks its path at runtime — choose the simplest that fits.',
        'The Agent SDK runs the loop (gather → act → verify) so you focus on the analysis task.',
      ],
    },
    {
      id: '6.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'Tools + MCP + a sandboxed environment, with guardrails & tracing',
      learn: {
        intro:
          'An agent is only as capable — and as safe — as the tools, environment and bounds you give it. Today you wire your **Week-4 data tools** as custom tools and via **MCP**, hand the agent a **sandboxed** working directory, and add the guardrails every production agent needs: **step caps, a tool allow-list, and a full trace** (steps, tools, tokens).',
        steps: [
          'Expose capabilities as **custom tools** and via **MCP servers** — reuse your Week-4 data tools (query the warehouse, search the index) so the agent works on real data under your control.',
          'Distinguish **grounding tools** (read real data to cite) from **action tools** (change state) — validate action inputs and treat writes as consequential.',
          'Sandbox any code/file/shell access with **least privilege**: a scratch dir, not your home directory. Never `eval()` model output.',
          'Add guardrails: a hard **step cap**, a **tool allow-list** (deny by default), and a **trace** logging each step, tool and token count for observability and audit.',
        ],
        resources: [
          LINKS.toolUse,
          LINKS.mcpDocs,
          tool('claude-agent-sdk (GitHub)', 'https://github.com/anthropics/claude-agent-sdk-python', 'GitHub'),
          doc('Reduce hallucinations & increase reliability', 'docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations'),
          ytSearch('Claude agent MCP tools sandbox guardrails tracing', 'YouTube: agent tools, MCP & guardrails'),
        ],
      },
      lab: {
        title: 'Equip, sandbox & bound the agent',
        steps: [
          'Wire your Week-4 MCP data server plus one compute/grounding tool into the agent from 6.1.',
          'Restrict the agent to a tool **allow-list** (reject anything else) and enforce `MAX_STEPS`; require confirmation before any state-changing action.',
          'Run the agent in a **scratch working directory** with least-privilege access and give it a task needing 2–3 grounded tool calls.',
          'Trace the full run to `trajectory.jsonl` — step number, tool, arguments, input/output tokens — so the run is auditable end-to-end.',
        ],
        doneWhen: 'The agent completes a multi-tool, grounded analysis task while sandboxed, allow-listed, step-capped, and fully traced.',
        starter: [
          {
            title: 'guardrails.py (allow-list, confirm, trace)',
            lang: 'python',
            code: `import json
ALLOW = {"query_metrics", "search_index", "calc"}   # deny everything else
WRITES = {"write_table", "create_ticket"}           # consequential -> confirm

def guard(block, step):
    if block.name not in ALLOW:
        raise PermissionError(f"tool '{block.name}' not on allow-list")
    if block.name in WRITES:
        if input(f"[step {step}] allow {block.name}({block.input})? [y/N] ") != "y":
            raise PermissionError("human declined")

def trace(step, name, usage):                        # observability = audit
    with open("trajectory.jsonl", "a") as f:
        f.write(json.dumps({"step": step, "tool": name,
            "in": usage.input_tokens, "out": usage.output_tokens}) + "\\n")`,
          },
        ],
        hints: [
          'Deny by default: an allow-list is safer than a block-list because new tools are unsafe until vetted.',
          'Grounding tools should return sources the agent can cite; log tokens per step so a runaway loop is visible early.',
        ],
        stretch: [
          'Add an MCP server via the SDK and confirm the agent discovers its tools automatically.',
          'Break the grounding tool on purpose and prove the agent’s answer depends on real tool output, not guesswork.',
        ],
      },
      quiz: [
        {
          q: 'MCP + custom tools are how you…',
          options: ['Change the model', 'Connect the agent to your data/systems under your control and validation', 'Disable safety'],
          answer: 1,
          why: 'Tools and MCP expose your APIs and data to the agent, with your own validation.',
        },
        {
          q: 'A tool allow-list is safer than a block-list because…',
          options: ['It is faster', 'It denies by default, so newly added tools are unsafe until explicitly vetted', 'It uses fewer tokens'],
          answer: 1,
          why: 'Deny-by-default means an unknown or new tool cannot run until you approve it.',
        },
      ],
      tools: ['Agent SDK', 'MCP', 'Guardrails', 'Observability'],
      keyTakeaways: [
        'Tools + MCP connect the agent to your data; grounding tools read, action tools write and need validation.',
        'Bound every agent: step caps, allow-list, sandboxed environment, and a trace of steps/tools/tokens.',
      ],
    },
    {
      id: '6.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'Skills — reusable capability — and subagents & delegation',
      learn: {
        intro:
          'Two multipliers today. A **Skill** is a folder (a `SKILL.md` plus optional scripts) that Claude loads **on demand**, packaging a repeatable capability into build-once, reuse-everywhere IP. A **subagent** is a fresh, focused context you hand a scoped sub-task to — powerful when work genuinely decomposes, pure overhead when it does not.',
        steps: [
          'Learn what an Agent Skill is: a `SKILL.md` (name + description + instructions) plus optional resources. **Progressive disclosure** — the description is always visible, the body loads only when relevant, so Skills stay cheap until fired.',
          'Package a repeatable analysis capability (e.g. “generate an analysis brief”) as a Skill so it is reusable across agents rather than re-prompted each time.',
          'Learn what a subagent is: delegating a **scoped** sub-task to a **fresh context** so it stays focused — good for decomposable, specialised work.',
          'Learn the cost test: a subagent adds tokens and latency, so add one for genuine specialisation, not to look sophisticated. If it is not clearly better, that is your evidence not to add it.',
        ],
        resources: [
          LINKS.agentSkills,
          LINKS.agentSdk,
          doc('Claude Code — subagents', 'docs/claude-code/sub-agents'),
          cookbook('Anthropic Cookbook'),
          ytSearch('Anthropic Agent Skills SKILL.md subagents delegation', 'YouTube: Skills & subagents'),
        ],
      },
      lab: {
        title: 'Build a Skill + delegate to a researcher subagent',
        steps: [
          'Package “generate an analysis brief” as a Skill: a folder with `SKILL.md` and a tight `description` so Claude loads it only on matching tasks.',
          'Invoke it from your agent on a matching task; confirm it fires — and confirm it stays dormant on an unrelated task.',
          'Add a **researcher** subagent the primary agent delegates a scoped retrieval question to, then integrate its findings into the brief.',
          'Run the task **with** and **without** the subagent; record the quality difference and the extra cost/latency so the decision is evidence-based.',
        ],
        doneWhen: 'A Skill encapsulates the brief capability and a subagent’s scoped result is integrated, with the with/without-subagent trade-off recorded.',
        starter: [
          {
            title: 'skills/analysis-brief/SKILL.md',
            lang: 'markdown',
            code: `---
name: analysis-brief
description: >
  Generate a structured analysis brief from retrieved data and sources.
  Use when the user asks for an analysis brief, findings summary, or a
  data-backed writeup. Do NOT use for raw SQL or dashboard building.
---

# Analysis brief

When invoked, produce a brief with these sections:
1. **Headline** - the single most important finding, one sentence.
2. **Evidence** - 3-5 bullets, each citing a source or metric.
3. **Caveats** - data gaps, assumptions, confidence.
4. **So what** - 2 recommended actions.

Keep it under 300 words. Cite every number. Never invent data.`,
          },
        ],
        hints: [
          'The `description` is the whole game — vague descriptions make a Skill fire at the wrong time or never.',
          'Keep the subagent’s brief narrow; a fresh context only helps when the sub-task is genuinely scoped.',
        ],
        stretch: [
          'Add a helper script the Skill references (e.g. `format_table.py`) so it packages code, not just prose.',
          'Cap the subagent’s own steps so delegation cannot balloon cost, then reuse the Skill from a second agent unchanged.',
        ],
      },
      quiz: [
        {
          q: 'Progressive disclosure in an Agent Skill means…',
          options: ['The whole Skill always loads', 'The description is always visible but the body loads only when relevant', 'It replaces evals'],
          answer: 1,
          why: 'Descriptions stay visible so Claude knows when to load the body — Skills stay cheap until needed.',
        },
        {
          q: 'A subagent is justified when…',
          options: ['Always — more agents is better', 'A scoped, specialised sub-task benefits from a fresh, focused context', 'You want fewer tokens'],
          answer: 1,
          why: 'Delegation helps decomposable, specialised work; otherwise it just adds cost and latency.',
        },
      ],
      tools: ['Skills', 'Subagents', 'Agent SDK'],
      keyTakeaways: [
        'A Skill packages a repeatable capability Claude loads on demand — reusable IP that compounds.',
        'Add a subagent for genuine specialisation; each one costs tokens and latency, so make it earn its place.',
      ],
    },
    {
      id: '6.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Orchestration patterns & when multi-agent pays off',
      learn: {
        intro:
          'Most “agents” are a few **workflow patterns** composed well. Today: the core four — **prompt chaining, routing, orchestrator-workers, evaluator-optimizer** — and the design rule that governs them all: start with the simplest pattern, add agents only when they demonstrably improve the outcome. Then the honest cost question: multi-agent multiplies tokens and latency, so it pays off only when work genuinely parallelises or decomposes.',
        steps: [
          'Learn **prompt chaining** (fixed steps) and **routing** (classify then dispatch) — the simplest patterns, closest to a DAG.',
          'Learn **orchestrator-workers**: a lead decomposes a task and delegates focused sub-tasks (e.g. a research worker + a write worker), then aggregates.',
          'Learn **evaluator-optimizer**: one call generates, another checks against the goal and can trigger a bounded retry with feedback.',
          'Apply the justification test for multi-agent: use it only when subtasks are genuinely independent/specialised; measure quality **per unit cost**, and end with a QA/eval pass before anything reaches the user.',
        ],
        resources: [
          LINKS.effectiveAgents,
          LINKS.agentSdk,
          cookbook('Orchestration & workflow patterns', 'patterns/agents'),
          article('How we built our multi-agent research system', 'https://www.anthropic.com/engineering/built-multi-agent-research-system', 'Anthropic engineering'),
          ytSearch('building effective agents orchestrator workers evaluator multi agent', 'YouTube: orchestration patterns'),
        ],
      },
      lab: {
        title: 'Orchestrator + workers + evaluator vs a baseline',
        steps: [
          'Build an orchestrator that decomposes an analysis task and delegates to 2 workers — a **research** worker and a **write** worker.',
          'Add an **evaluator** step that checks the draft brief against the goal and returns PASS/FAIL with reasons; wire a capped retry that feeds the notes back to the write worker.',
          'Build a single-agent baseline that does the whole task in one prompt.',
          'Compare quality **and** tokens (log per stage); note exactly when the extra orchestration cost was justified — and when a simple chain would have done.',
        ],
        doneWhen: 'An orchestrator + workers + evaluator produce a checked brief and you have the quality/cost comparison vs a single-agent baseline.',
        starter: [
          {
            title: 'orchestrate.py (workers + evaluator gate)',
            lang: 'python',
            code: `import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

def call(system, user):
    r = client.messages.create(model="claude-sonnet-4-6", max_tokens=800,
        system=system, messages=[{"role": "user", "content": user}])
    return r.content[0].text

def research(goal):     return call("You research. Return 5 sourced facts.", goal)
def write(goal, facts): return call("You write a tight analysis brief.", goal + "\\n\\n" + facts)
def evaluate(goal, draft):
    v = call("Reply PASS or FAIL: reason. Check the brief meets the goal.", goal + "\\n\\n" + draft)
    return v.startswith("PASS"), v

def run(goal, max_retries=2):
    facts = research(goal)                     # orchestrator delegates to workers
    draft = write(goal, facts)
    for _ in range(max_retries):
        ok, notes = evaluate(goal, draft)      # evaluator gate
        if ok: return draft
        draft = write(goal, facts + "\\n\\nFix: " + notes)
    return draft`,
          },
        ],
        hints: [
          'Give each worker a narrow system prompt — focus is what makes decomposition pay off.',
          'Cap retries so a stubborn evaluator cannot loop forever, and measure tokens per stage.',
        ],
        stretch: [
          'Add a router in front that picks chaining vs orchestrator-workers based on task type.',
          'Run research workers in parallel across subtopics and confirm the QA pass merges them cleanly.',
        ],
      },
      quiz: [
        {
          q: 'The design rule for agent/orchestration patterns is…',
          options: ['Always maximise the number of agents', 'Start with the simplest pattern; add complexity only when it demonstrably improves the outcome', 'Always add an evaluator'],
          answer: 1,
          why: 'Complexity must earn its place — begin simple and escalate only on evidence.',
        },
        {
          q: 'Multi-agent is justified when…',
          options: ['Always — more agents is better', 'Work genuinely parallelises or decomposes into specialised roles, judged per unit cost', 'You want lower cost'],
          answer: 1,
          why: 'Multi-agent multiplies tokens/latency; it only pays off for genuinely decomposable work.',
        },
      ],
      tools: ['Orchestration', 'Multi-agent', 'Agent SDK'],
      keyTakeaways: [
        'The four patterns: chaining, routing, orchestrator-workers, evaluator-optimizer — pick the simplest that solves it.',
        'Multi-agent pays off only for genuinely decomposable work; always end with a QA/eval pass.',
      ],
    },
    {
      id: '6.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Ship: an orchestrated multi-agent analysis/research system',
      learn: {
        intro:
          'Ship day. Assemble the week into a bounded, self-checked analysis system: **topic → retrieve → analyse → structured brief**, driven by an **orchestrator** that invokes your Week-6 **Skill** and gated by an **evaluator** pass. Plan the step cap, error/timeout handling and clear agent boundaries first, then log the whole run so it is trustworthy and auditable.',
        steps: [
          'Design the flow: **topic → retrieve (grounded tools) → analyse → structured brief**, orchestrated end-to-end and invoking your `analysis-brief` Skill.',
          'Plan the guardrails **before** building: a hard step cap, error/timeout handling around every agent call, an allow-list, and a clear job for each agent.',
          'Add the **evaluator** pass so the brief only ships if it passes against the goal, else retry within the cap.',
          'Log the full run (inputs, tool calls, decisions, tokens) for audit, then harvest the workflow as reusable IP and push a `week-6` branch/tag.',
        ],
        resources: [
          LINKS.effectiveAgents,
          LINKS.agentSkills,
          LINKS.agentSdk,
          cookbook('Anthropic Cookbook — agent patterns'),
          ytSearch('Claude Agent SDK build multi agent research system end to end', 'YouTube: end-to-end multi-agent build'),
        ],
      },
      lab: {
        title: 'Analysis/research system',
        steps: [
          'Given a topic, run: **retrieve sources → analyse → structured brief**, via an orchestrator + your Week-6 Skill, grounded in your Week-4 data tools.',
          'Enforce a **step cap** and wrap every agent call in error/timeout handling; keep the tool allow-list from Tuesday.',
          'Run the **evaluator** pass; only emit the brief if it passes (else retry within the cap), and make it cite its sources.',
          'Log the full run to `run_log.json`; write a README + a design diagram (retrieve → analyse → evaluate); push a `week-6` branch.',
        ],
        doneWhen: 'One command produces a source-grounded, cited brief via a bounded, fully traced, evaluator-checked multi-agent flow.',
        starter: [
          {
            title: 'report_system.py (entry point)',
            lang: 'python',
            code: `import os, json, time
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
LOG = []

def step(name, system, user, cap=800):
    t = time.time()
    r = client.messages.create(model="claude-sonnet-4-6", max_tokens=cap,
        system=system, messages=[{"role": "user", "content": user}])
    LOG.append({"step": name, "secs": round(time.time() - t, 1),
                "in": r.usage.input_tokens, "out": r.usage.output_tokens})
    return r.content[0].text

def run(topic):                                        # bounded: 3 fixed stages + gate
    facts = step("retrieve", "Gather 5 sourced facts. Cite each.", topic)
    brief = step("analyse", "Write a structured, source-grounded analysis brief.", topic + "\\n" + facts)
    verdict = step("evaluate", "Reply PASS/FAIL + reason vs the goal.", topic + "\\n" + brief)
    json.dump(LOG, open("run_log.json", "w"), indent=2)   # audit the full run
    return brief, verdict

if __name__ == "__main__":
    b, v = run("Churn drivers in Q2 self-serve signups")
    print(v, "\\n\\n", b)`,
          },
        ],
        hints: [
          'A hard step cap is your circuit breaker — it stops a runaway loop from burning tokens.',
          'Reuse Tuesday’s `guard()`/`trace()` and Wednesday’s Skill — the ship is the week wired together, not new code.',
        ],
        stretch: [
          'Package the whole workflow as a reusable Skill/template for the next engagement.',
          'Publish the run log + README so a reviewer can audit a run without re-running it.',
        ],
      },
      quiz: [
        {
          q: 'Logging the full run of the analysis system lets you…',
          options: ['Nothing useful', 'Audit the decisions, tool calls and cost, and debug behaviour', 'Lower the token price'],
          answer: 1,
          why: 'Run logs are how you understand, debug and trust an orchestrated agent’s behaviour.',
        },
        {
          q: 'What makes the shipped system safe to run autonomously?',
          options: ['A large model alone', 'A step cap, allow-list, error/timeout handling, and an evaluator gate before emit', 'Maximum temperature'],
          answer: 1,
          why: 'Bounds, safe tools, error handling and a checking gate are what make autonomy trustworthy.',
        },
      ],
      tools: ['Agent SDK', 'Orchestration', 'Skills', 'GitHub'],
      keyTakeaways: [
        'The ship wires the week together: SDK loop + grounding tools + Skill + orchestrator + evaluator + trace.',
        'Bound and log every run, gate it with an evaluator, and harvest the workflow into reusable IP.',
      ],
    },
  ],
}

export default week
