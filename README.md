# Uptimer

A full-stack, self-hosted alternative to services like UptimeRobot or Better Uptime. It periodically pings your infrastructure, records the results as a time series of "heartbeats," and notifies you by email when something goes down or a certificate is about to expire.

## What it does

- **Multi-protocol monitoring** — add a monitor for an **HTTP(S)** endpoint, a raw **TCP** port, a **MongoDB** connection, or a **Redis** connection. Each monitor runs on its own configurable interval via a cron-based scheduler and records uptime/downtime, response time, and status codes as heartbeats.
- **SSL certificate monitoring** — point it at a domain and it checks certificate validity and days-until-expiry on a schedule, so you find out before a cert lapses rather than after.
- **Dashboards** — the frontend graphs response times and uptime history per monitor (via Chart.js), with a health bar showing recent up/down state at a glance.
- **Public status page** — a shareable `/status` page listing monitors and their current health, for surfacing uptime to end users without exposing the admin dashboard.
- **Email notifications** — notification groups define who gets emailed (and with what templates) when a monitor's status changes or an SSL cert is close to expiring.
- **Auth** — cookie/JWT-based session auth gates the dashboard (login / create-account), while the status page stays public.
- **Live updates** — a GraphQL subscription (over WebSockets) pushes heartbeat updates to the dashboard in real time instead of requiring polling.

## Tech Stack

**Backend** — Node.js, Express, Apollo Server (GraphQL + subscriptions), Sequelize/Postgres, MongoDB, Redis, TypeScript

**Frontend** — Next.js, React, Apollo Client, Tailwind CSS, Chart.js, TypeScript

## Project Structure

```
uptimer/
├── backend/     # GraphQL API, monitors, and background jobs
└── frontend/    # Next.js client
```

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env   # fill in the required values
npm install
npm run dev             # starts the API in watch mode
```

Environment variables (`backend/.env`):

| Variable | Description |
| --- | --- |
| `POSTGRES_DB` | Postgres connection string |
| `NODE_ENV` | `development` / `production` |
| `SECRET_KEY_ONE` / `SECRET_KEY_TWO` | Cookie session secrets |
| `JWT_TOKEN` | JWT signing secret |
| `SENDER_EMAIL` / `SENDER_EMAIL_PASSWORD` | Credentials for outgoing status/alert emails |
| `CLIENT_URL` | URL of the frontend, for CORS |
| `PORT` | Port the API listens on |

You'll also need Postgres, MongoDB, and Redis instances running and reachable.

### Frontend

```bash
cd frontend
npm install
npm run dev   # runs on http://localhost:3001
```

## Reference

Built while following [GraphQL with Next.js: Build a Fullstack App From Scratch](https://www.udemy.com/course/graphql-with-nextjs-build-a-fullstack-app-from-scratch/).
