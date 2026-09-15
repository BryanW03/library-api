# Library API

A Node.js / Express / MongoDB REST API performing full CRUD operations on two collections: **books** and **authors**.

## Collections

- **books** (8 fields): title, author, genre, publishedYear, pages, isbn, rating, description
- **authors** (6 fields): name, birthYear, nationality, biography, website, booksPublished

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /books | Get all books |
| GET | /books/:id | Get a single book |
| POST | /books | Create a book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |
| GET | /authors | Get all authors |
| GET | /authors/:id | Get a single author |
| POST | /authors | Create an author |
| PUT | /authors/:id | Update an author |
| DELETE | /authors/:id | Delete an author |

API documentation (Swagger): `/api-docs`

## Local Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB connection string.
3. `npm run dev` (or `npm start`)
4. Visit `http://localhost:3000/api-docs`

## Environment Variables

- `MONGODB_URI` — MongoDB connection string (Atlas)
- `PORT` — port to run the server on (defaults to 3000)
