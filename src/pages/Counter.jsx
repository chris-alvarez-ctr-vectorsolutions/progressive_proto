import { useEffect, useState } from 'react'

const KEY = 'proto.counter'

export default function Counter() {
  const [count, setCount] = useState(() => {
    const stored = localStorage.getItem(KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem(KEY, String(count))
  }, [count])

  return (
    <div className="px-5 pt-8 pb-6 space-y-8">
      <header>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">
          Demo · Persistence
        </p>
        <h1 className="font-display text-[36px] leading-[1.05] text-bone">
          A counter that <span className="italic text-sulfur">remembers</span>.
        </h1>
        <p className="mt-3 text-[12px] text-bone/60 leading-relaxed max-w-md">
          Increment, then close the app, kill the browser, restart your phone —
          the value persists. This is how you'd model logged‑in state, onboarding
          progress, or any "user data" in a static prototype.
        </p>
      </header>

      <div className="border hairline bg-ink-900/40 p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">
            Current value
          </span>
          <span className="font-mono text-[10px] text-ink-500">localStorage</span>
        </div>
        <p className="font-display text-[120px] leading-none text-bone tabular-nums">
          {count}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Btn onClick={() => setCount((c) => c - 1)}>−1</Btn>
        <Btn onClick={() => setCount(0)} variant="ghost">
          Reset
        </Btn>
        <Btn onClick={() => setCount((c) => c + 1)} variant="primary">
          +1
        </Btn>
      </div>

      <p className="text-[11px] text-ink-500 leading-relaxed">
        Stored under key <code className="text-bone/80">proto.counter</code>.
        Clear it from the Status page or via your browser's site data settings.
      </p>
    </div>
  )
}

function Btn({ children, onClick, variant = 'default' }) {
  const styles = {
    default: 'border hairline bg-ink-900 text-bone hover:bg-ink-800',
    primary: 'bg-sulfur text-ink-950 hover:opacity-90',
    ghost: 'border hairline text-bone/70 hover:text-bone hover:bg-ink-900',
  }
  return (
    <button
      onClick={onClick}
      className={`py-4 text-[13px] uppercase tracking-wider font-medium transition-all ${styles[variant]}`}
    >
      {children}
    </button>
  )
}
