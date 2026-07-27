import { useCallback, useSyncExternalStore } from 'react'
import { store } from '../lib/store'
import type { Profile, QuizState, ProgressState } from '../lib/store'

/** Reactive access to progress + quiz + profile, plus write actions. */
export function useStoreState() {
  const progress = useSyncExternalStore(store.subscribe, store.getProgress, store.getProgress) as ProgressState
  const quiz = useSyncExternalStore(store.subscribe, store.getQuiz, store.getQuiz) as QuizState
  const profile = useSyncExternalStore(store.subscribe, store.getProfile, store.getProfile) as Profile

  const recordQuiz = useCallback(
    (dayId: string, qIndex: number, picked: number, correct: boolean) => store.recordQuiz(dayId, qIndex, picked, correct),
    [],
  )
  const setProfile = useCallback((p: Profile) => store.setProfile(p), [])
  const markEvent = useCallback(store.markEvent, [])
  const exportAll = useCallback(() => store.exportAll(), [])

  return { progress, quiz, profile, recordQuiz, setProfile, markEvent, exportAll }
}

/** Read-once snapshot of quiz results for a given day (non-reactive helper). */
export function dayQuizResults(dayId: string) {
  return store.getQuiz()[dayId] ?? {}
}
