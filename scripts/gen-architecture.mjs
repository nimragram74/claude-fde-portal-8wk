// Generates docs/architecture.svg and docs/architecture.png (no browser needed).
//   node scripts/gen-architecture.mjs
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'node:fs'

const W = 1480, H = 1080
const C = {
  plum: '#28133f', plum2: '#3a1f5c', plumSoft: '#b9a6cf',
  coral: '#cc6a44', coralB: '#e0855f', coralSoft: '#f3e2d8',
  teal: '#2ba0b0', indigo: '#3f3a8c', grass: '#4f8a3a', magenta: '#c8266f',
  ink: '#1c1a17', muted: '#6b655c', line: '#d8ccdf', white: '#fffdf8',
  zPages: '#efe6f2', zComp: '#f6e6dd', zData: '#eef4e8', zHooks: '#f4ecf6', zFut: '#fbf3e6',
}
const S = []
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function zone(x, y, w, h, fill, label, dashed = false) {
  S.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${fill}" stroke="${dashed ? C.coral : C.line}" stroke-width="${dashed ? 2 : 1.5}" ${dashed ? 'stroke-dasharray="8 6"' : ''}/>`)
  S.push(`<text x="${x + 16}" y="${y + 22}" font-family="Segoe UI, Arial" font-size="13" font-weight="700" letter-spacing="1.5" fill="${C.muted}">${esc(label)}</text>`)
}
function box(x, y, w, h, title, sub, o = {}) {
  const fill = o.fill || C.white
  const stroke = o.stroke || C.line
  const tc = o.color || C.ink
  S.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="${o.sw || 1.5}"/>`)
  const cx = x + w / 2
  if (sub) {
    S.push(`<text x="${cx}" y="${y + h / 2 - 6}" text-anchor="middle" font-family="Segoe UI, Arial" font-size="${o.fs || 14}" font-weight="700" fill="${tc}">${esc(title)}</text>`)
    S.push(`<text x="${cx}" y="${y + h / 2 + 13}" text-anchor="middle" font-family="Segoe UI, Arial" font-size="11.5" fill="${o.subc || C.muted}">${esc(sub)}</text>`)
  } else {
    S.push(`<text x="${cx}" y="${y + h / 2}" text-anchor="middle" dominant-baseline="central" font-family="Segoe UI, Arial" font-size="${o.fs || 13.5}" font-weight="${o.fw || 600}" fill="${tc}">${esc(title)}</text>`)
  }
}
function arrow(x1, y1, x2, y2, o = {}) {
  const col = o.color || C.plum2
  S.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${o.sw || 2}" marker-end="url(#ah)" ${o.dashed ? 'stroke-dasharray="7 5"' : ''}/>`)
}
function elbow(pts, o = {}) {
  const col = o.color || C.coral
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
  S.push(`<path d="${d}" fill="none" stroke="${col}" stroke-width="${o.sw || 2}" marker-end="url(#ah)" ${o.dashed ? 'stroke-dasharray="7 5"' : ''}/>`)
}

// ---- header ----
S.push(`<rect x="0" y="0" width="${W}" height="92" fill="url(#hd)"/>`)
S.push(`<circle cx="42" cy="46" r="15" fill="${C.coralB}"/><circle cx="42" cy="46" r="5" fill="${C.plum}"/>`)
S.push(`<text x="70" y="42" font-family="Segoe UI, Arial" font-size="26" font-weight="700" fill="#ffffff">Claude FDE Academy (Data &amp; AI) — Portal Architecture</text>`)
S.push(`<text x="70" y="70" font-family="Segoe UI, Arial" font-size="14" fill="${C.plumSoft}">8-week intensive · React SPA · Vite + TypeScript + Tailwind · client-only today, backend-ready (one store seam)</text>`)

// ---- browser + shell ----
box(560, 116, 360, 46, 'Browser', 'static host / GitHub Pages / Vite dev', { fill: C.plum2, color: '#fff', subc: C.plumSoft, stroke: C.plum })
box(430, 200, 620, 54, 'main.tsx · HashRouter → App.tsx (Routes)', 'Layout: Sidebar · TopBar · theme', { fill: '#fff', stroke: C.coral })
arrow(740, 162, 740, 200)

// ---- pages ----
zone(40, 288, 1400, 96, C.zPages, 'PAGES — routed views')
const pages = ['/ Home', '/week/:id', '/belts', '/resources', '/certificate', '/setup', '/architecture', '/coe']
pages.forEach((p, i) => box(54 + i * 173.4, 320, 158, 48, p, null, { fill: '#fff', stroke: '#d9c3e0', fs: 13 }))
arrow(740, 254, 740, 288)

// ---- components ----
zone(40, 410, 1400, 96, C.zComp, 'COMPONENTS — presentational')
const comps = ['DayCard', 'Quiz', 'CodeBlock', 'ResourceLink', 'WeekHeader', 'ProgressRing', 'RefArchitecture', 'ui · icons · RichText']
comps.forEach((c, i) => box(54 + i * 173.4, 442, 158, 48, c, null, { fill: '#fff', stroke: '#e8cebf', fs: 12.5 }))
arrow(740, 384, 740, 410)

// ---- data + hooks ----
zone(40, 536, 884, 178, C.zData, 'CURRICULUM DATA — static, type-checked')
box(60, 566, 844, 46, 'data/weeks/week01..08   →   WEEKS  (8 weeks · 40 days)', null, { fill: '#fff', stroke: C.grass, fs: 14 })
;['types.ts', 'program.ts', 'links.ts', 'tracks.ts'].forEach((d, i) => box(60 + i * 211, 630, 191, 44, d, null, { fill: '#fff', stroke: '#cde0c2', fs: 13 }))

zone(948, 536, 492, 178, C.zHooks, 'HOOKS')
;['useProgress', 'useStoreState', 'useTheme'].forEach((h, i) => box(968, 566 + i * 50, 452, 40, h, null, { fill: '#fff', stroke: '#dcc9e6', fs: 13 }))

arrow(620, 506, 470, 536, { color: C.muted })
arrow(880, 506, 1150, 536, { color: C.muted })

// ---- lib tier ----
box(230, 748, 340, 64, 'status.ts', 'weekStatus · programStatus · belts · pass-gate', { fill: '#fff', stroke: C.indigo })
box(900, 748, 340, 64, 'store.ts', 'cached snapshots · append-only event log', { fill: '#fff', stroke: C.coral, sw: 2 })
// status reads the curriculum; hooks drive the store
arrow(400, 748, 430, 714, { color: C.indigo })
S.push(`<text x="430" y="736" font-family="Segoe UI, Arial" font-size="11" fill="${C.muted}">reads WEEKS</text>`)
arrow(1174, 714, 1070, 748)

// ---- localStorage ----
box(900, 858, 340, 52, 'localStorage', 'progress · quiz · events · profile', { fill: C.plum2, color: '#fff', subc: C.plumSoft, stroke: C.plum })
arrow(1070, 812, 1070, 858)

// ---- future ----
zone(40, 946, 1400, 110, C.zFut, 'FUTURE — not built yet · to add SSO + per-user tracking, swap only store.ts', true)
box(300, 982, 220, 52, 'SSO / auth', 'identity token', { fill: '#fff', stroke: C.coral, subc: C.muted })
box(590, 982, 320, 52, 'Backend API', 'per-user progress + events', { fill: '#fff', stroke: C.coral, subc: C.muted })
box(980, 982, 300, 52, 'Cohort DB', 'transaction / audit store', { fill: '#fff', stroke: C.coral, subc: C.muted })
arrow(520, 1008, 590, 1008, { color: C.coral })
arrow(910, 1008, 980, 1008, { color: C.coral })
// dashed seam from store.ts down through the empty gap between the two lib
// modules (x~640) to the future band — avoids crossing status.ts / localStorage
elbow([[900, 790], [640, 790], [640, 946]], { dashed: true, color: C.coral })
S.push(`<text x="650" y="884" font-family="Segoe UI, Arial" font-size="12" font-weight="700" fill="${C.coral}">swap only store.ts</text>`)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="hd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.plum}"/><stop offset="1" stop-color="${C.plum2}"/></linearGradient>
  <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.plum2}"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="#f7f4ee"/>
${S.join('\n')}
</svg>`

mkdirSync('docs', { recursive: true })
writeFileSync('docs/architecture.svg', svg)
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 2600 }, font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' } }).render().asPng()
writeFileSync('docs/architecture.png', png)
console.log('Wrote docs/architecture.svg and docs/architecture.png (' + Math.round(png.length / 1024) + ' KB)')
