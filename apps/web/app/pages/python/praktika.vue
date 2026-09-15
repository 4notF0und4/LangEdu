<script setup lang="ts">
import { technologies } from "~/data/technologies";
const python = technologies[0]!;
useHead({ title: "Python praktikası — LangEdu" });
</script>
<template>
  <TechnologyWorkspace :technology="python"
    ><main class="workspace-content">
      <p class="eyebrow">TƏTBİQ ET</p>
      <h1>Bilikdən <em>praktikaya.</em></h1>
      <p class="lead">
        Öyrəndiklərini sınayacağın sahə buradır. İnteraktiv imkanlar hələ
        hazırlanır.
      </p>
      <div class="practice-grid">
        <article class="practice-card">
          <span class="path-number">01</span>
          <h2>Kod meydançası</h2>
          <p>Python kodunu yazıb nəticəsini görəcəyin redaktor.</p>
          <span class="availability">Hazırlanır</span>
        </article>
        <article class="practice-card">
          <span class="path-number">02</span>
          <h2>Tapşırıqlar</h2>
          <p>Həllini testlərlə yoxlayacağın proqramlaşdırma məsələləri.</p>
          <span class="availability">Hazırlanır</span>
        </article>
        <article class="practice-card">
          <span class="path-number">03</span>
          <h2>Quizlər</h2>
          <p>Anlayışları nə qədər mənimsədiyini yoxlayan qısa suallar.</p>
          <span class="availability">Hazırlanır</span>
        </article>
      </div>
      <div class="info-note">
        <h2>Bu gün nədən başlaya bilərsən?</h2>
        <p>
          İlk dərsdəki kodu oxu və nəticəsinin nə olacağını düşün. Sonra
          göstərilən nəticə ilə müqayisə et.
        </p>
        <NuxtLink class="text-link" to="/python/ilk-proqram"
          >Kod nümunəsinə bax →</NuxtLink
        >
      </div>
    </main></TechnologyWorkspace
  >
</template>
