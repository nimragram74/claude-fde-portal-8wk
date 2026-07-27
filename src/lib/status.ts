import type { Week } from '../types'
import type { ProgressState, QuizState } from './store'

/** A week is "passed" (belt-eligible) when every day is done, every quiz is
 *  answered, and quiz accuracy meets this bar. */
export const PASS_THRESHOLD = 0.8

export interface WeekStatus {
  daysDone: number
  daysTotal: number
  quizAnswered: number
  quizTotal: number
  quizCorrect: number
  accuracy: number // 0..1 over answered questions
  daysComplete: boolean
  quizComplete: boolean
  passed: boolean
}

export function weekStatus(week: Week, progress: ProgressState, quiz: QuizState): WeekStatus {
  const daysTotal = week.days.length
  const daysDone = week.days.filter((d) => progress[d.id]).length
  let quizTotal = 0
  let quizAnswered = 0
  let quizCorrect = 0
  for (const d of week.days) {
    quizTotal += d.quiz.length
    const rec = quiz[d.id] ?? {}
    for (let i = 0; i < d.quiz.length; i++) {
      if (rec[i]) {
        quizAnswered++
        if (rec[i].correct) quizCorrect++
      }
    }
  }
  const accuracy = quizAnswered > 0 ? quizCorrect / quizAnswered : 0
  const daysComplete = daysDone === daysTotal
  const quizComplete = quizAnswered === quizTotal
  const passed = daysComplete && quizComplete && accuracy >= PASS_THRESHOLD
  return { daysDone, daysTotal, quizAnswered, quizTotal, quizCorrect, accuracy, daysComplete, quizComplete, passed }
}

export interface ProgramStatus {
  daysDone: number
  daysTotal: number
  weeksPassed: number
  weeksTotal: number
  quizAnswered: number
  quizTotal: number
  quizCorrect: number
  accuracy: number
  allPassed: boolean
  passedWeekIds: number[]
}

export function programStatus(weeks: Week[], progress: ProgressState, quiz: QuizState): ProgramStatus {
  let daysDone = 0,
    daysTotal = 0,
    quizAnswered = 0,
    quizTotal = 0,
    quizCorrect = 0,
    weeksPassed = 0
  const passedWeekIds: number[] = []
  for (const w of weeks) {
    const s = weekStatus(w, progress, quiz)
    daysDone += s.daysDone
    daysTotal += s.daysTotal
    quizAnswered += s.quizAnswered
    quizTotal += s.quizTotal
    quizCorrect += s.quizCorrect
    if (s.passed) {
      weeksPassed++
      passedWeekIds.push(w.id)
    }
  }
  return {
    daysDone,
    daysTotal,
    weeksPassed,
    weeksTotal: weeks.length,
    quizAnswered,
    quizTotal,
    quizCorrect,
    accuracy: quizAnswered > 0 ? quizCorrect / quizAnswered : 0,
    allPassed: weeksPassed === weeks.length,
    passedWeekIds,
  }
}

// ── Belt ladder mapped to the weeks that earn it ───────────────────────────
export interface BeltDef {
  name: string
  short: string
  grad: string
  weeks: number[]
}

export const BELT_LADDER: BeltDef[] = [
  { name: 'White · Foundations', short: 'White', grad: 'linear-gradient(90deg,#c9c2b4,#e6e0d4)', weeks: [1] },
  { name: 'Yellow · Build & Prompt', short: 'Yellow', grad: 'linear-gradient(90deg,#e0a92e,#efc76a)', weeks: [2, 3] },
  { name: 'Orange · Tools & Context', short: 'Orange', grad: 'linear-gradient(90deg,#cc6a44,#e0855f)', weeks: [4, 5] },
  { name: 'Green · Agents', short: 'Green', grad: 'linear-gradient(90deg,#4f8a3a,#6fae54)', weeks: [6] },
  { name: 'Blue · Trust & Platform', short: 'Blue', grad: 'linear-gradient(90deg,#2ba0b0,#3cb9c9)', weeks: [7] },
  { name: 'Black · Practitioner', short: 'Black', grad: 'linear-gradient(90deg,#2a2320,#4a3f38)', weeks: [8] },
]

export function beltEarned(belt: BeltDef, passedWeekIds: number[]): boolean {
  return belt.weeks.length > 0 && belt.weeks.every((w) => passedWeekIds.includes(w))
}

export function beltsEarned(passedWeekIds: number[]): BeltDef[] {
  return BELT_LADDER.filter((b) => beltEarned(b, passedWeekIds))
}
