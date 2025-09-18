import { useEffect, useState } from 'react'

export default function Notifications() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    // Placeholder: would subscribe to backend events
    const timer = setInterval(() => {
      setNotes(n => n.length > 3 ? n : [...n, { t: Date.now(), m: 'Yield credited (demo)' }])
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="card">
      <h3 className="text-md font-semibold mb-3">Notifications</h3>
      <ul className="space-y-2">
        {notes.map((n, i) => (
          <li key={i} className="text-sm text-charcoal/80 dark:text-gray-300">{new Date(n.t).toLocaleTimeString()}: {n.m}</li>
        ))}
      </ul>
    </div>
  )
}


