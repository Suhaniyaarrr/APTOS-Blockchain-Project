import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { Aptos, AptosConfig, Network } from 'aptos'

dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(',') || '*' }))

const network = (process.env.APTOS_NETWORK || 'testnet')
const config = new AptosConfig({ network: network })
const client = new Aptos(config)

const moduleAddress = process.env.APTOS_MODULE_ADDRESS
const defaultTestAddress = process.env.DEFAULT_TEST_ADDRESS || '0x79df6a1cea4b8e55d26a9bb406a6a16c433c20c520777521200a4ac4f7519d9d'

app.get('/health', (_, res) => {
  res.json({ ok: true })
})

app.get('/api/account', async (_req, res) => {
  try {
    const resourceType = `${moduleAddress}::automated_savings::SavingsAccount`
    const resource = await client.getAccountResource({ accountAddress: defaultTestAddress, resourceType })
    res.json(resource)
  } catch (e) {
    res.status(404).json({ error: 'Account not found', address: defaultTestAddress })
  }
})

app.get('/api/account/:address', async (req, res) => {
  try {
    const addr = req.params.address
    const resourceType = `${moduleAddress}::automated_savings::SavingsAccount`
    const resource = await client.getAccountResource({ accountAddress: addr, resourceType })
    res.json(resource)
  } catch (e) {
    res.status(404).json({ error: 'Account not found' })
  }
})

app.get('/api/events/yield/:address', async (req, res) => {
  // Placeholder for event fetching logic (would require event handles in contract)
  res.json([])
})

app.post('/api/admin/credit_yield', async (req, res) => {
  try {
    const { address, amount } = req.body || {}
    if (!process.env.ADMIN_PRIVATE_KEY_HEX) return res.status(403).json({ error: 'Admin key not set' })
    if (!address || !amount) return res.status(400).json({ error: 'address and amount required' })
    // This is a placeholder. Real implementation should sign a transaction calling credit_yield_units
    // using the admin key with aptos SDK's account signer, but is omitted for safety in template.
    return res.json({ ok: true, simulated: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to credit yield' })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API listening on :${port}`)
})


