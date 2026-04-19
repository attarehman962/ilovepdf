# Full-Stack App Structure

This project is organized as a simple full-stack starter using:

- React + Vite + Tailwind CSS for the frontend
- Python + FastAPI for the backend
- PostgreSQL for the database

## Project Structure

```text
.
├── backend
│   ├── app
│   │   ├── api
│   │   │   └── routes
│   │   ├── core
│   │   ├── db
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── utils
│   └── tests
├── database
│   ├── backups
│   ├── migrations
│   └── seeds
└── frontend
    ├── public
    └── src
        ├── assets
        ├── components
        ├── features
        ├── hooks
        ├── layouts
        ├── lib
        ├── pages
        ├── routes
        ├── services
        ├── styles
        └── utils
```

## What Each Folder Does

- `frontend/`: UI built with React and Tailwind
- `backend/`: API, business logic, and database connection
- `database/`: schema files, seed data, and migration-related files

## Suggested Next Steps

1. Install frontend dependencies inside `frontend/`
2. Create a Python virtual environment inside `backend/`
3. Start PostgreSQL locally or with Docker
4. Build your first feature page and API route

