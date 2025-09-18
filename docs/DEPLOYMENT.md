# Deployment Guide

## Local Dev

- Run Move contract locally using `aptos move` and a local profile.
- Start backend: `npm run dev` in `backend/`.
- Start frontend: `npm run dev` in `frontend/`.

## Testnet

1. Configure Aptos profile:
```bash
cd contracts
aptos init --profile testnet
```
2. Publish module:
```bash
aptos move publish --profile testnet
```
3. Set module address in backend `.env` and frontend env:
```
APTOS_MODULE_ADDRESS=0xYOUR_MODULE
APTOS_NETWORK=testnet
```
4. Deploy backend (Render/Fly/Heroku) and set env vars.
5. Build and deploy frontend (Vercel/Netlify) with env vars.

## Mainnet

- Audit contracts, rotate keys, and configure production endpoints.
- Repeat the testnet steps with `--profile mainnet` and strong operational checks.


