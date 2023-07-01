<template>
  <div class="min-h-screen bg-gray-200 w-full flex justify-center items-center">
    <div class="">
      <span id="xPosition">{{ xPosition }}</span><br>
      <span id="direction">{{ direction }}</span><br>
      <span id="speed">{{ speed }}</span>
      <p>Stepcount: {{  stepCount }}</p>
      <p>AnimationRow: {{  animationRow }}</p>
      {{  yPosition }}
    </div>
    <!-- <img src="../assets/images/Turn-Around.png" alt=""> -->
    <div :style="{ background: `url(${backgroundImageUrl}) no-repeat ${xPosition}px ${yPosition}px`, height: `${animationRowHeight - 0}px`, width: `${step}px`}" :class="`${xDirection == -1 ? 'turned' : null}`"/>
    <div :style="{ background: `url(${backgroundImageUrl}) no-repeat center / contain`,  height: `750px`, width: `1350px`}"/>
  </div>
</template>

<script setup lang="ts">

import { ConstantTypes } from "@vue/compiler-core";
import backgroundImageUrl from "~/assets/images/spritesheet_grant.png"

const direction = ref(0)
const speed = ref(150)

const step = 165
const stepCount = ref(0)
const animationRow = ref(6)
const animationRowHeight = ref(245)

const xPosition = ref(0 - (165 * 11))
const yPosition = ref(-350 - 290 - 290 - 290 )

const xDirection = ref(0)

const walking = (direction:string) => 
{
    xPosition.value = xPosition.value - step
    stepCount.value++
    if (stepCount.value == 10) {
      stepCount.value = 0
      xPosition.value = 0
      // yPosition.value = yPosition.value - 290
      if(yPosition.value == -50) {
        animationRow.value++
        yPosition.value = -340
      } else if(yPosition.value == -340) {
        animationRow.value++
        yPosition.value = -630
      } else {
        animationRow.value = 1
        yPosition.value = -50
      }

      // yPosition.value = yPosition.value + (animationRowHeight.value * -animationRow.value)
    }
}
const jumping = () => {
  yPosition.value = -630
  stepCount.value = 10
  for(let step = 0; step < 30; step++) {

  }
  if (stepCount.value == 12) {
      stepCount.value = 0
      xPosition.value = 0
      // yPosition.value = yPosition.value - 290
      if(yPosition.value == -50) {
        animationRow.value++
        yPosition.value = -340
      } else if(yPosition.value == -340) {
        animationRow.value++
        yPosition.value = -630
      } else {
        animationRow.value = 1
        yPosition.value = -50
      }

      // yPosition.value = yPosition.value + (animationRowHeight.value * -animationRow.value)
    }
}
onMounted(() => {
  let directionGiven: string = ''
  
  document.addEventListener('keydown', function(el) {
    switch(el.key) {
      case 'ArrowRight':

        xDirection.value = 1
        walking('right')
      break;
      case 'ArrowLeft':
        xDirection.value = -1
        walking('left')
      break;
      case 'ArrowUp':
        jumping()
      break;
    }
  })

  document.addEventListener('keyup', function(input) {
    animationRow.value = 1
    stepCount.value = 0
    xPosition.value = 0 - (165 * 11)
  })
})


</script>

<style>
.turned {
  transform: rotateY(-180deg);
}
</style>