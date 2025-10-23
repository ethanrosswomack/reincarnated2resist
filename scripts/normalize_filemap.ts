#!/usr/bin/env node
/*
  normalize_filemap.ts
  - Reads a filemap CSV (path provided as first arg)
  - Cleans tree-artifact chars and normalizes host to s3.omniversalaether.app
  - Writes cleaned CSV to same folder with suffix `.cleaned.csv`

  Usage:
    node ./scripts/normalize_filemap.ts path/to/HAWK_ARS_00_FULL_FileMap.csv

  Requires: npm install csv-parse@5 csv-stringify@6
*/

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

function normalizeUrl(u: string) {
  if (!u) return u;
  // Remove tree artifacts like │ ├── └── and extra whitespace
  u = u.replace(/[│├└──]+/g, '').trim();
  // Fix host variants
  u = u.replace(/https?:\/\/(onebucket\.omniversal\.cloud|s3\.omniversalmedia\.app|s3\.omniversalaether\.app)/gi, 'https://s3.omniversalaether.app');
  // Replace spaces with %20
  u = u.split(' ').map(encodeURIComponent).join('%20');
  // Ensure double slashes are normalized after protocol
  u = u.replace('https:/%2F', 'https://');
  return u;
}

async function main() {
  const p = process.argv[2];
  if (!p) {
    console.error('Usage: normalize_filemap.ts <path-to-csv>');
    process.exit(1);
  }
  const raw = fs.readFileSync(p, 'utf8');
  const records = parse(raw, { columns: true, skip_empty_lines: true });

  const cleaned = records.map((r: any) => {
    const out: any = { ...r };
    if (out.s3_url) out.s3_url = normalizeUrl(out.s3_url);
    if (out.audio_url) out.audio_url = normalizeUrl(out.audio_url);
    if (out.album_art_url) out.album_art_url = normalizeUrl(out.album_art_url);
    return out;
  });

  const outPath = p.replace(/\.csv$/, '.cleaned.csv');
  const csv = stringify(cleaned, { header: true });
  fs.writeFileSync(outPath, csv, 'utf8');
  console.log('Wrote cleaned file to', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
