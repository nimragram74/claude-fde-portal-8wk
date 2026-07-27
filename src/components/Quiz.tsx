import { useState } from 'react'
import type { QuizQuestion } from '../types'
import { RichText } from './RichText'
import { IconCheck } from './icons'
import { store } from '../lib/store'

function Question({ dayId, q, index }: { dayId: string; q: QuizQuestion; index: number }) {
  // Initialise from any previously-recorded graded answer so refresh persists.
  const prior = store.getQuiz()[dayId]?.[index]
  const [picked, setPicked] = useState<number | null>(prior ? prior.picked : null)
  const answered = picked !== null

  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
    store.recordQuiz(dayId, index, i, i === q.answer) // records first attempt only
  }

  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-[14px] font-semibold text-ink dark:text-plum-soft">
        <span className="mono mr-2 text-coral-deep">Q{index + 1}.</span>
        <RichText text={q.q} />
      </p>
      <div className="flex flex-col gap-1.5">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer
          let cls =
            'text-left text-[13.5px] rounded-lg border px-3 py-2 transition border-line bg-card text-ink-soft hover:border-quiz hover:shadow-s dark:bg-[#211a2c] dark:border-[#362b47] dark:text-plum-soft'
          if (answered) {
            if (isCorrect) cls = 'text-left text-[13.5px] rounded-lg border px-3 py-2 border-grass bg-grass-bg text-grass-deep font-semibold dark:bg-[#1e2a19]'
            else if (i === picked) cls = 'text-left text-[13.5px] rounded-lg border px-3 py-2 border-coral bg-[#fbeae6] text-[#8a3620] dark:bg-[#2e1a16]'
            else cls = 'text-left text-[13.5px] rounded-lg border px-3 py-2 border-line bg-card text-muted opacity-70 dark:bg-[#211a2c] dark:border-[#362b47]'
          }
          return (
            <button key={i} disabled={answered} onClick={() => choose(i)} className={cls}>
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center align-middle">
                {answered && isCorrect ? <IconCheck className="h-4 w-4" /> : <span className="mono text-[11px] text-muted">{String.fromCharCode(65 + i)}</span>}
              </span>
              <RichText text={opt} />
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-2 rounded-lg border border-dashed border-line bg-card px-3 py-2 text-[13px] text-ink-soft dark:border-[#362b47] dark:bg-[#211a2c] dark:text-plum-soft">
          <strong className={picked === q.answer ? 'text-grass-deep' : 'text-coral-deep'}>
            {picked === q.answer ? 'Correct — ' : 'Not quite — '}
          </strong>
          <RichText text={q.why} />
        </div>
      )}
    </div>
  )
}

export function Quiz({ dayId, questions }: { dayId: string; questions: QuizQuestion[] }) {
  return (
    <div className="rounded-xl2 border border-l-4 border-l-quiz border-[#e3d3ea] bg-quiz-bg px-4 py-4 dark:border-[#3a2b45] dark:border-l-quiz dark:bg-[#221a2b]">
      <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-quiz">
        Knowledge check
        <span className="ml-1 font-normal normal-case text-muted">· graded — first answer counts toward your belt</span>
      </div>
      {questions.map((q, i) => (
        <Question key={i} dayId={dayId} q={q} index={i} />
      ))}
    </div>
  )
}
