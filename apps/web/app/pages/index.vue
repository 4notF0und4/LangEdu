<script setup lang="ts">
import type { HealthResponse } from '@langedu/contracts';

const config = useRuntimeConfig();

// server: false sorğunu brauzerdən göndərir; CORS əlaqəsi də yoxlanır.
const { data, status, error, refresh } = await useFetch<HealthResponse>('/health', {
  baseURL: config.public.apiBase,
  server: false,
  timeout: 5000,
  retry: 0,
});

const isChecking = computed(() => status.value === 'idle' || status.value === 'pending');
const isHealthy = computed(() => status.value === 'success' && data.value?.status === 'ok');
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <a class="brand" href="/" aria-label="LangEdu ana səhifə">
        <span class="brand-mark" aria-hidden="true">L</span>
        LangEdu
      </a>
      <span class="language-label">İlk dilimiz: Python</span>
    </header>

    <main>
      <section class="intro" aria-labelledby="page-title">
        <p class="eyebrow">ADDIM-ADDIM ÖYRƏN</p>
        <h1 id="page-title">Python ilə<br><span>ilk addımını at.</span></h1>
        <p class="intro-description">
          Proqramlaşdırmanı dərslər, kod nümunələri və praktik tapşırıqlarla öyrənəcəyin yer.
          İlk Python dərsinlə başla.
        </p>
        <NuxtLink class="lesson-link" to="/python/ilk-proqram">İlk dərsə başla <span aria-hidden="true">→</span></NuxtLink>
      </section>

      <section class="health-card" aria-labelledby="health-title" :aria-busy="isChecking">
        <div class="card-heading">
          <div>
            <p class="eyebrow">MƏRHƏLƏ 01</p>
            <h2 id="health-title">İlk bağlantı</h2>
          </div>
          <span class="step-number" aria-hidden="true">01 /</span>
        </div>
        <p class="card-description">Tətbiqin serverlə əlaqəsini buradan yoxlaya bilərsən.</p>

        <div class="connection-status" role="status" aria-live="polite">
          <span class="status-dot" :class="{ connected: isHealthy, failed: status === 'error' }" aria-hidden="true" />
          <span v-if="isChecking">Bağlantı yoxlanılır…</span>
          <span v-else-if="isHealthy">Bağlantı uğurludur</span>
          <span v-else>Serverə qoşulmaq mümkün olmadı</span>
        </div>

        <p v-if="error" class="error-message">
          Serverin işlədiyinə əmin ol və yenidən yoxla.
        </p>
        <div v-if="isHealthy && data" class="response-details">
          <p class="response-label">Serverin cavabı</p>
          <pre data-testid="health-response">{{ JSON.stringify(data, null, 2) }}</pre>
        </div>

        <button type="button" :disabled="isChecking" @click="refresh()">
          {{ isChecking ? 'Yoxlanılır…' : 'Yenidən yoxla' }}
          <span aria-hidden="true">↗</span>
        </button>
      </section>
    </main>

    <footer>
      <span>LangEdu · Öyrənərək qururuq.</span>
      <span>Python · İlk proqramın</span>
    </footer>
  </div>
</template>
