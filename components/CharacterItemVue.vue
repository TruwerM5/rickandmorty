<script setup lang="ts">
defineProps<{
  character: Character;
}>();
</script>

<template>
  <NuxtLink
    :to="{ path: `/character/${character.id}` }"
    class="block relative overflow-hidden"
  >
    <img
      :src="character.image"
      :alt="character.name"
      class="h-full w-full object-cover object-center hover:scale-125 hover:opacity-80 transition-all"
    />
    <div class="absolute bottom-0 left-0 w-full bg-black text-white p-2">
      <p class="text-md font-bold">
        {{ character.name }}
      </p>
      <p>
        Status:
        {{ character.status }}
      </p>
    </div>
  </NuxtLink>
</template>
