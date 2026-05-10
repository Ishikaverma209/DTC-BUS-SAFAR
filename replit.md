# DTC Bus Seva

A seat booking platform for Delhi Transport Corporation (DTC) buses, helping villagers and rural commuters book seats on upcoming buses from their village to the city.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, path /api)
- `pnpm --filter @workspace/dtc-bus run dev` — run the frontend (port 19842, path /)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — express-session secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Wouter routing, TanStack Query, Sonner toasts
- API: Express 5 + express-session (session-based auth)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all contracts)
- `lib/db/src/schema/users.ts` — Users table schema
- `lib/db/src/schema/bookings.ts` — Bookings table schema
- `artifacts/api-server/src/routes/auth.ts` — Auth routes (register, login, logout, me)
- `artifacts/api-server/src/routes/buses.ts` — Bus search + popular routes (DTC data)
- `artifacts/api-server/src/routes/bookings.ts` — Booking CRUD
- `artifacts/api-server/src/routes/dashboard.ts` — Dashboard summary
- `artifacts/dtc-bus/src/` — React frontend

## Architecture decisions

- Session-based auth using express-session (no JWT). Sessions stored in memory (upgrade to connect-pg-simple for production persistence).
- Password hashed with SHA-256 + fixed salt (simple, no bcrypt dependency). Upgrade to bcrypt for production.
- DTC bus route data is static in-memory (buses.ts). Real DTC open data API can be swapped in when available.
- `/auth/login` returns `alreadyLoggedIn: true` if user is already authenticated, so the frontend can show the right toast.
- Bus stops display village and district names prominently for rural users.

## Product

- Home page with bus number search and popular DTC routes
- Bus search results showing all stops, villages, estimated arrival times, available seats, and next departures
- Seat booking form with passenger details
- My Bookings page with cancellation
- User Dashboard with stats and recent activity
- User auth: register, login (with "Login Successful!" toast), logout (with "Logout Successful!" toast), already-logged-in detection

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`
- Always run `pnpm --filter @workspace/db run push` after changing DB schema files
- Session secret is in `SESSION_SECRET` env var (already set in secrets)
- DTC bus numbers to test: 401, 534, 764, 380, 615, DL1PC

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
