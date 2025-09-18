import { useState } from 'react'

export default function Goals() {
  const [goal, setGoal] = useState('')
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])

  function addGoal() {
    if (!goal || !amount) return
    setList([...list, { goal, amount }])
    setGoal('')
    setAmount('')
  }

  return (
    <div className="card">
      <h3 className="text-md font-semibold mb-3">Savings Goals</h3>
      <div className="flex gap-2 mb-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Goal name" value={goal} onChange={e => setGoal(e.target.value)} />
        <input className="border rounded px-3 py-2 w-40" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <button className="btn-primary" onClick={addGoal}>Add</button>
      </div>
      <ul className="space-y-2">
        {list.map((g, i) => (
          <li key={i} className="p-2 rounded border border-gray-200 dark:border-gray-700 flex justify-between">
            <span>{g.goal}</span>
            <span className="font-semibold text-forest">{g.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


