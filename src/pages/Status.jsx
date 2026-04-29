import { useEffect, useState } from 'react'
import { isIOS, isStandalone, onInstallAvailable, promptInstall } from '../lib/pwa.js'

export default function Status() {
  const [installable, setInstallable] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  const [viewport, setViewport] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })
  const [swState, setSwState] = useState('checking')

  useEffect(() => onInstallAvailable(setInstallable), [])

  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      setSwState('unsupported')
      return
    }
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return setSwState('not registered')
      if (reg.active) return setSwState('active')
      if (reg.installing) return setSwState('installing')
      if (reg.waiting) return setSwState('waiting')
      setSwState('unknown')
    })
  }, [])

  const standalone = isStandalone()

  return (
    <div className="px-5 pt-8 pb-6 space-y-7">
      <header>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">
          Tooling
        </p>
        <h1 className="font-display text-[36px] leading-[1.05] text-bone">
          Diagnostics &amp; <span className="italic text-sulfur">resets</span>.
        </h1>
      </header>

      <section className="border hairline">
        <Row label="Display mode" value={standalone ? 'Standalone' : 'Browser'} />
        <Row label="Platform" value={isIOS() ? 'iOS' : 'Other'} />
        <Row
          label="Network"
          value={online ? 'Online' : 'Offline'}
          tone={online ? 'good' : 'warn'}
        />
        <Row label="Service worker" value={swState} />
        <Row label="Viewport" value={`${viewport.w} × ${viewport.h}`} />
        <Row
          label="Install prompt"
          value={installable ? 'Available' : standalone ? 'Already installed' : 'Not available'}
        />
      </section>

      <section className="space-y-2">
        {installable && (
          <button
            onClick={promptInstall}
            className="w-full bg-sulfur text-ink-950 py-3 text-[11px] uppercase tracking-wider font-medium hover:opacity-90"
          >
            Install this prototype
          </button>
        )}
        <button
          onClick={() => {
            if (confirm('Clear all local prototype data?')) {
              localStorage.clear()
              location.reload()
            }
          }}
          className="w-full border hairline text-bone/70 py-3 text-[11px] uppercase tracking-wider hover:text-bone hover:bg-ink-900"
        >
          Reset prototype data
        </button>
        <button
          onClick={async () => {
            const regs = await navigator.serviceWorker?.getRegistrations?.()
            await Promise.all((regs ?? []).map((r) => r.unregister()))
            const keys = await caches.keys()
            await Promise.all(keys.map((k) => caches.delete(k)))
            alert('Service worker + caches cleared. Reload to re‑register.')
          }}
          className="w-full border hairline text-bone/70 py-3 text-[11px] uppercase tracking-wider hover:text-bone hover:bg-ink-900"
        >
          Unregister service worker
        </button>
      </section>

      <p className="text-[11px] text-ink-500 leading-relaxed">
        These tools are for the developer / tester running the prototype. Strip
        this page in builds you ship to non‑technical users.
      </p>
    </div>
  )
}

function Row({ label, value, tone }) {
  const valueColor =
    tone === 'good' ? 'text-sulfur' : tone === 'warn' ? 'text-orange-300' : 'text-bone'
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b hairline last:border-b-0">
      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-500">
        {label}
      </span>
      <span className={`font-mono text-[12px] ${valueColor}`}>{value}</span>
    </div>
  )
}
