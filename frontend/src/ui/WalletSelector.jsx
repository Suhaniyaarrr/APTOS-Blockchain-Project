import { useWallet } from '@aptos-labs/wallet-adapter-react'

export function WalletSelector() {
  const { connect, wallets, account, disconnect } = useWallet()

  if (account) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm opacity-80">{short(account.address)}</span>
        <button className="btn-primary bg-forest" onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {wallets.map(w => (
        <button key={w.name} className="btn-primary" onClick={() => connect(w.name)}>
          Connect {w.name}
        </button>
      ))}
    </div>
  )
}

function short(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''
}


