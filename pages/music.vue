<template>
  <div class="bg-black min-h-screen">
    <div class="w-3/4 mx-auto">
      <div class="w-3/4 mx-auto py-16 flex">
        <input type="text" class="border w-full p-4 rounded-3xl text-3xl" name="search" v-model="currentArtistSearch" placeholder="Search by artist" />
        <button @click="handleSearch" class="bg-red-400 p-2 px-12 text-white -ml-16 rounded-r-3xl font-light">Search</button>
      </div>
      <div v-if="currentArtist">
        <div class="grid grid-cols-3 bg-blue-800" v-for="artist in currentArtist.artists.items" :key="artist.id">
          <div>
            <div class="text-white"></div>
            <img :src="getImage(0)" alt="" />
          </div>
          <div class="text-white text-center">
            <p class="text-3xl">{{ artist.name }}</p>
            <ul v-if="artist.genres" class="flex justify-center">
              <li v-for="(genre, index) in artist.genres" :key="index" class="mx-2 italic text-sm my-4">
                {{ genre }}
              </li>
            </ul>
            <p>Popularity: {{ artist.popularity }}</p>
          </div>
          <div class="text-white">
            <ul v-if="currentTopTracks">
              <li v-for="(track, index) in currentTopTracks.tracks" :key="index" class="flex mb-3 bg-gray-900 min-h-[90px]">
                <div class="w-2/6">
                  <img class="object-cover bg-red-300 h-full" :src="track.album.images[2].url" :alt="`Image of the album ${track.album.name}`" />
                </div>
                <div class="w-5/6 py-1">
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
  </div>
</template>

<script setup lang="ts">
const currentArtistSearch = ref("");
const currentArtist = ref("");

const currentTopTracks = ref({});

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

const handleSearch = async () => {
  const { data: Artists, pending, error, refresh } = await useFetch(`https://spotify-api-wrapper.appspot.com/artist/${currentArtistSearch.value}`);

  currentArtist.value = Artists.value;

  await getTopTracksOfArtist(Artists.value.artists.items[0].id);
};

const getTopTracksOfArtist = async (id: string) => {
  console.log(id);

  const { data, pending, error, refresh } = await useFetch(`https://spotify-api-wrapper.appspot.com/artist/${id}/top-tracks`);

  currentTopTracks.value = data.value;
};

const getImage = (index: number) => {
  if (currentArtist?.value?.artists?.items) {
    return currentArtist?.value.artists.items[0].images[index].url;
  }
};

const handleKeyEvents = onMounted(function () {
  document.addEventListener("keypress", function (input) {
    if (input.code == "Enter") {
      handleSearch();
    }
  });
});
</script>
