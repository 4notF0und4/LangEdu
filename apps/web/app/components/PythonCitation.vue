<script setup lang="ts">
import {
  pythonReferences,
  type PythonReferenceId,
} from "~/data/python-reference";
const props = defineProps<{ source: PythonReferenceId }>();
const index = computed(() =>
  pythonReferences.findIndex((item) => item.id === props.source),
);
const reference = computed(() => pythonReferences[index.value]!);
</script>
<template>
  <sup class="source-citation"
    ><a
      :href="`#ref-${source}`"
      :aria-label="`Mənbə ${index + 1}: ${reference.title}`"
      :title="reference.title"
      >[{{ index + 1 }}]</a
    ></sup
  >
</template>
