// ============================================================================
//  Central client-side store.
//
//  Today this is backed by localStorage (no backend, no PII beyond a name the
//  learner types). It is deliberately funnelled through ONE module so that when
//  SSO + server-side per-user tracking is added later, only this file changes:
//  swap the read/write/logEvent implementations for API calls keyed by the
//  authenticated user id. Every meaningful action already emits an event to an
//  append-only log (`events`), which is exactly the transaction stream a backend
//  would ingest.
// ============================================================================

export const KEYS = {
  progress: 'claude-fde-progress-v1', // { [dayId]: true }
  quiz: 'claude-fde-quiz-v1', // { [dayId]: { [qIndex]: { picked, correct } } }
  events: 'claude-fde-events-v1', // AppEvent[]
  profile: 'claude-fde-profile-v1', // { name, cohort }
} as const

const CHANGE = 'claude-fde-store-change'

export type ProgressState = Record<string, boolean>
export type QuizState = Record<string, Record<number, { picked: number; correct: boolean }>>
export interface Profile {
  name: string
  cohort?: string
}
export interface AppEvent {
  t: number // epoch ms
  type: 'day_complete' | 'day_uncomplete' | 'quiz_answer' | 'week_passed' | 'cert_issued' | 'reset' | 'profile_set'
  ref?: string // dayId / weekId / etc.
  meta?: Record<string, unknown>
}

// --- cached snapshots -------------------------------------------------------
// useSyncExternalStore requires getSnapshot to return a STABLE reference while
// the underlying data is unchanged. We cache the parsed value per key and only
// re-parse when the raw localStorage string actually differs. Without this the
// app throws "getSnapshot should be cached" and never renders.
const rawSeen: Record<string, string | null | undefined> = {}
const snapshot: Record<string, unknown> = {}

function read<T>(key: string, fallback: T): T {
  let cur: string | null = null
  try {
    cur = localStorage.getItem(key)
  } catch {
    return fallback
  }
  if (cur === rawSeen[key] && key in snapshot) {
    return snapshot[key] as T
  }
  rawSeen[key] = cur
  try {
    snapshot[key] = cur ? (JSON.parse(cur) as T) : fallback
  } catch {
    snapshot[key] = fallback
  }
  return snapshot[key] as T
}

function write(key: string, value: unknown) {
  const raw = JSON.stringify(value)
  localStorage.setItem(key, raw)
  // Keep the cache coherent so the next getSnapshot returns this exact ref.
  rawSeen[key] = raw
  snapshot[key] = value
  window.dispatchEvent(new Event(CHANGE))
}

export const store = {
  // ---- generic subscribe (used by hooks) ----
  subscribe(cb: () => void) {
    window.addEventListener(CHANGE, cb)
    window.addEventListener('storage', cb)
    return () => {
      window.removeEventListener(CHANGE, cb)
      window.removeEventListener('storage', cb)
    }
  },

  // ---- reads ----
  getProgress: () => read<ProgressState>(KEYS.progress, {}),
  getQuiz: () => read<QuizState>(KEYS.quiz, {}),
  getEvents: () => read<AppEvent[]>(KEYS.events, []),
  getProfile: () => read<Profile>(KEYS.profile, { name: '' }),

  // ---- event log (the future "transactions" stream) ----
  logEvent(type: AppEvent['type'], ref?: string, meta?: Record<string, unknown>) {
    const events = read<AppEvent[]>(KEYS.events, [])
    // pass a stable timestamp in meta if you need determinism; Date.now is fine client-side
    events.push({ t: Date.now(), type, ref, meta })
    // keep the log bounded so localStorage never overflows
    write(KEYS.events, events.slice(-2000))
  },

  // ---- writes ----
  setDay(dayId: string, done: boolean) {
    // Clone so the written value is a NEW reference — required for
    // useSyncExternalStore to detect the change and re-render.
    const p: ProgressState = { ...read<ProgressState>(KEYS.progress, {}) }
    if (done) p[dayId] = true
    else delete p[dayId]
    write(KEYS.progress, p)
    store.logEvent(done ? 'day_complete' : 'day_uncomplete', dayId)
  },

  recordQuiz(dayId: string, qIndex: number, picked: number, correct: boolean) {
    const prev = read<QuizState>(KEYS.quiz, {})
    // only record the FIRST graded attempt so revealing the answer can't game the score
    if (prev[dayId]?.[qIndex]) return
    const q: QuizState = { ...prev, [dayId]: { ...(prev[dayId] ?? {}), [qIndex]: { picked, correct } } }
    write(KEYS.quiz, q)
    store.logEvent('quiz_answer', dayId, { qIndex, picked, correct })
  },

  setProfile(profile: Profile) {
    write(KEYS.profile, profile)
    store.logEvent('profile_set', undefined, { name: profile.name })
  },

  markEvent(type: AppEvent['type'], ref?: string, meta?: Record<string, unknown>) {
    store.logEvent(type, ref, meta)
  },

  reset() {
    localStorage.removeItem(KEYS.progress)
    localStorage.removeItem(KEYS.quiz)
    write(KEYS.events, [{ t: Date.now(), type: 'reset' }])
  },

  // ---- export (hand-off point for a future backend sync) ----
  exportAll() {
    return {
      profile: read<Profile>(KEYS.profile, { name: '' }),
      progress: read<ProgressState>(KEYS.progress, {}),
      quiz: read<QuizState>(KEYS.quiz, {}),
      events: read<AppEvent[]>(KEYS.events, []),
      exportedAt: new Date().toISOString(),
      schema: 'claude-fde/v1',
    }
  },
}
