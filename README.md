# Lineage 2 Private Server Website

Full-stack website for a Lineage 2 private server: Vue 3 frontend + Express API backed by your game MySQL database.

**Tutorial by [PlayerExplains](https://www.youtube.com/@playerexplains)**

This repository is the companion project for the PlayerExplains tutorial on building and deploying a Lineage 2 server website with AI-assisted development.

## Works With Any Server Pack

This example was built and tested against **L2J Mobius CT_0 Interlude**, but the architecture works with **any L2J-based pack** (aCis, L2OFF, custom forks, other chronicles, and so on).

The main difference between packs is usually the **database schema** — table names, column names, and how castles, Olympiad, or rankings are stored. All SQL lives in `backend/services/`. If you use a different pack, give your AI coding agent a **clear reference to your server pack** (documentation, SQL dumps, or the pack’s source) so it can adjust the queries accordingly. The frontend and API structure can stay the same.

## Features

- Live server stats (accounts, characters, online players, rates)
- Dedicated **Server Rates** page (`/rates`)
- PvP / PK rankings
- Castle ownership and siege schedule
- Olympiad heroes
- Mock/demo data when the database is unreachable (useful for local dev and tutorials)

## Project Structure

```
l2website/
├── backend/
│   ├── config/database.js       # MySQL connection pool
│   ├── data/mockData.js         # Fallback data when DB is offline
│   ├── routes/                  # Express route handlers
│   ├── services/                # SQL queries & business logic
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/client.js        # API fetch wrapper
│   │   ├── components/          # Vue UI components
│   │   ├── views/               # Home + Rates pages
│   │   ├── router/              # vue-router
│   │   └── config/              # Rates, site links
│   ├── public/                  # Static assets (icons, hero art)
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── render.yaml                  # Optional Render Blueprint
└── README.md
```

## Architecture

```
┌─────────────────┐     HTTP (CORS)      ┌─────────────────┐
│  Vue 3 Frontend │ ◄──────────────────► │  Express API    │
│  (Vite / static)│     /api/*           │  (Node.js)      │
└─────────────────┘                      └────────┬────────┘
                                                  │
                                                  │ mysql2/promise
                                                  ▼
                                         ┌─────────────────┐
                                         │  Game MySQL DB  │
                                         │  (L2J server)   │
                                         └─────────────────┘
```

- **Frontend** loads data from the API on mount. During local dev, Vite proxies `/api` to the backend.
- **Backend routes** are thin; **services** contain all SQL.
- **Services** test DB connectivity first. On failure they return mock data so the site still renders.
- **Credentials** stay in `backend/.env` only — never exposed to the browser.

## Database Tables (L2J Mobius CT_0 Interlude)

These are the tables used in the **default** SQL queries. Your pack may differ — update `backend/services/` if needed.

| Table | Key columns used |
|-------|------------------|
| `characters` | char_name, level, pvpkills, pkkills, online, accesslevel, deletetime |
| `castle` | id, name, taxPercent, siegeDate |
| `clan_data` | clan_name, hasCastle |
| `heroes` / Olympiad tables | hero nominations, class, clan |

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20 LTS recommended)
- MySQL database from your Lineage 2 game server (optional for demo mode)

### 1. Backend

```bash
cd backend
cp .env.example .env   # Windows: copy .env.example .env
# Edit .env with your MySQL credentials and server rates
npm install
npm run dev
```

Default API URL: **http://localhost:3001** (or the `PORT` in your `.env`)

### 2. Frontend (new terminal)

```bash
cd frontend
cp .env.example .env   # Windows: copy .env.example .env
npm install
npm run dev
```

Open **http://localhost:5173**

The Vite dev server proxies `/api` to the backend (see `frontend/vite.config.js`). For a custom API port, set `VITE_API_URL` in `frontend/.env`.

### 3. Health check

```text
GET http://localhost:3001/api/health
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Backend + database status |
| GET | `/api/stats` | Server stats, rates, next siege |
| GET | `/api/rankings/top-flag` | Top PvP players |
| GET | `/api/rankings/top-pk` | Top PK players |
| GET | `/api/castles` | Castles with owners |
| GET | `/api/olympiad/heroes` | Current Olympiad heroes |

## Customization

- Server name, Discord, and download links: `frontend/src/config/site.js` and `.env`
- Server rates: `backend/.env` (`XP_RATE`, `SP_RATE`, `DUALBOX`, etc.)
- Rates page layout: `frontend/src/config/rates.js`
- Hero image and branding: `frontend/public/` and Vue components
- SQL for your pack: `backend/services/*.js` (use your AI agent with pack docs as reference)

## Deploy on Render.com

Render hosts the **frontend** and **backend** as two separate services. Your **game MySQL database** stays on your game server (or another host) — Render does not replace it. The API must be able to reach MySQL over the network (public IP, allowed firewall rules, or a tunnel).

### Overview

| Service | Type | Root directory | Purpose |
|---------|------|----------------|---------|
| `l2website-api` | Web Service (Node) | `backend` | Express API |
| `l2website` | Static Site | `frontend` | Built Vue app |

### Option A — Deploy with Blueprint (recommended)

1. Push this repo to GitHub.
2. In [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
3. Connect the repository. Render reads `render.yaml` at the repo root.
4. Set environment variables when prompted (see below).
5. Deploy both services.

### Option B — Manual setup

#### Backend (Web Service)

1. **New** → **Web Service** → connect your GitHub repo.
2. Settings:
   - **Name:** `l2website-api` (or your choice)
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. **Environment variables:**

   | Key | Example | Notes |
   |-----|---------|-------|
   | `PORT` | `10000` | Render sets this automatically; optional locally |
   | `DB_HOST` | `your-game-server-ip` | MySQL host reachable from Render |
   | `DB_PORT` | `3306` | |
   | `DB_USER` | `l2user` | |
   | `DB_PASSWORD` | `***` | |
   | `DB_NAME` | `l2j_interlude` | |
   | `CORS_ORIGIN` | `https://l2website.onrender.com` | Your **frontend** Render URL (no trailing slash) |
   | `XP_RATE`, `SP_RATE`, … | | See `backend/.env.example` |

4. Deploy and copy the service URL (e.g. `https://l2website-api.onrender.com`).

#### Frontend (Static Site)

1. **New** → **Static Site** → same GitHub repo.
2. Settings:
   - **Name:** `l2website`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. **Environment variables** (required at **build** time for Vite):

   | Key | Example |
   |-----|---------|
   | `VITE_API_URL` | `https://l2website-api.onrender.com` |
   | `VITE_DISCORD_URL` | `https://discord.gg/your-invite` |
   | `VITE_DOWNLOAD_URL` | `https://your-download-link` |

4. Deploy. Open the static site URL in your browser.

5. Go back to the **backend** service and set `CORS_ORIGIN` to your static site URL if you have not already. Redeploy the API if you change CORS.

### Database connectivity notes

- If MySQL runs on your **home PC or private VPS**, Render’s servers must be allowed through your firewall. Many tutorials use a **VPS** for the game server and open MySQL only to Render’s outbound IPs, or run the API on the same VPS as the game server instead of Render.
- If the DB is unreachable, the site still works with **mock data** (same as local demo mode).
- Never commit `backend/.env` or real passwords to GitHub.

### After deployment

- API health: `https://your-api.onrender.com/api/health`
- Website: `https://your-site.onrender.com`
- Rates page: `https://your-site.onrender.com/rates`

Free Render web services **spin down after inactivity**; the first request may take 30–60 seconds to wake up.

## Production Build (self-hosted)

If you host on your own VPS instead of Render:

```bash
cd frontend
npm install
npm run build
# Serve frontend/dist/ with nginx, Caddy, or similar
```

```bash
cd backend
npm install
npm start
```

Point `VITE_API_URL` at your API when building the frontend, and set `CORS_ORIGIN` to your public site URL.

## License

Use and modify freely for your private server project. Not affiliated with NCsoft.
