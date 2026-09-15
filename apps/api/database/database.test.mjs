import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';
import { databaseUrl } from './connection.mjs';
import { migrate } from './migrate.mjs';
import { seed } from './seed.mjs';

test('PostgreSQL migrasiya, seed və real NestJS inteqrasiyası', { timeout: 30000 }, async (t) => {
  const schema = `test_langedu_${randomUUID().replaceAll('-', '')}`;
  const url = new URL(databaseUrl());
  const client = new Client({ connectionString: url.href, connectionTimeoutMillis: 5000 });
  await client.connect();
  let api;
  let created = false;
  try {
    await client.query(`CREATE SCHEMA "${schema}"`);
    created = true;
    await client.query(`SET search_path TO "${schema}"`);
    await t.test('Migrasiya təkrar işləyir və sxemi bir dəfə yaradır', async () => {
      await migrate(client);
      await migrate(client);
      assert.equal((await client.query('SELECT count(*)::int AS count FROM schema_migrations')).rows[0].count, 1);
    });
    await t.test('Seed təkrarlandıqda dərsi çoxaltmır və redaktəni saxlayır', async () => {
      await seed(client);
      await client.query('UPDATE lessons SET title = $1 WHERE slug = $2', ['Bazadan gələn başlıq', 'ilk-proqram']);
      await seed(client);
      assert.equal((await client.query('SELECT count(*)::int AS count FROM lessons')).rows[0].count, 1);
      assert.equal((await client.query('SELECT count(*)::int AS count FROM lesson_sections')).rows[0].count, 2);
      assert.equal((await client.query('SELECT title FROM lessons')).rows[0].title, 'Bazadan gələn başlıq');
    });

    const reservation = createServer();
    reservation.listen(0, '127.0.0.1');
    await once(reservation, 'listening');
    const port = reservation.address().port;
    await new Promise((resolve, reject) => reservation.close((error) => error ? reject(error) : resolve()));
    url.searchParams.set('options', `-c search_path=${schema}`);
    api = spawn(process.execPath, ['dist/main.js'], {
      cwd: fileURLToPath(new URL('../', import.meta.url)),
      env: { ...process.env, DATABASE_URL: url.href, PORT: String(port), HOST: '127.0.0.1',
        WEB_ORIGIN: 'https://web.example.com,https://preview.example.com' },
      stdio: 'ignore', windowsHide: true,
    });
    let spawnError;
    api.on('error', (error) => { spawnError = error; });
    const base = `http://127.0.0.1:${port}/api`;
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (spawnError) throw spawnError;
      if (api.exitCode !== null) throw new Error(`Test API bağlandı: ${api.exitCode}`);
      try { ready = (await fetch(`${base}/health`, { signal: AbortSignal.timeout(500) })).ok; } catch {}
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'Test API başlamalıdır');

    await t.test('CORS yalnız konfiqurasiyadakı frontend origin-lərinə icazə verir', async () => {
      for (const origin of ['https://web.example.com', 'https://preview.example.com']) {
        const response = await fetch(`${base}/health`, { headers: { Origin: origin } });
        assert.equal(response.headers.get('access-control-allow-origin'), origin);
      }
      const response = await fetch(`${base}/health`, { headers: { Origin: 'https://unknown.example.com' } });
      assert.equal(response.headers.get('access-control-allow-origin'), null);
    });

    await t.test('API bazadakı redaktəni və bölmələrin sırasını qaytarır', async () => {
      const response = await fetch(`${base}/lessons/ilk-proqram`);
      assert.equal(response.status, 200);
      const lesson = await response.json();
      assert.equal(lesson.title, 'Bazadan gələn başlıq');
      assert.equal(lesson.sections[0].heading, 'Python nədir?');
      assert.equal(lesson.sections[1].heading, 'print() necə işləyir?');
      assert.equal(lesson.example.code, 'print("Salam, dünya!")');
      await client.query('UPDATE lessons SET title = $1 WHERE slug = $2', ['İkinci redaktə', 'ilk-proqram']);
      assert.equal((await (await fetch(`${base}/lessons/ilk-proqram`)).json()).title, 'İkinci redaktə');
    });
    await t.test('Naməlum və SQL-ə bənzər slug yalnız 404 qaytarır', async () => {
      for (const slug of ['yoxdur', "' OR '1'='1"]) {
        assert.equal((await fetch(`${base}/lessons/${encodeURIComponent(slug)}`)).status, 404);
      }
    });
    await t.test('Baza sorğusu xətası 503 qaytarır və məzmunla örtülmür', async () => {
      await client.query('ALTER TABLE lessons RENAME TO lessons_unavailable');
      try {
        assert.equal((await fetch(`${base}/lessons/ilk-proqram`)).status, 503);
      } finally {
        await client.query('ALTER TABLE lessons_unavailable RENAME TO lessons');
      }
    });
  } finally {
    if (api?.pid && api.exitCode === null) {
      const stopped = once(api, 'exit');
      api.kill();
      await stopped;
    }
    // Yalnız bu testin yaratdığı təsadüfi sxem silinir; public cədvəllərə toxunulmur.
    try {
      if (created) await client.query(`DROP SCHEMA "${schema}" CASCADE`);
    } finally { await client.end(); }
  }
});
