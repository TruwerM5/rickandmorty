<script setup lang="ts">
import _ from "lodash";
const props = defineProps<{
  pages: number;
}>();

const buttons = ref<number[]>([]);
const router = useRouter();
const route = useRoute();
const currentPage = computed(() => Number(route.query.page));

function createPaginationButtons(startFrom: number) {
  buttons.value.length = 0;
  if (startFrom < 1) startFrom = 1;

  if (startFrom == props.pages) {
    if (startFrom == 1) {
      buttons.value.push(1);
      return;
    }
    buttons.value.push(startFrom - 3, startFrom - 2, startFrom - 1, startFrom);
    return;
  }
  if (startFrom == 1) {
    buttons.value.push(
      startFrom,
      startFrom + 1,
      startFrom + 2,
      startFrom + 3,
      startFrom + 4,
    );
  } else {
    buttons.value.push(
      startFrom - 3,
      startFrom - 2,
      startFrom - 1,
      startFrom,
      startFrom + 1,
      startFrom + 2,
      startFrom + 3,
    );
  }
  buttons.value = buttons.value.filter(
    (item) => item > 0 && item <= props.pages,
  );
}

function moveToPrevPage() {
  if (currentPage.value > 1) {
    router.push({
      query: { page: currentPage.value - 1, name: route.query.name },
    });
    createPaginationButtons(currentPage.value - 1);
  }
}

function moveToNextPage() {
  if (currentPage.value < props.pages) {
    router.push({
      query: { page: currentPage.value + 1, name: route.query.name },
    });
    createPaginationButtons(currentPage.value + 1);
  }
}
function renderPaginationButtons(n: number) {
  createPaginationButtons(n);
}

function moveToNPage(n: number) {
  router.push({ query: { page: n, name: route.query.name } });
  renderPaginationButtons(n);
}

createPaginationButtons(currentPage.value || 1);

watchEffect(() => {
  createPaginationButtons(currentPage.value || 1);
});
</script>

<template>
  <div
    class="flex items-center justify-between md:justify-center text-lg gap-[10px] sm:gap-[20px]"
  >
    <PaginationButtonVue @click="moveToPrevPage">
      <template #icon>
        <Icon name="material-symbols:chevron-left" size="24" />
      </template>
    </PaginationButtonVue>
    <PaginationButtonVue
      v-if="!buttons.includes(1)"
      :value="1"
      @click="moveToNPage(1)"
    />
    <p v-if="currentPage > 5">...</p>
    <TransitionGroup name="hide">
      <PaginationButtonVue
        v-for="btn in buttons"
        :key="btn"
        :value="btn"
        @click="moveToNPage(btn)"
      />
    </TransitionGroup>

    <p v-if="buttons.length >= 4 && !buttons.includes(pages)">...</p>
    <PaginationButtonVue
      v-if="!buttons.includes(pages) && pages > 5"
      :value="pages"
      @click="moveToNPage(pages)"
    />
    <PaginationButtonVue @click="moveToNextPage">
      <template #icon>
        <Icon name="material-symbols:chevron-right" size="24" />
      </template>
    </PaginationButtonVue>
  </div>
</template>

<style scoped>
.hide-enter-active,
.hide-leave-active,
.hide-move {
  transition: all 0.3s;
}

.hide-enter-from,
.hide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.hide-leave-active {
  position: absolute;
}
</style>
