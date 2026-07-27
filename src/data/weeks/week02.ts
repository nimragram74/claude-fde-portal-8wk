import type { Week } from '../../types'
import { LINKS, doc, ytSearch, udemySearch, tool } from '../links'

const week: Week = {
  id: 2,
  code: 'DEV-D150 · Developer',
  title: 'AI-native engineering with Claude Code',
  goal: "Master the FDE's delivery rig for data & AI work: Claude Code for agentic coding, turning notebook cells into spec-driven tested modules, mapping and safely modernising a dbt/SQL/airflow pipeline, encoding data-eng standards (no secrets, SQL lint, PII scan) with hooks and subagents, and an AI-native SDLC gated on tests + evals.",
  layer: 'Experience · Developer',
  belt: 'Yellow (Developer)',
  beltColor: '#efc76a',
  accent: '#b4552f',
  shipTitle: 'An AI-native SDLC: notebooks → tested modules with a CI eval + test gate',
  outcomes: [
    'Drive Claude Code in the terminal & IDE to map, plan, and edit across an unfamiliar data repo',
    'Turn a notebook cell into a spec-driven Python module with a generated pytest suite',
    'Map and safely modernise a dbt/SQL/airflow pipeline behind characterisation tests',
    'Encode data-eng standards (secrets, SQL lint, PII scan) as a CLAUDE.md, command, and hook',
    'Ship an AI-native SDLC where merge to main is gated on lint → tests → an eval gate',
  ],
  resources: [
    LINKS.claudeCode,
    LINKS.agentSkills,
    LINKS.effectiveAgents,
    tool('Claude Code on GitHub', 'https://github.com/anthropics/claude-code', 'GitHub'),
    udemySearch('Claude Code agentic coding data engineering workflow', 'Udemy: Claude Code / AI-native engineering courses'),
  ],
  days: [
    {
      id: '2.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'Claude Code: agentic coding & mapping an unfamiliar data repo',
      learn: {
        intro:
          "Claude Code is your delivery rig — an **agentic** coding tool that reads a repo, **plans before it edits**, changes files, and runs commands. For data teams its first superpower is speed of comprehension: it maps an unfamiliar dbt/SQL/airflow repo in plain English. The one rule that never bends: **never ship code you can't explain**.",
        steps: [
          'Read the Claude Code overview: how it reads a repo, plans, edits across the tree, and runs commands from the terminal or IDE.',
          "Practise the two moves that make you fast and safe: **'explain this'** on any notebook, module, or diff, and **'plan before you edit'** so you approve the approach first.",
          'Point it at an unfamiliar repo and ask for a map — entry points, DAG dependencies, staging vs marts, where data flows — the daily FDE task on a client system.',
          "Internalise the FDE rule: Claude Code accelerates you, but you **own and must defend every line** you ship.",
        ],
        resources: [
          LINKS.claudeCode,
          doc('Claude Code — CLI reference', 'docs/claude-code/cli-reference'),
          LINKS.effectiveAgents,
          ytSearch('Claude Code agentic coding terminal tutorial', 'YouTube: Claude Code agentic coding walkthrough'),
        ],
      },
      lab: {
        title: 'Map a repo & pair-program a change',
        steps: [
          'Open a sample data repo (or your Week-1 toolkit) in Claude Code and ask it to **map the repo in plain English**: entry points, data flow, key modules/DAGs.',
          "Describe a small change (e.g. a `--sample` flag on an ingest script) and ask Claude Code to **plan before editing**; review and approve the plan.",
          "Let it implement, then run **'explain this'** on each change until you can defend every generated line unaided.",
          'Find one place Claude Code was wrong or off-spec, note how you caught it, and correct it.',
        ],
        doneWhen: 'You have a plain-English map of the repo and a reviewed change you can explain line by line.',
        starter: [
          {
            title: 'Claude Code — first session on a data repo (bash)',
            lang: 'bash',
            code: '# install and launch inside your data repo\nnpm install -g @anthropic-ai/claude-code\ncd analytics-pipeline\nclaude\n\n# useful in-session prompts:\n#   "explain this notebook / module"     -> understand before you touch it\n#   "map this repo: dbt models, airflow DAG deps, data flow"\n#   "plan a --sample flag for the ingest script; do not edit yet"\n#   "now implement the plan, one file at a time, and show diffs"\n#   "explain this line"                   -> defend every change you keep',
          },
        ],
        hints: [
          "If Claude Code jumps straight to editing, add 'plan only, do not change files yet' to force the plan step.",
          'Review every diff before accepting it — approving blindly defeats the point of the exercise.',
        ],
        stretch: [
          'Ask Claude Code which module or DAG has the most complexity and least test coverage, then verify its answer against the code.',
        ],
      },
      quiz: [
        {
          q: 'The FDE rule for Claude Code output is…',
          options: ['Ship it if it runs', "Never ship code you can't explain", 'Never use Claude Code'],
          answer: 1,
          why: 'Claude Code accelerates you, but you own and must explain every line you ship.',
        },
        {
          q: 'On an unfamiliar dbt/airflow repo, Claude Code is most valuable for…',
          options: ['Rapidly mapping and explaining it so you are productive fast', 'Nothing', 'Only writing brand-new code'],
          answer: 0,
          why: 'Fast comprehension of unfamiliar data systems is a core embedded-FDE skill.',
        },
      ],
      tools: ['Claude Code', 'Terminal / IDE'],
      keyTakeaways: [
        'Claude Code plans, edits, and runs commands — you stay the reviewer.',
        "Map first with 'explain this'; never ship a line you cannot defend.",
      ],
    },
    {
      id: '2.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'Spec → code → tests: notebook cell → tested module',
      learn: {
        intro:
          'A notebook cell that works once is not production code. Today you promote a cell to a **spec-driven, tested module**: write the spec (inputs, outputs, edge cases), drive Claude Code to implement it, then have it generate a `pytest` suite — and you own the edge cases it misses.',
        steps: [
          'Take a working notebook cell (e.g. a cleaning/transform step) and write a short spec: **inputs, outputs, and edge cases** as explicit acceptance criteria.',
          'Drive Claude Code from that spec to a clean module — clear criteria constrain the output and make it more reliable than an open-ended prompt.',
          'Have Claude Code generate a `pytest` suite (small fixture DataFrames) covering each criterion; think **coverage**, not just green checks.',
          'Review the generated tests for the edge cases the model missed (nulls, dupes, bad types) and add them yourself.',
        ],
        resources: [
          LINKS.evals,
          LINKS.claudeCode,
          doc('Define your success criteria', 'docs/test-and-evaluate/define-success'),
          ytSearch('Claude Code spec driven development pytest generation', 'YouTube: spec-to-code + AI test generation'),
        ],
      },
      lab: {
        title: 'Promote a notebook cell to a tested module',
        steps: [
          'Write a spec for one transform (e.g. `clean_events(df)`): inputs, output schema/types, acceptance criteria, edge cases.',
          'Have Claude Code implement the module strictly against the spec.',
          'Ask it to generate a `pytest` suite with small fixture frames covering each acceptance criterion.',
          'Run the tests, fix failures, then add **one edge case Claude missed** (e.g. duplicate keys) and make it pass.',
        ],
        doneWhen: 'A notebook cell is now a module built from a spec and passing a generated pytest suite that covers its criteria.',
        starter: [
          {
            title: 'spec.md (template)',
            lang: 'markdown',
            code: '# Spec — clean_events(df) -> DataFrame\n\n## Input\n- Raw events frame: user_id, ts (str), amount (str, may carry a currency symbol)\n\n## Output\n- Typed frame: user_id:int, ts:datetime (tz-aware UTC), amount:Decimal(2 dp)\n\n## Acceptance criteria\n- Drops rows with null user_id\n- Parses ts to UTC; unparseable ts -> row dropped and logged\n- Strips currency symbols and thousands separators from amount\n- Raises ValueError on an empty input frame\n\n## Edge cases\n- Duplicate (user_id, ts) -> keep last\n- amount "1.2.3" -> row dropped',
          },
          {
            title: 'test_clean_events.py (generated starting point)',
            lang: 'python',
            code: 'import pytest\nimport pandas as pd\nfrom decimal import Decimal\nfrom events import clean_events\n\ndef test_parses_and_types():\n    raw = pd.DataFrame({"user_id": [1], "ts": ["2026-01-02T03:00:00Z"], "amount": ["$1,234.50"]})\n    out = clean_events(raw)\n    assert out.loc[0, "amount"] == Decimal("1234.50")\n\ndef test_drops_null_user():\n    raw = pd.DataFrame({"user_id": [None], "ts": ["2026-01-02T03:00:00Z"], "amount": ["1"]})\n    assert clean_events(raw).empty\n\ndef test_rejects_empty_input():\n    with pytest.raises(ValueError):\n        clean_events(pd.DataFrame())',
          },
        ],
        hints: [
          'Paste the spec into Claude Code and say "implement exactly this spec; ask before assuming any behaviour not stated".',
          'A test that is trivially true is not coverage — rewrite it to assert real behaviour on a fixture frame.',
        ],
        stretch: [
          'Ask Claude Code to report which acceptance criteria are NOT yet covered by tests, then close the gap.',
        ],
      },
      quiz: [
        {
          q: 'Starting from a written spec makes AI coding…',
          options: ['Slower', 'More reliable — clear acceptance criteria constrain output', 'Impossible'],
          answer: 1,
          why: 'A spec + tests turn a one-off notebook cell into verifiable engineering.',
        },
        {
          q: 'Generated tests still need you to…',
          options: ['Review the edge cases the model missed (nulls, dupes, bad types)', 'Accept them blindly', 'Delete them'],
          answer: 0,
          why: 'Generated tests are a strong start; you own coverage of the real data edge cases.',
        },
      ],
      tools: ['Claude Code', 'pytest', 'pandas'],
      keyTakeaways: [
        'Promote notebook cells to spec-driven, tested modules — a cell that runs once is not production code.',
        'You own coverage — review the data edge cases the model missed.',
      ],
    },
    {
      id: '2.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'Understand & safely modernise a dbt/SQL/airflow pipeline',
      learn: {
        intro:
          'Embedded on a client system, your job is to modernise a pipeline **without breaking last night’s numbers**. Claude Code maps the dbt/SQL/airflow project in plain English; then **characterisation tests** lock current output so AI-assisted refactoring is safe, not reckless.',
        steps: [
          'Use Claude Code to map an unfamiliar pipeline — staging vs marts, DAG dependencies, where each metric is computed.',
          'Learn safe refactoring: add **characterisation tests** that capture current output *before* you change anything (values captured by running the code, not from a spec).',
          'Refactor **incrementally** — one model or task at a time — keeping tests green throughout; never rewrite the whole DAG at once.',
          'Understand the same discipline scales up: SQL uplift, warehouse migration, and RPA-to-agent conversion all follow map → characterise → refactor.',
        ],
        resources: [
          LINKS.claudeCode,
          LINKS.evals,
          LINKS.effectiveAgents,
          ytSearch('Claude Code understand legacy data pipeline refactor', 'YouTube: mapping & modernising a pipeline with Claude Code'),
        ],
      },
      lab: {
        title: 'Map, characterise & modernise a pipeline',
        steps: [
          'Clone an unfamiliar sample pipeline repo and ask Claude Code for a **plain-English map**: models, DAG deps, data flow.',
          'Pick one transform (e.g. `rollup_daily`) and add **characterisation tests** capturing its current output exactly — even the quirks.',
          'Refactor that transform with Claude Code, keeping the characterisation tests **green throughout**.',
          'Document what changed and why in a short note or PR description.',
        ],
        doneWhen: 'An unfamiliar transform is mapped, characterisation-tested, and safely refactored with every test green.',
        starter: [
          {
            title: 'Characterisation test — pin current output first (python)',
            lang: 'python',
            code: '# Pin what the transform does TODAY, before refactoring the pipeline.\n# Values were captured by RUNNING the current code, not written from a spec.\nimport pytest\nfrom decimal import Decimal\nfrom pipeline.revenue import rollup_daily\n\nCASES = [\n    ("2026-01-01", "EU", Decimal("1500.00")),\n    ("2026-01-01", "US", Decimal("980.00")),\n    ("2026-01-02", "EU", Decimal("0.00")),\n]\n\n@pytest.mark.parametrize("day,region,expected", CASES)\ndef test_characterise_rollup(day, region, expected):\n    assert rollup_daily(day, region) == expected\n    # If a refactor changes any of these, the diff is intentional & visible.',
          },
          {
            title: 'Ask Claude Code to map the pipeline (bash)',
            lang: 'bash',
            code: 'cd analytics-pipeline\nclaude\n#   "map this repo: dbt staging vs marts, airflow DAG deps, data flow"\n#   "which model or DAG task is most complex and least tested?"\n#   "write characterisation tests for rollup_daily capturing current output"\n#   "refactor that model for readability; keep every test green; show diffs"',
          },
        ],
        hints: [
          'Characterisation tests assert what the code *does now*, not what it *should* do — capture the odd numbers too.',
          'If a refactor turns a test red, decide deliberately: is the changed number intended, or a regression in a metric?',
        ],
        stretch: [
          'Ask Claude Code to spot one RPA-style batch job or manual step and sketch how it would become an agent-driven task.',
        ],
      },
      quiz: [
        {
          q: 'Before refactoring a legacy transform you should…',
          options: ['Rewrite the whole DAG at once', 'Add characterisation tests to lock its current output', 'Delete the tests'],
          answer: 1,
          why: 'Pinning current behaviour first makes AI-assisted refactoring safe and regressions visible.',
        },
        {
          q: 'Characterisation tests capture…',
          options: ['What the code should ideally do', 'What the code does today — quirks and all', 'Only the happy path from the spec'],
          answer: 1,
          why: 'They assert current output verbatim, so any change to a metric shows up as an intentional, visible diff.',
        },
      ],
      tools: ['Claude Code', 'dbt / SQL', 'pytest'],
      keyTakeaways: [
        'Map first, lock current output with characterisation tests, then refactor incrementally.',
        'Modernise pipelines without breaking last night’s numbers — the diff must always be intentional.',
      ],
    },
    {
      id: '2.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Hooks, subagents & CLAUDE.md: encode data-eng standards',
      learn: {
        intro:
          'Standards that live in one engineer’s head don’t scale. Claude Code lets you **encode data-eng standards** into the repo — a `CLAUDE.md` for durable context, a custom command/subagent for repeatable reviews, and hooks that fire automatically — so no-secrets, SQL lint, and PII checks travel with the code across every pod.',
        steps: [
          'Pin durable project context with **`CLAUDE.md`**: coding + data-eng standards (no secrets, PII rules, SQL lint) so every session starts aligned.',
          'Learn subagents and custom slash-commands/skills to encode a repeatable move — e.g. a `/pii-scan` that flags emails, phone, and national IDs in code, fixtures, and logs.',
          'Learn **hooks** that run SQL lint, a secret scan, and tests automatically on change — automation for the deterministic checks.',
          'Draw the line: automate the deterministic checks; keep a **human** where judgement or consequence (a schema change, a PII decision) demands it.',
        ],
        resources: [
          LINKS.claudeCode,
          doc('Claude Code — hooks', 'docs/claude-code/hooks'),
          LINKS.agentSkills,
          ytSearch('Claude Code CLAUDE.md hooks custom commands', 'YouTube: CLAUDE.md, hooks & custom skills'),
        ],
      },
      lab: {
        title: 'Encode a data-eng standard as a command + hook',
        steps: [
          "Add a `CLAUDE.md` to your pipeline repo with your team's coding + data-eng standards (secrets, PII, SQL lint).",
          'Create a custom command/subagent (e.g. `/pii-scan`) that scans changed files for secrets and unmasked PII.',
          'Add a hook that runs SQL lint + a secret scan + tests on every edit and confirm it actually fires.',
          'Make a small edit and watch the hook run and the command apply your standard.',
        ],
        doneWhen: 'A custom command + a hook enforce a data-eng standard (no secrets / PII / SQL lint) automatically in Claude Code.',
        starter: [
          {
            title: 'CLAUDE.md (project + data-eng standards)',
            lang: 'markdown',
            code: '# analytics-pipeline — project context for Claude Code\n\n## Coding standards\n- Python 3.11+, type hints on public functions, ruff + black.\n- Every new transform ships with a pytest test on a small fixture frame.\n\n## Data-eng standards\n- Never hardcode secrets or connection strings; read from env vars only.\n- No PII (email, phone, national id) in logs, notebooks, or test fixtures.\n- SQL must pass sqlfluff lint; parameterise all queries (no f-string SQL).\n\n## Review rules\n- Refactors keep existing + characterisation tests green.\n- Flag any raw credential, unmasked PII, or unparameterised query.',
          },
          {
            title: '.claude/settings.json — hook: lint + secret scan + tests',
            lang: 'json',
            code: '{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Edit|Write",\n        "hooks": [\n          { "type": "command", "command": "sqlfluff lint models/ && detect-secrets scan && pytest -q" }\n        ]\n      }\n    ]\n  }\n}',
          },
        ],
        hints: [
          'Keep `CLAUDE.md` short and durable — it is context every session reloads, not a place for one-off notes.',
          'Prove the hook fires by making a trivial edit and watching the lint/scan/test command run in the transcript.',
        ],
        stretch: [
          'Turn the "scan for secrets & PII" prompt into a reusable custom slash-command so the whole pod runs it identically.',
        ],
      },
      quiz: [
        {
          q: 'A CLAUDE.md in a data repo is used to…',
          options: ['Pin durable project context & data-eng standards for the agent', 'Store connection strings', 'Deploy the pipeline'],
          answer: 0,
          why: 'It carries standards (secrets, PII, SQL lint) and context so every session starts aligned.',
        },
        {
          q: 'A hook that runs SQL lint + a secret scan + tests on every edit is best for…',
          options: ['Deterministic checks you want automated', 'A PII redaction judgement call', 'Approving a schema change'],
          answer: 0,
          why: 'Automate the deterministic checks; keep a human where judgement or consequence demands it.',
        },
      ],
      tools: ['Claude Code', 'Hooks', 'sqlfluff / detect-secrets'],
      keyTakeaways: [
        '`CLAUDE.md` + custom commands + hooks make data-eng standards travel with the repo.',
        'Automate deterministic checks (secrets, PII, SQL lint); keep a human where judgement matters.',
      ],
    },
    {
      id: '2.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Ship: an AI-native SDLC with a CI eval + test gate',
      learn: {
        intro:
          'Friday is ship day. You wire a real CI pipeline — **lint → tests → eval → review gate before merge** — where Claude accelerates coding, tests, and review *inside* disciplined gates. For a data/AI repo the eval gate (Week-1 golden set) joins lint and pytest so no prompt or model change ships without a score.',
        steps: [
          'Design a CI pipeline: on push, run **lint → pytest → an eval gate**; block merge to `main` until all pass.',
          'Add the **eval gate**: run your Week-1 golden eval set and fail the job below a minimum score — regressions in prompt/model quality never reach main.',
          'Add a **review gate**: require both an AI review and a human review to pass before merge.',
          'Document the AI-native SDLC so the whole pod follows the same disciplined flow.',
        ],
        resources: [
          LINKS.claudeCode,
          LINKS.evals,
          tool('GitHub Actions documentation', 'https://docs.github.com/en/actions', 'GitHub'),
          ytSearch('GitHub Actions CI lint test gate pull request', 'YouTube: CI with lint + test gates on PRs'),
        ],
      },
      lab: {
        title: 'CI with lint → tests → eval + review gates',
        steps: [
          'Add a GitHub Actions workflow: on push → **ruff + sqlfluff lint → pytest → run the eval gate**.',
          'Configure branch protection so merge to `main` requires the checks + a passing **AI + human PR review**.',
          'Document the AI-native SDLC in the `README`.',
          'Open a PR that must pass the gates, then push a `week-2` branch/tag.',
        ],
        doneWhen: 'CI runs lint + tests + evals on push and merge to main is gated on passing review + all checks.',
        starter: [
          {
            title: '.github/workflows/ci.yml',
            lang: 'yaml',
            code: 'name: CI\non:\n  push:\n  pull_request:\n    branches: [main]\n\njobs:\n  lint-test-eval:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install -r requirements.txt ruff pytest sqlfluff\n      - run: ruff check . && sqlfluff lint models/\n      - run: pytest -q\n      - name: Eval gate (Week-1 golden set)\n        run: python evals/run_evals.py --min-score 0.85',
          },
          {
            title: 'Gate merge on main (bash / gh CLI)',
            lang: 'bash',
            code: '# require the CI check + at least one review before merge to main\ngh api -X PUT repos/:owner/analytics-pipeline/branches/main/protection \\\n  -f "required_status_checks[strict]=true" \\\n  -f "required_status_checks[contexts][]=lint-test-eval" \\\n  -F "required_pull_request_reviews[required_approving_review_count]=1" \\\n  -F "enforce_admins=true"\n\ngit checkout -b week-2 && git push -u origin week-2   # open a PR that must pass the gates',
          },
        ],
        hints: [
          'If the workflow does not appear, confirm it lives at `.github/workflows/ci.yml` on the branch you pushed.',
          'The eval gate should fail the build below your minimum score — a red eval is a real regression, not a warning.',
        ],
        stretch: [
          'Add a job that runs Claude Code as an automated PR reviewer and posts its findings as a comment before the human review.',
        ],
      },
      quiz: [
        {
          q: 'An AI-native SDLC means…',
          options: ['Removing humans', 'Claude accelerates coding, tests, and review inside disciplined gates', 'No tests'],
          answer: 1,
          why: 'Claude speeds each SDLC stage; gates (lint, tests, evals, review) keep quality and ownership intact.',
        },
        {
          q: 'Adding an eval gate to CI for a data/AI repo ensures…',
          options: ['No prompt or model change ships below a minimum quality score', 'Faster merges with less review', 'Secrets are stored in the pipeline'],
          answer: 0,
          why: 'The golden eval set runs in CI so quality regressions are caught before reaching main.',
        },
      ],
      tools: ['Claude Code', 'GitHub Actions', 'Evals'],
      keyTakeaways: [
        'Claude accelerates every SDLC stage; gates keep quality and ownership intact.',
        'For data/AI, the eval gate joins lint + tests — no change reaches main without a score.',
      ],
    },
  ],
}

export default week
