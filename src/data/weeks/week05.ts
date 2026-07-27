import type { Week } from '../../types'
import { LINKS, doc, article, tool, cookbook, ytSearch, udemySearch } from '../links'

const week: Week = {
  id: 5,
  code: 'CTX-D500 · Context Engine',
  title: 'RAG, embeddings, citations & governed data',
  goal: 'You know vectors and IR metrics — this week points them at Claude. Build the full Context Engine end-to-end: embeddings and ANN retrieval, a chunked vector store with citable metadata, the retrieve → ground → answer loop, then citations, hybrid retrieval scored with recall@k, memory, and permission-aware grounding that returns lineage over governed data.',
  layer: 'Context Engine',
  belt: 'Orange (Context)',
  beltColor: '#e0855f',
  accent: '#2ba0b0',
  shipTitle: 'A grounded, cited “chat with your data/docs” service with a recall@3 eval',
  outcomes: [
    'Embed corpora and rank with cosine / ANN for fast semantic retrieval',
    'Chunk docs, dbt models and a data catalog with overlap + citable source metadata',
    'Wire retrieve → ground → answer, injecting top-k inside an XML <context> block',
    'Add native Citations, blend semantic + keyword retrieval, and measure recall@k like an IR metric',
    'Persist memory and enforce permission-aware retrieval that returns lineage on governed data',
  ],
  resources: [
    LINKS.embeddings,
    LINKS.citations,
    LINKS.xml,
    cookbook('RAG recipes — Anthropic Cookbook', 'skills/retrieval_augmented_generation'),
    udemySearch('retrieval augmented generation vector search embeddings evaluation', 'Udemy: RAG, vector search & evaluation'),
  ],
  days: [
    {
      id: '5.1',
      dow: 'Mon',
      hours: '~7 hrs',
      focus: 'Embeddings & semantic similarity (cosine, ANN)',
      learn: {
        intro:
          'You already reason in vector space — so go straight to the retrieval question: which text is nearest to a query? Today: pick an embeddings provider, treat **cosine** as a normalised dot product, and know when an exact scan is fine vs when you reach for **ANN** (HNSW/IVF) as the corpus grows.',
        steps: [
          'Read the Anthropic embeddings guide; note provider, dimension and cost — Anthropic recommends **Voyage AI**.',
          'Confirm the math you know: normalise vectors, then a dot product **is** cosine similarity — the whole ranking is one matmul.',
          'Know the scaling knee: brute-force top-k is O(n·d) and fine to ~10⁴–10⁵ vectors; beyond that use **ANN** (HNSW/IVF) trading a little recall for big latency wins.',
          'Sketch the retrieval shape: embed the corpus once, embed the query per request, rank, return top-k.',
        ],
        resources: [
          LINKS.embeddings,
          article('Voyage AI embeddings', 'https://docs.voyageai.com/docs/embeddings', 'Voyage AI'),
          tool('NumPy', 'https://numpy.org/doc/stable/', 'NumPy'),
          ytSearch('text embeddings cosine similarity ANN HNSW semantic search tutorial', 'YouTube: embeddings, cosine & ANN'),
        ],
      },
      lab: {
        title: 'Cosine top-k over FAQ/doc snippets',
        steps: [
          'Embed ~20 FAQ/doc snippets with your provider; cache the matrix alongside the source text.',
          'Embed an incoming query and score it against every stored vector with a single normalised matmul.',
          'Return the top-3 by cosine and add a similarity floor so weak matches return nothing.',
          'Run 3 diverse queries and sanity-check the ranking is semantically on-target.',
        ],
        doneWhen: 'A query returns its top-3 snippets by cosine, and sub-floor matches return empty.',
        starter: [
          {
            title: 'nearest.py — cosine top-k with NumPy',
            lang: 'python',
            code: 'import numpy as np\n\ndef embed(texts):\n    # TODO: call provider (Voyage/Anthropic) -> np.ndarray [n, dim]\n    ...\n\nFAQ = ["reset your password in settings", "we ship to the EU", "..."]  # ~20\nV = embed(FAQ)\nV = V / np.linalg.norm(V, axis=1, keepdims=True)   # normalise once\n\ndef top_k(query, k=3, floor=0.3):\n    q = embed([query])[0]\n    q = q / np.linalg.norm(q)\n    scores = V @ q                                 # cosine == dot on unit vecs\n    idx = np.argsort(scores)[::-1][:k]\n    return [(FAQ[i], float(scores[i])) for i in idx if scores[i] >= floor]\n\nfor hit, s in top_k("how do I change my login?"):\n    print(round(s, 3), hit)',
          },
        ],
        hints: [
          'Normalise the corpus matrix once at load; then every query is one `V @ q` — no per-pair formula.',
          'Only the query needs a fresh embedding each request; the corpus embeds once and is reused.',
        ],
        stretch: [
          'Swap the linear scan for an ANN index (FAISS/hnswlib) and compare recall vs latency as n grows.',
          'A/B two embedding dimensions and see whether the top-3 order actually changes.',
        ],
      },
      quiz: [
        {
          q: 'On unit-normalised vectors, cosine similarity equals…',
          options: ['Euclidean distance', 'the dot product', 'the L1 norm'],
          answer: 1,
          why: 'After normalising, cosine reduces to a dot product — so ranking a corpus is a single matmul.',
        },
        {
          q: 'You reach for ANN (HNSW/IVF) instead of a brute-force scan mainly to…',
          options: ['improve answer accuracy', 'cut retrieval latency at large n by trading a little recall', 'avoid embeddings entirely'],
          answer: 1,
          why: 'ANN gives sub-linear search at scale for a small, tunable recall cost; exact scan is fine for small corpora.',
        },
      ],
      tools: ['Embeddings', 'NumPy', 'ANN index'],
      keyTakeaways: [
        'Normalise once — retrieval ranking is then a single cosine matmul.',
        'Exact scan is fine small; switch to ANN at scale, trading a little recall for latency.',
      ],
    },
    {
      id: '5.2',
      dow: 'Tue',
      hours: '~7 hrs',
      focus: 'Vector store + chunking + citable source metadata',
      learn: {
        intro:
          'A **vector store** (pgvector or managed) is the retrieval engine. The two decisions that decide answer quality are **chunking** (size + overlap) and the **metadata** you carry — because Thursday’s citations and lineage can only point at metadata that exists at index time. Data assets like **dbt models** and a **data catalog** are prime corpora here.',
        steps: [
          'Learn vector stores — pgvector in Postgres or a managed index — and what upsert + ANN retrieval give you.',
          'Learn chunking: pick size and **overlap** so a concept is not severed at a boundary; token-based beats char-based for prose.',
          'Carry rich metadata on every chunk (source, section, offsets, `source_id`, and an ACL tag for later) — citations and lineage depend on it.',
          'Plan the load path: chunk → embed → upsert vectors + metadata; include structured assets (dbt model docs, catalog entries).',
        ],
        resources: [
          LINKS.embeddings,
          tool('pgvector', 'https://github.com/pgvector/pgvector', 'GitHub'),
          doc('Search & retrieval / RAG patterns', 'docs/build-with-claude/search-and-retrieval'),
          ytSearch('pgvector chunking overlap metadata RAG index tutorial', 'YouTube: vector stores, chunking & metadata'),
        ],
      },
      lab: {
        title: 'Index docs + dbt models + a data catalog',
        steps: [
          'Chunk a mixed corpus — docs, `.sql`/`schema.yml` dbt models, and catalog entries — with fixed size + **overlap**.',
          'Carry `source`, `section`, `start`/`end` and a `source_id` (and a placeholder `acl` tag) on every chunk.',
          'Embed all chunks and upsert vectors + metadata into pgvector (or a managed store).',
          'Query the index and confirm relevant chunks return **with** their metadata intact.',
        ],
        doneWhen: 'A vector index holds chunked docs + dbt models + catalog entries and returns chunks with citable metadata.',
        starter: [
          {
            title: 'chunk.py — overlapping chunker carrying citable metadata',
            lang: 'python',
            code: 'def chunk(text, source, source_id, size=800, overlap=150, acl="public"):\n    rows, start = [], 0\n    while start < len(text):\n        end = start + size\n        rows.append({\n            "text": text[start:end],\n            "source": source,          # filename / dbt model / catalog entry\n            "source_id": source_id,     # stable id we cite later\n            "start": start,\n            "end": min(end, len(text)),\n            "acl": acl,                 # permission tag for Thursday\n        })\n        start += size - overlap         # step back by overlap\n    return rows\n\n# for path in corpus:\n#   rows = chunk(open(path).read(), source=path, source_id=slug(path))\n#   store.upsert(embed([r["text"] for r in rows]), metadata=rows)',
          },
        ],
        hints: [
          'Start ~500–1000 chars with ~10–20% overlap, then tune against retrieval quality, not by feel.',
          'Store offsets, `source_id` and an `acl` tag now — Thursday’s citations, lineage and permission filter all read them.',
        ],
        stretch: [
          'Chunk dbt models on logical boundaries (one model = one chunk) and compare retrieval vs fixed-size.',
          'Add token-based chunking and measure the retrieval delta against char-based.',
        ],
      },
      quiz: [
        {
          q: 'Chunk overlap primarily exists to…',
          options: ['reduce embedding cost', 'avoid severing a concept across a chunk boundary', 'speed up the ANN index'],
          answer: 1,
          why: 'Overlap preserves context that sits at chunk edges, lifting retrieval quality.',
        },
        {
          q: 'You store `source_id`/offsets/ACL on each chunk at index time because…',
          options: ['it lowers latency', 'citations, lineage and permission filtering can only reference metadata that already exists', 'it trains the model'],
          answer: 1,
          why: 'Downstream trust features read chunk metadata — if it is not indexed, you cannot cite or govern it.',
        },
      ],
      tools: ['Vector store', 'pgvector', 'dbt'],
      keyTakeaways: [
        'Chunk size + overlap are the retrieval-quality dials — tune them against a metric.',
        'Metadata carried at index time is what makes answers citable, traceable and governable later.',
      ],
    },
    {
      id: '5.3',
      dow: 'Wed',
      hours: '~7 hrs',
      focus: 'The RAG loop: retrieve → ground → answer',
      learn: {
        intro:
          'RAG is **retrieve → ground → answer** — no training, just per-request grounding. Fetch top-k chunks, wrap them in an XML `<context>` block with source ids, and instruct Claude to answer **only** from that context and decline when the evidence is thin. XML delimiters make the context boundary unambiguous.',
        steps: [
          'Wire the retrieval into a Messages call: fetch top-k chunks plus their source ids.',
          'Build a `<context>` block (each chunk a `<doc id="...">`) and place the question after it — use XML so the boundary is explicit.',
          'Write the anti-hallucination system prompt: answer only from `<context>`; if nothing fits, say you cannot answer.',
          'Choose k deliberately — enough evidence to answer without burying the signal in noise.',
        ],
        resources: [
          LINKS.messages,
          LINKS.xml,
          cookbook('RAG recipes — Anthropic Cookbook', 'skills/retrieval_augmented_generation'),
          ytSearch('retrieval augmented generation Claude messages XML context grounded answer', 'YouTube: the RAG loop with Claude'),
        ],
      },
      lab: {
        title: 'Grounded Q&A over your index',
        steps: [
          'Call Tuesday’s retrieval for top-k chunks + source ids on each question.',
          'Assemble the `<context>` block and put the user question after it.',
          'System-instruct Claude to answer **only** from `<context>` and to decline when nothing is relevant.',
          'Test 5 in-scope + 2 out-of-scope questions; confirm the out-of-scope ones are declined, not guessed.',
        ],
        doneWhen: 'Answers are grounded in retrieved chunks and out-of-scope questions are cleanly declined.',
        starter: [
          {
            title: 'grounded.py — inject top-k as an XML <context> block',
            lang: 'python',
            code: 'import os\nfrom anthropic import Anthropic\n\nclient = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])\n\ndef answer(question, chunks):              # chunks: [{"id":.., "text":..}]\n    ctx = "\\n".join(\n        f\'<doc id="{c["id"]}">{c["text"]}</doc>\' for c in chunks\n    )\n    r = client.messages.create(\n        model="claude-sonnet-4-6",\n        max_tokens=500,\n        system=("Answer ONLY from <context>. Cite the doc id you used. "\n                "If the context is insufficient, say you cannot answer."),\n        messages=[{"role": "user", "content":\n            f"<context>\\n{ctx}\\n</context>\\n\\nQuestion: {question}"}],\n    )\n    return r.content[0].text\n\n# hits = retrieve(question, k=4)   # from Tuesday\n# print(answer(question, hits))',
          },
        ],
        hints: [
          'Put context **before** the question and delimit it with XML so Claude cannot confuse instructions with evidence.',
          'Explicitly permit “I cannot answer from the provided context” — otherwise the model tends to fill gaps.',
        ],
        stretch: [
          'Echo the doc ids Claude actually used next to the answer.',
          'Add a low-similarity guard: if the best chunk is weak, skip the call and decline immediately (saves tokens).',
        ],
      },
      quiz: [
        {
          q: 'In RAG, retrieved chunks are…',
          options: ['fine-tuned into the model', 'injected into the prompt as per-request context', 'stored in the API key'],
          answer: 1,
          why: 'RAG grounds each request by inserting retrieved text into the prompt — there is no training step.',
        },
        {
          q: 'Wrapping the context in `<context>`/`<doc>` XML tags mainly…',
          options: ['reduces token cost', 'makes the evidence boundary unambiguous and enables clean attribution', 'increases temperature'],
          answer: 1,
          why: 'XML delimiters separate instructions from evidence and let Claude attribute to specific doc ids.',
        },
      ],
      tools: ['RAG', 'Messages API', 'XML'],
      keyTakeaways: [
        'RAG grounds per request by injecting retrieved text — it never trains the model.',
        'Delimit context in XML and permit declining, so answers stay honest.',
      ],
    },
    {
      id: '5.4',
      dow: 'Thu',
      hours: '~7 hrs',
      focus: 'Citations + hybrid retrieval + recall@k + memory + permission-aware lineage',
      learn: {
        intro:
          'The trust layer. Enable native **Citations** so claims tie to exact source spans, add **hybrid** (semantic + BM25) retrieval, and score it with **recall@k** — a hard ceiling on answer quality you already know from IR. Then persist **memory** across sessions, and make retrieval **permission-aware**: filter by entitlement before generation and return **lineage** for every answer on governed data.',
        steps: [
          'Enable Claude **Citations**: pass sources as `document` content blocks with `citations` on to get verifiable spans back.',
          'Add hybrid retrieval — fuse dense (vector) with sparse (BM25/keyword) scores; measure **recall@k** = fraction of questions whose gold chunk is in the top-k.',
          'Add a memory layer (`save_fact`/`recall` over JSON/SQLite) so durable facts survive across sessions; summarise/trim old turns to stay in budget.',
          'Enforce permission-aware retrieval: filter chunks by the user’s ACL **before** they reach the prompt, and return `lineage` (which record/source each answer came from).',
        ],
        resources: [
          LINKS.citations,
          LINKS.mcpSite,
          article('BM25 / Okapi ranking function', 'https://en.wikipedia.org/wiki/Okapi_BM25', 'Reference'),
          cookbook('Citations & RAG recipes — Anthropic Cookbook', 'skills/retrieval_augmented_generation'),
          ytSearch('hybrid search BM25 vector recall at k reciprocal rank fusion evaluation', 'YouTube: hybrid retrieval & recall@k'),
        ],
      },
      lab: {
        title: 'Cite, measure, remember & govern',
        steps: [
          'Enable **Citations** so answers point at exact spans, not just a doc id; label 10 questions each with its gold chunk id.',
          'Measure **recall@3** for vector-only, then add BM25 (weighted or RRF-fused) and re-measure — record the delta.',
          'Wire a memory store: `save_fact` on answers and `recall` on new questions across two separate runs.',
          'Filter retrieval by the user’s ACL before generation and return `{answer, citations, lineage}`; test an entitled vs an unentitled persona.',
        ],
        doneWhen: 'Answers carry verifiable citations + lineage, respect permissions, recall@3 is measured and lifted by hybrid, and a fact survives across runs.',
        starter: [
          {
            title: 'trust.py — recall@k + permission-filtered lineage',
            lang: 'python',
            code: 'def recall_at_k(eval_set, retrieve, k=3):\n    hits = 0\n    for q, gold_id in eval_set:            # gold_id = known correct chunk\n        got = [c["id"] for c in retrieve(q, k=k)]\n        hits += gold_id in got\n    return hits / len(eval_set)\n\ndef retrieve(query, user, k=4):\n    hits = hybrid_search(query, k=k)       # dense + BM25, fused\n    return [h for h in hits if user["clearance"] >= h["acl"]]  # filter FIRST\n\ndef answer(query, user):\n    hits = retrieve(query, user)           # ACL-filtered before the prompt\n    resp = grounded_call(query, hits)      # Citations enabled -> spans\n    return {\n        "answer": resp["text"],\n        "citations": resp["citations"],    # exact source spans\n        "lineage": [{"id": h["id"], "source": h["source"]} for h in hits],\n    }\n\nprint("vector recall@3:", recall_at_k(EVAL, retrieve_vector))\nprint("hybrid recall@3:", recall_at_k(EVAL, retrieve_hybrid))',
          },
        ],
        hints: [
          'Recall@k caps answer quality — if the gold chunk is never retrieved, no prompt can recover it; fix retrieval first.',
          'Filter on ACL **before** text reaches the prompt — never trust the model to keep a secret it has already read.',
        ],
        stretch: [
          'Compare score-weighting vs reciprocal-rank fusion for the hybrid blend and pick what maximises recall@3.',
          'Return a “you may not have access” note when a likely-relevant but restricted record was filtered out.',
        ],
      },
      quiz: [
        {
          q: 'Recall@k is a hard ceiling on RAG answer quality because…',
          options: ['it sets the temperature', 'if the gold chunk is not in the top-k, no prompt can make the answer correct', 'it caps output tokens'],
          answer: 1,
          why: 'Generation can only ground on what retrieval surfaces; a missed gold chunk is unrecoverable downstream.',
        },
        {
          q: 'Permission-aware grounding requires you to…',
          options: ['ask the model to hide restricted rows', 'filter chunks by entitlement before they enter the prompt', 'raise max_tokens'],
          answer: 1,
          why: 'Never rely on the model to keep a secret it has seen; enforce ACLs before generation and return lineage for audit.',
        },
      ],
      tools: ['Citations', 'Hybrid search', 'Memory', 'Permissions'],
      keyTakeaways: [
        'Recall@k caps quality; hybrid (dense + BM25) usually lifts it — measure the delta, do not guess.',
        'Enforce permissions before content reaches the model and return lineage so every answer is auditable.',
      ],
    },
    {
      id: '5.5',
      dow: 'Fri',
      hours: '~7 hrs',
      focus: 'Ship: a grounded, cited chat-with-your-data service',
      learn: {
        intro:
          'Ship day. Collapse the week into one clean `answer(question, user) -> {answer, citations, lineage}` service grounded over your docs **plus one data source**, with a reproducible index config and a recall@3 eval. This is the exact shape of an enterprise RAG deliverable an FDE hands over.',
        steps: [
          'Design a single entry point returning `{answer, citations, lineage}` and enforcing permissions on every call.',
          'Externalise the index config (chunk size, overlap, k, model, hybrid weights) as config-as-code so dev/test/prod rebuild identically.',
          'Assemble 8–10 eval questions, each with its gold source(s); score answer correctness **and** recall@3.',
          'Wire retrieve (hybrid, ACL-filtered) → ground → cite behind one function and push a `week-5` branch/tag.',
        ],
        resources: [
          LINKS.citations,
          LINKS.evals,
          cookbook('RAG recipes — Anthropic Cookbook', 'skills/retrieval_augmented_generation'),
          ytSearch('build RAG service chat with your data citations recall evaluation python', 'YouTube: ship a chat-with-your-data service'),
        ],
      },
      lab: {
        title: 'Chat-with-your-data service (backend + eval)',
        steps: [
          'Package the pipeline behind `answer(question, user)` returning `{answer, citations, lineage}` over docs + one data source.',
          'Externalise every retrieval knob into one `Config` object so the index is reproducible.',
          'Write 8–10 eval questions with gold sources; report answer pass rate **and** recall@3.',
          'Add a README (config, freshness, governance) and push a `week-5` branch/tag.',
        ],
        doneWhen: 'A service returns grounded, cited, lineage-tagged answers over docs + one data source and reports recall@3 on 8–10 questions.',
        starter: [
          {
            title: 'service.py — answer() -> {answer, citations, lineage}',
            lang: 'python',
            code: 'from dataclasses import dataclass\n\n@dataclass\nclass Config:                              # config-as-code = reproducible index\n    chunk_size: int = 800\n    overlap: int = 150\n    k: int = 4\n    hybrid_alpha: float = 0.5              # dense vs BM25 blend\n    model: str = "claude-sonnet-4-6"\n\ndef answer(question, user, cfg=Config()):\n    hits = retrieve(question, user, k=cfg.k, alpha=cfg.hybrid_alpha)  # ACL-filtered\n    resp = grounded_call(question, hits, cfg.model)  # Citations enabled\n    return {\n        "answer": resp["text"],\n        "citations": resp["citations"],   # spans -> source ids\n        "lineage": [{"id": h["id"], "source": h["source"]} for h in hits],\n    }\n\n# EVAL: 8-10 (question, gold_source) pairs\n# report answer pass rate AND recall@3 against gold_source',
          },
        ],
        hints: [
          'Keep every knob in one `Config` so a rebuild is deterministic across environments.',
          'Score citations/lineage against expected sources, not just answer text — that is what enterprise reviewers audit.',
        ],
        stretch: [
          'Add a confidence signal (top similarity + citation count) and refuse when lineage is thin.',
          'Expose `answer()` behind a small FastAPI endpoint so a frontend can call it.',
        ],
      },
      quiz: [
        {
          q: 'Returning `{answer, citations, lineage}` instead of just text makes the service…',
          options: ['cheaper to run', 'auditable — reviewers can verify claims and trace each answer to its source', 'immune to hallucination'],
          answer: 1,
          why: 'Citations plus lineage let enterprise reviewers verify and trace every answer — the core trust contract.',
        },
        {
          q: 'The Friday eval reports recall@3 alongside answer pass rate because…',
          options: ['recall@3 is cheaper to compute', 'a low pass rate could be a retrieval miss (recall) or a grounding miss — you must separate them', 'recall replaces correctness'],
          answer: 1,
          why: 'Splitting retrieval quality from grounding quality tells you whether to fix the index or the prompt.',
        },
      ],
      tools: ['RAG', 'Citations', 'Evals', 'GitHub'],
      keyTakeaways: [
        'A shippable Context Engine is one `answer()` returning answer + citations + lineage under permissions.',
        'Report recall@3 next to correctness so you know whether to fix retrieval or grounding.',
      ],
    },
  ],
}

export default week
