<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="p-4 bg-black text-white">
    <p class="text-center">Rick and Morty &copy; {{ year }}</p>
  </footer>
</template>
