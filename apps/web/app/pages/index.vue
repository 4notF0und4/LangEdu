<script setup lang="ts">
import { technologies, type TechnologyKind } from "~/data/technologies";
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});
const search = ref("");
const category = ref("Hamısı");
const categories: ("Hamısı" | TechnologyKind)[] = [
  "Hamısı",
  "Dil",
  "Framework",
  "Kitabxana",
];
const filtered = computed(() =>
  technologies.filter(
    (item) =>
      (category.value === "Hamısı" || item.kind === category.value) &&
      `${item.name} ${item.description}`
        .toLocaleLowerCase("az")
        .includes(search.value.toLocaleLowerCase("az").trim()),
  ),
);
useHead({ title: "LangEdu — Texnologiyanı anla, kodla öyrən" });
</script>

<template>
  <main class="catalog-page">
    <section class="catalog-hero" aria-labelledby="page-title">
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="accent-line" /> MARAĞIN BAŞLADIĞI YER
        </p>
        <h1 id="page-title">Texnologiyanı anla.<br /><em>Kodla öyrən.</em></h1>
        <p class="hero-description">
          Bir anlayışı araşdır, bir dili öyrən, bildiklərini tətbiq et.
          Proqramlaşdırma dünyası üçün sənin bilik və öyrənmə məkanın.
        </p>
        <a class="primary-button" href="#texnologiyalar"
          >Öyrənmə sahəni seç <span aria-hidden="true">↓</span></a
        ><span class="hero-footnote"
          >İlk dayanacaq: Python. Davamı birlikdə böyüyəcək.</span
        >
      </div>
      <div class="editorial-panel">
        <div class="panel-top">
          <span>ÖYRƏNMƏ XƏRİTƏN</span><span aria-hidden="true">↗</span>
        </div>
        <div class="map-step">
          <span class="map-number">01</span>
          <div>
            <h2>Kəşf et</h2>
            <p>Nədir, nə üçün var, harada istifadə olunur?</p>
          </div>
        </div>
        <div class="map-step">
          <span class="map-number">02</span>
          <div>
            <h2>Öyrən</h2>
            <p>Anlayışları dərslər və kod nümunələri ilə mənimsə.</p>
          </div>
        </div>
        <div class="map-step">
          <span class="map-number">03</span>
          <div>
            <h2>Tətbiq et</h2>
            <p>Praktikaya keç. Tapşırıq və quizlər hazırlanır.</p>
          </div>
        </div>
        <div class="panel-bottom">
          <span>Bir mövzu. Bütün mənzərə.</span
          ><span aria-hidden="true">✳</span>
        </div>
      </div>
    </section>
    <section
      id="texnologiyalar"
      class="catalog-section"
      aria-labelledby="catalog-title"
    >
      <div class="section-heading">
        <div>
          <p class="eyebrow">BİLİK KATALOQU</p>
          <h2 id="catalog-title">Nə öyrənmək istəyirsən?</h2>
        </div>
        <p>
          Hər texnologiyanın öz sahəsi.<br />Məlumat, dərs və praktika bir
          yerdə.
        </p>
      </div>
      <div class="catalog-toolbar">
        <div class="filter-group" aria-label="Texnologiya növü">
          <button
            v-for="item in categories"
            :key="item"
            :disabled="!ready"
            :aria-pressed="category === item"
            :class="{ chosen: category === item }"
            @click="category = item"
          >
            {{
              item === "Dil"
                ? "Dillər"
                : item === "Framework"
                  ? "Framework-lər"
                  : item === "Kitabxana"
                    ? "Kitabxanalar"
                    : item
            }}
          </button>
        </div>
        <label class="search-field"
          ><span aria-hidden="true">⌕</span
          ><input
            v-model="search"
            :disabled="!ready"
            type="search"
            aria-label="Texnologiya axtar"
            placeholder="Texnologiya axtar…"
        /></label>
      </div>
      <div class="technology-grid">
        <article
          v-for="item in filtered"
          :key="item.slug"
          class="technology-card"
          :class="{ available: item.available }"
        >
          <div class="card-top">
            <span class="tech-mark" :class="item.slug">{{ item.mark }}</span
            ><span class="availability" :class="{ live: item.available }">{{
              item.available ? "Öyrənməyə açıq" : "Planlaşdırılır"
            }}</span>
          </div>
          <p class="card-kind">{{ item.kind }}</p>
          <h3>{{ item.name }}</h3>
          <p class="card-copy">{{ item.description }}</p>
          <NuxtLink
            v-if="item.available"
            class="card-action"
            :to="`/${item.slug}`"
            >Python sahəsinə keç <span aria-hidden="true">↗</span></NuxtLink
          ><span v-else class="card-action muted"
            >Məzmun hələ hazırlanmayıb <span aria-hidden="true">—</span></span
          >
        </article>
      </div>
      <p v-if="!filtered.length" class="empty-state" role="status">
        Uyğun texnologiya tapılmadı. Axtarışı və ya kateqoriyanı dəyiş.
      </p>
    </section>
    <section class="learning-note">
      <span class="note-symbol" aria-hidden="true">✳</span>
      <div>
        <h2>Sadəcə sintaksis əzbərləmə.</h2>
        <p>
          Bir mövzunun məntiqini anla, nümunəsinə bax və öyrəndiyini tətbiq
          etməyə hazırlaş.
        </p>
      </div>
      <NuxtLink class="text-link" to="/python/ilk-proqram"
        >İlk dərsə başla →</NuxtLink
      >
    </section>
  </main>
</template>
