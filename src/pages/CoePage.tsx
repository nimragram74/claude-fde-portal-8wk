import { PILLARS, ENGINE, OPERATING_SHIFT, NORTH_STARS, MENTOR, CAPSTONE_IDEAS } from '../data/program'
import { SectionHeading, Callout } from '../components/ui'
import { IconChevron } from '../components/icons'

export function CoePage() {
  return (
    <div className="space-y-9 animate-fadeUp">
      <SectionHeading
        eyebrow="The CoE this Academy feeds"
        title="Five pillars, one engine, measured on value"
        lead="This program is the ENABLE pillar — it staffs every stage of the CoE engine with certified FDEs. Here is the engine the program trains you to run."
      />

      {/* Pillars */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {PILLARS.map((p) => (
          <div key={p.k} className="surface overflow-hidden p-0 text-center shadow-s">
            <div className="border-t-4 border-t-coral bg-gradient-to-b from-plum-deep to-plum py-3 text-white">
              <b className="tracking-wide">{p.k}</b>
            </div>
            <div className="p-3 text-[12.5px] text-ink-soft dark:text-plum-soft/90">{p.v}</div>
          </div>
        ))}
      </div>

      {/* Engine */}
      <div className="rounded-xl2 border border-[#cfe6ea] bg-[#f0f7f8] px-4 py-4 dark:border-[#234046] dark:bg-[#16262a]">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal">Run by one engine · idea → operating-model change</div>
        <div className="flex flex-wrap items-center gap-2">
          {ENGINE.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg border border-[#cfe6ea] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-plum dark:border-[#234046] dark:bg-[#1c2f34] dark:text-teal-bright">
                {s}
              </span>
              {i < ENGINE.length - 1 && <IconChevron className="h-4 w-4 text-teal" />}
            </span>
          ))}
        </div>
      </div>

      {/* Operating model shift */}
      <section>
        <SectionHeading eyebrow="The shift it drives" title="The operating-model shift" />
        <div className="surface overflow-hidden shadow-s">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-[#faf6ee] text-left text-[11px] uppercase tracking-wide text-muted dark:border-[#362b47] dark:bg-[#251d31]">
                <th className="px-4 py-2.5">Dimension</th>
                <th className="px-4 py-2.5">From</th>
                <th className="px-4 py-2.5">To</th>
              </tr>
            </thead>
            <tbody>
              {OPERATING_SHIFT.map((r) => (
                <tr key={r.dim} className="border-b border-line-soft last:border-0 dark:border-[#2c2338]">
                  <td className="px-4 py-2.5 text-[13px] font-semibold text-coral-deep">{r.dim}</td>
                  <td className="px-4 py-2.5 text-[13px] text-muted line-through decoration-coral/40">{r.from}</td>
                  <td className="px-4 py-2.5 text-[13px] font-medium text-ink dark:text-plum-soft">{r.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* North stars */}
      <section>
        <SectionHeading eyebrow="The target" title="Four North-Star goals" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NORTH_STARS.map((n) => (
            <div key={n} className="rounded-xl2 border border-plum-line/40 bg-gradient-to-br from-plum-deep to-plum p-4 text-[#f3ecf6] shadow-m">
              <div className="text-[14px] font-semibold leading-snug">{n}</div>
            </div>
          ))}
        </div>
        <Callout tone="coral">
          This Academy builds the bench that clears the <b>Global Premier</b> bar — capacity that scales by
          certification, not headcount.
        </Callout>
      </section>

      {/* Capstone ideas */}
      <section>
        <SectionHeading
          eyebrow="Appendix"
          title="Capstone & IP-library ideas"
          lead="Pick something close to a real client engagement — realism beats novelty. Keep scope tight: up to two agents that do one clear job well, grounded, governed, adopted, business-cased, and reference-worthy."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {CAPSTONE_IDEAS.map((c) => (
            <div key={c.vertical} className="surface p-4 shadow-s">
              <div className="text-[13px] font-bold text-coral-deep">{c.vertical}</div>
              <p className="mt-1 text-[13px] text-ink-soft dark:text-plum-soft/90">{c.ideas}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mentor playbook */}
      <section>
        <SectionHeading eyebrow="For the pod lead / trainer" title="The mentor's playbook" />
        <div className="grid gap-3 md:grid-cols-2">
          {MENTOR.map((m) => (
            <div key={m.h} className="rounded-r-xl border border-l-4 border-l-magenta border-line bg-card px-4 py-3 shadow-s dark:border-[#362b47] dark:bg-[#201a2b]">
              <h4 className="text-[14.5px] font-semibold text-magenta">{m.h}</h4>
              <p className="mt-0.5 text-[13px] text-ink-soft dark:text-plum-soft/90">{m.p}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
