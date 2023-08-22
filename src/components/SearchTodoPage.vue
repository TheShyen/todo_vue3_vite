<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import TodoList from './TodoList.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';
import { useRoute } from 'vue-router';
import data from '../service/service';
const route = useRoute();

const isRightModalOpen = ref(false);
const selectedTask = ref(null);
const tasks = ref([]);
const completedTasks = ref([]);
const newData = ref([]);

const pageId = computed(() => route.params.pageId);
const tasksFromData = computed(
  () => data?.find((item) => item.id === pageId.value)?.tasks
);

onMounted(() => {
  tasks.value.push(...getItemFromData());
});

function getItemFromData() {
  return [...(JSON.parse(localStorage.getItem('search')) || [])];
}

watch(tasks.value, () => {
  localStorage.setItem('search', JSON.stringify(tasks.value));
});

watch(
  () => pageId.value,
  () => {
    tasks.value.splice(0, tasks.value.length);
    tasks.value.push(...getItemFromData().tasks);
    completedTasks.value.splice(0, completedTasks.value.length);
    completedTasks.value.push(...getItemFromData().completedTasks);
  }
);

function calculateIndex(array, task) {
  return array.value.findIndex((item) => item.id === task.id);
}

function onOpenRightDialog(task) {
  isRightModalOpen.value = true;
  selectedTask.value = task;
}

function handleTasksChange(task) {
  tasks.value.splice(calculateIndex(tasks, task), 1);
}
function handleCompletedTasksChange(task) {
  completedTasks.value.splice(calculateIndex(completedTasks, task), 1);
}

function onDeleteTask(task) {
  if (task.done === false) {
    handleTasksChange(task);
  } else {
    handleCompletedTasksChange(task);
  }
}
function switchingState(currentTask) {
  console.log(currentTask);
  if (currentTask.done === true) {
    newData.value = data.map((list) => {
      const newTasks = list.tasks.map((elem) => {
        return elem.id === currentTask.id ? currentTask : elem;
      });

      return { ...list, completedTasks: newTasks };
    });

    localStorage.setItem('data', JSON.stringify(newData.value));
  } else {
    tasks.value.push(currentTask);
    tasksFromData.value.push(currentTask);
    handleCompletedTasksChange(currentTask);
  }
}

function onChangeTaskInTasks(task) {
  if (!task.done) {
    tasks.value = tasks.value.map((elem) => {
      return elem.id === task.id ? task : elem;
    });
  } else {
    completedTasks.value = completedTasks.value.map((elem) => {
      return elem.id === task.id ? task : elem;
    });
  }
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
