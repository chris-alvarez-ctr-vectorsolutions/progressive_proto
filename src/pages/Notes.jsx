import { useEffect, useState } from 'react'

const KEY = 'proto.notes'

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) ?? []
    } catch {
      return []
    }
  })
  const [draft, setDraft] = useState('')

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(notes))
  }, [notes])

  function add() {
    const text = draft.trim()
    if (!text) return
    setNotes((n) => [{ id: Date.now(), text, at: new Date().toISOString() }, ...n])
    setDraft('')
  }

  function remove(id) {
    setNotes((n) => n.filter((note) => note.id !== id))
  }

  return (
    <div className="px-5 pt-8 pb-6 space-y-7">
      <header>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">
          Demo · CRUD
        </p>
        <h1 className="font-display text-[36px] leading-[1.05] text-bone">
          Things you <span className="italic text-sulfur">capture</span> here
          stay here.
        </h1>
        <p className="mt-3 text-[12px] text-bone/60 leading-relaxed max-w-md">
          A taste of how richer state behaves in a static prototype. Good enough
          for journaling, lists, sliders, scoring — most user‑testing scenarios.
        </p>
      </header>

      <div className="border hairline bg-ink-900/40 p-4 space-y-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) add()
          }}
          rows={3}
          placeholder="Type a note. ⌘/Ctrl + Enter to save."
          className="w-full bg-transparent text-bone text-[16px] placeholder:text-ink-500 resize-none focus:outline-none"
        />
        <div className="flex justify-between items-center pt-2 border-t hairline">
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">
            {notes.length} {notes.length === 1 ? 'entry' : 'entries'}
          </span>
          <button
            onClick={add}
            disabled={!draft.trim()}
            className="bg-sulfur text-ink-950 px-4 py-1.5 text-[11px] uppercase tracking-wider font-medium disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {notes.length === 0 && (
          <p className="text-[12px] text-ink-500 italic px-1">
            Nothing captured yet.
          </p>
        )}
        {notes.map((note) => (
          <article
            key={note.id}
            className="border hairline p-4 group hover:bg-ink-900/40 transition-colors"
          >
            <p className="text-[13px] text-bone leading-relaxed whitespace-pre-wrap">
              {note.text}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <time className="text-[10px] uppercase tracking-wider text-ink-500">
                {formatTime(note.at)}
              </time>
              <button
                onClick={() => remove(note.id)}
                className="text-[10px] uppercase tracking-wider text-ink-500 hover:text-sulfur opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
