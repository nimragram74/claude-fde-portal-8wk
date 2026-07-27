import { useParams, Link, useNavigate } from 'react-router-dom'
import { getWeek, WEEKS } from '../data/weeks'
import { WeekHeader } from '../components/WeekHeader'
import { DayCard } from '../components/DayCard'
import { ResourceGrid } from '../components/ResourceLink'
import { useProgress } from '../hooks/useProgress'
import { useStoreState } from '../hooks/useStoreState'
import { weekStatus, PASS_THRESHOLD } from '../lib/status'
import { WEEK_COURSES } from '../data/tracks'
import { IconChevron, IconRocket, IconBook, IconAward, IconCheck } from '../components/icons'

export function WeekPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const week = getWeek(Number(id))
  const { state, setDay } = useProgress()
  const { quiz } = useStoreState()

  if (!week) {
    return (
      <div className="surface p-8 text-center">
        <p className="text-ink-soft dark:text-plum-soft">Week not found.</p>
        <Link to="/" className="btn-primary mt-4">
          Back to overview
        </Link>
      </div>
    )
  }

  const doneInWeek = week.days.filter((d) => state[d.id]).length
  const allDone = doneInWeek === week.days.length
  const status = weekStatus(week, state, quiz)
  const courses = WEEK_COURSES[week.id]
  const prev = week.id > 1 ? WEEKS[week.id - 2] : null
  const next = week.id < WEEKS.length ? WEEKS[week.id] : null

  const markWeek = (val: boolean) => week.days.forEach((d) => setDay(d.id, val))

  return (
    <div className="space-y-5 animate-fadeUp">
      <WeekHeader week={week} doneInWeek={doneInWeek} />

      {/* Ship banner + bulk actions */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl2 border border-line bg-card px-4 py-3 dark:border-[#362b47] dark:bg-[#201a2b]">
        <div className="flex items-center gap-2 text-[13.5px]">
          <IconRocket className="h-4 w-4 text-coral-deep" />
          <span className="font-semibold text-ink dark:text-plum-soft">Friday ship:</span>
          <span className="text-ink-soft dark:text-plum-soft/90">{week.shipTitle}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
              status.passed
                ? 'bg-grass text-white'
                : 'bg-coral-soft text-coral-deep dark:bg-[#33223f] dark:text-coral-bright'
            }`}
            title={`Pass = all days done + all quizzes answered + ≥${Math.round(PASS_THRESHOLD * 100)}% accuracy`}
          >
            {status.passed ? 'Belt-ready ✓' : 'Not yet passed'}
          </span>
          <span className="mono text-[11.5px] text-muted">
            quiz {status.quizCorrect}/{status.quizTotal}
            {status.quizAnswered > 0 && ` · ${Math.round(status.accuracy * 100)}%`}
          </span>
          <button onClick={() => markWeek(true)} className="btn-ghost !py-1.5 !text-[12.5px]">
            Mark week done
          </button>
          {doneInWeek > 0 && (
            <button onClick={() => markWeek(false)} className="btn-ghost !py-1.5 !text-[12.5px]">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Recommended external course for this week */}
      {courses && courses.length > 0 && (
        <div className="rounded-xl2 border border-teal/30 bg-[#f0f7f8] px-4 py-3 dark:border-[#234046] dark:bg-[#16262a]">
          <div className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-teal">
            <IconAward className="h-4 w-4" /> Recommended course this week
          </div>
          <ResourceGrid links={courses} />
        </div>
      )}

      {/* Days */}
      <div className="space-y-3">
        {week.days.map((d) => (
          <DayCard key={d.id} day={d} accent={week.accent} />
        ))}
      </div>

      {/* Week-level resources */}
      {week.resources && week.resources.length > 0 && (
        <div className="surface p-5">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-coral-deep">
            <IconBook className="h-4 w-4" /> Go deeper — week {week.id} materials
          </div>
          <ResourceGrid links={week.resources} />
        </div>
      )}

      {status.passed ? (
        <div className="rounded-xl2 border border-grass bg-grass-bg px-5 py-4 text-center dark:border-[#2c3a24] dark:bg-[#1c241a]">
          <p className="serif flex items-center justify-center gap-2 text-lg font-semibold text-grass-deep dark:text-[#9ec98a]">
            <IconCheck className="h-5 w-5" /> Week {week.id} passed — belt anchor: {week.belt} 🥋
          </p>
          <p className="mt-1 text-[13.5px] text-grass-deep/90 dark:text-[#9ec98a]/90">
            Ship <strong>{week.shipTitle}</strong> for your pod-lead review, then track your belts on the{' '}
            <Link to="/certificate" className="underline">certificate page</Link>.
          </p>
        </div>
      ) : allDone ? (
        <div className="rounded-xl2 border border-gold/50 bg-[#fbf3e6] px-5 py-4 text-center dark:border-[#4a4020] dark:bg-[#2a2416]">
          <p className="text-[14px] font-semibold text-[#6e5518] dark:text-[#d8c79a]">
            All labs done — but the week isn't <em>passed</em> yet.
          </p>
          <p className="mt-1 text-[13px] text-[#6e5518]/90 dark:text-[#d8c79a]/90">
            Answer every quiz question with ≥{Math.round(PASS_THRESHOLD * 100)}% accuracy to earn the belt.
            Currently {status.quizAnswered}/{status.quizTotal} answered · {Math.round(status.accuracy * 100)}%.
          </p>
        </div>
      ) : null}

      {/* Prev / next */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {prev ? (
          <button onClick={() => navigate(`/week/${prev.id}`)} className="btn-ghost">
            <IconChevron className="h-4 w-4 rotate-180" /> Wk {prev.id}
          </button>
        ) : (
          <Link to="/" className="btn-ghost">
            <IconChevron className="h-4 w-4 rotate-180" /> Overview
          </Link>
        )}
        {next ? (
          <button onClick={() => navigate(`/week/${next.id}`)} className="btn-primary">
            Week {next.id}: {next.title.length > 34 ? next.title.slice(0, 34) + '…' : next.title}
            <IconChevron className="h-4 w-4" />
          </button>
        ) : (
          <Link to="/belts" className="btn-primary">
            You made it — see the belt ladder <IconChevron className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
