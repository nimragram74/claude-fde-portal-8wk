import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useTheme } from '../hooks/useTheme'
import { WEEKS } from '../data/weeks'
import { IconMenu, IconSun, IconMoon, IconChevron } from './icons'

export function Layout() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Close mobile drawer + scroll to top on route change.
  useEffect(() => {
    setOpen(false)
    document.getElementById('scroll-main')?.scrollTo({ top: 0 })
  }, [pathname])

  // Prev/next week quick jump
  const weekMatch = pathname.match(/\/week\/(\d+)/)
  const curWeek = weekMatch ? Number(weekMatch[1]) : null

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-[268px] shrink-0 border-r border-line bg-[#fbf9f4]/80 backdrop-blur lg:block dark:border-[#2c2338] dark:bg-[#1b1622]/80">
        <Sidebar />
      </aside>

      {/* Drawer (mobile) */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[280px] border-r border-line bg-paper shadow-l dark:border-[#2c2338] dark:bg-[#1b1622]">
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print flex h-14 shrink-0 items-center gap-3 border-b border-line bg-paper/80 px-4 backdrop-blur dark:border-[#2c2338] dark:bg-[#1b1622]/80">
          <button onClick={() => setOpen(true)} className="btn-ghost !px-2 lg:hidden" aria-label="Menu">
            <IconMenu className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-2 text-[13px] text-muted sm:flex">
            <span className="font-semibold text-ink-soft dark:text-plum-soft">{WEEKS.length}-week intensive · Data &amp; AI track</span>
            <span>· daily labs · belt-ladder certified</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {curWeek !== null && (
              <div className="flex items-center gap-1">
                <button
                  disabled={curWeek <= 1}
                  onClick={() => navigate(`/week/${curWeek - 1}`)}
                  className="btn-ghost !px-2 disabled:opacity-40"
                  aria-label="Previous week"
                >
                  <IconChevron className="h-4 w-4 rotate-180" />
                </button>
                <span className="mono text-[12px] text-muted">Wk {curWeek}/{WEEKS.length}</span>
                <button
                  disabled={curWeek >= WEEKS.length}
                  onClick={() => navigate(`/week/${curWeek + 1}`)}
                  className="btn-ghost !px-2 disabled:opacity-40"
                  aria-label="Next week"
                >
                  <IconChevron className="h-4 w-4" />
                </button>
              </div>
            )}
            <button onClick={toggle} className="btn-ghost !px-2" aria-label="Toggle theme">
              {theme === 'dark' ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <main id="scroll-main" className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
