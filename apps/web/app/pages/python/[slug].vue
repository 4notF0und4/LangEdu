<script setup lang="ts">
import type { Lesson } from "@langedu/contracts";
import { technologies } from "~/data/technologies";
const python = technologies[0]!;

const route = useRoute();
const config = useRuntimeConfig();
const lessonPath = computed(
  () => `/lessons/${encodeURIComponent(String(route.params.slug))}`,
);
const {
  data: lesson,
  status,
  error,
  refresh,
} = await useFetch<Lesson>(lessonPath, {
  baseURL: config.public.apiBase,
  server: false,
  timeout: 5000,
  retry: 0,
});
const isLoading = computed(
  () => status.value === "idle" || status.value === "pending",
);
const notFound = computed(() => error.value?.statusCode === 404);
useHead({
  title: () =>
    lesson.value && status.value === "success"
      ? `${lesson.value.title} — LangEdu`
      : "Python dərsi — LangEdu",
});
</script>

<template>
  <TechnologyWorkspace :technology="python">
    <main class="workspace-content lesson-main">
      <NuxtLink class="back-link" to="/">← Ana səhifə</NuxtLink>
      <p v-if="isLoading" role="status">Dərs yüklənir…</p>
      <section v-else-if="error" class="error-card" role="alert">
        <h1 class="lesson-title">
          {{ notFound ? "Dərs tapılmadı" : "Dərsi yükləmək mümkün olmadı" }}
        </h1>
        <p>
          {{
            notFound
              ? "Dərsin ünvanını yoxla və ya ana səhifəyə qayıt."
              : "Bağlantını yoxla və yenidən cəhd et."
          }}
        </p>
        <button v-if="!notFound" type="button" @click="refresh()">
          Yenidən yoxla
        </button>
      </section>
      <article v-else-if="lesson" class="lesson-content">
        <p class="eyebrow">DƏRS 01 / BAŞLANĞIC</p>
        <h1 class="lesson-title">{{ lesson.title }}</h1>
        <p class="lesson-summary">{{ lesson.summary }}</p>
        <section
          v-for="(section, index) in lesson.sections"
          :id="`section-${index}`"
          :key="section.heading"
          class="lesson-section"
        >
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </section>
        <section class="lesson-section" aria-labelledby="example-heading">
          <h2 id="example-heading">İlk kod nümunən</h2>
          <p class="response-label">Python kodu</p>
          <pre
            data-testid="lesson-code"
          ><code>{{ lesson.example.code }}</code></pre>
          <p class="response-label output-label">Gözlənilən nəticə</p>
          <pre
            data-testid="lesson-output"
          ><code>{{ lesson.example.expectedOutput }}</code></pre>
          <p>{{ lesson.example.explanation }}</p>
          <p class="lesson-note">
            Bu nümunə hazırda yalnız oxumaq üçündür. Saytda kodu işlətmək imkanı
            sonrakı mərhələdə əlavə olunacaq.
          </p>
        </section>
      </article>
    </main>
  </TechnologyWorkspace>
</template>
