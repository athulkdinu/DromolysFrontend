# 1) Project Title and Company Details

- DromoLys CSV Analyzer — DromoLys Research & Development Pvt. Ltd. Recruitment Assessment (Full-Stack Engineer, Graduate)

# 2) Project Overview
- Full-stack CSV analysis tool with a React UI and Node.js + Express API. Users upload a CSV, explore the table, view per-column statistics, and render histograms for numeric fields.

# 3) Objective
- Provide a concise, submission-ready implementation that satisfies all mandatory assessment requirements for server-side CSV parsing, statistics, and histogram generation.

# 4) Features (Frontend & Backend)
- Frontend: CSV upload form, table preview, column selector, statistic buttons (min, max, mean, median, mode), histogram viewer, missing-value count, inline errors.
- Backend: CSV ingestion with schema/type detection, in-memory dataset registry, numeric and string statistics, 30-bin histogram for numeric columns, CSV file cleanup after processing.

# 5) API Endpoints
- POST `/api/upload` — upload CSV; returns `datasetId` and inferred schema.
- GET `/api/dataset/{id}/table` — returns all rows for the dataset.
- GET `/api/dataset/{id}/column/{column}/stats` — returns min, max, mean, median, mode (number or string), and missing count.
- GET `/api/dataset/{id}/column/{column}/hist` — returns 30-bin histogram for numeric columns.

# 6) Computation Rules
- CSV parsing, statistics, and histogram generation are done server-side.
- Column type detection: if all non-empty values convert to numbers, the column is treated as numeric; otherwise string.
- Numeric stats: min, max, mean, median, mode (multi-mode supported), missing value count.
- String stats: mode (multi-mode supported), missing value count.
- Histogram: 30 equal-width bins between min and max; out-of-range values are clamped to the last bin.

# 7) Data Handling
- Datasets are stored in memory keyed by `datasetId`; no database persistence.
- Uploaded CSV files are parsed then removed from disk; only parsed rows and schema remain in memory.
- Data is lost on server restart; suitable for assessment/demo use only.

# 8) Technology Stack
- Frontend: React, React Router, React Bootstrap, Chart.js via react-chartjs-2, Vite.
- Backend: Node.js, Express, multer, csv-parser, uuid, CORS.

# 9) How to Run the Project Locally (Frontend & Backend)
- Prerequisites: Node.js (LTS), npm.
- Backend:
```
cd backend
npm install
npm start       # uses nodemon; if unavailable, run: node index.js
```
- Frontend (in a new terminal):
```
cd frontend
npm install
npm run dev     # opens http://localhost:5173 (proxying to backend at http://localhost:3000/api)
```

# 10) Assumptions & Limitations
- CSV must include a header row; type inference is basic (number vs string).
- In-memory storage means datasets vanish on restart; not intended for production or large files.
- Histogram only for numeric columns; all stats/histogram logic runs on the server.
- Nodemon is expected for `npm start`; otherwise run `node index.js`.

# 11) Optional Features
- Persistence, authentication, pagination, role-based access, large-file streaming, and UI polish beyond requirements were intentionally not implemented.

# 12) Deliverables
- Source code for frontend and backend, plus this README with setup and API notes.

# 13) Submission Details
- Provide the repository or archive with both apps and confirm backend runs on port 3000 and frontend dev server on port 5173 (default Vite).

# 14) Final Note
- The project fully satisfies all mandatory requirements; optional items were intentionally left out to keep the solution focused and review-ready.
