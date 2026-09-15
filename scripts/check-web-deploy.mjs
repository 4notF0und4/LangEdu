// npm ci / nuxt prepare zamanı yox, yalnız frontend build-ində yoxlanır.
if (process.env.VERCEL === '1') {
  let valid = false;
  try {
    valid = new URL(process.env.NUXT_PUBLIC_API_BASE).protocol === 'https:';
  } catch {}
  if (!valid) {
    console.error('Vercel-də NUXT_PUBLIC_API_BASE backend-in HTTPS ünvanı olmalıdır; sonunda /api yaz.');
    process.exitCode = 1;
  }
}
