# FairFlow Backend (Node + Express)

This folder contains a basic Express backend for FairFlow. It provides a simple tickets API to be used by the frontend.

## Setup

1. From the project root run:
   `cd backend && npm install`

2. Start the server:
   `npm start` (or `npm run dev` with nodemon)

3. API endpoints:
   - `GET /` -> health check
   - `GET /api/tickets` -> list all tickets
   - `GET /api/tickets/:id` -> get a single ticket
   - `POST /api/tickets` -> create ticket; body: `{ title, priority, status }`
   - `PUT /api/tickets/:id` -> update ticket
   - `DELETE /api/tickets/:id` -> delete ticket

## Frontend integration

In `fairflow/package.json`, add:

```
"proxy": "http://localhost:5000"
```

Then your React app can call `/api/tickets` directly.
