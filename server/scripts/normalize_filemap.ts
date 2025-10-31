import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import * as fs from 'fs';
import * as path from 'path';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Please provide input CSV file path');
  process.exit(1);
}

const outputFile = inputFile.replace('.csv', '.cleaned.csv');

const parser = parse({
  columns: true,
  skip_empty_lines: true
});

const stringifier = stringify({ header: true });
const output = fs.createWriteStream(outputFile);

parser.on('readable', function() {
  let record;
  while ((record = parser.read()) !== null) {
    // Clean URLs - remove tree artifacts and normalize host
    const cleaned = Object.fromEntries(
      Object.entries(record).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('s3.')) {
          return [key, value
            .replace(/│   ├──/g, '')
            .replace(/s3\.omniversalmedia\.app/g, 's3.omniversalaether.app')
            .replace(/onebucket\.omniversal\.cloud/g, 's3.omniversalaether.app')
            .trim()
          ];
        }
        return [key, value];
      })
    );
    stringifier.write(cleaned);
  }
});

parser.on('end', function() {
  stringifier.end();
});

parser.on('error', function(err) {
  console.error('Error parsing CSV:', err.message);
});

fs.createReadStream(inputFile).pipe(parser);
stringifier.pipe(output);