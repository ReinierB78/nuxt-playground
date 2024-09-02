<template>
  <div class="max-w-[1220px] mx-auto hidden">
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-3">
      <div v-for="(item, index) in data" :key="index"
        class="sm:min-h-[400px] sm:w-[400px] bg-blue-300 p4 mx-auto rounded-xl p-6 pb-32 sm:pb-8 relative drop-shadow-2xl"
      >
        <div class="flex justify-start items-end gap-2 mb-4">
          <!-- <BeakerIcon class="w-6 text-white"/> -->
          <component :is="item.icon" class="w-6 text-white"/>
          
          <h2 class="text-3xl text-white font-bold">{{ item.title }}</h2>
        </div>
        <p class="font-light text-xl text-white mb-6">{{ item.content }}</p>
        <div class="flex justify-between my-2">
          <img src="https://placehold.co/150?text=item+1" alt="">
          <img src="https://placehold.co/150?text=item+2" alt="">
        </div>
        
      </div>
    </div>
  </div>
  <div class="sm:flex items-center justify-center h-screen w-full bg-gray-200">
    <div class="sm:h-[400px] sm:w-[400px] bg-blue-300 p4 mx-auto rounded-xl p-8 pb-32 sm:pb-8 text-center relative drop-shadow-2xl">
      <nuxt-link class="text-white underline mx-1 p-2 " to="/music">Music</nuxt-link> |
      <nuxt-link class="text-white underline mx-1 p-2 " to="/">Tool</nuxt-link>
      <h2 class="text-white font-bold text-2xl mb-3">This is my first Nuxt3 app</h2>
      <p class="text-white font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempore sint libero, quam a accusamus voluptates ab totam possimus! Dolores consequuntur rem alias eveniet, ad explicabo soluta culpa facilis praesentium!</p>
      
      <button class="absolute bottom-8 right-[50%] translate-x-[50%] transition-all duration-75 bg-primary hover:bg-red-400 p-3 rounded text-white mt-3">Read all about it</button>
    </div>
  </div>
  
</template>

<script setup lang="ts">

import { BeakerIcon, MusicalNoteIcon } from '@heroicons/vue/24/solid'
import Beaker from './Icons/Beaker.vue'

const data = [
  {
    'icon': 'Beaker',
    'title': 'Music Master',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptas laboriosam recusandae, maiores nesciunt exercitationem ab velit odio repellendus veniam doloribus hic, iure sit.'
  },
  {
  'icon': 'musical-note',
    'title': 'Lingo',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptas laboriosam recusandae, maiores nesciunt exercitationem ab velit odio repellendus veniam doloribus hic, iure shit.'
  },

]

</script>
