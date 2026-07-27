import { useCallback, useSyncExternalStore } from 'react'
import { store } from '../lib/store'

/**
 * Day-completion progress. Same public API as before; now backed by the
 * central store (which also logs an event on every change).
 */
export function useProgress() {
  const state = useSyncExternalStore(store.subscribe, store.getProgress, store.getProgress)

  const setDay = useCallback((dayId: string, value: boolean) => store.setDay(dayId, value), [])
  const toggle = useCallback((dayId: string) => store.setDay(dayId, !store.getProgress()[dayId]), [])
  const reset = useCallback(() => store.reset(), [])
  const isDone = useCallback((dayId: string) => !!state[dayId], [state])

  const completedCount = Object.keys(state).filter((k) => state[k]).length

  return { state, toggle, setDay, reset, isDone, completedCount }
}
