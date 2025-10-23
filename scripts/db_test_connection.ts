#!/usr/bin/env node
/* db_test_connection.ts
   - Simple DB connectivity test using DATABASE_URL env var
   - Usage: node ./scripts/db_test_connection.ts
   - Requires: npm install pg
*/

import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const d = process.env.DATABASE_URL;
  if (!d) { console.error('Set DATABASE_URL in environment or .env'); process.exit(1); }
  const client = new Client({ connectionString: d });
  try {
    await client.connect();
    const res = await client.query('SELECT now() as now, 1 as ok');
    console.log('Connected; sample response:', res.rows[0]);
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
}

main();
