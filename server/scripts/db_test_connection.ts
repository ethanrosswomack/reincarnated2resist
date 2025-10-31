import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Successfully connected to database');
    const result = await client.query('SELECT NOW()');
    console.log('Current time from DB:', result.rows[0].now);
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await client.end();
  }
}

testConnection();