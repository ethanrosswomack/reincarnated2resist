# HAWK-ARS-00 — File Index (Snapshot)

Generated: 2025-10-22 UTC

This document is a snapshot index of the primary files, folder paths, and public URLs for the HAWK-ARS-00 bucket and related assets. Use this as a canonical safe-keeping reference before performing migrations or reorganizations.

Base host (public bucket): https://s3.omniversalaether.app
Base data prefix: /src/data/HAWK-ARS-00
Audio prefix: /src/audio

---

## Main collection files

- Main Arsenal Index (markdown)
  - Path: `src/data/HAWK-ARS-00/Main_Arsenal_Index.md`
  - Public URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/Main_Arsenal_Index.md

- README for ARS-00
  - Path: `src/data/HAWK-ARS-00/README.md`
  - Public URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/README.md

- Master Notebook index
  - Path: `src/data/HAWK-ARS-00/Master_Index.ipynb`
  - Public URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/Master_Index.ipynb

- Full filemap (crosslinked)
  - Path: `src/data/HAWK-ARS-00/filemap/HAWK_ARS_00_FULL_FileMap_Crosslinked_FINAL.csv`
  - Public URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/filemap/HAWK_ARS_00_FULL_FileMap_Crosslinked_FINAL.csv

- Unified catalog (CSV)
  - Path: `src/data/HAWK-ARS-00/catalogs/hawk_ars_unified_catalog.csv`
  - Public URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/catalogs/hawk_ars_unified_catalog.csv

---

## Dissection & commentary (EverLight's Rite)

These markdown files live under the dissection archive and interlinked folders.

- `EverLights_Rite_Dissection/Singles_Arc.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection/Singles_Arc.md

- `EverLights_Rite_Dissection_Archive/BAPH.md` (Behold A Pale Horse entry)
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Archive/Behold_A_Pale_Horse.md

- `EverLights_Rite_Dissection_Archive/Full_Disclosure.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Archive/Full_Disclosure.md

- `EverLights_Rite_Dissection_Archive/MILABS.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Archive/MILABS.md

- `EverLights_Rite_Dissection_Archive/Malicious_EP.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Archive/Malicious_EP.md

- `EverLights_Rite_Dissection_Archive/Phase_II_Hypothesis.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Archive/Phase_II_Hypothesis.md

- `EverLights_Rite_Dissection_Archive/Singles.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Archive/Singles.md

- `EverLights_Rite_Dissection_Interlinked/README.md`
  - URL: https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Interlinked/README.md

- Interlinked album entries (examples):
  - `BAPH.md` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Interlinked/BAPH.md
  - `Full_Disclosure.md` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Interlinked/Full_Disclosure.md
  - `MILABS.md` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/EverLights_Rite_Dissection_Interlinked/MILABS.md

---

## Notebooks (selection from Master_Index.ipynb)

The Master_Index notebook references many per-track notebooks. Example paths (all under `src/data/HAWK-ARS-00/`):

- `01_Full_Disclosure_2020/01_swordfish.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/01_Full_Disclosure_2020/01_swordfish.ipynb
- `01_Full_Disclosure_2020/02_mic_check.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/01_Full_Disclosure_2020/02_mic_check.ipynb
- `02_Behold_A_Pale_Horse_2020/01_warning_shots.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/02_Behold_A_Pale_Horse_2020/01_warning_shots.ipynb
- `03_Milabs_2022/01_soft_disclosure.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/03_Milabs_2022/01_soft_disclosure.ipynb
- `04_Malicious_EP_2024/01_malicious.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/04_Malicious_EP_2024/01_malicious.ipynb
- `05_Shadow_Banned_2024/01_psychological_warfare.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/05_Shadow_Banned_2024/01_psychological_warfare.ipynb
- `06_Singles/01_Incantations.ipynb` → https://s3.omniversalaether.app/src/data/HAWK-ARS-00/06_Singles/01_Incantations.ipynb

Note: the full set is enumerated in `Master_Index.ipynb` and in the filemap CSV.

---

## Audio file URL pattern (inferred)

Audio files are stored under the audio prefix with album-coded folders. Example pattern:

- Template: `https://s3.omniversalaether.app/src/audio/HAWK-{ALBUM_CODE}-{TRACK_NUMBER_PADDED}/{slug}.mp3`

Examples:
- Singles - Will You Listen
  - Audio URL: https://s3.omniversalaether.app/src/audio/HAWK-SG-01/will-you-listen.mp3

- Full Disclosure - Swordfish (example)
  - Audio URL: https://s3.omniversalaether.app/src/audio/HAWK-FD-01/swordfish.mp3

If you need a full list of audio URLs, use the filemap CSV: `filemap/HAWK_ARS_00_FULL_FileMap_Crosslinked_FINAL.csv`.

---

## Lyrics file URL pattern

Lyric notebooks and markdown files are stored under the data prefix. Examples:

- Notebook: `https://s3.omniversalaether.app/src/data/HAWK-ARS-00/01_will_you_listen.ipynb`
- Markdown: `https://s3.omniversalaether.app/src/data/HAWK-ARS-00/01_will_you_listen.md`

Many backup/alternate markdown folder structures exist—see `catalogs/` and `filemap/` CSVs for complete resolution.

---

## Key CSVs in repo (sources of truth)

- `src/data/HAWK-ARS-00/HAWK_ARS_00_FULL_FileMap.csv`
- `src/data/HAWK-ARS-00/filemap/HAWK_ARS_00_FULL_FileMap_Crosslinked_FINAL.csv`
- `src/data/HAWK-ARS-00/catalogs/hawk_ars_unified_catalog.csv`
- `src/data/HAWK-ARS-00/ARS-00.csv`

All of the above contain exhaustive mappings—use these to generate database import scripts.

---

## Next steps & recommended workflow

1. Verify filemap CSV is the single source of truth and fix malformed URLs (remove tree-artifacts like `│   ├──`).
2. Normalize all URLs to `https://s3.omniversalaether.app/...` (not `s3.omniversalmedia.app` or `onebucket.omniversal.cloud`) unless you intend to keep multiple hosts.
3. Generate a normalized CSV for Albums / Tracks / Lyrics using the filemap and catalogs.
4. Create DB tables (Albums, Tracks, Lyrics, Merch) and import.
5. Optionally: create a Cloudflare R2 bucket and D1 databases for per-service tables (audio metadata, lyrics, merch) then build a Cloudflare Worker (wrangler) to serve the site and AutoRAG index.

---

If you want, I can now:
- Produce a cleaned CSV (Albums/Tracks/Lyrics) from the filemap
- Generate SQL insert statements or a Drizzle migration
- Create a minimal `index.html` directory page for `https://s3.omniversalaether.app` that links to the important files above

Tell me which of these you'd like done next and I will proceed.
