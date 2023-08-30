<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import TodoList from './TodoList.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';

import { useRoute } from 'vue-router';
import { useTodoListsStore } from '../store/TodoListsStore';

const isRightModalOpen = ref(false);
const selectedTask = ref(null);
const tasks = ref([]);
const completedTasks = ref([]);
const store = useTodoListsStore();
const route = useRoute();

const input = computed(() => route.params.input);

onMounted(() => {
  tasks.value = store.searchTasks;
  console.log('mount');
});

watch(input, () => {
  tasks.value = store.searchTasks;
});

watch(tasks, () => {
  localStorage.setItem('search', JSON.stringify(tasks.value));
});

function calculateIndex(array, task) {
  return array.value.findIndex((item) => item.id === task.id);
}

function onOpenRightDialog(task) {
  isRightModalOpen.value = true;
  selectedTask.value = task;
}

function onDeleteTask(currentTask) {
  tasks.value.splice(calculateIndex(tasks, currentTask), 1);
  store.deleteTasksInSearchTasks(currentTask);
}
function switchingState(currentTask) {
  store.switchingStateSearchTask(currentTask);
}

function onChangeTaskInTasks(currentTask) {
  store.onChangeSearchTaskInTasks(currentTask);
}
</script>
<template>
  <Header :nameList="'Результаты поиска'" />
  <TaskInfo
    v-model:isRightModalOpen="isRightModalOpen"
    v-model:selectedTask="selectedTask"
    @change-task-in-tasks="onChangeTaskInTasks"
    @delete-task="onDeleteTask"
    @switching-state="switchingState"
  />
  <q-page-container class="column">
    <TodoList
      :tasks="tasks"
      :completed-tasks="completedTasks"
      @open-right-dialog="onOpenRightDialog"
      @switching-state="switchingState"
      @delete-task="onDeleteTask"
    />
  </q-page-container>
</template>

<style></style>
