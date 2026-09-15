import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { runDatabaseCommand } from './connection.mjs';

export async function migrate(client) {
  await client.query('BEGIN');
  try {
    // Eyni vaxtda iki migrasiya prosesi sxemi dəyişməsin.
    await client.query('SELECT pg_advisory_xact_lock(74120319)');
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now()
    )`);
    const directory = new URL('./migrations/', import.meta.url);
    for (const name of (await readdir(directory)).filter((name) => name.endsWith('.sql')).sort()) {
      const sql = await readFile(new URL(name, directory), 'utf8');
      const checksum = createHash('sha256').update(sql).digest('hex');
      const applied = await client.query('SELECT checksum FROM schema_migrations WHERE name = $1', [name]);
      if (applied.rowCount) {
        if (applied.rows[0].checksum !== checksum) throw new Error(`Tətbiq edilmiş migrasiya dəyişdirilib: ${name}`);
        continue;
      }
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)', [name, checksum]);
      console.log(`Migrasiya: ${name}`);
    }
    await client.query('COMMIT');
    console.log('Baza sxemi hazırdır.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runDatabaseCommand(migrate);
}
