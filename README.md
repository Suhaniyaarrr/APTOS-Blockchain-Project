# Automated Savings on Aptos

A full-stack, production-ready web application for an automated savings account platform on the Aptos blockchain.

## Packages

- `contracts/`: Move smart contracts
- `backend/`: Node.js/Express API gateway with Aptos SDK integration
- `frontend/`: React + Vite + TailwindCSS web app
- `docs/`: Deployment guides and architecture notes

## Quick start

1) Contracts

```bash
cd "contracts"
aptos init --profile devnet
aptos move compile
```

2) Backend

```bash
cd "backend"
cp .env.example .env
npm install
npm run dev
```

3) Frontend

```bash
cd "frontend"
npm install
npm run dev
```

Open the app at http://localhost:5173

See `docs/DEPLOYMENT.md` for testnet/mainnet deployment.


