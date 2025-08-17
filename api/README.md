InAI API (modular monolith)

Setup
- Copy .env.example to .env and update DATABASE_URL and REDIS_URL
- npm install
- Start Postgres and Redis locally
- Run database migrations (see migrations.sql)
- npm run dev

This API includes modules:
- auth (mocked)
- courses
- study
- gamify
- chat
- admin

Workers
- cd src/workers && node worker.js
