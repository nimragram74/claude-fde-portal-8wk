import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { WEEKS } from '../data/weeks'
import { useProgress } from '../hooks/useProgress'
import { useStoreState } from '../hooks/useStoreState'
import { programStatus, BELT_LADDER, beltEarned, PASS_THRESHOLD } from '../lib/status'
import { store } from '../lib/store'
import { SectionHeading, Callout } from '../components/ui'
import { ProgressRing } from '../components/ProgressRing'
import { IconSpark, IconCheck, IconShield } from '../components/icons'

function downloadJSON() {
  const data = store.exportAll()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `claude-fde-progress-${data.profile.name || 'learner'}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

export function CertificatePage() {
  const { state: progress } = useProgress()
  const { quiz, profile, setProfile, markEvent } = useStoreState()

  const ps = useMemo(() => programStatus(WEEKS, progress, quiz), [progress, quiz])
  const issued = ps.allPassed
  const scorePct = Math.round(ps.accuracy * 100)
  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const onPrint = () => {
    if (issued) markEvent('cert_issued', undefined, { name: profile.name, scorePct })
    window.print()
  }

  return (
    <div className="space-y-6 animate-fadeUp">
      <SectionHeading
        eyebrow="Certification"
        title="Your Claude FDE certificate"
        lead={`Earned when all ${WEEKS.length} weeks are passed — every day complete, every quiz answered, and ≥${Math.round(
          PASS_THRESHOLD * 100,
        )}% quiz accuracy. Print to PDF for your record.`}
      />

      {/* Controls (hidden on print) */}
      <div className="no-print surface flex flex-wrap items-center gap-3 p-4">
        <label className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft dark:text-plum-soft">
          Name on certificate
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Your full name"
            className="w-56 rounded-lg border border-line bg-card px-3 py-1.5 text-[13px] font-normal text-ink outline-none focus:border-coral dark:border-[#362b47] dark:bg-[#201a2b] dark:text-plum-soft"
          />
        </label>
        <label className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft dark:text-plum-soft">
          Cohort
          <input
            value={profile.cohort ?? ''}
            onChange={(e) => setProfile({ ...profile, cohort: e.target.value })}
            placeholder="e.g. CoE-2026-Q3"
            className="w-40 rounded-lg border border-line bg-card px-3 py-1.5 text-[13px] font-normal text-ink outline-none focus:border-coral dark:border-[#362b47] dark:bg-[#201a2b] dark:text-plum-soft"
          />
        </label>
        <div className="ml-auto flex gap-2">
          <button onClick={downloadJSON} className="btn-ghost !py-1.5 !text-[12.5px]">
            Export progress (JSON)
          </button>
          <button onClick={onPrint} disabled={!issued && scorePct === 0} className="btn-primary !py-1.5 !text-[12.5px] disabled:opacity-50">
            {issued ? 'Print / Save PDF' : 'Print preview'}
          </button>
        </div>
      </div>

      {!issued && (
        <Callout tone="gold">
          <b>In progress — {ps.weeksPassed}/{WEEKS.length} weeks passed.</b> Finish every day and quiz (≥{Math.round(PASS_THRESHOLD * 100)}%
          accuracy) in the remaining weeks to unlock the full certificate. Everything below is a live preview.
        </Callout>
      )}

      {/* The certificate */}
      <div
        className="print-keep relative overflow-hidden rounded-2xl border-2 border-coral p-8 text-center text-[#f3ecf6] shadow-l sm:p-12"
        style={{ background: 'linear-gradient(140deg,#28133f,#3a1f5c 55%,#5a2a63)' }}
      >
        <div className="pointer-events-none absolute inset-3 rounded-xl border border-plum-line" />
        {!issued && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="rotate-[-18deg] text-[64px] font-bold uppercase tracking-widest text-white/5">Preview</span>
          </div>
        )}
        <div className="relative z-10">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-coral-bright to-coral">
            <IconSpark className="h-6 w-6 text-white" />
          </div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-coral-bright">Certificate of completion</div>
          <h2 className="serif mt-2 text-[26px] font-semibold text-white sm:text-[32px]">Claude Forward Deployed Engineer</h2>
          <p className="mt-4 text-[13.5px] text-[#e0d3e8]">This certifies that</p>
          <div className="serif mx-auto mt-1 max-w-md border-b border-plum-line pb-1 text-[26px] font-semibold text-white">
            {profile.name || '________________________'}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-[13.5px] leading-relaxed text-[#e0d3e8]">
            completed the {WEEKS.length}-week Wipro × Anthropic Claude Academy (Data & AI track) — mastering the full-stack Claude reference
            architecture (Experience; Agents & Orchestration; the model family; the Context Engine; the Developer
            Platform; Enterprise Data & Systems) wrapped in always-on Trust, Security & Governance — and, in a
            simulated embed, discovered, business-cased, built, evaluated, governed, and shipped a live Claude agent
            with a published reference and a proven cost-per-outcome value case.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            <div>
              <div className="serif text-[22px] font-semibold text-white">{ps.weeksPassed}/{WEEKS.length}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-plum-soft">Weeks passed</div>
            </div>
            <div>
              <div className="serif text-[22px] font-semibold text-white">{scorePct}%</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-plum-soft">Quiz accuracy</div>
            </div>
            <div>
              <div className="serif text-[22px] font-semibold text-white">{ps.daysDone}/{ps.daysTotal}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-plum-soft">Daily labs</div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-8">
            <div className="min-w-[150px] border-t border-plum-line pt-2 text-[10px] uppercase tracking-[0.1em] text-plum-soft">
              {profile.cohort || 'Cohort'}
            </div>
            <div className="min-w-[150px] border-t border-plum-line pt-2 text-[10px] uppercase tracking-[0.1em] text-plum-soft">
              Pod lead signature
            </div>
            <div className="min-w-[150px] border-t border-plum-line pt-2 text-[10px] uppercase tracking-[0.1em] text-plum-soft">
              {issued ? dateStr : 'Date completed'}
            </div>
          </div>
        </div>
      </div>

      {/* Belts earned */}
      <div className="surface p-5">
        <div className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-coral-deep">
          <IconShield className="h-4 w-4" /> Belts earned
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {BELT_LADDER.map((b) => {
            const earned = beltEarned(b, ps.passedWeekIds)
            return (
              <div key={b.name} className={`rounded-xl border p-3 ${earned ? 'border-grass bg-grass-bg dark:bg-[#1c241a]' : 'border-line opacity-60 dark:border-[#362b47]'}`}>
                <div className="h-1.5 rounded" style={{ background: b.grad }} />
                <div className="mt-2 flex items-center justify-between">
                  <b className="text-[12.5px] text-ink dark:text-plum-soft">{b.short}</b>
                  {earned ? <IconCheck className="h-4 w-4 text-grass" /> : <span className="text-[10px] text-muted">W{b.weeks.join('·')}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="no-print flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProgressRing value={ps.weeksPassed} total={WEEKS.length} size={40} />
          <span className="text-[13px] text-muted">
            {issued ? 'All weeks passed — certificate unlocked 🎉' : `Keep going — ${WEEKS.length - ps.weeksPassed} weeks to go`}
          </span>
        </div>
        <Link to="/belts" className="btn-ghost">View belt ladder</Link>
      </div>
    </div>
  )
}
