import { Link } from 'react-router-dom'

const TILES = [
  {
    to: '/counter',
    title: 'Counter',
    blurb: 'State persists across launches via localStorage.',
    tag: 'Demo · Persistence',
  },
  {
    to: '/notes',
    title: 'Notes',
    blurb: 'Add, view, and clear ephemeral notes. Reset anytime.',
    tag: 'Demo · CRUD',
  },
  {
    to: '/status',
    title: 'Status',
    blurb: 'Diagnostics: install state, viewport, network, SW.',
    tag: 'Tooling',
  },
]

export default function Home() {
  return (
    <div className="px-5 pt-8 pb-6 space-y-10">
      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-3">
          Prototype shell
        </p>
        <h1 className="font-display text-[42px] leading-[1.05] text-bone">
          A frame for{' '}
          <span className="italic text-sulfur">testing visions</span> on real
          devices.
        </h1>
        <p className="mt-4 text-[13px] text-bone/70 max-w-md leading-relaxed">
          Drop new prototype directions in as routes. Share a single URL with
          stakeholders and testers. Install to home screen for a full‑screen,
          app‑like feel — no app store required.
        </p>
      </section>

      <section className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500">
          Sample directions
        </p>
        <div className="grid gap-3">
          {TILES.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className="group border hairline bg-ink-900/40 hover:bg-ink-900 transition-colors p-5 block"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-display text-[22px] text-bone group-hover:text-sulfur transition-colors">
                  {t.title}
                </h2>
                <span className="font-mono text-[10px] text-ink-500">
                  0{i + 1}
                </span>
              </div>
              <p className="text-[12px] text-bone/60 leading-relaxed">
                {t.blurb}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-ink-500">
                {t.tag}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t hairline pt-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">
          How to extend
        </p>
        <ol className="text-[12px] text-bone/70 leading-relaxed space-y-1.5 list-decimal list-inside">
          <li>Create a new file in <code className="text-sulfur">src/pages/</code></li>
          <li>Register the route in <code className="text-sulfur">App.jsx</code></li>
          <li>Push to main — the workflow auto‑deploys to Pages</li>
        </ol>
      </section>
    </div>
  )
}
