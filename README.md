# iLovePDF Workspace

A full-stack PDF workspace built with React, FastAPI, and document-processing utilities.

This project includes:
- a React frontend with Vite and Tailwind CSS
- a FastAPI backend for authentication and PDF tools
- local database support with SQLite by default
- optional PostgreSQL setup through Docker Compose

## Features

- Merge, split, compress, rotate, watermark, redact, and organize PDF files
- Convert between PDF and Word, PowerPoint, Excel, JPG, HTML, and scanned images
- OCR, translation, and AI summarizer tools
- Login and signup flow with hashed passwords and session storage
- Multilanguage interface support
- Responsive UI with a light-only monochrome design
- File validation, upload size checks, and server-side restrictions

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- FastAPI
- SQLAlchemy
- Pydantic

### Document Processing

- `pypdf`
- `Pillow`
- `reportlab`
- `python-docx`
- `python-pptx`
- `openpyxl`
- `rapidocr-onnxruntime`
- `deep-translator`
- `langdetect`

### Database

- SQLite by default
- PostgreSQL supported through `DATABASE_URL`

## Project Structure

```text
.
├── backend
│   ├── app
│   │   ├── api
│   │   │   └── routes
│   │   ├── schemas
│   │   ├── services
│   │   ├── db.py
│   │   ├── main.py
│   │   └── models.py
│   ├── .venv
│   ├── app.db
│   └── requirements.txt
├── database
│   ├── backups
│   ├── migrations
│   ├── schema.sql
│   └── seeds
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── lib
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Requirements

- Node.js 18+
- Python 3.11+
- npm

Optional:
- PostgreSQL
- LibreOffice
- Ghostscript

Some tools depend on local system utilities. If a specific processor fails, check whether the required native dependency is installed.

## Quick Start

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on a Vite development server, usually:

```text
http://localhost:5173
```

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend usually runs at:

```text
http://127.0.0.1:8000
```

## Database

By default, the backend uses:

```text
sqlite:///./app.db
```

To use PostgreSQL instead, set:

```bash
export DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:PORT/DB_NAME
```

## PostgreSQL with Docker

The repository includes a PostgreSQL service in [docker-compose.yml](/home/atta/Documents/ILOVEPDF/docker-compose.yml:1).

Start it with:

```bash
docker compose up -d
```

Make sure these environment variables are set before running it:

```bash
export POSTGRES_DB=ilovepdf
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_PORT=5432
```

## Authentication

- Passwords are hashed before storage
- Session tokens are stored server-side as hashes
- Sessions expire automatically
- Multiple active sessions are limited

## Upload Rules

- Maximum files per request: `5`
- Maximum file size per file: `25 MB`
- Unsupported or invalid file types are rejected
- Some routes require a single file, while others allow multiple

## Available Tool Pages

Examples include:

- `/merge-pdf`
- `/split-pdf`
- `/compress-pdf`
- `/pdf-to-word`
- `/pdf-to-jpg`
- `/ocr-pdf`
- `/translate-pdf`
- `/ai-summarizer`

## Notes

- `AI Summarizer` now uses direct text extraction with OCR fallback
- `Translate PDF` depends on translator network availability at runtime
- Some conversions rely on local tools like LibreOffice or Ghostscript
- The frontend is light-only and responsive

## Build

Frontend production build:

```bash
cd frontend
npm run build
```

Backend compile check:

```bash
cd backend
./.venv/bin/python -m compileall app
```

## API Entry Points

- `GET /`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/tools`
- `POST /api/tools/{tool_slug}/process`

## Future Improvements

- Better per-tool preview UIs
- Richer translation and summarization previews in the frontend
- More precise conversion fidelity for office and PDF export flows
- Automated tests for upload flows and document processors

## License

This project currently does not define a separate license file.
