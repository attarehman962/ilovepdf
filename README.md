# DocMate Workspace

A full-stack PDF workspace built with React, Vite, FastAPI, and local document-processing utilities.

This project is designed as a polished academic and portfolio-ready PDF platform inspired by modern PDF productivity platforms. It combines a visually refined homepage, a shared tool workspace, user authentication, multilingual UI support, and a broad set of PDF-focused modules.

![DocMate logo](frontend/src/assets/docmate_logo.png)

## Current Product Snapshot

The project currently includes:
- a React frontend with a redesigned editorial-style landing page
- an official `DocMate` logo asset set with editable SVG source and transparent PNG runtime usage
- a FastAPI backend for authentication and PDF tool processing
- SQLite by default, with optional PostgreSQL support
- multiple PDF utilities including organization, conversion, editing, security, OCR, translation, and workflow chaining
- a responsive interface suitable for Final Year Project demos and portfolio presentation

## Homepage and UI Design

The homepage was recently upgraded to match a more premium and presentation-ready visual direction.

### Homepage highlights

- sticky navigation with the official `DocMate` transparent logo integrated directly into the header
- single-line desktop navbar behavior with non-wrapping primary links and auth actions
- adaptive navbar spacing and search sizing to preserve balance as content grows
- integrated homepage tool search with `Ctrl/Cmd + K`
- serif-led hero section with floating accent tiles
- category filter pills that drive the real tool grid
- redesigned tool cards with clearer category grouping
- workflow, project polish, and trust sections that support the landing experience
- updated footer aligned with the new visual system

### Design system

- background tone: warm cream interface
- display font: `Instrument Serif`
- body font: `Plus Jakarta Sans`
- brand assets: `frontend/src/assets/docmate_logo_svg.svg` and `frontend/src/assets/docmate_logo.png`
- navigation surfaces: white, charcoal, and soft gray framing with the logo's coral accent reserved for branding
- category accent colors for organize, optimize, convert, edit, security, workflow, and intelligence flows
- responsive layout across desktop and mobile

### Navbar architecture

- the navbar uses the transparent PNG from `frontend/src/assets`, while the SVG remains the editable source
- desktop navigation uses `whitespace-nowrap` and tuned gap/font sizing to keep text on one line
- homepage search remains available on large screens with a narrower adaptive slot
- mobile and tablet views keep the existing drawer pattern so branding changes do not introduce overflow

## Core Features

### Organize

- Merge PDF
- Split PDF
- Organize PDF
- Scan to PDF

### Optimize

- Compress PDF
- Repair PDF
- OCR PDF

### Convert

- PDF to Word
- PDF to PowerPoint
- PDF to Excel
- PDF to JPG
- PDF to PDF/A
- Word to PDF
- PowerPoint to PDF
- Excel to PDF
- JPG to PDF
- HTML to PDF

### Edit

- Edit PDF
- Rotate PDF
- Watermark
- Crop PDF
- Page numbers

### Security

- Unlock PDF
- Protect PDF
- Sign PDF
- Redact PDF
- Compare PDF

### Intelligence

- AI Summarizer
- Translate PDF

### Workflow

- Create a workflow

## Feature Notes

Some tools are intentionally lightweight or academic-project friendly rather than enterprise-level replacements.

- `Protect PDF` uses strong encryption in the backend.
- `Scan to PDF` and `OCR PDF` generate searchable document output with OCR.
- `Translate PDF` creates a translated report-style PDF rather than a full layout-preserving translation.
- `AI Summarizer` uses extractive summarization from document text with OCR fallback.
- `Create a workflow` allows chained processing and local preset reuse in the frontend.
- Some Office and PDF conversions depend on local native utilities such as LibreOffice or Ghostscript.

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
- `cryptography`

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
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ToolsSection.jsx
│   │   │   ├── PremiumSection.jsx
│   │   │   ├── ImageEditorSection.jsx
│   │   │   ├── TrustSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── assets
│   │   │   ├── docmate_logo.png
│   │   │   └── docmate_logo_svg.svg
│   │   ├── lib
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Requirements

### Required

- Node.js 18+
- Python 3.11+
- npm

### Optional but recommended

- LibreOffice
- Ghostscript
- PostgreSQL

Some processors rely on native system tools. If a specific module fails, verify that the related dependency is installed and accessible from the terminal.

## Quick Start

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs at:

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

A PostgreSQL service is included in `docker-compose.yml`.

Start it with:

```bash
docker compose up -d
```

Set these environment variables before using it:

```bash
export POSTGRES_DB=ilovepdf
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_PORT=5432
```

## Authentication

- passwords are hashed before storage
- session tokens are stored server-side as hashes
- sessions expire automatically
- multiple active sessions are limited
- login and signup flows are available from the frontend

## Upload Rules

- maximum files per request: `5`
- maximum file size per file: `25 MB`
- unsupported or invalid file types are rejected
- some routes require a single file, while others allow multiple

## Main User Flow

A typical user journey in the app is:

1. Open the homepage.
2. Use the navbar, search, or category pills to find a tool.
3. Open the tool workspace page.
4. Upload file(s).
5. Configure tool-specific options.
6. Run processing.
7. Download the generated result.

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
- `/create-workflow`

## Build and Verification

### Frontend production build

```bash
cd frontend
npm run build
```

### Backend compile check

```bash
cd backend
./.venv/bin/python -m compileall app
```

The homepage redesign, official logo integration, and navbar spacing updates were verified with a successful production build.

## API Entry Points

- `GET /`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/tools`
- `POST /api/tools/{tool_slug}/process`

## Known Constraints

- some advanced tools are project-grade implementations rather than enterprise-complete replacements
- translation output focuses on translated content more than original visual fidelity
- some conversions depend on local native tools being installed correctly
- there is no full background job queue or persisted processing history yet

## Suggested Next Improvements

- extend the new design language into pricing, auth, features, and tool workspace pages
- add richer previews for visual tools such as organize, crop, sign, and compare
- add server-side workflow persistence and file history
- improve advanced conversion fidelity and document comparison depth
- add automated frontend and backend tests for critical processing flows

## License

This project currently does not define a separate license file.
