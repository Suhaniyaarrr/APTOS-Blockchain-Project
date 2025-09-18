import { useEffect, useMemo, useState } from 'react'
import { WalletProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet, MartianWallet } from '@aptos-labs/wallet-adapter-wallets'
import { WalletSelector } from '../ui/WalletSelector.jsx'
import Dashboard from '../sections/Dashboard.jsx'
import Goals from '../sections/Goals.jsx'
import Notifications from '../sections/Notifications.jsx'

export default function App() {
  const wallets = useMemo(() => [new PetraWallet(), new MartianWallet()], [])
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <WalletProvider wallets={wallets} autoConnect={true}>
      <div className={`min-h-screen ${dark ? 'dark bg-navy' : 'bg-greybg'}`}>
        <nav className="w-full bg-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl">Aptos Savings</div>
          <div className="flex items-center gap-3">
            <button className="btn-primary" onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'}</button>
            <WalletSelector />
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            <Dashboard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Goals />
              <Notifications />
            </div>
          </div>
        </main>
      </div>
    </WalletProvider>
  )
}


