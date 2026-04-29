import { HashRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import Home from './pages/Home.jsx'
import Counter from './pages/Counter.jsx'
import Notes from './pages/Notes.jsx'
import Status from './pages/Status.jsx'

// HashRouter avoids GitHub Pages 404s on deep links — paths look like
// `/#/notes` instead of `/notes`. Invisible once installed as a PWA.
export default function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </AppShell>
    </HashRouter>
  )
}
