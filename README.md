# Dwight

Dwight is a ChatGPT-like assistant UI and server scaffold. This repo contains a minimal React + Tailwind frontend and an Express backend that proxies requests to OpenAI's Chat Completions API so you can run a local ChatGPT-style assistant called "Dwight".

Branding
- Theme colors: black and yellow (applied to the client UI)
- Logo: client/src/logo.svg (simple placeholder you can replace)

Overview
- Frontend: React + Vite + Tailwind (client/)
- Backend: Express proxy to OpenAI (server/)

Quick start (local)

1. Clone

   git clone https://github.com/alfernado/dwight.git
   cd dwight

2. Create a .env file in server/ with your OpenAI API key:

   OPENAI_API_KEY=sk-...

3. Install and run server

   cd server
   npm install
   npm start

   Server runs on http://localhost:3000

4. Install and run client

   cd ../client
   npm install
   npm run dev

   Frontend runs on http://localhost:5173 and talks to the server at http://localhost:3000

Notes
- The server proxies to OpenAI; keep your API key safe and do NOT check it into git.
- For production deployment, add a host secret for OPENAI_API_KEY and configure CORS/proxy appropriately.
- Replace the placeholder logo at `client/src/logo.svg` with your own branding if you like.

Files added by this scaffold:
- client/: Vite + React app with a ChatGPT-like UI
- server/: Express proxy server
- README.md, .gitignore

License: MIT
