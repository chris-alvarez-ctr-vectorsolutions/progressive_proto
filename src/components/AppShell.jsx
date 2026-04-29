import { NavLink, useLocation } from 'react-router-dom'
import InstallPrompt from './InstallPrompt.jsx'

const NAV = [
  { to: '/', label: 'Home', glyph: '◆' },
  { to: '/counter', label: 'Counter', glyph: '◐' },
  { to: '/notes', label: 'Notes', glyph: '✎' },
  { to: '/status', label: 'Status', glyph: '◌' },
]

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const current = NAV.find((n) => n.to === pathname) ?? NAV[0]

  return (
    <div className="grain min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 border-b hairline">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
              Proto
            </span>
            <span className="font-mono text-[10px] text-ink-500">/</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone">
              {current.label}
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-500">v0.1</span>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <InstallPrompt />

      {/* Bottom nav — fixed for that "real app" feel */}
      <nav className="fixed bottom-0 inset-x-0 border-t hairline bg-ink-950/90 backdrop-blur-md">
        <div
          className="grid grid-cols-4 max-w-md mx-auto"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-3 transition-colors ${
                  isActive ? 'text-sulfur' : 'text-ink-500 hover:text-bone'
                }`
              }
            >
              <span className="text-base leading-none">{item.glyph}</span>
              <span className="text-[10px] uppercase tracking-[0.14em]">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
