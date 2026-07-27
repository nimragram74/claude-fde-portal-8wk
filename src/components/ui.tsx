import type { ReactNode } from 'react'

export function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="eyebrow">
        <span className="inline-block h-[2px] w-6 rounded bg-gradient-to-r from-coral to-transparent" />
        {eyebrow}
      </div>
      <h2 className="serif mt-1.5 text-[27px] font-semibold leading-tight text-ink dark:text-white sm:text-[30px]">{title}</h2>
      {lead && <p className="mt-2 max-w-3xl text-[16px] text-ink-soft dark:text-plum-soft/90">{lead}</p>}
    </div>
  )
}

export function Callout({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'coral' | 'teal' }) {
  const map = {
    gold: 'bg-[#fbf3e6] border-[#efd9a8] border-l-gold text-[#6e5518] dark:bg-[#2a2416] dark:text-[#d8c79a] dark:border-[#4a4020]',
    coral: 'bg-coral-soft/50 border-coral-soft border-l-coral text-coral-deep dark:bg-[#2a2033] dark:text-coral-bright',
    teal: 'bg-[#f0f7f8] border-[#cfe6ea] border-l-teal text-[#1c5a63] dark:bg-[#16262a] dark:text-teal-bright dark:border-[#234046]',
  }[tone]
  return <div className={`mt-4 rounded-r-xl border border-l-4 px-4 py-3 text-[13.5px] ${map}`}>{children}</div>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`surface p-5 shadow-s ${className}`}>{children}</div>
}
