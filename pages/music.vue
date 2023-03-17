<template>
  <div class="bg-black min-h-screen relative pt-24 sm:pt-0">
    <div class="w-full sm:w-3/4 mx-auto px-4 sm:px-0">
      <div class="w-full sm:w-3/4 mx-auto py-16 sm:flex">
        <input type="text" class="border w-full p-2 sm:p-4 rounded-3xl text-center sm:text-left text-base sm:text-3xl" name="search" v-model="currentArtistSearch" placeholder="Search by artist" />
        <button @click="handleSearch" class="w-full sm:w-auto mt-4 sm:mt-0 bg-red-400 p-2 sm:py-5 px-12 text-white sm:-ml-16 sm:rounded-r-3xl font-light">Search</button>
      </div>
      <div v-if="currentArtist">
        <div class="sm:grid grid-cols-3" v-for="artist in currentArtist.artists.items" :key="artist.id">
          <div>
            <div class="text-white"></div>
          </div>
          <div class="text-white">
            <img v-if="loading" src="https://placehold.co/600x400?text=loading" alt="" class="hidden sm:block" />
            <img v-else :src="getImage(1)" alt="" class="mx-auto hidden sm:block" />
            <div class="my-6">
              <p class="text-3xl">{{ artist.name }}</p>
              <ul v-if="artist.genres" class="flex justify-center">
                <li v-for="(genre, index) in artist.genres" :key="index" class="mx-2 italic text-sm my-4">
                  {{ genre }}
                </li>
              </ul>
              <p>Popularity: {{ artist.popularity }}</p>
            </div>
            <ul v-if="currentTopTracks">
              <li v-for="(track, index) in currentTopTracks.tracks" :key="index" class="grid grid-cols-3 gap-4 mb-3 bg-gray-900 min-h-[90px]" @click="handleAudioSrc(track)">
                <div class="col-span-1">
                  <img class="object-cover bg-red-300 w-full" :src="track.album.images[2].url" :alt="`Image of the album ${track.album.name}`" />
                </div>
                <div class="col-span-2 py-1 flex items-start flex-col">
                  <span class="text-xl">{{ track.name }}</span
                  ><br />
                  <span class="text-sm italic">{{ track.album.name }} </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="audioSrc" class="fixed top-0 sm:top-[100vh] sm:translate-y-[-100%] w-full">
      <div id="audio-holder" class="sm:w-1/4 sm:rounded mx-auto p-4 bg-white sm:bg-white/75 text-black grid grid-cols-4 gap-4">
        <button id="handle-stop" @click="handlePlay" :class="[`${audioIsPlaying ? 'bg-red-300' : 'bg-blue-300'}`]" class="col-span-1 max-w-[70px] max-h-[70px] p-3 rounded-full">{{ audioIsPlaying ? 'Stop' : 'Play' }}</button>
        <div class="col-span-3 flex flex-col">
          <span>
            {{ audioSrc.artists[0].name }}
          </span>
          <span class="font-bold">
            {{ audioSrc.name }}
          </span>
          <i class="text-sm">
            {{ audioSrc.album.name }}
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentArtistSearch: any = ref("");
const currentArtist: any = ref("");
const audioIsPlaying = ref(false);
const loading = ref(false);
const currentTopTracks: any = ref({});
const audioSrc: any = ref();

let audio: any = ref()

onBeforeMount(()=>{
  audio = new Audio()
})
const playing = false;
interface Loading {
  loading: boolean;
}

interface Artists {
  artists: {
    href: string;
    items: {
      id: string;
      name: string;
      popularity: number;
      external_urls: {
        spotify: string;
      }[];
      genres: [];
      href: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
    }[];
  }[];
}

const handlePlay = () => {
  if(audioSrc?.value) {
    if(audioIsPlaying.value == false) {
      if(audio.src != audioSrc.value.preview_url) {
        audio.src = audioSrc.value.preview_url
      }
      audio.play()
      audioIsPlaying.value = true
    } else {
      audio.pause()
      audioIsPlaying.value = false
    }
  }
}

const handleAudioSrc = (track: any) => {
  if (audioSrc.value != null) {
    audioSrc.value = false;
  }
  audioIsPlaying.value = false;
  audio.pause()
  audioSrc.value = track;
  handlePlay()
};

const handleSearch = async () => {
  loading.value = true;
  const { data: Artists, pending, error, refresh } = await useFetch(`https://spotify-api-wrapper.appspot.com/artist/${currentArtistSearch.value}`);

  currentArtist.value = Artists.value;

  await getTopTracksOfArtist(Artists.value.artists.items[0].id);
  loading.value = false;
};

const getTopTracksOfArtist = async (id: string) => {
  const { data, pending, error, refresh } = await useFetch(`https://spotify-api-wrapper.appspot.com/artist/${id}/top-tracks`);
  currentTopTracks.value = data.value;
};

const getImage = (index: number) => {
  if (currentArtist?.value?.artists?.items) {
    return currentArtist?.value.artists.items[0].images[index].url;
  }
};

const handleKeyEvents = onMounted(() => {
  document.addEventListener("keypress", input => {
    if (input.code == "Enter") {
      handleSearch();
    }
  });
});

</script>
