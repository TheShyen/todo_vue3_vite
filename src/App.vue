<script setup>
import LeftModalWindow from './components/LeftModalWindow.vue';
import { ref } from 'vue';
</script>

<template>
  <q-layout class="bg-grey-2" view="LHr lpR lFr">
    <LeftModalWindow />
    <router-view> </router-view>
  </q-layout>
</template>

<style></style>
