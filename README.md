# Library API

A Node.js / Express / MongoDB REST API performing full CRUD operations on two collections: **books** and **authors**, secured with GitHub OAuth for write operations.

## Collections

- **books** (8 fields): title, author, genre, publishedYear, pages, isbn, rating, description
- **authors** (6 fields): name, birthYear, nationality, biography, website, booksPublished

## Endpoints

| Method | Route | Protected? | Description |
|--------|-------|------------|--------------|
| GET | /login | No | Starts GitHub OAuth login |
| GET | /auth/github/callback | No | GitHub OAuth callback |
| GET | /logout | No | Ends the current session |
| GET | /login-status | No | Checks if the current session is logged in |
| GET | /books | No | Get all books |
| GET | /books/:id | No | Get a single book |
| POST | /books | **Yes** | Create a book |
| PUT | /books/:id | **Yes** | Update a book |
| DELETE | /books/:id | **Yes** | Delete a book |
| GET | /authors | No | Get all authors |
| GET | /authors/:id | No | Get a single author |
| POST | /authors | **Yes** | Create an author |
| PUT | /authors/:id | **Yes** | Update an author |
| DELETE | /authors/:id | **Yes** | Delete an author |

API documentation (Swagger): `/api-docs`

## Authentication (GitHub OAuth)

Write operations (POST, PUT, DELETE) require an authenticated session. No passwords are ever stored in MongoDB — GitHub handles the credential entirely, and only the public profile (id, username, display name) is kept in the session.

To test:
1. Open `/login` directly in a browser tab (not from Swagger — Swagger's "Execute" doesn't do the OAuth redirect dance).
2. Authorize the app on GitHub.
3. You're redirected back and logged in. Now Swagger (opened in that same browser) shares the session cookie, so POST/PUT/DELETE calls from `/api-docs` will succeed.
4. Visit `/logout` to end the session (protected routes will then return 401).

## Local Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB connection string and GitHub OAuth credentials.
3. `npm run dev` (or `npm start`)
4. Visit `http://localhost:3000/api-docs`

## Environment Variables

- `MONGODB_URI` — MongoDB connection string (Atlas)
- `PORT` — port to run the server on (defaults to 3000)
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — from your GitHub OAuth App
- `GITHUB_CALLBACK_URL` — must match the "Authorization callback URL" set in the GitHub OAuth App (e.g. `http://localhost:3000/auth/github/callback` locally, or `https://your-app.onrender.com/auth/github/callback` in production)
- `SESSION_SECRET` — any long random string, used to sign the session cookie
