# Database Setup & Import Guide

This document explains how to use the migration and helper scripts to create the Neon/Postgres schema and import the HAWK-ARS-00 assets (albums, tracks, lyrics).

Prerequisites
- Node 18+ and npm
- Access to the Neon project (DATABASE_URL or NEON_API_KEY / connection string)
- From the repo root:

Install dependencies (scripts use csv-parse and pg):

```bash
npm install csv-parse@5 csv-stringify@6 pg dotenv
```

Steps
1. Review the migration:

   - `migrations/001_create_tables.sql` — creates `albums`, `tracks`, `blog_posts`, `merch_items`, `subscribers`.

2. Run a DB connectivity test (ensure `DATABASE_URL` is set in `.env` or env):

```bash
node ./scripts/db_test_connection.ts
```

3. Prepare cleaned filemap CSV:

```bash
node ./scripts/normalize_filemap.ts src/data/HAWK-ARS-00/HAWK_ARS_00_FULL_FileMap.csv
# produces: src/data/HAWK-ARS-00/HAWK_ARS_00_FULL_FileMap.cleaned.csv
```

4. Generate import CSVs (albums/tracks/lyrics):

```bash
node ./scripts/generate_import_csvs.ts src/data/HAWK-ARS-00/HAWK_ARS_00_FULL_FileMap.cleaned.csv
# produces albums_import.csv, tracks_import.csv, lyrics_import.csv in same folder
```

5. Review the generated CSVs and fix any mismatches by hand.

6. Apply the SQL migration to Neon (example using psql):

```bash
# if you have psql and DATABASE_URL
psql "$DATABASE_URL" -f migrations/001_create_tables.sql
```

7. Import CSV data into tables

- For `albums_import.csv` you can generate INSERT statements or use `COPY` / `\\copy` from psql:

```sql
-- example: from psql prompt connected to your DB
\copy albums(title, album_code) FROM 'albums_import.csv' CSV HEADER;
\copy tracks(album_code, title, slug, audio_url) FROM 'tracks_import.csv' CSV HEADER;
```

Note: `tracks` requires album_id; you may prefer to import `albums` first then run a small script that resolves album_code -> id and inserts `tracks` using `pg`.

8. Indexing & AutoRAG

- After importing lyrics into the DB or D1, you can run your Cloudflare indexing flow to vectorize lyrics.
- Use `server/cloudflare-rag.ts` as a reference for API usage.

If you'd like, I can attempt to run the migration and import steps for you — provide the `DATABASE_URL` or Neon credentials (paste here or add to `.env`) and confirm you want me to execute SQL against the remote DB.
