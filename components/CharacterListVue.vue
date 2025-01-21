<script setup lang="ts">
defineProps<{
  characters: Character[];
}>();
</script>

<template>
  <div>
    <ul
      class="mb-[60px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[25px]"
    >
      <li v-for="character in characters" :key="character.id">
        <CharacterItemVue :character="character" />
      </li>
    </ul>
  </div>
</template>
