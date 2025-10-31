import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import * as fs from 'fs';
import * as path from 'path';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Please provide input cleaned filemap CSV');
  process.exit(1);
}

const outputDir = path.dirname(inputFile);
const albums = new Map();
const tracks = [];

const parser = parse({
  columns: true,
  skip_empty_lines: true
});

parser.on('readable', function() {
  let record;
  while ((record = parser.read()) !== null) {
    if (record.type === 'album') {
      albums.set(record.album_code, {
        title: record.title,
        album_code: record.album_code
      });
    } else if (record.type === 'track') {
      tracks.push({
        album_code: record.album_code,
        title: record.title,
        slug: record.slug,
        audio_url: record.audio_url
      });
    }
  }
});

parser.on('end', function() {
  // Write albums CSV
  const albumWriter = stringify({ header: true });
  const albumsFile = fs.createWriteStream(path.join(outputDir, 'albums_import.csv'));
  albumWriter.pipe(albumsFile);
  for (const album of albums.values()) {
    albumWriter.write(album);
  }
  albumWriter.end();

  // Write tracks CSV  
  const trackWriter = stringify({ header: true });
  const tracksFile = fs.createWriteStream(path.join(outputDir, 'tracks_import.csv'));
  trackWriter.pipe(tracksFile);
  for (const track of tracks) {
    trackWriter.write(track);
  }
  trackWriter.end();

  console.log('Generated:');
  console.log('- albums_import.csv');
  console.log('- tracks_import.csv');
});

parser.on('error', function(err) {
  console.error('Error parsing CSV:', err.message);
});

fs.createReadStream(inputFile).pipe(parser);