<template>
  <div class="w-[80%] mx-auto hidden">
    <p>x-pos: {{ xCanvasPos }}</p>
    <p>y-pos: {{ yCanvasPos }}</p>
    {{ xScreenPos }}
  </div>
  <div :style="{ background: `url(${backgroundImageUrl}) no-repeat ${xCanvasPos}px ${yCanvasPos - 5}px `, height: `${imageHeight}px`, width: `${imageWidth}px`}" :class="`${xDirection == -1 ? 'turned' : null} left-${xScreenPos} top-${yScreenPos}`" />

  <!-- <div :style="{ background: `url(${backgroundImageUrl}) no-repeat center / 20%`,  height: `750px`, width: `1350px`}"/> -->

</template>

<script setup lang="ts">

import backgroundImageUrl from "~/assets/images/spritesheet_grant.png"

import { jump } from '@/assets/js/movements/jump'
import { step } from '@/assets/js/movements/step'

const xCanvasPos = ref(0)
const yCanvasPos = ref(0)

const xScreenPos = ref(0)
const yScreenPos = ref(0)

const xDirection = ref(1)

const speed = ref(1)

const imageWidth = ref(165)
const imageHeight = ref(290)

const indexOfMove = ref(0)

const animateRoll = (kindOfMove: any) => {
  
  let lengthOfMove = kindOfMove.length
  
  if(indexOfMove.value < lengthOfMove) {
    xCanvasPos.value = kindOfMove[indexOfMove.value].x * imageWidth.value * -1
    yCanvasPos.value = kindOfMove[indexOfMove.value].y * imageHeight.value * -1
    indexOfMove.value++
    xScreenPos.value++
  } else {
    indexOfMove.value = 0
  }
}

onMounted(() => {
  animateRoll(step)
  document.addEventListener('keydown', function(input) {
    switch(input.key) {
      case 'ArrowRight':
        animateRoll(step)
      break;     
      case 'ArrowLeft':
        animateRoll(step)
      break;
      case 'ArrowUp':
        let jumpIndex = 0
        const jumpLoop = setInterval(function() {
          animateRoll(jump)                    
          jumpIndex++
          if(jumpIndex == jump.length) {
            clearInterval(jumpLoop)
          }
        }, 25)
        jumpIndex = 0
      break;
    }
  })

})

</script>