<template>
  <div class="sm:flex items-center justify-center h-screen w-full bg-gray-200">
    <div class="sm:h-[400px] sm:w-[400px] bg-blue-300 p4 mx-auto rounded-xl p-8 pb-32 sm:pb-8 text-center relative drop-shadow-2xl">
      <nuxt-link class="text-white underline mx-1 p-2 " to="/music">Music</nuxt-link> |
      <!-- <nuxt-link class="text-white underline mx-1 p-2 " to="/game">Game</nuxt-link> -->
      <h2 class="text-white font-bold text-2xl mb-3">This is my first Nuxt3 app</h2>
      <p class="text-white font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempore sint libero, quam a accusamus voluptates ab totam possimus! Dolores consequuntur rem alias eveniet, ad explicabo soluta culpa facilis praesentium!</p>
      
      <button class="absolute bottom-8 right-[50%] translate-x-[50%] transition-all duration-75 bg-red-700 hover:bg-red-400 p-3 rounded text-white mt-3">Read all about it</button>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { BeakerIcon } from '@heroicons/vue/24/solid'
const {data, pending, error, refresh} = await useFetch('https://spotify-api-wrapper.appspot.com/artist/dave+matthews/top-tracks')

const showData = () => {
    if(data) {
      return data
    } 
    if(error) {
      return error

    }

}

</script>
