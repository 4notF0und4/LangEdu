import 'reflect-metadata';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { Logger, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap(): Promise<INestApplication> {
  const onVercel = process.env.VERCEL === '1';
  if (!onVercel && existsSync('.env')) {
    loadEnvFile('.env');
  }

  // Vercel owns the listener; PORT is only a local server setting.
  const port = onVercel ? undefined : Number(process.env.PORT ?? 3001);
  if (port !== undefined && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    throw new Error('PORT 1–65535 aralığında tam ədəd olmalıdır.');
  }

  if (onVercel && !process.env.WEB_ORIGIN) {
    throw new Error('Vercel-də WEB_ORIGIN frontend-in HTTPS origin-i olmalıdır.');
  }
  const origins = (process.env.WEB_ORIGIN ?? 'http://localhost:3000')
    .split(',').map((origin) => origin.trim()).filter(Boolean);
  if (!origins.length || origins.some((origin) => {
    try {
      const url = new URL(origin);
      return url.origin !== origin || !['http:', 'https:'].includes(url.protocol)
        || (onVercel && url.protocol !== 'https:');
    } catch { return true; }
  })) {
    throw new Error('WEB_ORIGIN vergüllə ayrılmış HTTP/HTTPS origin-lər olmalıdır; yol və son slash yazma.');
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: origins });
  if (onVercel) {
    await app.init();
  } else {
    app.enableShutdownHooks();
    await app.listen(port!, process.env.HOST ?? '127.0.0.1');
    Logger.log(`API hazırdır: http://localhost:${port}/api/health`, 'Bootstrap');
  }
  return app;
}

const app = await bootstrap().catch((error: unknown) => {
  Logger.error(error, undefined, 'Bootstrap');
  throw error;
});

// Export the initialized Express handler, not the Nest application wrapper.
export default app.getHttpAdapter().getInstance();
