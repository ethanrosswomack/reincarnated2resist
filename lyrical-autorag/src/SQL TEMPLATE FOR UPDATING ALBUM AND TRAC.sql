-- SQL Template for Updating Album and Track Assets
-- Generated from CSV mappings on 2025-10-21

-- Update Singles Arsenal tracks
UPDATE tracks
SET
    audio_url = CASE
        WHEN track_number < 10 THEN
            'https://s3.omniversalaether.app/src/audio/HAWK-SG-0' || track_number || '/' || slug || '.mp3'
        ELSE
            'https://s3.omniversalaether.app/src/audio/HAWK-SG-' || track_number || '/' || slug || '.mp3'
    END,
    lyrics_md_url = 'https://s3.omniversalaether.app/' || lyrics_md_url,
    lyrics_ipynb_url = 'https://s3.omniversalaether.app/' || lyrics_ipynb_url
WHERE
    album_id = (SELECT id FROM albums WHERE album_code = 'HAWK-SG');

-- Update Full Disclosure tracks
UPDATE tracks
SET
    audio_url = CASE
        WHEN track_number < 10 THEN
            'https://s3.omniversalaether.app/src/audio/HAWK-FD-0' || track_number || '/' || slug || '.mp3'
        ELSE
            'https://s3.omniversalaether.app/src/audio/HAWK-FD-' || track_number || '/' || slug || '.mp3'
    END,
    lyrics_md_url = 'https://s3.omniversalaether.app/' || lyrics_md_url,
    lyrics_ipynb_url = 'https://s3.omniversalaether.app/' || lyrics_ipynb_url
WHERE
    album_id = (SELECT id FROM albums WHERE album_code = 'HAWK-FD');

-- Update Behold a Pale Horse tracks
UPDATE tracks
SET
    audio_url = CASE
        WHEN track_number < 10 THEN
            'https://s3.omniversalaether.app/src/audio/HAWK-BAP-0' || track_number || '/' || slug || '.mp3'
        ELSE
            'https://s3.omniversalaether.app/src/audio/HAWK-BAP-' || track_number || '/' || slug || '.mp3'
    END,
    lyrics_md_url = 'https://s3.omniversalaether.app/' || lyrics_md_url,
    lyrics_ipynb_url = 'https://s3.omniversalaether.app/' || lyrics_ipynb_url
WHERE
    album_id = (SELECT id FROM albums WHERE album_code = 'HAWK-BAP');

-- Update Milabs tracks
UPDATE tracks
SET
    audio_url = CASE
        WHEN track_number < 10 THEN
            'https://s3.omniversalaether.app/src/audio/HAWK-MB-0' || track_number || '/' || slug || '.mp3'
        ELSE
            'https://s3.omniversalaether.app/src/audio/HAWK-MB-' || track_number || '/' || slug || '.mp3'
    END,
    lyrics_md_url = 'https://s3.omniversalaether.app/' || lyrics_md_url,
    lyrics_ipynb_url = 'https://s3.omniversalaether.app/' || lyrics_ipynb_url
WHERE
    album_id = (SELECT id FROM albums WHERE album_code = 'HAWK-MB');

-- Update Malicious EP tracks
UPDATE tracks
SET
    audio_url = CASE
        WHEN track_number < 10 THEN
            'https://s3.omniversalaether.app/src/audio/HAWK-ME-0' || track_number || '/' || slug || '.mp3'
        ELSE
            'https://s3.omniversalaether.app/src/audio/HAWK-ME-' || track_number || '/' || slug || '.mp3'
    END,
    lyrics_md_url = 'https://s3.omniversalaether.app/' || lyrics_md_url,
    lyrics_ipynb_url = 'https://s3.omniversalaether.app/' || lyrics_ipynb_url
WHERE
    album_id = (SELECT id FROM albums WHERE album_code = 'HAWK-ME');

-- Update Shadow Banned tracks
UPDATE tracks
SET
    audio_url = CASE
        WHEN track_number < 10 THEN
            'https://s3.omniversalaether.app/src/audio/HAWK-SB-0' || track_number || '/' || slug || '.mp3'
        ELSE
            'https://s3.omniversalaether.app/src/audio/HAWK-SB-' || track_number || '/' || slug || '.mp3'
    END,
    lyrics_md_url = 'https://s3.omniversalaether.app/' || lyrics_md_url,
    lyrics_ipynb_url = 'https://s3.omniversalaether.app/' || lyrics_ipynb_url
WHERE
    album_id = (SELECT id FROM albums WHERE album_code = 'HAWK-SB');-- Update track assets
-- NOTE: The previous concatenation-style updates produced URLs that many DB clients
-- showed as concatenated expressions rather than fully-resolved clickable strings.
-- The section below uses PostgreSQL `format()` and `lpad()` to build final URLs and
-- includes preview SELECTs so you can verify the generated URLs before running UPDATE.

-- Helper: preview for any album_code (replace 'HAWK-FD' as needed)
-- This shows how the final audio_url, lyrics_md_url, and lyrics_ipynb_url will look
SELECT
  t.id AS track_id,
  t.track_number,
  t.slug,
  a.album_code,
  format('https://s3.omniversalaether.app/src/audio/%s-%s/%s.mp3', a.album_code, lpad(t.track_number::text,2,'0'), t.slug) AS preview_audio_url,
  format('https://s3.omniversalaether.app/%s', t.lyrics_md_url) AS preview_lyrics_md_ucs_md_url) AS preview_lyrics_md_url,
  format('https://s3.omniversalaether.app/%s', t.lyrics_ipynb_url) AS preview_lyrics_ipynb_url
FROM tracks t
JOIN albums a ON a.id = t.album_id
WHERE a.album_code = 'HAWK-FD'
ORDER BY t.track_number;

-- When the preview looks correct, run the safe UPDATE inside a transaction.
BEGIN;

-- Example UPDATE for a single album (Full Disclosure)
UPDATE tracks
SET
  audio_url = format('https://s3.omniversalaether.app/src/audio/%s-%s/%s.mp3', a.album_code, lpad(tracks.track_number::text,2,'0'), tracks.slug),
  lyrics_md_url = format('https://s3.omniversalaether.app/%s', tracks.lyrics_md_url),
  lyrics_ipynb_url = format('https://s3.omniversalaether.app/%s', tracks.lyrics_ipynb_url)
WHERE tracks.album_id = a.id
  AND a.album_code = 'HAWK-FD';

-- Repeat the UPDATE for other album codes or run a generic UPDATE for all albums:
-- Generic (all albums) UPDATE
-- UPDATE tracks
-- SET
--   audio_url = format('https://s3.omniversalaether.app/src/audio/%s-%s/%s.mp3', a.album_code, lpad(tracks.track_number::text,2,'0'), tracks.slug),
--   lyrics_md_url = format('https://s3.omniversalaether.app/%s', tracks.lyrics_md_url),
--   lyrics_ipynb_url = format('https://s3.omniversalaether.app/%s', tracks.lyrics_ipynb_url)
-- FROM albums a
-- WHERE tracks.album_id = a.id;

COMMIT;

-- End of updates
