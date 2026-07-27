import { useState } from 'react'
import type { Day } from '../types'
import { RichText } from './RichText'
import { ResourceGrid } from './ResourceLink'
import { CodeBlock } from './CodeBlock'
import { Quiz } from './Quiz'
import { useProgress } from '../hooks/useProgress'
import { IconBook, IconFlask, IconQuiz, IconCheck, IconLightbulb, IconChevron } from './icons'

function SegTag({ kind }: { kind: 'learn' | 'do' | 'quiz' }) {
  const map = {
    learn: { label: 'Learn', cls: 'text-coral-deep', icon: <IconBook className="h-4 w-4" /> },
    do: { label: 'Do', cls: 'text-grass-deep', icon: <IconFlask className="h-4 w-4" /> },
    quiz: { label: 'Quiz', cls: 'text-quiz', icon: <IconQuiz className="h-4 w-4" /> },
  }[kind]
  return (
    <div className={`flex w-14 shrink-0 flex-col items-center gap-1 pt-1 ${map.cls}`}>
      {map.icon}
      <span className="text-[10px] font-bold uppercase tracking-wide">{map.label}</span>
    </div>
  )
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="prose-step ml-4 list-decimal space-y-1.5">
      {items.map((s, i) => (
        <li key={i} className="text-[13.8px] leading-relaxed text-ink-soft dark:text-plum-soft/90">
          <RichText text={s} />
        </li>
      ))}
    </ol>
  )
}

export function DayCard({ day, accent }: { day: Day; accent: string }) {
  const { isDone, toggle } = useProgress()
  const done = isDone(day.id)
  const [open, setOpen] = useState(true)

  return (
    <article
      id={`day-${day.id}`}
      className="surface scroll-mt-20 overflow-hidden shadow-s transition"
      style={done ? { borderColor: '#9ec98a' } : undefined}
    >
      {/* Header row */}
      <div className="flex items-stretch">
        <button
          onClick={() => toggle(day.id)}
          title={done ? 'Mark not done' : 'Mark done'}
          className="flex w-[58px] shrink-0 flex-col items-center justify-center gap-2 border-r border-line bg-gradient-to-b from-[#faf5ec] to-[#f3ece0] transition dark:border-[#362b47] dark:from-[#241c30] dark:to-[#1f1829]"
        >
          <span className="mono text-[13px] font-semibold text-coral-deep">{day.id}</span>
          <span
            className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-[1.5px] transition ${
              done ? 'border-grass bg-grass text-white shadow-[0_0_0_3px_rgba(79,138,58,.15)]' : 'border-[#cdbfae] bg-white dark:bg-[#2a2136]'
            }`}
          >
            {done && <IconCheck className="h-3 w-3" />}
          </span>
        </button>

        <button onClick={() => setOpen((o) => !o)} className="flex flex-1 items-center gap-3 px-5 py-4 text-left">
          <span
            className="rounded-md px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
          >
            {day.dow}
          </span>
          <span className="chip">{day.hours}</span>
          <h4 className="serif flex-1 text-[16.5px] font-semibold leading-tight text-ink dark:text-plum-soft/95">
            {day.focus}
          </h4>
          <IconChevron className={`h-5 w-5 shrink-0 text-muted transition ${open ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="animate-fadeUp border-t border-line px-5 py-5 dark:border-[#362b47]">
          {/* LEARN */}
          <div className="mb-5 flex gap-3">
            <SegTag kind="learn" />
            <div className="min-w-0 flex-1">
              {day.learn.intro && (
                <p className="mb-2 text-[14px] text-ink-soft dark:text-plum-soft/90">
                  <RichText text={day.learn.intro} />
                </p>
              )}
              <Steps items={day.learn.steps} />
              {day.learn.resources.length > 0 && (
                <div className="mt-3">
                  <div className="mb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-muted">Resources & materials</div>
                  <ResourceGrid links={day.learn.resources} />
                </div>
              )}
            </div>
          </div>

          {/* DO */}
          <div className="mb-5 flex gap-3">
            <SegTag kind="do" />
            <div className="min-w-0 flex-1">
              <div className="rounded-[10px] border border-[#d3e4c8] bg-grass-bg px-4 py-3.5 dark:border-[#2c3a24] dark:bg-[#1c241a]">
                <div className="mb-2 text-[12px] font-bold tracking-wide text-grass-deep dark:text-[#9ec98a]">
                  Lab · {day.lab.title}
                </div>
                <Steps items={day.lab.steps} />

                {day.lab.starter?.map((s, i) => <CodeBlock key={i} snippet={s} />)}

                {day.lab.hints && day.lab.hints.length > 0 && (
                  <details className="mt-3 rounded-lg border border-[#cfe0c2] bg-white/60 px-3 py-2 dark:border-[#2c3a24] dark:bg-[#20281d]">
                    <summary className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-grass-deep dark:text-[#9ec98a]">
                      <IconLightbulb className="h-4 w-4" /> Hints (open only if stuck)
                    </summary>
                    <ul className="prose-step mt-2 ml-4 list-disc space-y-1">
                      {day.lab.hints.map((h, i) => (
                        <li key={i} className="text-[13px] text-ink-soft dark:text-plum-soft/90">
                          <RichText text={h} />
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {day.lab.stretch && day.lab.stretch.length > 0 && (
                  <div className="mt-3">
                    <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-magenta">Stretch goals</div>
                    <ul className="prose-step ml-4 list-disc space-y-1">
                      {day.lab.stretch.map((h, i) => (
                        <li key={i} className="text-[13px] text-ink-soft dark:text-plum-soft/90">
                          <RichText text={h} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 border-t border-dashed border-[#c3dbb6] pt-3 text-[13.5px] text-grass-deep dark:border-[#2c3a24] dark:text-[#9ec98a]">
                  <span className="mr-2 inline-block rounded-[5px] bg-grass px-2 py-[2px] text-[10px] font-bold uppercase tracking-wide text-white">
                    Done when
                  </span>
                  <RichText text={day.lab.doneWhen} />
                </div>
              </div>
            </div>
          </div>

          {/* QUIZ */}
          <div className="mb-3 flex gap-3">
            <SegTag kind="quiz" />
            <div className="min-w-0 flex-1">
              <Quiz dayId={day.id} questions={day.quiz} />
            </div>
          </div>

          {/* Takeaways + tools */}
          {day.keyTakeaways && day.keyTakeaways.length > 0 && (
            <div className="mb-3 ml-[68px] rounded-lg border-l-4 border-l-coral bg-coral-soft/40 px-4 py-2.5 dark:bg-[#2a2033]">
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-coral-deep">Key takeaways</div>
              <ul className="prose-step ml-4 list-disc space-y-0.5">
                {day.keyTakeaways.map((t, i) => (
                  <li key={i} className="text-[13px] text-ink-soft dark:text-plum-soft/90">
                    <RichText text={t} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="ml-[68px] flex flex-wrap gap-1.5">
            {day.tools.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
