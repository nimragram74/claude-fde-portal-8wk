import type { ResourceKind, ResourceLink as RL } from '../types'
import { IconExternal } from './icons'

const KIND_STYLE: Record<ResourceKind, { label: string; cls: string }> = {
  docs: { label: 'DOCS', cls: 'bg-plum text-white' },
  cookbook: { label: 'CODE', cls: 'bg-indigo text-white' },
  article: { label: 'READ', cls: 'bg-magenta text-white' },
  video: { label: 'VIDEO', cls: 'bg-coral text-white' },
  course: { label: 'COURSE', cls: 'bg-teal text-white' },
  tool: { label: 'TOOL', cls: 'bg-grass text-white' },
  search: { label: 'SEARCH', cls: 'bg-quiz text-white' },
}

export function ResourceLinkRow({ link }: { link: RL }) {
  const s = KIND_STYLE[link.kind]
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-line px-3 py-2 text-[13.5px] transition hover:border-coral-bright hover:shadow-s dark:border-[#362b47] dark:hover:border-coral"
    >
      <span className={`mono shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold tracking-wider ${s.cls}`}>
        {s.label}
      </span>
      <span className="flex-1 text-ink-soft group-hover:text-coral-deep dark:text-plum-soft">{link.label}</span>
      {link.source && <span className="hidden text-[11px] text-muted sm:inline">{link.source}</span>}
      <IconExternal className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-coral-deep" />
    </a>
  )
}

export function ResourceGrid({ links }: { links: RL[] }) {
  if (!links?.length) return null
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {links.map((l, i) => (
        <ResourceLinkRow key={i} link={l} />
      ))}
    </div>
  )
}
