import 'dotenv/config';
import { Client } from 'pg';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL missing');
    process.exitCode = 2;
    return;
  }
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
    console.log('Public tables:');
    res.rows.forEach(r => console.log('-', r.table_name));
  } catch (err) {
    console.error('DB check error:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main().catch(err => { console.error('Unexpected error', err); process.exitCode = 1; });
