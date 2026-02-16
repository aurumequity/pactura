# Pactura API

NestJS API service using the Fastify adapter.

## Responsibilities

- Verify Firebase ID tokens
- Resolve organization membership
- Enforce RBAC
- Execute document ingestion and retrieval
- Write audit events
- Enforce retention workflows

The API acts as the single enforcement boundary.

All routes are organization-scoped unless under `/ops`.

---

## Tech Stack

- NestJS
- Fastify adapter
- PostgreSQL with pgvector
- Firestore
- Cloud Storage
- Secret Manager

---

## Local Development

Install dependencies:

npm install

Run development server:

npm run start:dev

Default port:

http://localhost:8080

---

## Environment Variables

Copy `.env.example` to `.env` and configure required values.

Do not commit `.env`.