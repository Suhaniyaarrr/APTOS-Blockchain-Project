import { useEffect, useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { buildEntryPayload } from '../lib/aptos'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Dashboard() {
  const { account, signAndSubmitTransaction } = useWallet()
  const address = account?.address || ''
  const [balance, setBalance] = useState(0)
  const [yieldEarned, setYieldEarned] = useState(0)
  const [history, setHistory] = useState([])
  const [missingAccount, setMissingAccount] = useState(false)

  useEffect(() => {
    if (address) fetchAccount(address)
  }, [address])

  async function fetchAccount(addr) {
    try {
      const res = await axios.get(`${API_BASE}/api/account/${addr}`)
      const resource = res.data
      const data = resource?.data || {}
      setBalance(data.balance_units ?? 0)
      setYieldEarned(data.yield_accrued_units ?? 0)
      setHistory(makeSampleHistory(data.balance_units ?? 0))
      setMissingAccount(false)
    } catch (e) {
      // If account missing, show zeroed history; could auto create via on-chain entry
      setBalance(0)
      setYieldEarned(0)
      setHistory(makeSampleHistory(0))
      setMissingAccount(true)
    }
  }

  async function handleDeposit() {
    try {
      const payload = buildEntryPayload('deposit_units', ["10"]) // 10 units demo
      await signAndSubmitTransaction(payload)
      setTimeout(() => address && fetchAccount(address), 1500)
    } catch (e) {
      console.error(e)
      alert('Deposit failed')
    }
  }

  async function handleWithdraw() {
    try {
      const payload = buildEntryPayload('withdraw_units', ["5"]) // 5 units demo
      await signAndSubmitTransaction(payload)
      setTimeout(() => address && fetchAccount(address), 1500)
    } catch (e) {
      console.error(e)
      alert('Withdraw failed')
    }
  }

  async function handleCreateAccount() {
    try {
      const payload = buildEntryPayload('create_account', [])
      await signAndSubmitTransaction(payload)
      setTimeout(() => address && fetchAccount(address), 1500)
    } catch (e) {
      console.error(e)
      alert('Create account failed')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-charcoal dark:text-white">Savings Growth</h2>
          <div className="flex gap-2">
            {missingAccount ? (
              <button className="btn-primary" disabled={!address} onClick={handleCreateAccount}>Create Account</button>
            ) : (
              <>
                <button className="btn-primary" disabled={!address} onClick={handleDeposit}>Save Now</button>
                <button className="btn-primary bg-forest" disabled={!address} onClick={handleWithdraw}>Withdraw</button>
              </>
            )}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis dataKey="t" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="v" stroke="#2E8B57" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div className="space-y-3">
          <Metric label="Total Saved" value={balance} color="forest" />
          <Metric label="Yield Earned" value={yieldEarned} color="coral" />
          <div className="text-sm text-charcoal/80 dark:text-gray-300">Wallet: {address || '—'}</div>
        </div>
      </div>
      <div className="card md:col-span-3">
        <h3 className="text-md font-semibold mb-3">Transaction History</h3>
        <div className="text-sm text-charcoal/80 dark:text-gray-300">Coming soon</div>
      </div>
    </div>
  )
}

function Metric({ label, value, color }) {
  return (
    <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-sm mb-1">{label}</div>
      <div className={`text-2xl font-bold text-${color}`}>{value}</div>
    </div>
  )
}

function makeSampleHistory(latest) {
  const base = Math.max(0, latest - 100)
  return Array.from({ length: 20 }).map((_, i) => ({ t: i, v: base + i * 5 }))
}


