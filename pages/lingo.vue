<template>
  <div class="h-screen bg-black">
    <div class="grid grid-cols-5 gap-4">
    <div class="col-span-3">
      <div class="flex justify-center my-4" v-for="(inputRow, i) in [0,1,2,3,4]" :key="i">
        <LingoInput 
          v-for="(word, index) in wordToGuess" :key="index" :id="index" :row="inputRow"
          @inputLetter="handleInput(index)" :disabled="inputRow == row ? false : true"
        />            
      </div>
    </div>
    <div>
      <!-- <p class="text-white">{{ time }}</p> -->
    </div>
  </div>
  </div>

</template>

<script setup lang="ts">

import words from 'assets/js/words.json'

const currentInput = ref([])
const row = ref(0)
const time = ref(26)
let intervalIsRunning = false


const amountLetters = ref(5)

const pickWord = () => {
  // return 'LEEM'
  const randomNo = Math.floor(Math.random() * words.filter(obj => obj.length === amountLetters.value).length)
  let randomWord = words.filter(obj => obj.length === amountLetters.value)[randomNo]
  console.log(randomWord.toUpperCase())
  
  return randomWord.toUpperCase()
}

const wordToGuess = pickWord()

const activateInputRow = () => {
  if(row.value < wordToGuess.length) {
    window.setTimeout(() => {
      document.getElementById('input-' + row.value + '-0')?.focus()
      document.getElementById('input-' + row.value + '-0')?.setAttribute('placeholder', wordToGuess.charAt(0))

    }, 0)
  } else {
    confirm('Helaas. We zochten het woord: ' + wordToGuess + '. Nog een potje?')
    location.reload()

  }

}

const handleInput = (index:number) => {
  
  if(index >= 0) {
    let input = document.getElementById('input-' + row.value + '-' + index).value
    currentInput.value[index] = input
    if(input != "") {
      console.log(input)
      activeNextInput(index)
    }
  }
}
const activeNextInput = (index: number, direction = 'next') => {
  
  let newIndex = index + 1
  
  if(direction == 'prev') {
    newIndex = index - 1
  } 
  if((index + 1) < wordToGuess.length) {
    window.setTimeout(() => {
      document.getElementById('input-' + row.value + '-' + (newIndex))?.focus()
    }, 0)
  } else {
    validateInput()
  }
}

const validateInput = () => {
  let letterIndex = 0
  let correctLetters = 0 

  const checkPerLetter = setInterval(() => {
    if(letterIndex < wordToGuess.length) {
      let currentInputField = document.getElementById('input-' + row.value + '-' + letterIndex)
          
      let currentInputHolder = document.getElementById('input-holder-' + row.value + '-' + letterIndex)

      if(currentInputField?.value && currentInputHolder) {
        let classToSet = checkLetter(letterIndex, currentInputField.value)
        if(classToSet == 'letter-correct') correctLetters++
        currentInputHolder.innerHTML = `<div id="checked-input-${row.value}-${letterIndex}" class="flex bg-blue-800 rounded-xl w-8 h-8 text-white mr-2 text-center items-center justify-center"><span class="${classToSet} text-white text-4xl flex items-center justify-center">${currentInputField.value}</span></div>`
        document.getElementById('checked-input-' + row.value + '-' + letterIndex)?.classList.add('checked')
      }
      // currentInputField.a
      letterIndex++
    } else {
      clearInterval(checkPerLetter)
      intervalIsRunning = false
      if(correctLetters < wordToGuess.length) {
        row.value++
        activateInputRow()
      } else {
        confirm('Goed zo! Nog een potje?')
        location.reload()
      }

    }
  }, 275)
}

const checkLetter = (letterIndex:number, letter: string) => {
  let toReturn = null

  // check if in word
  if(wordToGuess.includes(letter)) {
    toReturn = 'letter-exists'
  }

  // check if not already been given yellow
  // todo

  let indexes = []

  for (let index = 0; index < wordToGuess.length; index++) {
    if (wordToGuess[index] === letter) {
      indexes.push(index);
    }
  }
  // determine if there are more than 1 occurance of this letter
  if (indexes.length > 1) {
    indexes.forEach((item) => {
      if(item == letterIndex) toReturn = 'letter-correct'
    })
  } else {
    if (wordToGuess.indexOf(letter) == letterIndex) {
      toReturn = 'letter-correct'
    }
  }

  return toReturn
}

const clock = () => {
  setInterval(() => {
    time.value = time.value - 1
  }, 1000)
}

onMounted(() => {
  // set all 
  activateInputRow()
  // clock()
  document.addEventListener('keyup', function(element){
    if(element.keyCode == 8) {
      let currentIndex = element.target.dataset.column
      activeNextInput(currentIndex, 'prev')
    }
  })
})

</script>

<style>
input:focus {
    background-color: lightblue;
    caret-color: transparent;
    box-shadow: 0 0 30px #fff;
}
</style>