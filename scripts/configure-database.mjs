import { existsSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const rootEnv = new URL('../.env', import.meta.url);
const apiEnv = new URL('../apps/api/.env', import.meta.url);
if (existsSync(rootEnv) || existsSync(apiEnv)) {
  console.error('Mövcud .env faylı var; əvəz edilmir. Docker və API parollarını əl ilə uyğunlaşdır.');
  process.exitCode = 1;
} else {
  const adminPassword = randomBytes(32).toString('hex');
  const appPassword = randomBytes(32).toString('hex');
  writeFileSync(rootEnv, `POSTGRES_PASSWORD=${adminPassword}\nAPP_DB_PASSWORD=${appPassword}\n`, { flag: 'wx', mode: 0o600 });
  writeFileSync(apiEnv, `PORT=3001\nHOST=127.0.0.1\nWEB_ORIGIN=http://localhost:3000\nDATABASE_URL=postgresql://langedu:${appPassword}@127.0.0.1:5432/langedu\n`, { flag: 'wx', mode: 0o600 });
  console.log('Docker üçün .env və API üçün apps/api/.env yaradıldı. Parollar Git-ə daxil edilmir.');
}
