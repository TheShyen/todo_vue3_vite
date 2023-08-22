<script setup>
import { computed } from 'vue';
import { date } from 'quasar';

defineProps(['nameList']);

const formatData = computed(() => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, 'dddd D MMMM');
});
</script>

<template>
  <q-header bordered class="header bg-primary text-white" elevated>
    <div class="q-px-lg q-pt-xl q-mb-md q-mt-xl">
      <div class="text-h3">{{ nameList }}</div>
      <div class="text-subtitle1">{{ formatData }}</div>
    </div>
    <q-img class="header-image absolute-top" src="../statics/mountains.jpg" />
  </q-header>
</template>

<style lang="scss" scoped>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.8;
}
</style>
