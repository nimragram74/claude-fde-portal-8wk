import { Link } from 'react-router-dom'
import { WEEKS, TOTAL_DAYS } from '../data/weeks'
import { PROGRAM, FDE_DEFS, CADENCES, LADDER, RULES } from '../data/program'
import { useProgress } from '../hooks/useProgress'
import { ProgressRing } from '../components/ProgressRing'
import { SectionHeading, Callout } from '../components/ui'
import { IconSpark, IconChevron, IconRocket, IconCheck } from '../components/icons'

function firstUndoneWeek(state: Record<string, boolean>) {
  for (const w of WEEKS) {
    if (w.days.some((d) => !state[d.id])) return w.id
  }
  return WEEKS.length
}

export function HomePage() {
  const { completedCount, state } = useProgress()
  const resumeWeek = firstUndoneWeek(state)
  const pct = Math.round((completedCount / TOTAL_DAYS) * 100)

  return (
    <div className="space-y-12 animate-fadeUp">
      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl border border-plum-line/40 px-6 py-10 text-[#f3ecf6] shadow-l sm:px-10 sm:py-14"
        style={{ background: 'linear-gradient(160deg,#28133f 0%,#3a1f5c 55%,#5a2a63 100%)' }}>
        <div className="pointer-events-none absolute -right-16 -top-20 h-96 w-96 rounded-full bg-coral opacity-40 blur-[60px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-magenta opacity-25 blur-[60px]" />
        <div className="relative z-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-[15px] font-semibold">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-coral-bright to-coral text-white">
                <IconSpark className="h-3.5 w-3.5" />
              </span>
              Claude Forward Deployed Engineer Program
            </span>
            <span className="ml-auto text-[11px] uppercase tracking-[0.2em] text-plum-soft">{PROGRAM.org}</span>
          </div>

          <span className="inline-block rounded-full border border-plum-line bg-white/5 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-coral-bright">
            8-week intensive · built for Data &amp; AI teams · daily labs · belt-ladder certified
          </span>

          <h1 className="serif mt-5 max-w-3xl bg-gradient-to-b from-white to-[#f0d6c8] bg-clip-text text-[40px] font-semibold leading-[1.03] text-transparent sm:text-[54px]">
            {PROGRAM.title}
          </h1>
          <p className="mt-3 text-[14px] uppercase tracking-[0.14em] text-coral-bright">{PROGRAM.subtitle}</p>
          <p className="mt-4 max-w-2xl text-[17px] text-[#e6dcec]">
            The intensive Claude Academy track for the Wipro × Anthropic CoE, built for <b>Data &amp; AI teams</b>.
            Eight weeks that take engineers who already know Python, ML and pipelines and turn them into FDEs who ship
            <b> agentified, evaluated, governed</b> Claude systems over real data — from RAG to multi-agent to production.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {PROGRAM.mottos.map((m) => (
              <span key={m} className="rounded-full border border-plum-line bg-white/[0.07] px-3 py-1.5 text-[11.5px]">
                {m}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={`/week/${resumeWeek}`} className="btn-primary !px-5 !py-2.5 !text-[15px]">
              {completedCount > 0 ? `Resume — Week ${resumeWeek}` : 'Start Week 1'} <IconChevron className="h-4 w-4" />
            </Link>
            <Link to="/setup" className="btn-ghost !border-plum-line !bg-white/5 !px-5 !py-2.5 !text-[15px] !text-white">
              One-time setup
            </Link>
            <div className="ml-auto flex items-center gap-3 rounded-2xl border border-plum-line bg-white/[0.06] px-4 py-2">
              <ProgressRing value={completedCount} total={TOTAL_DAYS} size={44} />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-white">{pct}% complete</div>
                <div className="text-[11px] text-plum-soft">
                  {completedCount}/{TOTAL_DAYS} daily labs
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAM.meta.map((m) => (
              <div key={m.k} className="rounded-xl border border-plum-line bg-white/[0.06] px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.15em] text-plum-soft">{m.k}</div>
                <div className="mt-1 text-[13px] text-[#f6eff8]">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* WHAT IS AN FDE */}
      <section>
        <SectionHeading
          eyebrow="The mandate"
          title="Grow the people who deliver Claude at scale"
          lead="A Field Deployment Engineer doesn't just prompt Claude — they discover the function, agentify it, business-case it, build it across the stack, ship it with governance, and scale it into reusable IP."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {FDE_DEFS.map((d) => (
            <div key={d.title} className="surface border-t-4 border-t-coral p-5 shadow-s">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-magenta">{d.kicker}</div>
              <h4 className="serif mt-1 text-[17px] font-semibold text-ink dark:text-white">{d.title}</h4>
              <p className="mt-1.5 text-[13.5px] text-ink-soft dark:text-plum-soft/90">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WEEK GRID */}
      <section>
        <SectionHeading
          eyebrow="The path"
          title="Eight weeks, week by week"
          lead="Each day: Learn (Anthropic docs + curated materials) → Do (a lab with a Done-when check) → Quiz (graded instantly). Tick each day as you finish; progress saves automatically in your browser."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WEEKS.map((w) => {
            const done = w.days.filter((d) => state[d.id]).length
            const complete = done === w.days.length
            return (
              <Link
                key={w.id}
                to={`/week/${w.id}`}
                className="surface group relative overflow-hidden p-4 shadow-s transition hover:-translate-y-1 hover:shadow-m"
                style={{ borderTop: `4px solid ${w.accent}` }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg text-[14px] font-bold text-white"
                    style={{ background: complete ? '#4f8a3a' : w.accent }}
                  >
                    {complete ? <IconCheck className="h-4 w-4" /> : w.id}
                  </span>
                  <span className="mono text-[10.5px] text-muted">{w.code.split(' · ')[0]}</span>
                </div>
                <h4 className="serif mt-2.5 text-[15px] font-semibold leading-snug text-ink dark:text-white">{w.title}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <ProgressRing value={done} total={w.days.length} size={26} stroke={4} label={`${done}`} />
                  <span className="text-[11.5px] text-muted">{w.belt}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* AGENTIFICATION LADDER */}
      <section>
        <SectionHeading
          eyebrow="How the value compounds"
          title="Agentify the function — target the next rung"
          lead="Target the next rung where value is highest — not maximum autonomy for its own sake."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LADDER.map((r, i) => (
            <div
              key={r.k}
              className="rounded-xl2 p-4 text-white shadow-s"
              style={{
                background: [
                  'linear-gradient(135deg,#8a97a8,#9aa7b6)',
                  'linear-gradient(135deg,#2ba0b0,#3cb9c9)',
                  'linear-gradient(135deg,#7a3ea0,#9257bd)',
                  'linear-gradient(135deg,#cc6a44,#e0855f)',
                ][i],
              }}
            >
              <div className="text-[11px] opacity-85">Rung {i + 1}</div>
              <b className="text-[16px]">{r.k}</b>
              <div className="mt-0.5 text-[12px] opacity-90">{r.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CADENCES */}
      <section>
        <SectionHeading eyebrow="Why 8 weeks" title="The intensive track — for teams who already build" />
        <div className="grid gap-4 md:grid-cols-3">
          {CADENCES.map((c) => (
            <div
              key={c.title}
              className={`rounded-2xl p-5 shadow-m ${
                c.highlight
                  ? 'text-[#f3ecf6]'
                  : 'surface border-t-4 border-t-coral'
              }`}
              style={c.highlight ? { background: 'linear-gradient(150deg,#28133f,#5a2a63)' } : undefined}
            >
              <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${c.highlight ? 'text-coral-bright' : 'text-magenta'}`}>
                {c.tag}
              </div>
              <h3 className={`serif mt-1 text-[21px] font-semibold ${c.highlight ? 'text-white' : 'text-ink dark:text-white'}`}>
                {c.title}
              </h3>
              <p className={`mt-1.5 text-[13px] ${c.highlight ? 'text-[#e0d3e8]' : 'text-ink-soft dark:text-plum-soft/90'}`}>{c.body}</p>
              <ul className="mt-2 space-y-1">
                {c.bullets.map((b) => (
                  <li key={b} className={`flex gap-2 text-[12.5px] ${c.highlight ? 'text-[#ecd9e8]' : 'text-ink-soft dark:text-plum-soft/80'}`}>
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* GROUND RULES */}
      <section>
        <SectionHeading eyebrow="Non-negotiables" title="Ground rules: engineer with Claude, own the outcome" />
        <div className="grid gap-3 sm:grid-cols-2">
          {RULES.map((r) => (
            <div key={r.h} className="rounded-r-xl border border-l-4 border-l-coral border-line bg-gradient-to-b from-[#fffdf8] to-[#f8f3ea] px-4 py-3 dark:border-[#362b47] dark:from-[#221b2d] dark:to-[#1e1728]">
              <h4 className="text-[14.5px] font-semibold text-coral-deep">{r.h}</h4>
              <p className="mt-0.5 text-[13px] text-ink-soft dark:text-plum-soft/90">{r.p}</p>
            </div>
          ))}
        </div>
        <Callout tone="coral">
          <b>Start here:</b> complete the <Link to="/setup" className="underline">one-time setup</Link> before Day 1, then open{' '}
          <Link to="/week/1" className="underline">Week 1</Link>. Each Friday you ship — that's your belt checkpoint.
        </Callout>
      </section>

      <div className="flex justify-center pt-2">
        <Link to={`/week/${resumeWeek}`} className="btn-primary !px-6 !py-3 !text-[15px]">
          <IconRocket className="h-4 w-4" /> {completedCount > 0 ? `Continue Week ${resumeWeek}` : 'Begin the program'}
        </Link>
      </div>
    </div>
  )
}
