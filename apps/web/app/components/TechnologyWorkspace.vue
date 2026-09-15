<script setup lang="ts">
import type { Technology } from "~/data/technologies";
defineProps<{ technology: Technology }>();
const route = useRoute();
</script>

<template>
  <div class="workspace">
    <aside class="study-sidebar" aria-label="Texnologiya menyusu">
      <NuxtLink class="back-link" to="/">← Bütün texnologiyalar</NuxtLink>
      <div class="sidebar-identity">
        <span class="tech-mark">{{ technology.mark }}</span>
        <div>
          <strong>{{ technology.name }}</strong
          ><small>{{ technology.kind }} · Başlanğıc</small>
        </div>
      </div>
      <p class="menu-label">KƏŞF ET</p>
      <nav class="study-nav">
        <NuxtLink :to="`/${technology.slug}`" exact-active-class="selected"
          >İcmal <span>↗</span></NuxtLink
        >
        <NuxtLink :to="`/${technology.slug}/melumat`" active-class="selected"
          >Məlumat kitabçası</NuxtLink
        >
      </nav>
      <p class="menu-label">ÖYRƏN</p>
      <nav class="study-nav" aria-label="Dərslər">
        <NuxtLink
          :to="`/${technology.slug}/ilk-proqram`"
          active-class="selected"
          ><span><small>01</small> İlk proqramın</span></NuxtLink
        >
      </nav>
      <p class="sidebar-hint">Yeni dərslər bu siyahıya əlavə olunacaq.</p>
      <p class="menu-label">TƏTBİQ ET</p>
      <nav class="study-nav">
        <NuxtLink :to="`/${technology.slug}/praktika`" active-class="selected"
          >Praktika <span class="tiny-label">Hazırlanır</span></NuxtLink
        >
      </nav>
      <div class="sidebar-note">
        <span>Öz tempinlə öyrən.</span>
        <p>Bir anlayış, bir nümunə, bir addım.</p>
      </div>
    </aside>
    <div class="workspace-body">
      <div class="workspace-topline">
        <span
          >Texnologiyalar <span class="separator">/</span>
          {{ technology.name }}</span
        ><span class="edition">AZƏRBAYCAN DİLİNDƏ</span>
      </div>
      <nav class="section-tabs" aria-label="Bölmələr">
        <NuxtLink
          :to="`/${technology.slug}`"
          :class="{ active: route.path === `/${technology.slug}` }"
          >İcmal</NuxtLink
        >
        <NuxtLink
          :to="`/${technology.slug}/ilk-proqram`"
          :class="{
            active: !['melumat', 'praktika', technology.slug].includes(
              String(route.path.split('/').pop()),
            ),
          }"
          >Dərslər</NuxtLink
        >
        <NuxtLink :to="`/${technology.slug}/melumat`" active-class="active"
          >Məlumat</NuxtLink
        >
        <NuxtLink :to="`/${technology.slug}/praktika`" active-class="active"
          >Praktika</NuxtLink
        >
      </nav>
      <slot />
    </div>
  </div>
</template>
