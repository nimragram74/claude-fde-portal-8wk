import type { Week } from '../../types'
import week01 from './week01'
import week02 from './week02'
import week03 from './week03'
import week04 from './week04'
import week05 from './week05'
import week06 from './week06'
import week07 from './week07'
import week08 from './week08'

export const WEEKS: Week[] = [week01, week02, week03, week04, week05, week06, week07, week08]

export function getWeek(id: number): Week | undefined {
  return WEEKS.find((w) => w.id === id)
}

export const TOTAL_DAYS = WEEKS.reduce((n, w) => n + w.days.length, 0)
