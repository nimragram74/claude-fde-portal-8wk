import { Link } from 'react-router-dom'
import { BELTS, CAPABILITY_MAP, ASSESSMENT } from '../data/program'
import { getWeek } from '../data/weeks'
import { useProgress } from '../hooks/useProgress'
import { useStoreState } from '../hooks/useStoreState'
import { weekStatus } from '../lib/status'
import { SectionHeading, Callout } from '../components/ui'

const BELT_WEEK_RANGES: Record<string, number[]> = {
  'White · Foundations': [1],
  'Yellow · Build & Prompt': [2, 3],
  'Orange · Tools & Context': [4, 5],
  'Green · Agents': [6],
  'Blue · Trust & Platform': [7],
  'Black · Practitioner': [8],
  'Claude Ready · FDE': [],
}

export function BeltsPage() {
  const { state } = useProgress()
  const { quiz } = useStoreState()
  const weekComplete = (wid: number) => {
    const w = getWeek(wid)
    return !!w && weekStatus(w, state, quiz).passed
  }

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeading
        eyebrow="The belt ladder"
        title="Certify the build — Claude Academy specializations"
        lead="The Academy certifies through a belt ladder (Basecamp → Black belt) and Claude Ready specializations, scaling via train-the-trainer. Every week carries a belt anchor; each Friday ship is the practical assessment."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BELTS.map((b) => {
          const weeks = BELT_WEEK_RANGES[b.name] ?? []
          const earned = weeks.length > 0 && weeks.every(weekComplete)
          return (
            <div key={b.name} className={`surface p-4 shadow-s ${earned ? 'ring-2 ring-grass' : ''}`}>
              <div className="h-2 rounded" style={{ background: b.grad }} />
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <b className="text-[13.5px] text-ink dark:text-white">{b.name}</b>
                {earned && <span className="rounded bg-grass px-1.5 py-[1px] text-[9px] font-bold uppercase text-white">Earned</span>}
              </div>
              <p className="mt-1 text-[12px] text-ink-soft dark:text-plum-soft/90">{b.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {weeks.map((w) => (
                  <Link
                    key={w}
                    to={`/week/${w}`}
                    className={`mono rounded px-1.5 py-[1px] text-[10px] font-semibold ${
                      weekComplete(w) ? 'bg-grass text-white' : 'bg-coral-soft text-coral-deep dark:bg-[#33223f] dark:text-coral-bright'
                    }`}
                  >
                    W{w}
                  </Link>
                ))}
                {weeks.length === 0 && <span className="text-[11px] text-muted">{b.weeks}</span>}
              </div>
            </div>
          )
        })}
      </div>

      <Callout tone="gold">
        <b>Note on credentials:</b> the belt ladder and "Claude Ready" specializations are the CoE Academy's internal,
        train-the-trainer credentials mapped to Anthropic's learning resources — confirm the exact external Anthropic
        certification / partner-program names with your Anthropic partner contact before publishing the ladder.
      </Callout>

      {/* Capability map */}
      <section>
        <SectionHeading eyebrow="How the skills compound" title="Capability map — what each week unlocks" />
        <div className="surface overflow-hidden shadow-s">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-[#faf6ee] text-left text-[11px] uppercase tracking-wide text-muted dark:border-[#362b47] dark:bg-[#251d31]">
                <th className="px-4 py-2.5">Module</th>
                <th className="px-4 py-2.5">Capability</th>
                <th className="px-4 py-2.5">Belt / anchor</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITY_MAP.map((c) => (
                <tr key={c.code} className="border-b border-line-soft transition last:border-0 hover:bg-[#faf5ec] dark:border-[#2c2338] dark:hover:bg-[#241c30]">
                  <td className="px-4 py-2.5">
                    <span className="mono text-[12px] text-coral-deep">{c.code}</span>
                  </td>
                  <td className="px-4 py-2.5 text-[13.5px] text-ink-soft dark:text-plum-soft/90">
                    <Link to={`/week/${c.wk}`} className="font-semibold text-ink hover:text-coral-deep dark:text-plum-soft">
                      {c.cap}
                    </Link>
                    <span className="ml-1 text-muted">· Wk{c.wk}</span>
                  </td>
                  <td className="px-4 py-2.5 mono text-[11.5px] text-muted">{c.belt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Assessment */}
      <section>
        <SectionHeading eyebrow="Keeping score" title="How Claude FDEs are assessed" />
        <div className="surface overflow-hidden shadow-s">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-[#faf6ee] text-left text-[11px] uppercase tracking-wide text-muted dark:border-[#362b47] dark:bg-[#251d31]">
                <th className="px-4 py-2.5">Dimension</th>
                <th className="px-4 py-2.5">What good looks like</th>
                <th className="px-4 py-2.5">Weight</th>
              </tr>
            </thead>
            <tbody>
              {ASSESSMENT.map((a) => (
                <tr key={a.dim} className="border-b border-line-soft last:border-0 dark:border-[#2c2338]">
                  <td className="px-4 py-2.5 text-[13.5px] font-semibold text-ink dark:text-plum-soft">{a.dim}</td>
                  <td className="px-4 py-2.5 text-[13px] text-ink-soft dark:text-plum-soft/90">{a.good}</td>
                  <td className="px-4 py-2.5 mono text-[13px] font-bold text-coral-deep">{a.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
