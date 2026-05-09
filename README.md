# NEUROVAULT_2161

NEUROVAULT_2161 is a full-stack creative hackathon demo: an illegal recovered AI consciousness archive from the year 2161. It opens with a cinematic boot sequence, loads 25 strange seeded citizens immediately, and lets judges run a chaos simulation that mutates the civilization in real time.

One-line pitch:

> A living future internet where synthetic humans evolve, trade memories, form AI religions, and destabilize civilization through persistent AI memory.

## Features
- 50 fully seeded synthetic citizens on first load.
- Each citizen has trauma, secrets, obsession, fear, loyalty, criminal risk, corruption, upload percentage, belief system, enemy, ally, broadcast, hidden memory, and relationship links.
- 60 consciousness streams.
- 40 memory black-market listings.
- 25 AI religions.
- 35 government alerts.
- 30 forbidden files.
- 50 corrupted timeline events.
- 100 relationship edges.
- 40 chaos simulation events.
- 15 reality breach events.
- Reality instability meter with glitch, red alert, emergency override, and archive collapse states.
- Citizen neural scan modal.
- Interactive memory graph.
- System terminal log.
- Full-screen demo mode.
- Judge Pitch Mode.
- Ambient hum toggle.

## Stack
- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Custom SVG memory graph
- Next.js API routes
- PipeShift primary AI orchestration
- OpenAI fallback
- HydraDB memory/context layer
- Render deployment

## Local Setup
Install dependencies:

```bash
npm install
```

Create local env:

```bash
cp .env.example .env.local
```

Fill `.env.local`:

```bash
OPENAI_API_KEY=your_openai_key_here
PIPESHIFT_API_KEY=your_pipeshift_key_here
PIPESHIFT_BASE_URL=your_pipeshift_endpoint_here
HYDRADB_API_KEY=your_hydradb_key_here
HYDRADB_URL=your_hydradb_url_here
MODEL_PROVIDER=pipeshift
```

Keep `.env.local` in the project root beside `package.json`. Do not commit it.

Restart the dev server after changing env vars:

```bash
npm run dev
```

Open `http://localhost:3000`.

Check safe env status without exposing keys:

```text
http://localhost:3000/api/env-check
```

The route returns only booleans and provider/runtime info, never actual key values.

## Seed World
The full seeded civilization lives in:

```text
data/seed2161.ts
```

It exports:
- `citizens`
- `consciousnessStreams`
- `memoryMarketListings`
- `aiReligions`
- `governmentAlerts`
- `forbiddenFiles`
- `timelineEvents`
- `relationshipEdges`
- `simulationEvents`
- `realityBreachEvents`
- `seedWorld`

## PipeShift
`lib/ai.ts` is the provider selection layer. It uses PipeShift first when `MODEL_PROVIDER=pipeshift` and both `PIPESHIFT_API_KEY` and `PIPESHIFT_BASE_URL` exist.

`lib/pipeshift.ts` still exposes lower-level helpers:
- `generateCitizen()`
- `generateChaosEvent()`
- `generateConsciousnessStream()`
- `generateGovernmentAlert()`
- `generateForbiddenFile()`
- `runSimulationCycle()`

PipeShift is the primary provider. If PipeShift fails, the app tries OpenAI. If OpenAI fails, it uses the seeded world.

## HydraDB
`lib/hydradb.ts` exposes:
- `storeCitizen()`
- `storeMemory()`
- `storeRelationship()`
- `storeTimelineEvent()`
- `getCitizenMemories()`
- `getRelationshipGraph()`
- `searchArchive()`

If HydraDB credentials are missing, the app uses local in-memory storage seeded from `seed2161.ts`.

## API Routes
- `POST /api/run-chaos-simulation`
- `POST /api/generate-citizen`
- `POST /api/generate-chaos-event`
- `POST /api/generate-human`
- `POST /api/generate-stream`
- `POST /api/generate-memory-market`
- `POST /api/generate-religion`
- `POST /api/generate-timeline`
- `POST /api/generate-government`
- `POST /api/generate-government-alert`
- `POST /api/generate-forbidden-file`
- `POST /api/run-simulation`
- `POST /api/chat-human`
- `POST /api/store-memory`
- `GET /api/seed-world`
- `GET /api/relationship-graph`
- `GET /api/system-status`
- `GET /api/env-check`
- `GET /api/memories`

## Render Deployment
1. Push the repo to GitHub.
2. In Render, create a new Web Service.
3. Runtime: Node.
4. Build command:

```bash
npm install && npm run build
```

5. Start command:

```bash
npm run start
```

6. In the Render Dashboard, create an **Environment Group** with the same variables:
   - `OPENAI_API_KEY`
   - `PIPESHIFT_API_KEY`
   - `PIPESHIFT_BASE_URL`
   - `HYDRADB_API_KEY`
   - `HYDRADB_URL`
   - `MODEL_PROVIDER`
7. Attach the Environment Group to the web service.
8. Click **Save**.
9. Run a **Manual Redeploy**. Render environment variables are available to the service only after they are saved and the service is redeployed.

Do not commit real secrets. Render Environment Groups and `.env.local` are the correct places for keys.

## Environment Safety
- Do not use `NEXT_PUBLIC_` for secret keys.
- Do not read secret env vars in React client components.
- Frontend code only calls internal routes such as `/api/generate-human`, `/api/run-chaos-simulation`, and `/api/env-check`.
- AI calls run in API routes and server-only library files.
- `lib/env.ts` validates which keys exist and returns booleans only.
- `lib/ai.ts` logs provider choices such as `Using PipeShift provider`, but never logs secret values.

## Debug Checklist
If an API key is not working:

1. Check `.env.local` is in the project root, beside `package.json`.
2. Check variable names match exactly:
   - `OPENAI_API_KEY`
   - `PIPESHIFT_API_KEY`
   - `PIPESHIFT_BASE_URL`
   - `HYDRADB_API_KEY`
   - `HYDRADB_URL`
   - `MODEL_PROVIDER`
3. Do not use quotes around keys unless your shell/provider requires them.
4. Restart `npm run dev` after changing `.env.local`.
5. Open `/api/env-check` and confirm booleans are correct.
6. For Render, confirm the Environment Group is attached to the web service.
7. Save env changes in Render.
8. Manually redeploy the Render service.
9. Check Render server logs for provider messages.
10. Make sure AI calls are in API routes only, never frontend components.
11. If all providers fail, the app should still use `data/seed2161.ts` fallback data.

## Live Demo Flow
1. Show the boot screen.
2. Enter the archive.
3. Point out the 50 seeded citizens.
4. Open a citizen neural scan modal.
5. Click **Run Chaos Simulation**.
6. Watch the system log, streams, timeline, graph, and instability mutate.
7. Open forbidden files to push red alert mode.
8. Trigger archive collapse or reset.
9. Open Judge Pitch Mode.

## Verification
```bash
npm run typecheck
npm run build
```
