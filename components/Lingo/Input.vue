<template>
  <div :id="`input-holder-${row}-${id}`">
    <input class="flex bg-blue-800 text-white text-4xl rounded-xl w-8 h-8 text-white mr-2 text-center items-start" type="text" placeholder="."  maxlength="1" @keyup="$emit('input-letter')" :id="`input-${row}-${id}`" :disabled="disabled" onkeyup="this.value = this.value.toUpperCase();" :data-column="id"/>
  </div>
</template>

<script setup lang="ts">
const { id, row, disabled } = defineProps<{
  id: number,
  row: number,
  disabled: boolean
}>()
</script>
