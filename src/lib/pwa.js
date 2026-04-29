// Service worker registration + install prompt plumbing.
// Anything PWA-platform-specific lives here so pages stay simple.

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  // sw.js sits in /public so it ships at the app's base path.
  const swUrl = `${import.meta.env.BASE_URL}sw.js`
  navigator.serviceWorker.register(swUrl).catch((err) => {
    console.warn('Service worker registration failed:', err)
  })
}

// Browsers fire `beforeinstallprompt` when the app is installable.
// We stash the event so a button elsewhere in the UI can trigger it later.
let deferredPrompt = null
const listeners = new Set()

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  listeners.forEach((fn) => fn(true))
})

window.addEventListener('appinstalled', () => {
  deferredPrompt = null
  listeners.forEach((fn) => fn(false))
})

export function onInstallAvailable(cb) {
  listeners.add(cb)
  cb(!!deferredPrompt)
  return () => listeners.delete(cb)
}

export async function promptInstall() {
  if (!deferredPrompt) return 'unavailable'
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  deferredPrompt = null
  listeners.forEach((fn) => fn(false))
  return outcome // 'accepted' or 'dismissed'
}

export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

export function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
}
