# progressive_proto

A PWA scaffold for testing product-vision prototypes on real devices. Share a single URL with stakeholders and testers; install to home screen for full‑screen, app‑like behavior.

**Stack:** Vite · React · Tailwind · React Router (Hash) · Service Worker · GitHub Pages

---

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173/progressive_proto/.

## See it on your phone (during development)

1. Make sure your phone is on the same Wi‑Fi network as your laptop.
2. Run `npm run dev -- --host`.
3. Vite prints a "Network" URL like `http://192.168.x.x:5173/progressive_proto/`.
4. Open that URL on your phone's browser.

> Note: service workers and PWA install prompts only work over HTTPS or `localhost`. On a phone over LAN they'll be limited. To test the full PWA experience on mobile, deploy to GitHub Pages first (below) — that's served over HTTPS.

---

## Deploy to GitHub Pages

The first push to `main` runs the workflow in `.github/workflows/deploy.yml`. Before it succeeds you need to enable Pages once:

1. Push your code to `main` (see "First push" below).
2. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Re‑run the failed action (or push another commit). Subsequent pushes deploy automatically.

The site will be live at:

**https://chris-alvarez-ctr-vectorsolutions.github.io/progressive_proto/**

### First push (from this scaffold)

After unzipping into your repo:

```bash
git add .
git commit -m "scaffold pwa"
git push
```

---

## Test on your phone (the real thing)

Once deployed:

1. Open the GitHub Pages URL on your phone's browser.
2. **iOS (Safari):** tap **Share** → **Add to Home Screen**.
3. **Android (Chrome):** an "Install" prompt appears — or tap **⋮** → **Install app**.
4. Launch from the home‑screen icon. It opens full‑screen, no browser chrome — testers can't tell it's not a "real" app.

The Status page (bottom nav → ◌) shows whether you're running standalone, online/offline, service‑worker state, etc.

---

## Adding a new prototype direction

1. Create `src/pages/MyPrototype.jsx`.
2. Register it in `src/App.jsx`:
   ```jsx
   <Route path="/myprototype" element={<MyPrototype />} />
   ```
3. Optionally add it to the `NAV` array in `src/components/AppShell.jsx`, or link to it from `Home.jsx`.
4. Push to `main`. It's live within ~60 seconds.

## Persisting state

For prototype state (fake users, "saved" data, onboarding progress), use `localStorage`:

```js
const [value, setValue] = useState(
  () => JSON.parse(localStorage.getItem('myKey')) ?? defaultValue
)
useEffect(() => localStorage.setItem('myKey', JSON.stringify(value)), [value])
```

See `src/pages/Counter.jsx` and `src/pages/Notes.jsx` for working examples. The Status page has a "Reset prototype data" button to wipe everything.

## Updating the service worker

Bump `CACHE_VERSION` in `public/sw.js` whenever you ship breaking changes. Old caches are cleared on activation, so testers get the new code on their next launch.

---

## Notes

- Routing uses `HashRouter` (`/#/notes`) so deep links work on GitHub Pages without server config. The hash is invisible once installed.
- The `base` in `vite.config.js` is set to `/progressive_proto/`. If you rename the repo, update it there.
- Icons are auto‑generated; replace `public/icon-*.png` and `public/apple-touch-icon.png` with your own brand once you have one.
