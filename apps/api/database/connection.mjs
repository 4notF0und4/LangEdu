import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { Client } from 'pg';

export function databaseUrl() {
  const envFile = new URL('../.env', import.meta.url);
  if (existsSync(envFile)) loadEnvFile(envFile);
  if (!process.env.DATABASE_URL) throw new Error('apps/api/.env faylında DATABASE_URL təyin et.');
  return process.env.DATABASE_URL;
}

export async function runDatabaseCommand(action) {
  let client;
  try {
    client = new Client({ connectionString: databaseUrl(), connectionTimeoutMillis: 5000 });
    await client.connect();
    await action(client);
  } catch (error) {
    console.error(`Baza əməliyyatı alınmadı (${error.code ?? error.name}). DATABASE_URL, xidmət və migrasiyaları yoxla.`);
    process.exitCode = 1;
  } finally {
    if (client) await client.end();
  }
}
