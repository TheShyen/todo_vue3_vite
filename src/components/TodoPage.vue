<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import TodoList from './TodoList.vue';
import AddTask from './AddTask.vue';
import LeftModalWindow from './LeftModalWindow.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';

const isRightModalOpen = ref(false);
const modalTaskInput = ref('');
const modalDescriptionInput = ref('');

const selectedTask = ref('');

const tasks = ref([]);
const completeTasks = ref([]);
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  },
  { deep: true }
);
watch(
  completeTasks,
  (newTasks) => {
    localStorage.setItem('completeTasks', JSON.stringify(newTasks));
  },
  { deep: true }
);

onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem('tasks')) || [];
  completeTasks.value = JSON.parse(localStorage.getItem('completeTasks')) || [];
});

function onCreateTask(newTask) {
  tasks.value.push(newTask);
}

function onOpenRightDialog(task) {
  isRightModalOpen.value = true;
  modalTaskInput.value = task.title;
  modalDescriptionInput.value = task.description;
  selectedTask.value = task;
}

function onUpdateSelectedTaskFields(newTitle, newDescription) {
  selectedTask.value.title = newTitle;
  selectedTask.value.description = newDescription;
}
function updateTasks() {
  tasks.value = tasks.value.filter((e) => e.done === false);
  completeTasks.value = completeTasks.value.filter((e) => e.done === true);
}

function onDeleteTask(task) {
  if (task.done === false) {
    tasks.value = tasks.value.filter((e) => e.id !== task.id);
  } else {
    completeTasks.value = completeTasks.value.filter((e) => e.id !== task.id);
  }
}
function onChangeTaskState(currentTask) {
  if (currentTask.done === true) {
    completeTasks.value.push(currentTask);
    updateTasks();
  } else {
    tasks.value.push(currentTask);
    updateTasks();
  }
}
</script>
<template>
  <q-layout
    @keyup.esc="isRightModalOpen = false"
    class="bg-grey-2"
    view="LHr lpR lFr"
  >
    <Header />
    <LeftModalWindow />
    <TaskInfo
      v-model:isRightModalOpen="isRightModalOpen"
      :tasks="tasks"
      :modalTaskInput="modalTaskInput"
      :modalDescriptionInput="modalDescriptionInput"
      :selectedTask="selectedTask"
      @update:selected-task-fields="onUpdateSelectedTaskFields"
      @delete-task="onDeleteTask"
      @change-task-state="onChangeTaskState"
    />
    <q-page-container class="column">
      <TodoList
        :tasks="tasks"
        :complete-tasks="completeTasks"
        @open-right-dialog="onOpenRightDialog"
        @change-task-state="onChangeTaskState"
        @delete-task="onDeleteTask"
      />
    </q-page-container>
    <AddTask @create-task="onCreateTask" />
  </q-layout>
</template>

<style></style>
