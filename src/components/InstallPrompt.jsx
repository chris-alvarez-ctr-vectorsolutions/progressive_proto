import { useEffect, useState } from 'react'
import { isIOS, isStandalone, onInstallAvailable, promptInstall } from '../lib/pwa.js'

const DISMISS_KEY = 'proto.installDismissedAt'

export default function InstallPrompt() {
  const [available, setAvailable] = useState(false)
  const [dismissed, setDismissed] = useState(
    () => !!localStorage.getItem(DISMISS_KEY)
  )

  useEffect(() => onInstallAvailable(setAvailable), [])

  if (isStandalone() || dismissed) return null

  // iOS doesn't fire beforeinstallprompt — show a hint instead.
  if (isIOS()) {
    return (
      <Banner
        text="Add to Home Screen via Share → Add to Home Screen for full-screen mode."
        onDismiss={() => {
          localStorage.setItem(DISMISS_KEY, String(Date.now()))
          setDismissed(true)
        }}
      />
    )
  }

  if (!available) return null

  return (
    <Banner
      text="Install this prototype as an app for the full standalone experience."
      action="Install"
      onAction={async () => {
        await promptInstall()
      }}
      onDismiss={() => {
        localStorage.setItem(DISMISS_KEY, String(Date.now()))
        setDismissed(true)
      }}
    />
  )
}

function Banner({ text, action, onAction, onDismiss }) {
  return (
    <div className="fixed bottom-20 left-3 right-3 z-30 max-w-md mx-auto">
      <div className="border hairline bg-ink-900/95 backdrop-blur-md px-4 py-3 flex items-start gap-3">
        <p className="flex-1 text-[12px] text-bone leading-relaxed">{text}</p>
        <div className="flex items-center gap-2 shrink-0">
          {action && (
            <button
              onClick={onAction}
              className="bg-sulfur text-ink-950 px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium hover:opacity-90"
            >
              {action}
            </button>
          )}
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="text-ink-500 hover:text-bone text-lg leading-none px-1"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
