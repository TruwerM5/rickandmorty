<script setup lang="ts">
import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character/";
const route = useRoute();
const id = computed(() => Number(route.params.id));
const errorMessage = ref("");
const character = await getCharacterById(id.value);

async function getCharacterById(id: number) {
  try {
    const { data } = await axios.get<Character>(`${BASE_URL}${id}`);
    return data;
  } catch (e: any) {
    errorMessage.value = e.response.data.error;
  }
  return null;
}

function getReadableDate(rawDate: string) {
  const day = new Date(rawDate).getDate();
  const month = new Date(rawDate).getMonth();
  const year = new Date(rawDate).getFullYear();

  function pretty(...n: number[]) {
    return n.map((item) => item.toString().padStart(2, "0")).join(".");
  }

  return `${pretty(day, month, year)}`;
}
</script>

<template>
  <div v-if="character" class="py-[45px] md:px-[40px]">
    <MoveBackVue />
    <div
      class="flex items-center justify-center flex-col md:flex-row gap-[25px] md:gap-[45px] py-[20px]"
    >
      <img :src="character.image" :alt="character.name" />
      <div class="flex flex-col gap-[10px] text-[16px] md:text-[20px]">
        <p class="text-[30px] md:text-[35px] font-bold">{{ character.name }}</p>
        <p>Status: {{ character.status }}</p>
        <p>Gender: {{ character.gender }}</p>
        <p v-if="character.type">Type: {{ character.type }}</p>
        <p>Location: {{ character.location.name }}</p>
        <p>Created: {{ getReadableDate(character.created) }}</p>
        <p>Episodes: {{ character.episode.length }}</p>
      </div>
    </div>
  </div>
  <div v-if="errorMessage" class="flex flex-col items-center justify-center">
    <p class="text-[40px] font-bold text-center">{{ errorMessage }}</p>
  </div>
</template>
