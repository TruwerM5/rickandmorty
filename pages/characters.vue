<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";
import axios from "axios";

const GET_CHARACTERS_URL = "https://rickandmortyapi.com/api/character/";
let URL = GET_CHARACTERS_URL;
const route = useRoute();
const router = useRouter();
const characters = ref<Character[]>([]);
const pages = ref(0);
const totalCount = ref(0);
const page = computed(() => Number(route.query.page) || 1);
const search = computed(() => route.query.name);
const errorMessage = ref("");
const isLoaded = ref(false);

onMounted(async () => {
  if (search.value != undefined) {
    router.push({ query: { name: search.value } });
  }
  router.push({ query: { page: page.value, name: search.value || "" } });
  await getCharacters();
});

async function getCharacters() {
  isLoaded.value = false;
  const params: {
    page?: LocationQueryValue | LocationQueryValue[];
    name?: LocationQueryValue | LocationQueryValue[];
  } = {};
  if (Number(route.query.page)) {
    params.page = route.query.page;
  }
  if (route.query.name) {
    params.name = route.query.name;
  }
  try {
    const { data } = await axios.get<FetchData>(URL, {
      params: { page: page.value, name: search.value },
    });
    setTimeout(() => {
      characters.value = data.results;
      pages.value = data.info.pages;
      totalCount.value = data.info.count;
      if (data.info.pages < page.value) {
        router.push({ query: { page: 1, name: search.value } });
      }
      isLoaded.value = true;
    }, 2000);
  } catch (e: any) {
    if (e.status == 404) {
      errorMessage.value = e.response.data.error;
      characters.value = [];
      totalCount.value = 0;
      pages.value = 0;
      isLoaded.value = true;
    }
  }
}

watch([page, search], async () => {
  await getCharacters();
});
</script>

<template>
  <div class="mb-[100px]">
    <div
      class="flex flex-col md:flex-row gap-[15px] justify-between items-center my-[20px]"
    >
      <h3 class="text-[25px] md:text-[45px] font-bold">
        Characters {{ totalCount > 0 ? "(" + totalCount + ")" : "" }}
      </h3>
      <SearchVue />
    </div>
    <div v-if="isLoaded && characters.length > 0">
      <CharacterListVue :characters="characters" />
    </div>
    <div v-else>
      <p>{{ errorMessage }}</p>
    </div>
    <div v-if="!isLoaded">
      <SkeletonVue />
    </div>
    <PaginationVue :pages="pages" />
  </div>
</template>
