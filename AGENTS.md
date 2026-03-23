# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

A full-stack Notes App: React frontend (Vite) + Express backend + remote Supabase database. Single `package.json` at root — not a monorepo.

### Running services

| Service | Command | Port |
|---------|---------|------|
| Frontend (Vite dev) | `npm run dev` | 5173 |
| Backend (Express) | `node Backend/signup.js` | 3000 |

Both must be running for the app to function. Start the backend first.

### Key commands

- **Lint:** `npm run lint` (ESLint; pre-existing unused-var warnings in `Backend/signup.js`)
- **Build:** `npm run build` (Vite production build)
- **Dev server:** `npm run dev` (add `-- --host 0.0.0.0` for external access)

### Non-obvious caveats

- `axios` is used in the frontend (`src/Signup.jsx`, `src/notespage.jsx`) but was not originally listed in `package.json`. It is installed as part of the update script via `npm install`.
- The Supabase credentials (URL + anon key) are hardcoded in `SupabaseClient.js`. The remote instance at `ikqhaebpntbjmlkvmbjj.supabase.co` may be unreachable from cloud VM environments due to network restrictions. If so, backend API calls will return `"error": "TypeError: fetch failed"`. This is an external connectivity issue, not a code bug.
- The frontend hardcodes `http://localhost:3000` as the backend URL. The Sidebar component in `src/notespage.jsx` calls `/getnotes` (missing the `/users` prefix), which is inconsistent with the backend route `/users/getnotes`. This is a pre-existing bug.
- There are no automated tests in this codebase.
