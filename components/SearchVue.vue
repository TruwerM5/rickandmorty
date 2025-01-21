<script setup lang="ts">
import _ from "lodash";

const router = useRouter();
const roure = useRoute();
const search = ref(roure.query.name);

function setQuery() {
  router.push({ query: { name: search.value, page: 1 } });
}
function onTyping() {
  _.debounce(setQuery, 800)();
}
</script>

<template>
  <div class="relative">
    <input
      type="text"
      class="block h-full p-2 focus:outline-none text-black transition-colors peer border-b border-black"
      placeholder="Search"
      v-model="search"
      @keydown="onTyping"
    />
    <div
      class="absolute -bottom-[1px] h-[3px] max-w-0 w-full bg-orange-500 transition-all duration-300 peer-focus:max-w-full"
    ></div>
  </div>
</template>
