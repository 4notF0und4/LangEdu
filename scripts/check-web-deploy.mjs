// Only web build runs this check; workspace installation/Nuxt prepare must
// also work in the API project, which has no frontend environment variables.
import { pathToFileURL } from 'node:url';

export function validateWebDeploy(env) {
  if (env.VERCEL !== '1') return;
  if (env.DATABASE_URL || env.POSTGRES_URL || Object.keys(env).some((key) =>
    /^(NUXT_PUBLIC|VITE)_.*(DATABASE|POSTGRES|PASSWORD|SECRET)/i.test(key))) {
    throw new Error('DB bağlantısını və şifrələri Web layihəsindən sil; yalnız API layihəsinin environment variables bölməsində saxla.');
  }
  let valid = false;
  try {
    const url = new URL(env.NUXT_PUBLIC_API_BASE);
    valid = url.protocol === 'https:' && !url.username && !url.password
      && !url.search && !url.hash && /^\/api\/?$/.test(url.pathname)
      && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  } catch {}
  if (!valid) {
    throw new Error('Web layihəsində NUXT_PUBLIC_API_BASE təyin et: https://FAKTIKI-API-DOMENI/api. DB bağlantısı və ya frontend domeni deyil, NestJS domenini yaz.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { validateWebDeploy(process.env); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
