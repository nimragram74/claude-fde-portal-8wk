import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { WEEKS } from '../data/weeks'
import { PROMPT_LIBRARY } from '../data/program'
import { OFFICIAL_TRACKS } from '../data/tracks'
import type { ResourceKind, ResourceLink } from '../types'
import { ResourceLinkRow } from '../components/ResourceLink'
import { SectionHeading } from '../components/ui'
import { CodeBlock } from '../components/CodeBlock'

const KIND_LABELS: Record<ResourceKind | 'all', string> = {
  all: 'All',
  docs: 'Docs',
  cookbook: 'Code',
  article: 'Articles',
  video: 'Videos',
  course: 'Courses',
  tool: 'Tools',
  search: 'Search',
}

interface Collected extends ResourceLink {
  weekId: number
}

export function ResourcesPage() {
  const [filter, setFilter] = useState<ResourceKind | 'all'>('all')
  const [q, setQ] = useState('')

  const all = useMemo(() => {
    const seen = new Set<string>()
    const out: Collected[] = []
    for (const w of WEEKS) {
      const pool: ResourceLink[] = [
        ...(w.resources ?? []),
        ...w.days.flatMap((d) => d.learn.resources),
      ]
      for (const r of pool) {
        const key = r.url + '|' + r.label
        if (seen.has(key)) continue
        seen.add(key)
        out.push({ ...r, weekId: w.id })
      }
    }
    return out
  }, [])

  const filtered = all.filter((r) => {
    if (filter !== 'all' && r.kind !== filter) return false
    if (q && !`${r.label} ${r.source ?? ''}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length }
    for (const r of all) c[r.kind] = (c[r.kind] ?? 0) + 1
    return c
  }, [all])

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeading
        eyebrow="Everything in one place"
        title="Resource library"
        lead="Every learning link across the 8 weeks — official Anthropic docs, code samples, articles, and curated video/course searches, plus Data & AI course picks. Filter by type or search, and jump to the week that uses each."
      />

      {/* Official learning tracks (verified) */}
      <section className="space-y-3">
        <h3 className="serif text-[18px] font-semibold text-ink dark:text-white">Official learning tracks</h3>
        <p className="-mt-1 text-[13.5px] text-ink-soft dark:text-plum-soft/90">
          Verified, always-on destinations. <b>Anthropic Academy courses are free and issue their own completion
          certificates</b> — pair them with this program's belt certificate.
        </p>
        <div className="grid gap-3 lg:grid-cols-3">
          {OFFICIAL_TRACKS.map((t) => (
            <div key={t.group} className="surface p-4 shadow-s">
              <div className="text-[13px] font-bold text-coral-deep">{t.group}</div>
              <p className="mb-2 mt-1 text-[12px] text-muted">{t.note}</p>
              <div className="grid gap-2">
                {t.links.map((l, i) => (
                  <ResourceLinkRow key={i} link={l} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Controls */}
      <h3 className="serif text-[18px] font-semibold text-ink dark:text-white">Every link in the 8 weeks</h3>
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(KIND_LABELS) as (ResourceKind | 'all')[]).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition ${
              filter === k
                ? 'bg-coral text-white'
                : 'border border-line bg-card text-ink-soft hover:border-coral-bright dark:border-[#362b47] dark:bg-[#201a2b] dark:text-plum-soft'
            }`}
          >
            {KIND_LABELS[k]} {counts[k] ? <span className="opacity-70">· {counts[k]}</span> : null}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources…"
          className="ml-auto w-full rounded-lg border border-line bg-card px-3 py-1.5 text-[13px] text-ink outline-none focus:border-coral dark:border-[#362b47] dark:bg-[#201a2b] dark:text-plum-soft sm:w-56"
        />
      </div>

      {/* List grouped by week */}
      <div className="space-y-5">
        {WEEKS.map((w) => {
          const items = filtered.filter((r) => r.weekId === w.id)
          if (items.length === 0) return null
          return (
            <div key={w.id}>
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-bold text-white" style={{ background: w.accent }}>
                  {w.id}
                </span>
                <Link to={`/week/${w.id}`} className="text-[14px] font-semibold text-ink hover:text-coral-deep dark:text-plum-soft">
                  {w.title}
                </Link>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((r, i) => (
                  <ResourceLinkRow key={i} link={r} />
                ))}
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && <p className="text-center text-muted">No resources match that filter.</p>}
      </div>

      {/* Prompt library */}
      <section>
        <SectionHeading eyebrow="Appendix" title="Claude prompt & command library" lead="Reusable prompts for the daily habits — learning, debugging, design review, evals, red-teaming, and the business case." />
        <div className="grid gap-3 md:grid-cols-2">
          {PROMPT_LIBRARY.map((p) => (
            <div key={p.cat} className="surface p-4 shadow-s">
              <div className="mb-1.5 text-[12.5px] font-bold text-coral-deep">{p.cat}</div>
              <CodeBlock snippet={{ lang: 'prompt', code: p.prompt }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
