import type { Week } from '../types'
import { ProgressRing } from './ProgressRing'
import { IconTarget } from './icons'

export function WeekHeader({ week, doneInWeek }: { week: Week; doneInWeek: number }) {
  return (
    <header
      className="relative overflow-hidden rounded-2xl px-6 py-6 text-[#f3ecf6] shadow-m sm:px-8"
      style={{
        background: 'linear-gradient(130deg,#28133f,#3a1f5c)',
        borderLeft: `6px solid ${week.accent}`,
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full blur-[30px]" style={{ background: week.accent, opacity: 0.22 }} />
      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-stretch">
        <div className="flex items-center gap-4 border-b border-plum-line pb-4 sm:flex-col sm:justify-center sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
          <div className="text-center">
            <div className="text-[12px] uppercase tracking-[0.14em] text-plum-soft">Week</div>
            <div className="serif text-[42px] font-semibold leading-none text-white">{week.id}</div>
          </div>
          <ProgressRing value={doneInWeek} total={week.days.length} size={46} label={`${doneInWeek}/${week.days.length}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mono text-[11px] tracking-wide text-coral-bright">{week.code}</div>
          <h1 className="serif mt-1 text-[22px] font-semibold leading-snug text-white sm:text-[26px]">{week.title}</h1>
          <p className="mt-2 max-w-3xl text-[14px] text-[#e0d3e8]">{week.goal}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-[3px] text-[10.5px] font-semibold uppercase tracking-wide">
              {week.layer}
            </span>
            <span className="rounded-full border border-coral bg-coral-bright px-2.5 py-[3px] text-[10.5px] font-semibold uppercase tracking-wide text-[#3a1608]">
              Belt · {week.belt}
            </span>
          </div>

          {week.outcomes?.length > 0 && (
            <div className="mt-4 rounded-xl border border-plum-line/60 bg-white/[0.05] px-4 py-3">
              <div className="mb-1.5 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-coral-bright">
                <IconTarget className="h-3.5 w-3.5" /> By the end of this week you can
              </div>
              <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {week.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-[#e6dcec]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: week.accent }} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
