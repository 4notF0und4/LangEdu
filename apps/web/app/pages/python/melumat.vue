<script setup lang="ts">
import { technologies } from "~/data/technologies";
const python = technologies[0]!;
useHead({ title: "Python haqqında — LangEdu" });
</script>
<template>
  <TechnologyWorkspace :technology="python"
    ><main class="workspace-content reference-layout">
      <article class="prose">
        <p class="eyebrow">MƏLUMAT KİTABÇASI</p>
        <h1>Python <em>nədir?</em></h1>
        <p class="lead">
          Python müxtəlif məqsədlər üçün istifadə olunan, oxunaqlı sintaksisə
          malik proqramlaşdırma dilidir.
        </p>
        <section id="istifade">
          <h2>Harada istifadə olunur?</h2>
          <p>
            Python ilə təkrarlanan işləri avtomatlaşdırmaq, faylları emal etmək,
            məlumatları təhlil etmək və veb tətbiqlərin server hissəsini qurmaq
            mümkündür.
          </p>
          <div class="tag-list">
            <span>Avtomatlaşdırma</span><span>Məlumat analizi</span
            ><span>Veb backend</span>
          </div>
        </section>
        <section id="sintaksis">
          <h2>Kod necə görünür?</h2>
          <p>
            Aşağıdakı proqram ekrana bir salamlaşma yazır.
            <code>print()</code> funksiyasına ötürülən mətn dırnaqlar arasında
            göstərilir.
          </p>
          <div class="code-panel">
            <div class="code-toolbar">
              <span>PYTHON</span><span>Nümunə</span>
            </div>
            <pre><code>print("Salam, dünya!")</code></pre>
          </div>
        </section>
        <section id="anlayislar">
          <h2>Dil, framework və kitabxana</h2>
          <dl class="definition-list">
            <div>
              <dt>Proqramlaşdırma dili</dt>
              <dd>
                Proqramın göstərişlərini ifadə etmək üçün qaydalar və
                sintaksisdir. Python bir dildir.
              </dd>
            </div>
            <div>
              <dt>Kitabxana</dt>
              <dd>
                Müəyyən işlər üçün istifadə edə biləcəyin hazır kod toplusudur.
              </dd>
            </div>
            <div>
              <dt>Framework</dt>
              <dd>Tətbiqi qurmaq üçün struktur və iş qaydaları təqdim edir.</dd>
            </div>
          </dl>
        </section>
        <NuxtLink class="primary-button" to="/python/ilk-proqram"
          >İndi ilk dərsə keç →</NuxtLink
        >
      </article>
      <aside class="article-toc">
        <p class="menu-label">BU SƏHİFƏDƏ</p>
        <a href="#istifade">İstifadə sahələri</a
        ><a href="#sintaksis">Kod nümunəsi</a
        ><a href="#anlayislar">Əsas anlayışlar</a>
      </aside>
    </main></TechnologyWorkspace
  >
</template>
