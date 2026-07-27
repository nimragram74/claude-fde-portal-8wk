import { ARCH_LAYERS, GOV_ITEMS, BUSINESS_OUTCOMES } from '../data/program'

export function ReferenceArchitecture() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-l dark:border-[#362b47]">
      {/* People */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 bg-gradient-to-r from-plum-deep to-plum px-5 py-3 text-white">
        <b className="text-[13px] uppercase tracking-wide">People &amp; Users</b>
        <span className="text-[12px] text-plum-soft">Professionals · Clients · Partners · Developers · Leadership</span>
      </div>

      <div className="grid md:grid-cols-[150px_1fr]">
        {/* Gov rail */}
        <div className="flex flex-col gap-2 bg-gradient-to-b from-gov to-plum px-4 py-4 text-[#eaddf2]">
          <div className="text-[12px] font-bold uppercase leading-tight text-white">Trust, Security &amp; Governance</div>
          <ul className="flex flex-col gap-1.5">
            {GOV_ITEMS.map((g) => (
              <li key={g} className="flex items-center gap-2 text-[12px] text-[#e6d8ef]">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                {g}
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t border-plum-line pt-2 text-[10.5px] uppercase tracking-wider text-teal-bright">Always-on · Week 11–12</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {ARCH_LAYERS.map((l) => (
            <div key={l.key} className="grid border-b-[5px] border-paper last:border-b-0 dark:border-[#17141c] md:grid-cols-[210px_1fr]">
              <div className="flex items-center gap-3 px-4 py-3.5 text-white" style={{ background: `linear-gradient(120deg,${l.color},${l.colorB})` }}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/20 text-[12px] font-bold">{l.num}</span>
                <span className="text-[13.5px] font-bold leading-tight">
                  {l.name}
                  <span className="ml-1 text-[10px] font-medium text-white/80">· {l.weeks}</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-card px-3 py-3 dark:bg-[#201a2b] sm:grid-cols-3 lg:grid-cols-5">
                {l.cells.map((c) => (
                  <div
                    key={c}
                    className="flex min-h-[44px] items-center justify-center rounded-lg border border-line bg-gradient-to-b from-[#fffdf8] to-[#f7f2ea] px-1.5 py-2 text-center text-[12px] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-coral-bright hover:shadow-s dark:border-[#362b47] dark:from-[#251d31] dark:to-[#201a2b] dark:text-plum-soft"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 bg-gradient-to-r from-magenta to-coral px-5 py-3 text-white">
        <b className="text-[12px] uppercase tracking-wide">Business Outcomes</b>
        {BUSINESS_OUTCOMES.map((o) => (
          <span key={o} className="text-[12px] text-[#fbe6ee]">
            {o}
          </span>
        ))}
      </div>
    </div>
  )
}
