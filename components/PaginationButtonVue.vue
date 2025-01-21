<script setup lang="ts">
const props = defineProps<{
  value?: number;
}>();
const route = useRoute();
const currentPage = computed(() => Number(route.query.page) || 1);
</script>

<template>
  <button
    :class="[
      'flex items-center justify-center w-[20px] md:w-[30px] h-[20px] md:h-[30px] rounded-md text-[10px] sm:text-[14px]',
      { 'bg-black text-white': value === currentPage },
    ]"
  >
    <slot name="icon"></slot>
    {{ value }}
  </button>
</template>
