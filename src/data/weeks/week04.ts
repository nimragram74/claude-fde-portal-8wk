import type { Week } from '../../types'
import { LINKS, doc, cookbook, ytSearch, udemySearch } from '../links'

const week: Week = {
  id: 4,
  code: 'TOOL-D400 · Tools & MCP',
  title: 'Tool use & the Model Context Protocol — hands on your data',
  goal: 'Give Claude hands on the systems you already run: reliable tool use over a warehouse/DB (get_schema, run_query), guarded writes and DDL, and MCP servers that expose those data tools once and let any client reuse them — all with validation and least privilege.',
  layer: 'Agents & Orchestration',
  belt: 'Orange',
  beltColor: '#e0855f',
  accent: '#c07a2f',
  shipTitle: 'A data/ops helper micro-agent + an MCP server over your warehouse',
  outcomes: [
    'Define data tools with a JSON input schema and drive the full tool-use loop (get_schema, run_query read-only)',
    'Route among multiple tools and run parallel calls, guarding writes/DDL behind confirmation',
    'Explain MCP and build + consume an MCP server exposing warehouse tools, reusing it from a second client',
    'Wire tools over a real database with input validation, SQL-injection defence and least-privilege creds',
    'Ship an English-in / action-out data helper that queries the warehouse and performs guarded writes via MCP',
  ],
  resources: [
    LINKS.toolUse,
    LINKS.mcpSite,
    LINKS.mcpDocs,
    cookbook('Tool use cookbook examples', 'tool_use'),
    udemySearch('Anthropic Claude tool use function calling MCP databases', 'Udemy: Claude tool use & MCP over data'),
  ],
  days: [
    {
      id: '4.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'Tool use & the loop: data tools with input schemas',
      learn: {
        intro:
          'Tool use is how Claude gets **hands** on your data. Claude does not run SQL — it **requests** a call (`stop_reason: "tool_use"`), your code executes it against the warehouse, and you return a `tool_result` so Claude can continue. Today you master that loop with two read-only tools: `get_schema` and `run_query`.',
        steps: [
          'Read the tool-use overview and internalise the loop: Claude requests a tool (`stop_reason: "tool_use"`) → your code runs it → you return a `tool_result` → Claude continues.',
          'Learn the tool definition shape: `name`, `description`, and an `input_schema` (JSON Schema). The description **is a prompt** — it drives whether and how Claude calls.',
          'Define `get_schema` (no args → tables/columns) and `run_query` (a read-only `SELECT` string) so Claude can discover structure before it queries.',
          'Trace one round-trip end to end: Claude reads the schema, writes a `SELECT`, you execute it, and it answers grounded in real rows.',
        ],
        resources: [
          LINKS.toolUse,
          LINKS.messages,
          cookbook('Tool use — basic examples', 'tool_use'),
          ytSearch('Anthropic Claude tool use loop sql database tutorial', 'YouTube: the tool-use loop over a database'),
        ],
      },
      lab: {
        title: 'get_schema + run_query (read-only)',
        steps: [
          'Create a SQLite warehouse `sales.db` with an `orders` table and seed a few rows.',
          'Define two tools — `get_schema()` and `run_query(sql)` — each with a proper `input_schema`; keep the connection read-only.',
          'Implement the loop: send the tools, detect `stop_reason == "tool_use"`, run the requested tool, feed the `tool_result` back.',
          'Ask "which region had the most revenue?" and confirm Claude reads the schema, then queries, then answers from rows.',
        ],
        doneWhen: 'Claude calls get_schema then run_query and answers grounded in real query results.',
        starter: [
          {
            title: 'data_loop.py',
            lang: 'python',
            code: 'import os, sqlite3\nfrom anthropic import Anthropic\n\nclient = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])\ndb = sqlite3.connect("file:sales.db?mode=ro", uri=True)  # read-only\n\ntools = [\n  {"name": "get_schema", "description": "List tables and columns.",\n   "input_schema": {"type": "object", "properties": {}}},\n  {"name": "run_query", "description": "Run one read-only SELECT and return rows.",\n   "input_schema": {"type": "object",\n     "properties": {"sql": {"type": "string"}}, "required": ["sql"]}},\n]\n\ndef run_tool(name, args):\n    if name == "get_schema":\n        return str(db.execute("SELECT sql FROM sqlite_master").fetchall())\n    return str(db.execute(args["sql"]).fetchall())  # ro conn blocks writes\n\nmsgs = [{"role": "user", "content": "Which region had the most revenue?"}]\nwhile True:\n    r = client.messages.create(model="claude-sonnet-4-6", max_tokens=700,\n        tools=tools, messages=msgs)\n    msgs.append({"role": "assistant", "content": r.content})\n    if r.stop_reason != "tool_use":\n        print(r.content[0].text); break\n    out = []\n    for b in r.content:\n        if b.type == "tool_use":\n            res = run_tool(b.name, b.input)\n            out.append({"type": "tool_result", "tool_use_id": b.id, "content": res})\n    msgs.append({"role": "user", "content": out})',
          },
        ],
        hints: [
          'The assistant’s `tool_use` block and your `tool_result` must share the same `tool_use_id`.',
          'Append the assistant turn (with its `tool_use` blocks) to `messages` before you send the results back.',
        ],
        stretch: [
          'Let `get_schema` also return 2 sample rows per table so Claude writes better SQL.',
          'Return a query error as the `tool_result` string and watch Claude fix its SQL and retry.',
        ],
      },
      quiz: [
        {
          q: 'In tool use, who executes the SQL?',
          options: ["Anthropic's servers", 'Your code, which returns a tool_result to Claude', 'The warehouse directly'],
          answer: 1,
          why: 'Claude requests a call with inputs; your code runs it against the DB and returns the result.',
        },
        {
          q: 'Why expose get_schema alongside run_query?',
          options: ['To save tokens', 'So Claude can discover tables/columns before writing correct SQL', 'It is required by the API'],
          answer: 1,
          why: 'Grounding on the real schema lets Claude write valid queries instead of guessing column names.',
        },
      ],
      tools: ['Tool use', 'Messages API', 'SQLite'],
      keyTakeaways: [
        'The loop is request → execute → return `tool_result` → continue.',
        'Give Claude a `get_schema` tool so it grounds SQL on the real structure.',
      ],
    },
    {
      id: '4.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'Parallel & multi-tool routing; guard writes/DDL',
      learn: {
        intro:
          'One question can need **more than one** tool, and some tools **change state**. Claude can emit several `tool_use` blocks at once — run and return them all — while writes and DDL (`INSERT`/`UPDATE`/`CREATE`) must be separated from reads and gated behind explicit confirmation.',
        steps: [
          'Learn multi-tool selection: Claude routes among tools by their names and descriptions, so write precise, non-overlapping descriptions.',
          'Learn parallel tool calls — Claude can emit multiple `tool_use` blocks in one turn (e.g. schema + a lookup); run each and return each `tool_result`.',
          'Split read tools (`get_schema`, `run_query`) from state-changing tools (`run_write`, `run_ddl`) so privilege is explicit per tool.',
          'Guard every state-changing tool behind a `confirmed` flag: without it, return "confirmation required" instead of executing.',
        ],
        resources: [
          LINKS.toolUse,
          cookbook('Parallel & multi-tool examples', 'tool_use'),
          doc('Tool use — best practices', 'docs/build-with-claude/tool-use/overview'),
          ytSearch('Claude parallel tool calls multi tool routing confirmation', 'YouTube: parallel & multi-tool routing'),
        ],
      },
      lab: {
        title: 'A data tool belt with guarded writes',
        steps: [
          'Define 4 tools: `get_schema`, `run_query` (read), `run_write` (INSERT/UPDATE) and `run_ddl` (CREATE/ALTER).',
          'Craft questions — some need one tool, one needs schema + query in parallel.',
          'Loop over every `tool_use` block Claude emits in a turn and return all results together.',
          'Gate `run_write` and `run_ddl` behind `confirmed=true`; without it, refuse and echo the exact statement for a human to approve.',
        ],
        doneWhen: 'Claude routes correctly across 5 questions (including one parallel case) and writes/DDL only execute after confirmation.',
        starter: [
          {
            title: 'tool_belt.py (schemas + guarded dispatch)',
            lang: 'python',
            code: 'tools = [\n  {"name": "get_schema", "description": "List tables and columns. Read-only.",\n   "input_schema": {"type": "object", "properties": {}}},\n  {"name": "run_query", "description": "Run one read-only SELECT.",\n   "input_schema": {"type": "object",\n     "properties": {"sql": {"type": "string"}}, "required": ["sql"]}},\n  {"name": "run_write", "description": "INSERT/UPDATE rows. STATE-CHANGING: confirm first.",\n   "input_schema": {"type": "object", "properties": {\n     "sql": {"type": "string"}, "confirmed": {"type": "boolean"}},\n     "required": ["sql"]}},\n  {"name": "run_ddl", "description": "CREATE/ALTER tables. STATE-CHANGING: confirm first.",\n   "input_schema": {"type": "object", "properties": {\n     "sql": {"type": "string"}, "confirmed": {"type": "boolean"}},\n     "required": ["sql"]}},\n]\n\n# Iterate ALL tool_use blocks in one turn; gate mutations:\nfor b in r.content:\n    if b.type == "tool_use":\n        if b.name in ("run_write", "run_ddl") and not b.input.get("confirmed"):\n            out = "CONFIRM: re-call with confirmed=true to execute: " + b.input["sql"]\n        else:\n            out = dispatch(b.name, b.input)\n        results.append({"type": "tool_result", "tool_use_id": b.id, "content": out})',
          },
        ],
        hints: [
          'A single turn can carry multiple `tool_use` blocks — loop over them, do not assume just one.',
          'If Claude picks the wrong tool, tighten the descriptions so read vs write vs DDL do not overlap.',
        ],
        stretch: [
          'Add a question needing `get_schema` and `run_query` together and confirm both fire in one turn.',
          'Log every refused write with its statement so you have an approval trail.',
        ],
      },
      quiz: [
        {
          q: 'For one question needing two independent tools, Claude can…',
          options: ['Only call one per turn', 'Request parallel tool calls in one turn', 'Not handle it'],
          answer: 1,
          why: 'Claude can emit multiple tool_use blocks; your code runs and returns them all.',
        },
        {
          q: 'Why separate run_write / run_ddl from run_query?',
          options: ['To use fewer tokens', 'So state-changing power is explicit and can be gated behind confirmation', 'The API forbids mixing them'],
          answer: 1,
          why: 'Splitting reads from writes makes least privilege and confirmation enforceable per tool.',
        },
      ],
      tools: ['Tool use', 'Python / TS'],
      keyTakeaways: [
        'Claude can call several tools in one turn — run and return them all.',
        'Split reads from writes/DDL and gate mutations behind explicit confirmation.',
      ],
    },
    {
      id: '4.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'MCP: build + consume a server exposing data tools',
      learn: {
        intro:
          'MCP is the **open standard** for connecting Claude to tools and data. Instead of hand-wiring warehouse tools into one script, an MCP **server** exposes them and any MCP **client** (Claude Code, the Agent SDK) consumes them — expose your `run_query`/`get_schema` once, reuse everywhere.',
        steps: [
          'Read the MCP introduction: the open standard for connecting models to tools/data.',
          'Learn the client/server model — a server exposes tools/resources; a client (Claude) consumes them.',
          'Understand why MCP **decouples** data tools from any single app, so a warehouse capability is reusable across agents.',
          'Map the two SDKs you can consume a server from: Claude Code and the Agent SDK.',
        ],
        resources: [
          LINKS.mcpSite,
          LINKS.mcpDocs,
          LINKS.claudeCode,
          ytSearch('Model Context Protocol MCP server database tools tutorial', 'YouTube: build & consume a data MCP server'),
        ],
      },
      lab: {
        title: 'Build + consume a warehouse MCP server',
        steps: [
          'Build a small MCP server exposing 2 data tools — `get_schema` and `run_query` — with the MCP Python SDK.',
          'Register it with Claude Code and ask it to answer a question about your `sales.db`.',
          'Reuse the exact same server from a second client (the Agent SDK) without changing the server.',
          'Note what the server exposed vs what each client had to do to consume it.',
        ],
        doneWhen: "The MCP server's data tools are invoked by Claude and reusable from a second client with no server changes.",
        starter: [
          {
            title: 'wh_server.py (FastMCP, 2 data tools)',
            lang: 'python',
            code: 'import sqlite3\nfrom mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP("warehouse")\ndb = sqlite3.connect("file:sales.db?mode=ro", uri=True, check_same_thread=False)\n\n@mcp.tool()\ndef get_schema() -> str:\n    "List tables and columns in the warehouse."\n    return str(db.execute("SELECT sql FROM sqlite_master").fetchall())\n\n@mcp.tool()\ndef run_query(sql: str) -> str:\n    "Run one read-only SELECT and return rows."\n    if not sql.lstrip().lower().startswith("select"):\n        return "ERROR: only SELECT is allowed here"\n    return str(db.execute(sql).fetchall())\n\nif __name__ == "__main__":\n    mcp.run()   # speaks MCP over stdio; any MCP client can connect',
          },
          {
            title: 'Register with Claude Code (bash)',
            lang: 'bash',
            code: 'pip install mcp\n# add the server so Claude Code can call its data tools\nclaude mcp add warehouse -- python wh_server.py\nclaude mcp list          # confirm it is registered\n# then ask Claude Code to "use warehouse to find the top region by revenue"',
          },
        ],
        hints: [
          'FastMCP turns a typed Python function + docstring into a tool schema automatically.',
          'The server is transport-agnostic — the same process serves Claude Code and the Agent SDK client.',
        ],
        stretch: [
          'Expose the schema as a read-only MCP **resource** alongside the two tools.',
          'Consume the same server from the Agent SDK and confirm zero server changes were needed.',
        ],
      },
      quiz: [
        {
          q: 'MCP is…',
          options: ['A model', 'An open standard connecting models to tools/data via reusable servers', 'A billing API'],
          answer: 1,
          why: 'MCP standardises how tools/data are exposed so any MCP client can use them.',
        },
        {
          q: "MCP's advantage over a hand-wired warehouse tool is…",
          options: ['Servers become reusable across agents/clients', 'It removes the need for auth', 'It trains the model'],
          answer: 0,
          why: 'One MCP server over your warehouse is consumable by many clients — no per-app re-plumbing.',
        },
      ],
      tools: ['MCP', 'Python / TS', 'SQLite'],
      keyTakeaways: [
        'MCP is an open client/server standard for connecting Claude to tools/data.',
        'Expose warehouse tools once — one server, many clients, no re-plumbing.',
      ],
    },
    {
      id: '4.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Tools over real data + guardrails',
      learn: {
        intro:
          'Tools over a **real** warehouse need discipline: validate every input, defend against SQL injection, run under least-privilege credentials, and return helpful errors **as the `tool_result`** so Claude adapts instead of crashing. This is the line between a demo and a system you would let touch production data.',
        steps: [
          'Validate inputs: reject non-`SELECT` statements for read tools, cap `LIMIT`, and never string-format model/user input into SQL — use parameters.',
          'Defend against SQL injection and destructive multi-statements: reject `;`-chained statements and comment tricks; whitelist allowed tables where you can.',
          'Apply least privilege: connect read tools with a **read-only** DB role; writes use a separate, narrowly-scoped credential.',
          'Return clear, actionable errors as `tool_result` content (bad column, blocked statement, timeout) so Claude can retry or reroute.',
        ],
        resources: [
          LINKS.toolUse,
          LINKS.jailbreaks,
          doc('Tool use — handling errors', 'docs/build-with-claude/tool-use/overview'),
          ytSearch('Claude tool use sql injection least privilege validation database', 'YouTube: safe tools over a real DB'),
        ],
      },
      lab: {
        title: 'Hardened warehouse tools',
        steps: [
          'Wrap `run_query` in a validator: must start with `SELECT`, single statement (no `;` chaining), and enforce a max row `LIMIT`.',
          'Connect via a **read-only** role for reads; put writes behind a separate least-privilege connection and the `confirmed` gate.',
          'Wrap each tool in try/except that returns a helpful error string instead of raising.',
          'Attack your own tool: feed `SELECT 1; DROP TABLE orders` and a bad column name; confirm both are blocked with a clear error.',
        ],
        doneWhen: 'Read tools reject non-SELECT/multi-statement input, run read-only, and every failure returns a helpful error tool_result.',
        starter: [
          {
            title: 'guarded_query.py',
            lang: 'python',
            code: 'import re, sqlite3\n\nro = sqlite3.connect("file:sales.db?mode=ro", uri=True)  # least privilege\nMAX_ROWS = 500\n\ndef run_query(sql: str) -> str:\n    s = sql.strip().rstrip(";")\n    if not s.lower().startswith("select"):\n        return "ERROR: only SELECT is permitted"\n    if ";" in s:\n        return "ERROR: multiple statements are not allowed"\n    if not re.search(r"\\blimit\\b", s, re.I):\n        s += f" LIMIT {MAX_ROWS}"\n    try:\n        return str(ro.execute(s).fetchall())\n    except Exception as e:\n        return f"ERROR: {e}"   # returned as tool_result so Claude can adapt\n\ndef find_orders(region: str) -> str:\n    # parameterised — never format model/user input into SQL text\n    try:\n        rows = ro.execute(\n            "SELECT id, region, amount FROM orders WHERE region=? LIMIT ?",\n            (region, MAX_ROWS)).fetchall()\n        return str(rows) or "no rows"\n    except Exception as e:\n        return f"ERROR: {e}"',
          },
        ],
        hints: [
          'Use parameterised SQL (`?` placeholders) whenever the value comes from the model or user.',
          'A clear error string as the `tool_result` is more useful to Claude than a raised exception.',
        ],
        stretch: [
          'Add a per-query timeout and return a timeout error as the `tool_result`.',
          'Whitelist queryable tables and reject any query that references anything else.',
        ],
      },
      quiz: [
        {
          q: 'The strongest defence against SQL injection through a tool is…',
          options: ['Ask Claude nicely not to inject', 'Parameterised queries plus statement validation, never string-formatting input', 'A higher max_tokens'],
          answer: 1,
          why: 'Parameters and validation stop crafted input from changing the query; trust in the model is not a control.',
        },
        {
          q: 'Least privilege for warehouse tools means…',
          options: ['One admin credential for everything', 'Read tools use a read-only role; writes use a separate, narrowly-scoped credential', 'Disable auth for speed'],
          answer: 1,
          why: 'Scoping each tool to the minimum access limits the blast radius of a mistake or exploit.',
        },
      ],
      tools: ['Tool use', 'SQLite'],
      keyTakeaways: [
        'Validate inputs, parameterise SQL, and run under least-privilege credentials.',
        'Return errors as `tool_result` content so Claude can retry or reroute.',
      ],
    },
    {
      id: '4.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Ship: an English-in / action-out data helper via MCP',
      learn: {
        intro:
          'Ship day. Wrap the week’s hardened tools behind an MCP server and build a small agent that answers English questions about the warehouse and **acts** on it with guards — the request → execute → return → continue loop that underpins every data agent to come.',
        steps: [
          'Review tool best practices for data: idempotent writes, input validation, statement whitelisting, and timeouts.',
          'Decide which tools belong behind the MCP server for reuse (`get_schema`, `run_query`, guarded `run_write`) vs which stay local.',
          'Assemble the agent loop over your MCP tools with confirmation on every write/DDL.',
          'Document 5 real interactions (reads + one guarded write) so the behaviour is reproducible.',
        ],
        resources: [
          LINKS.mcpDocs,
          LINKS.effectiveAgents,
          cookbook('Agent + tool patterns', 'tool_use'),
          ytSearch('build MCP data agent claude warehouse guarded write', 'YouTube: shipping a data helper MCP agent'),
        ],
      },
      lab: {
        title: "'Data helper' with MCP",
        steps: [
          'Expose the reusable warehouse tools (`get_schema`, `run_query`, guarded `run_write`) via your MCP server.',
          'Build a small agent that answers English questions and acts on the warehouse, guarding every write behind `confirmed`.',
          'Run 5 interactions — 4 reads and one guarded write (e.g. flag an order) — and capture them in a README.',
          'Push a `week-4` branch/tag to your repo.',
        ],
        doneWhen: 'An English-in / action-out agent queries the warehouse and performs a guarded write via MCP tools, documented.',
        starter: [
          {
            title: 'data_mcp.py (expose warehouse tools via MCP)',
            lang: 'python',
            code: 'from mcp.server.fastmcp import FastMCP\nfrom guarded_query import run_query as _query\nfrom writes import run_write as _write   # separate least-privilege conn\n\nmcp = FastMCP("data-helper")\n\n@mcp.tool()\ndef get_schema() -> str:\n    "List warehouse tables and columns."\n    return _query("SELECT sql FROM sqlite_master")\n\n@mcp.tool()\ndef run_query(sql: str) -> str:\n    "Run one read-only, validated SELECT."\n    return _query(sql)\n\n@mcp.tool()\ndef run_write(sql: str, confirmed: bool = False) -> str:\n    "INSERT/UPDATE. STATE-CHANGING: pass confirmed=true to execute."\n    if not confirmed:\n        return "CONFIRM: re-call with confirmed=true to execute: " + sql\n    return _write(sql)\n\nif __name__ == "__main__":\n    mcp.run()   # reusable by Claude Code AND the Agent SDK',
          },
        ],
        hints: [
          'Make writes idempotent — setting a value to what it already is should be a safe no-op.',
          'The README interactions double as your first regression check for the data agent.',
        ],
        stretch: [
          'Add an audit-log row for every executed write and surface it back to the user.',
          'Consume the same MCP server from a second client to prove reuse across agents.',
        ],
      },
      quiz: [
        {
          q: 'The tool-use loop is the foundation of…',
          options: ['Streaming only', 'Tool use and, later, every data agent', 'Embeddings'],
          answer: 1,
          why: 'The request → execute → return → continue loop underpins tool use and every agent you build on your data.',
        },
        {
          q: 'Put a warehouse tool behind MCP when…',
          options: ['Never', 'Multiple agents/clients will reuse the capability', 'You want fewer tokens'],
          answer: 1,
          why: 'MCP pays off when a data capability is shared — expose it once, consume everywhere.',
        },
      ],
      tools: ['MCP', 'Tool use', 'GitHub'],
      keyTakeaways: [
        'The tool-use loop is the foundation of tool use and every data agent.',
        'Expose shared warehouse capabilities behind MCP — write once, reuse everywhere.',
      ],
    },
  ],
}

export default week
