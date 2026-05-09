# AFTERLIFE_2126

AFTERLIFE_2126 is a full-stack hackathon simulation dashboard for generating synthetic humans from year 2126, future internet feeds, future news, timeline events, and roleplay chat with selected citizens.

## 1) What the app does
- Generates one emotionally complex synthetic citizen profile.
- Generates five future social posts.
- Generates one future news article.
- Displays a civilization timeline.
- Lets users chat with a generated citizen.
- Includes mock endpoints for HydraDB memory storage and PipeShift orchestration.

## 2) Add env vars locally
1. Copy `.env.example` to `.env.local`.
2. Fill values:
   - `OPENAI_API_KEY`
   - `PIPESHIFT_API_KEY`
   - `HYDRADB_URL`
   - `HYDRADB_API_KEY`

## 3) Attach Render Env Group
In Render Dashboard:
1. Create an Environment Group with the four variables above.
2. Attach it to this web service.

## 4) Deploy to Render
1. Push repo to GitHub.
2. In Render: **New + > Web Service**.
3. Runtime: Node.
4. Build command: `npm install && npm run build`
5. Start command: `npm run start`
6. Attach the Env Group.

## 5) How OpenAI is used
- API routes call OpenAI Responses API with strong system prompting for cinematic but structured JSON.
- Endpoints:
  - `POST /api/generate-human`
  - `POST /api/generate-feed`
  - `POST /api/generate-news`
  - `POST /api/chat-citizen`

## 6) HydraDB + PipeShift later
- `POST /api/store-memory` uses `mockStoreMemory` in `lib/integrations.ts`.
- `POST /api/run-agent` uses `mockRunAgent` in `lib/integrations.ts`.
- Replace those functions with real SDK/HTTP calls using env vars.

## Run
```bash
npm install
npm run dev
```
