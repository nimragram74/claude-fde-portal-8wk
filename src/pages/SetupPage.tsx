import { Link } from 'react-router-dom'
import { SETUP } from '../data/program'
import { SectionHeading, Callout } from '../components/ui'
import { ResourceGrid } from '../components/ResourceLink'
import { RichText } from '../components/RichText'
import { IconWrench, IconChevron } from '../components/icons'

export function SetupPage() {
  return (
    <div className="space-y-6 animate-fadeUp">
      <SectionHeading
        eyebrow="Do this first"
        title="Tools & setup (one-time)"
        lead="Set these up before Day 1. Your pod lead provisions Anthropic Console access, an API key with a budget, and (ideally) Claude for Work seats for the Experience layer."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {SETUP.map((c) => (
          <div key={c.title} className="surface p-5 shadow-s">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h4 className="serif flex items-center gap-2 text-[16px] font-semibold text-ink dark:text-white">
                <IconWrench className="h-4 w-4 text-coral-deep" /> {c.title}
              </h4>
              <span className="chip whitespace-nowrap">{c.role}</span>
            </div>
            <ol className="prose-step ml-4 list-decimal space-y-1">
              {c.steps.map((s, i) => (
                <li key={i} className="text-[13.5px] text-ink-soft dark:text-plum-soft/90">
                  <RichText text={s} />
                </li>
              ))}
            </ol>
            {c.links && c.links.length > 0 && (
              <div className="mt-3">
                <ResourceGrid links={c.links} />
              </div>
            )}
          </div>
        ))}
      </div>

      <Callout tone="teal">
        <b>Secret hygiene from day one:</b> load your API key from an environment variable or secret store, add{' '}
        <code className="inline-code">.env</code> to <code className="inline-code">.gitignore</code>, and never commit
        keys. This habit is graded every week and gated at deploy from Week 12.
      </Callout>

      <div className="flex justify-end">
        <Link to="/week/1" className="btn-primary">
          Setup done — start Week 1 <IconChevron className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
