import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-navy text-white flex flex-col">
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="font-bold text-2xl">Aptos Savings</div>
        <Link to="/app" className="btn-primary">Launch App</Link>
      </header>
      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Automated Savings, Trusted on Aptos</h1>
            <p className="text-lg opacity-90 mb-6">Grow your savings with transparent yields. Secure architecture, clear controls, and real-time insights.</p>
            <div className="flex gap-3">
              <Link to="/app" className="btn-primary">Get Started</Link>
              <a href="#learn" className="btn-primary bg-forest">Learn More</a>
            </div>
          </div>
          <div className="bg-greybg text-charcoal rounded-2xl p-6 shadow">
            <ul className="space-y-3">
              <li>• Secure Move contracts</li>
              <li>• Connect Petra or Martian</li>
              <li>• Real-time yield updates</li>
              <li>• Light/Dark mode</li>
              <li>• Responsive professional UI</li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="px-6 py-6 text-center opacity-80">© {new Date().getFullYear()} Aptos Savings</footer>
    </div>
  )
}


