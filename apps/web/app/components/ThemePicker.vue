<script setup lang="ts">
const { preference } = useTheme();
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});
useHead(() => ({ htmlAttrs: { "data-theme": preference.value } }));
</script>
<template>
  <label class="theme-picker"
    ><span>Görünüş</span
    ><select v-model="preference" :disabled="!ready" aria-label="Rəng rejimi">
      <option value="system">Sistem</option>
      <option value="light">İşıqlı</option>
      <option value="dark">Qaranlıq</option>
    </select></label
  >
</template>
