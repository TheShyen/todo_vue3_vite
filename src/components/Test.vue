<template>
  <div class="aboba">ENNENNENENE {{ computedPageId }}</div>
  >
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();
const computedPageId = computed(() => route.params.pageId);
</script>

<style lang="scss" scoped>
.aboba {
  display: flex;
  justify-content: center;
}
</style>
