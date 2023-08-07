<script setup>
import TodoPage from './components/TodoPage.vue';
import LeftModalWindow from './components/LeftModalWindow.vue';
import { ref } from 'vue';

const allTasks = ref({ main: { tasks: [], completeTasks: [] } });
</script>

<template>
  <q-layout class="bg-grey-2" view="LHr lpR lFr">
    <LeftModalWindow />
    <TodoPage />
  </q-layout>
</template>

<style></style>
