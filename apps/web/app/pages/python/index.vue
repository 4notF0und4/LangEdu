<script setup lang="ts">
import { technologies } from "~/data/technologies";
const python = technologies[0]!;
useHead({ title: "Python — Öyrənmə sahəsi · LangEdu" });
</script>
<template>
  <TechnologyWorkspace :technology="python">
    <main class="workspace-content">
      <section class="topic-hero">
        <div>
          <p class="eyebrow">SƏNİN ÖYRƏNMƏ SAHƏN</p>
          <h1>Salam, <em>Python.</em></h1>
          <p class="lead">
            Oxunaqlı kod, geniş imkanlar. Python-u tanı, ilk proqramını yaz və
            addım-addım irəlilə.
          </p>
          <NuxtLink class="primary-button" to="/python/ilk-proqram"
            >İlk dərsə başla <span aria-hidden="true">→</span></NuxtLink
          >
        </div>
        <span class="topic-monogram" aria-hidden="true">Py<span>_</span></span>
      </section>
      <div class="topic-facts">
        <div>
          <small>KATEQORİYA</small><strong>Proqramlaşdırma dili</strong>
        </div>
        <div><small>SƏVİYYƏ</small><strong>Başlanğıc</strong></div>
        <div><small>HAZIR MƏZMUN</small><strong>1 dərs</strong></div>
      </div>
      <section class="overview-section">
        <p class="eyebrow">BÖLMƏNİ SEÇ</p>
        <h2>Bir dil, üç baxış bucağı.</h2>
        <div class="path-grid">
          <NuxtLink to="/python/melumat" class="path-card"
            ><span class="path-number">01 / KƏŞF ET</span>
            <h3>Python nədir?</h3>
            <p>Dilin məqsədi, istifadə sahələri və əsas anlayışları.</p>
            <span class="text-link">Məlumat kitabçası ↗</span></NuxtLink
          ><NuxtLink to="/python/ilk-proqram" class="path-card"
            ><span class="path-number">02 / ÖYRƏN</span>
            <h3>İlk proqramın</h3>
            <p>İlk dərsə keç, kod nümunəsini və nəticəsini birlikdə araşdır.</p>
            <span class="text-link">Dərsi aç ↗</span></NuxtLink
          ><NuxtLink to="/python/praktika" class="path-card"
            ><span class="path-number">03 / TƏTBİQ ET</span>
            <h3>Praktika sahəsi</h3>
            <p>Kod icrası, tapşırıqlar və quizlər üçün ayrılmış məkan.</p>
            <span class="text-link">Hazırlıq vəziyyəti ↗</span></NuxtLink
          >
        </div>
      </section>
      <aside class="info-note">
        Yeni başlayırsan? Əvvəlki proqramlaşdırma biliyi tələb olunmur. İlk
        dərsdə <code>print()</code> ilə ekrana mətn çıxarmağı öyrənəcəksən.
      </aside>
    </main>
  </TechnologyWorkspace>
</template>
