import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { WEEKS } from '../data/weeks'
import { useProgress } from '../hooks/useProgress'
import { ProgressRing } from './ProgressRing'
import { IconGrid, IconWrench, IconShield, IconRocket, IconBook, IconAward } from './icons'

const TOTAL_DAYS = WEEKS.reduce((n, w) => n + w.days.length, 0)

/**
 * Renders an official brand logo from public/logos/<file>. If the file is a
 * placeholder / missing / fails to load, falls back to a plain text wordmark.
 * Drop the real brand SVG at public/logos/wipro.svg or anthropic.svg to override.
 */
const LOGO_EXTS = ['svg', 'png', 'webp', 'jpg']
function Logo({ base, name, className = 'h-6' }: { base: string; name: string; className?: string }) {
  // Try svg → png → webp → jpg, then fall back to a text wordmark.
  const [i, setI] = useState(0)
  if (i >= LOGO_EXTS.length) {
    return (
      <span className="serif text-[15px] font-semibold text-ink dark:text-white" aria-label={name}>
        {name}
      </span>
    )
  }
  const src = `${import.meta.env.BASE_URL}logos/${base}.${LOGO_EXTS[i]}`
  return <img key={src} src={src} alt={name} className={`${className} w-auto object-contain`} onError={() => setI((n) => n + 1)} />
}

const navItem =
  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition text-ink-soft hover:bg-coral-soft/50 dark:text-plum-soft dark:hover:bg-[#2a2033]'
const navActive = 'bg-coral-soft text-coral-deep font-semibold dark:bg-[#33223f] dark:text-coral-bright'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { completedCount, state } = useProgress()

  const doneInWeek = (wid: number) =>
    WEEKS.find((w) => w.id === wid)!.days.filter((d) => state[d.id]).length

  return (
    <div className="flex h-full flex-col">
      {/* Co-branded logos: Wipro (left) · Anthropic (right) — on a white card so
          any logo (colored / with a white background) reads cleanly in light & dark. */}
      <div className="px-3 pb-2 pt-4">
        <div className="flex items-center justify-center gap-4 rounded-xl border border-line bg-white px-4 py-2.5 shadow-s">
          <Logo base="wipro" name="Wipro" className="h-7" />
          <span className="h-9 w-px shrink-0 bg-line" />
          <Logo base="anthropic" name="Anthropic" className="h-11" />
        </div>
      </div>

      {/* Product title */}
      <NavLink to="/" onClick={onNavigate} className="block px-4 pb-4 pt-1">
        <span className="serif block text-[15px] font-semibold text-ink dark:text-white">Claude FDE Academy</span>
        <span className="block text-[10.5px] uppercase tracking-wider text-muted">Data &amp; AI · AI CoE</span>
      </NavLink>

      {/* Overall progress */}
      <div className="mx-4 mb-3 flex items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5 dark:border-[#362b47] dark:bg-[#201a2b]">
        <ProgressRing value={completedCount} total={TOTAL_DAYS} size={40} />
        <div className="leading-tight">
          <div className="text-[12.5px] font-semibold text-ink dark:text-plum-soft">
            {completedCount} / {TOTAL_DAYS} days
          </div>
          <div className="text-[11px] text-muted">Program progress</div>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
        <NavLink to="/" end onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconGrid className="h-4 w-4" /> Overview
        </NavLink>
        <NavLink to="/setup" onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconWrench className="h-4 w-4" /> Tools &amp; setup
        </NavLink>
        <NavLink to="/architecture" onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconGrid className="h-4 w-4" /> Reference architecture
        </NavLink>
        <NavLink to="/belts" onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconShield className="h-4 w-4" /> Belt ladder
        </NavLink>
        <NavLink to="/certificate" onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconAward className="h-4 w-4" /> Certificate
        </NavLink>

        <div className="px-3 pb-1 pt-4 text-[10.5px] font-bold uppercase tracking-wider text-muted">The {WEEKS.length} weeks</div>
        {WEEKS.map((w) => {
          const done = doneInWeek(w.id)
          const complete = done === w.days.length
          return (
            <NavLink
              key={w.id}
              to={`/week/${w.id}`}
              onClick={onNavigate}
              className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white"
                style={{ background: complete ? '#4f8a3a' : w.accent }}
              >
                {w.id}
              </span>
              <span className="flex-1 truncate">{w.title}</span>
              {done > 0 && !complete && <span className="mono text-[10px] text-muted">{done}/{w.days.length}</span>}
            </NavLink>
          )
        })}

        <div className="px-3 pb-1 pt-4 text-[10.5px] font-bold uppercase tracking-wider text-muted">Reference</div>
        <NavLink to="/resources" onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconBook className="h-4 w-4" /> Resource library
        </NavLink>
        <NavLink to="/coe" onClick={onNavigate} className={({ isActive }) => `${navItem} ${isActive ? navActive : ''}`}>
          <IconRocket className="h-4 w-4" /> The CoE engine
        </NavLink>
      </nav>
    </div>
  )
}
