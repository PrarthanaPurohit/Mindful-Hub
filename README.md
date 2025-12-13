# Mindful-Hub

Lightweight mental-health support app (backend + frontend).

## Project structure

- `backend/` — Express API, MongoDB models, routes and seed script
- `frontend/` — React app (Create React App structure)

## Prerequisites

- Node.js (16+ recommended)
- npm (comes with Node)
- A MongoDB connection string (Atlas or local)
- (Optional) OpenAI API key if using AI features

## Environment

Copy the example env in the backend and fill in real values (do NOT commit your real `.env`):

```powershell
Copy-Item backend\.env.example backend\.env
# then open and edit `backend\.env` with your secrets
```

`backend/.env.example` contains the variables required by the server:

- `PORT` — port the backend will listen on
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `OPENAI_API_KEY` — (optional) OpenAI key

## Setup

1. Install backend dependencies and start server (development):

```powershell
cd backend
npm install
npm run dev   # starts nodemon server.js
# or: npm start to run without nodemon
```

2. Install frontend dependencies and start the React app:

```powershell
cd ..\frontend
npm install
npm start
```

## Deployment

### Backend (Vercel)

1. Push the backend folder to a GitHub repository.
2. Connect the repository to Vercel.
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (if using AI features)
4. Deploy. The backend will be available at `https://your-backend-project.vercel.app`.

### Frontend (Vercel)

1. Update `frontend/.env` with the backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-project.vercel.app
   ```
2. Push the frontend folder to a GitHub repository (or separate repo).
3. Connect to Vercel and deploy. The frontend will build and deploy automatically.

Note: Deploy backend first to get the URL for the frontend.

To seed example counselors (one-off):

```powershell
cd backend
node seedCounselors.js
```

## Git / Security notes

- The repository includes a root `.gitignore` that excludes environment files and `node_modules`. Do not commit `.env` files or secrets.
- If `frontend/node_modules` was committed previously, untrack it with:

```powershell
git rm -r --cached frontend/node_modules
git commit -m "Remove frontend node_modules from repo and update .gitignore"
```

## Useful scripts

- Backend
  - `npm run dev` — start backend with `nodemon`
  - `npm start` — start backend with `node server.js`

- Frontend
  - `npm start` — start React dev server

## Contributing

Open a PR with a clear description and run the linters/tests (if added).

## License

This repository currently has no license specified. Add a `LICENSE` file if you want to make the terms explicit.

---

If you want, I can also:

- run the `git rm --cached` command now to untrack `frontend/node_modules`, then commit the change;
- add a short `.github/ISSUE_TEMPLATE` or `CONTRIBUTING.md`.
