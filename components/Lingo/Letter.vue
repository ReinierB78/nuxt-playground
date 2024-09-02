<template>
  <div :id="`input-holder-${row}-${id}`">
    <span class="flex bg-blue-800 text-white text-4xl rounded-xl w-8 h-8 text-white mr-2 text-center items-center justify-center" :id="`input-${row}-${id}`">
      {{ letter }}
  </span>
  </div>
</template>

<script setup lang="ts">
const { id, row, value } = defineProps<{
  id: number,
  row?: number,
  value: string
}>()
</script>
