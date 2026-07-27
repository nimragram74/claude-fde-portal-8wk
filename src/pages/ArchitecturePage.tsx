import { Link } from 'react-router-dom'
import { ReferenceArchitecture } from '../components/ReferenceArchitecture'
import { ARCH_LAYERS } from '../data/program'
import { SectionHeading, Callout } from '../components/ui'

export function ArchitecturePage() {
  return (
    <div className="space-y-6 animate-fadeUp">
      <SectionHeading
        eyebrow="The foundation"
        title="The Full-Stack Claude Reference Architecture"
        lead="People at the top · six layers of Claude beneath · always-on Trust, Security & Governance wrapping every layer. This is what a Claude FDE designs, builds, secures, and ships across — and the week where the program teaches each layer."
      />

      <ReferenceArchitecture />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ARCH_LAYERS.map((l) => {
          const wk = l.weeks.replace('Wk ', '').split(/[·–]/)[0].trim().split('·')[0].trim()
          const firstWeek = parseInt(wk, 10)
          return (
            <div key={l.key} className="surface overflow-hidden p-0 shadow-s">
              <div className="flex items-center gap-2 px-4 py-2.5 text-white" style={{ background: `linear-gradient(120deg,${l.color},${l.colorB})` }}>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-[11px] font-bold">{l.num}</span>
                <span className="text-[13.5px] font-bold">{l.name}</span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5">
                  {l.cells.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
                {!isNaN(firstWeek) && (
                  <Link to={`/week/${firstWeek}`} className="mt-3 inline-block text-[12.5px] font-semibold text-coral-deep hover:underline">
                    Taught in {l.weeks} →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Callout tone="teal">
        <b>Governance is not a layer you add last.</b> Trust, Security & Governance (identity, ZDR, privacy,
        observability, FinOps) wraps every layer and is configured from the first prompt — see{' '}
        <Link to="/week/11" className="underline">Week 11</Link> and <Link to="/week/12" className="underline">Week 12</Link>.
      </Callout>
    </div>
  )
}
