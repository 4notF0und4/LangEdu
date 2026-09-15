<script setup lang="ts">
withDefaults(
  defineProps<{ code: string; language?: string; label?: string }>(),
  {
    language: "PYTHON 3",
    label: "Nümunə",
  },
);
</script>
<template>
  <div class="code-panel">
    <div class="code-toolbar">
      <span>{{ language }}</span
      ><span>{{ label }}</span>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>
