# Claude FDE Academy — Data & AI (8-week Intensive)

An interactive, self-paced learning portal for the **Wipro × Anthropic AI Center of Excellence**
**8-week intensive** Claude Forward Deployed Engineer track, **tuned for Data & AI teams**.
Built with **Vite + React + TypeScript + Tailwind**.

This is the compressed, audience-specific sibling of the 16-week portal. Same UI, scoring, and
certificate machinery — but **8 weeks (40 daily labs)** instead of 16, assuming Python / ML / Git
fluency and framing every lab on data & AI use cases (warehouses, dbt, notebooks, RAG over a data
catalog, ML-style evals, MLOps, PII/governance).

> The comprehensive **16-week** portal lives in the sibling folder `claude-fde-portal/` and is
> untouched by this one.

---

## Quick start

```bash
cd claude-fde-portal-8wk
npm install
npm run dev        # opens http://localhost:5173
```

Scripts: `npm run build` (typecheck + prod build), `npm run preview`, `npm run typecheck`.
Requires Node 20+ / npm 10+.

---

## The 8-week arc (Intensive · Data & AI)

| Wk | Module | Belt | Friday ship |
|----|--------|------|-------------|
| 1 | Foundations for Data & AI — Messages API, models, structured output, first **golden evals** | White | Structured-extraction CLI + eval set |
| 2 | AI-native engineering with Claude Code — notebooks → tested modules | Yellow | CI with review + test gate |
| 3 | Prompting depth, model economics/FinOps & long context vs RAG | Yellow | Model router + cost/quality scorecard |
| 4 | Tool use & MCP — hands on your **warehouse/data systems** | Orange | Data/ops helper agent + MCP server |
| 5 | Context Engine — RAG, embeddings, citations, memory, governed data | Orange | Grounded "chat with your data" + recall@3 eval |
| 6 | Agents — Agent SDK, Skills, orchestration & multi-agent | Green | Orchestrated multi-agent analysis system |
| 7 | Trust, governance, platform & FinOps — evals, red-team, RBAC/ZDR, deploy | Blue | Go-live + governance/FinOps scorecard |
| 8 | Capstone — discover, build, evaluate, govern, prove & present | Black · Claude Ready | Deployed, governed Data/AI agent + value proof |

Belts compress to 6 rungs (White → Black). Everything else — Learn → Do → Quiz per day, graded
quizzes, week **pass-gate** (all days + all quizzes + ≥80% accuracy), belt ladder, printable
**certificate**, resource library with **Data & AI course picks**, and the CoE engine pages — works
exactly as in the 16-week portal.

---

## What's tuned for Data & AI

- **Framing:** "you train models — here you *orchestrate* one". ML instincts (eval sets, metrics,
  overfitting, recall@k, don't-tune-on-the-test-set) are mapped onto prompts, evals and RAG.
- **Labs & capstone use cases:** NL-to-SQL with validation, data-quality/anomaly agents,
  pipeline-incident RCA, experiment/model-card summarisers, RAG over a data catalog/dbt docs,
  PII triage.
- **Faster fundamentals:** basic Python/SDK/Git setup is assumed, so Week 1 already reaches
  structured output + evals; two modules/week overall.
- **Data-systems MCP:** Week 4 connects tools/MCP to warehouses and guarded writes; Week 7
  emphasises PII, data governance and deploying near your data (Bedrock/Vertex).

---

## Content model (edit / extend)

Identical structure to the 16-week portal:

```
src/data/weeks/week01..08.ts   # one file per week, export default a Week
src/data/weeks/index.ts        # aggregates WEEKS (change count here + add files to scale)
src/data/program.ts            # belts, cadences, capability map, setup, prompts, capstone, rubric
src/data/tracks.ts             # verified official learning tracks + per-week course picks
src/lib/status.ts              # BELT_LADDER (week ranges) + weekStatus/programStatus pass-gate
src/lib/store.ts               # localStorage + event log (the SSO/tracking seam — change only this)
```

The framework reads the week count from `WEEKS.length`, so the UI is count-agnostic — scaling to a
different length is a data change, not a code change.

## Progress, certification, SSO-readiness, deploy, link-checker
Same as the 16-week portal — see that project's README section-for-section. In brief: progress +
graded quizzes + an append-only event log live in `localStorage` via `src/lib/store.ts` (the single
seam to swap for a backend + SSO later); `/certificate` prints a certificate once all 8 weeks pass
and exports progress as JSON; the static `dist/` deploys to any host (hash routing, no rewrites).

_Wipro × Anthropic · AI Center of Excellence · Claude Academy · Data & AI · 8-week intensive._
