<script setup lang="ts"></script>
<template>
  <div
    class="relative mb-[60px] min-h-[300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[25px] grid-rows-1"
  >
    <SkeletonItemVue v-for="i in 12" :key="i" />
  </div>
</template>
