import { existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { loadEnvFile } from 'node:process';

const apiEnv = new URL('../apps/api/.env', import.meta.url);
if (existsSync(apiEnv)) loadEnvFile(apiEnv);

const ports = process.argv.length > 2
  ? process.argv.slice(2).map(Number)
  : [3000, Number(process.env.PORT ?? 3001)];

async function checkPort(port, host) {
  await new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', (error) => {
      // IPv6 olmayan sistemlərdə yalnız IPv4 yoxlaması kifayətdir.
      if (host === '::1' && ['EADDRNOTAVAIL', 'EAFNOSUPPORT'].includes(error.code)) {
        resolve();
      } else if (error.code === 'EADDRINUSE') {
        reject(new Error(
          `${port} portu artıq istifadə olunur (${host}). ` +
          'Layihə artıq işləyirsə, http://localhost:3000 ünvanını aç. ' +
          'Yenidən başlatmaq üçün əvvəlki terminalda Ctrl+C bas.',
        ));
      } else {
        reject(error);
      }
    });
    server.listen({ port, host, exclusive: true }, () => {
      server.close((error) => error ? reject(error) : resolve());
    });
  });
}

try {
  for (const port of ports) {
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('PORT 1–65535 aralığında tam ədəd olmalıdır.');
    }
    for (const host of ['127.0.0.1', '::1']) await checkPort(port, host);
  }
} catch (error) {
  console.error(`LangEdu: ${error.message}`);
  process.exitCode = 1;
}
