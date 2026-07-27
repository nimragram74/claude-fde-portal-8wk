export function ProgressRing({
  value,
  total,
  size = 44,
  stroke = 5,
  label,
}: {
  value: number
  total: number
  size?: number
  stroke?: number
  label?: string
}) {
  const pct = total === 0 ? 0 : value / total
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * pct
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-line dark:text-[#3a2f4a]" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#pg)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ transition: 'stroke-dasharray .5s ease' }}
        />
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e0855f" />
            <stop offset="1" stopColor="#c8266f" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute mono text-[10px] font-bold text-ink-soft dark:text-plum-soft">
        {label ?? `${Math.round(pct * 100)}%`}
      </span>
    </div>
  )
}
