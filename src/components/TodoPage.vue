<script setup>
import { onMounted, ref, watch } from 'vue';
import TodoList from './TodoList.vue';
import AddTask from './AddTask.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';

const isRightModalOpen = ref(false);

const selectedTask = ref(null);

const tasks = ref([]);
const completedTask = ref([]);

watch(tasks, () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
});
watch(completedTask, () => {
  localStorage.setItem('completeTasks', JSON.stringify(completedTask.value));
});

onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem('tasks')) || [];
  completedTask.value = JSON.parse(localStorage.getItem('completeTasks')) || [];
});

function onCreateTask(newTask) {
  tasks.value = [...tasks.value, newTask];
}

function onOpenRightDialog(task) {
  isRightModalOpen.value = true;
  selectedTask.value = task;
}

function updateTasks() {
  tasks.value = tasks.value.filter((e) => e.done === false);
  completedTask.value = completedTask.value.filter((e) => e.done === true);
}

function onDeleteTask(task) {
  if (task.done === false) {
    tasks.value = tasks.value.filter((e) => e.id !== task.id);
  } else {
    completedTask.value = completedTask.value.filter((e) => e.id !== task.id);
  }
}
function onTaskStateChange(currentTask) {
  if (currentTask.done === true) {
    completedTask.value.push(currentTask);
  } else {
    tasks.value.push(currentTask);
  }
  updateTasks();
}

function onChangeTaskInTasks(task) {
  if (!task.done) {
    tasks.value = tasks.value.map((elem) => {
      return elem.id === task.id ? task : elem;
    });
  } else {
    completedTask.value = completedTask.value.map((elem) => {
      return elem.id === task.id ? task : elem;
    });
  }
}
</script>
<template>
  <Header />
  <TaskInfo
    v-model:isRightModalOpen="isRightModalOpen"
    v-model:selectedTask="selectedTask"
    @change-task-in-tasks="onChangeTaskInTasks"
    @delete-task="onDeleteTask"
    @change-task-state="onTaskStateChange"
  />
  <q-page-container class="column">
    <TodoList
      :tasks="tasks"
      :completed-tasks="completedTask"
      @open-right-dialog="onOpenRightDialog"
      @change-task-state="onTaskStateChange"
      @delete-task="onDeleteTask"
    />
  </q-page-container>
  <AddTask @create-task="onCreateTask" />
</template>

<style></style>
