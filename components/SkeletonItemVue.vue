<script setup lang="ts"></script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped>
.skeleton {
  min-width: 200px;
  min-height: 200px;
  animation: skeleton-loading 1s linear infinite alternate;
}
@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
</style>
