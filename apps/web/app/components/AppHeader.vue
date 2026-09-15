<template>
  <header class="site-header">
    <div class="header-inner">
      <AppBrand />
      <nav class="primary-nav" aria-label="Əsas menyu">
        <NuxtLink to="/">Texnologiyalar</NuxtLink
        ><NuxtLink to="/python"
          >Python sahəsi <span aria-hidden="true">↗</span></NuxtLink
        >
      </nav>
      <span class="header-note">Bilikdən bacarığa.</span><ThemePicker />
    </div>
  </header>
</template>
