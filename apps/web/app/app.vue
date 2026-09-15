<template>
  <div>
    <header class="site-header">
      <div class="header-inner">
        <NuxtLink class="brand" to="/" aria-label="LangEdu ana səhifə"
          ><span class="brand-mark" aria-hidden="true">L</span>LangEdu</NuxtLink
        >
        <nav class="primary-nav" aria-label="Əsas menyu">
          <NuxtLink to="/">Texnologiyalar</NuxtLink
          ><NuxtLink to="/python"
            >Python sahəsi <span aria-hidden="true">↗</span></NuxtLink
          >
        </nav>
        <span class="header-note">Bilikdən bacarığa.</span>
      </div>
    </header>
    <NuxtPage />
    <footer class="site-footer">
      <NuxtLink class="footer-brand" to="/">LangEdu</NuxtLink
      ><span>Oxu. Anla. Tətbiq et.</span
      ><span>Azərbaycan dilində açıq öyrənmə məkanı.</span>
    </footer>
  </div>
</template>
