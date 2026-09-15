import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateWebDeploy } from './check-web-deploy.mjs';

test('Web deploy accepts only a public HTTPS API base URL', () => {
  for (const value of [undefined, 'http://localhost:3001/api', 'https://localhost/api',
    'postgresql://user:password@db/example', 'https://user:password@api.example.com/api',
    'https://api.example.com', 'https://api.example.com/api?password=example']) {
    assert.throws(() => validateWebDeploy({ VERCEL: '1', NUXT_PUBLIC_API_BASE: value }));
  }
  assert.doesNotThrow(() => validateWebDeploy({ VERCEL: '1', NUXT_PUBLIC_API_BASE: 'https://api.example.com/api' }));
  assert.doesNotThrow(() => validateWebDeploy({}));
});

test('DB credentials cannot be configured on the web deployment', () => {
  for (const key of ['DATABASE_URL', 'POSTGRES_URL', 'NUXT_PUBLIC_DATABASE_URL', 'NUXT_PUBLIC_DB_PASSWORD']) {
    assert.throws(() => validateWebDeploy({ VERCEL: '1', NUXT_PUBLIC_API_BASE: 'https://api.example.com/api', [key]: 'example-secret' }),
      (error) => !error.message.includes('example-secret'));
  }
});
