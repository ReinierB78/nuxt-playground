<template>
  <div class="border border-white p-2" v-if="getLocalStorage()">
    <ul class="text-white inline flex">
      <li 
        v-for="(item, index) in getLocalStorage()" :key="index"
        @clicked="$emit('clicked', item)" 
        class="mr-2 bg-gray-200 py-1 px-3 rounded-2xl text-gray-800 text-xs" role="button"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const getLocalStorage: any = () => {
  let localStorageSet = localStorage.getItem('recentlySearched')
  if(localStorageSet) {
    return JSON.parse(localStorageSet)
  }
  return null
}

</script>