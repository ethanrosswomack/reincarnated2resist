#!/usr/bin/env node
/*
  generate_import_csvs.ts
  - Reads the cleaned filemap CSV and generates three CSVs:
      - albums_import.csv
      - tracks_import.csv
      - lyrics_import.csv
  - Heuristic-based; review results before importing.

  Usage:
    node ./scripts/generate_import_csvs.ts path/to/HAWK_ARS_00_FULL_FileMap.clean.csv

  Requires: npm install csv-parse@5 csv-stringify@6
*/

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

function slugFromFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9-_ ]+/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

async function main() {
  const p = process.argv[2];
  if (!p) { console.error('Usage: generate_import_csvs.ts <cleaned-filemap.csv>'); process.exit(1); }
  const raw = fs.readFileSync(p, 'utf8');
  const rows = parse(raw, { columns: true, skip_empty_lines: true });

  const albumsMap: Record<string, any> = {};
  const tracks: any[] = [];
  const lyrics: any[] = [];

  for (const r of rows) {
    const folder = (r.folder_path || '').trim();
    const filename = (r.filename || '').trim();
    const ext = (r.extension || '').trim().toLowerCase();
    const s3 = (r.s3_url || '').trim();

    // Try to guess album code from folder_path
    let album_key = 'HAWK-ARS-00';
    if (folder.match(/Full[_ ]?Disclosure/i) || s3.match(/Full_Disclosure/i)) album_key = 'HAWK-FD';
    if (folder.match(/Behold|Pale Horse/i) || s3.match(/Behold_A_Pale_Horse/i)) album_key = 'HAWK-BAP';
    if (folder.match(/Milabs/i) || s3.match(/Milabs/i)) album_key = 'HAWK-MB';
    if (folder.match(/Malicious/i) || s3.match(/Malicious_EP/i)) album_key = 'HAWK-ME';
    if (folder.match(/Shadow/i) || s3.match(/Shadow_Banned/i)) album_key = 'HAWK-SB';
    if (folder.match(/Singles/i) || s3.match(/06_Singles|Singles/i)) album_key = 'HAWK-SG';

    // Populate album map placeholder
    albumsMap[album_key] = albumsMap[album_key] || { album_code: album_key };

    const slug = slugFromFilename(filename);

    if (ext === 'mp3' || (s3 && s3.endsWith('.mp3'))) {
      // audio
      tracks.push({ album_code: album_key, title: filename.replace(/\.mp3$/i, ''), slug, audio_url: s3 });
    } else if (ext === 'md' || ext === 'ipynb' || s3.match(/\.md$|\.ipynb$/i)) {
      // lyrics
      lyrics.push({ album_code: album_key, filename, lyrics_url: s3, type: ext || (s3.endsWith('.ipynb') ? 'ipynb' : 'md') });
    } else {
      // other assets: ignore for now
    }
  }

  const base = path.dirname(p);
  const albumsCsv = stringify(Object.values(albumsMap), { header: true });
  const tracksCsv = stringify(tracks, { header: true });
  const lyricsCsv = stringify(lyrics, { header: true });

  fs.writeFileSync(path.join(base, 'albums_import.csv'), albumsCsv, 'utf8');
  fs.writeFileSync(path.join(base, 'tracks_import.csv'), tracksCsv, 'utf8');
  fs.writeFileSync(path.join(base, 'lyrics_import.csv'), lyricsCsv, 'utf8');

  console.log('Wrote albums_import.csv, tracks_import.csv, lyrics_import.csv to', base);
}

main().catch(err => { console.error(err); process.exit(1); });
