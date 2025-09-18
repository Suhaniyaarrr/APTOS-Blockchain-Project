# Architecture

## Overview

- Frontend: React + Vite + TailwindCSS. Wallet connections (Petra, Martian). Charts via Recharts.
- Backend: Node.js/Express. Proxies Aptos SDK calls, abstracts module addresses, and emits notifications.
- Contracts: Move module `automated_savings` managing accounts, deposits, withdrawals, and yield crediting.

## Security

- Least-privilege admin for yield crediting.
- Parameter validation on all endpoints.
- CORS locked to frontend origin.
- Server-side rate limiting.

## Data Flow

1. User connects wallet in frontend.
2. Frontend requests deposit/withdraw; constructs tx via backend or directly with wallet adapter.
3. Aptos network executes Move functions.
4. Backend subscribes/polls for events and notifies frontend.


