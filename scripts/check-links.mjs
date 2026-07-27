// Verifies every real (non-search) URL used in the portal resolves.
// Run with:  npx vite-node scripts/check-links.mjs
import { WEEKS } from '../src/data/weeks/index.ts'
import { SETUP, PROMPT_LIBRARY } from '../src/data/program.ts'
import { LINKS } from '../src/data/links.ts'
import { OFFICIAL_TRACKS, WEEK_COURSES } from '../src/data/tracks.ts'

void PROMPT_LIBRARY

const isSearch = (u) =>
  /results\?search_query=|\/courses\/search|\/search\?query=|google\.com\/search/.test(u)

const urls = new Map() // url -> where[]
const add = (link, where) => {
  if (!link?.url || !link.url.startsWith('http')) return
  if (isSearch(link.url)) return
  const arr = urls.get(link.url) ?? []
  arr.push(where)
  urls.set(link.url, arr)
}

for (const w of WEEKS) {
  for (const r of w.resources ?? []) add(r, `W${w.id} resources`)
  for (const d of w.days) for (const r of d.learn.resources) add(r, `Day ${d.id}`)
}
for (const c of SETUP) for (const l of c.links ?? []) add(l, `Setup: ${c.title}`)
for (const l of Object.values(LINKS)) add(l, 'LINKS')
for (const t of OFFICIAL_TRACKS) for (const l of t.links) add(l, `Track: ${t.group}`)
for (const [wk, links] of Object.entries(WEEK_COURSES)) for (const l of links) add(l, `WeekCourse ${wk}`)

console.log(`Checking ${urls.size} unique URLs…\n`)

async function check(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 15000)
  try {
    let res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': 'Mozilla/5.0 link-check' } })
    return res.status
  } catch (e) {
    return `ERR ${e.name}`
  } finally {
    clearTimeout(timer)
  }
}

let bad = 0
const entries = [...urls.entries()]
for (let i = 0; i < entries.length; i += 6) {
  const batch = entries.slice(i, i + 6)
  const results = await Promise.all(batch.map(async ([u, where]) => ({ u, where, status: await check(u) })))
  for (const r of results) {
    const ok = typeof r.status === 'number' && r.status < 400
    if (!ok) {
      bad++
      console.log(`  ✗ ${r.status}  ${r.u}\n       used in: ${[...new Set(r.where)].join(', ')}`)
    }
  }
}
console.log(bad === 0 ? '\nAll URLs resolved ✓' : `\n${bad} URL(s) need attention.`)
