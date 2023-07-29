<script setup>
import { date } from 'quasar';
import { computed, nextTick, onMounted, onUpdated, reactive, ref } from 'vue';
import TodoList from './TodoList.vue';

import LeftModalWindow from './LeftModalWindow.vue';
import TaskInfo from './TaskInfo.vue';

const taskInput = ref('');
const rightDrawerOpen = ref(false);
const drawerTaskInput = ref('');
const updatedDrawerTaskInput = ref('');

const tasks = ref([]);
const completedTasks = ref([]);
const input = ref(null);
onMounted(() => {
  input.value.focus();
  tasks.value = JSON.parse(localStorage.getItem('tasks'));
  completedTasks.value = JSON.parse(localStorage.getItem('completeTasks'));
});
const formatData = computed(() => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, 'dddd D MMMM');
});

function addTask() {
  if (!taskInput.value.length) {
    return;
  }
  tasks.value = tasks.value || [];
  tasks.value.push({
    title: taskInput.value,
    id: Date.now(),
    done: false
  });
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
  taskInput.value = '';
}

function openRightDrawer(task) {
  rightDrawerOpen.value = true;
  drawerTaskInput.value = task.title;
  updatedDrawerTaskInput.value = task;
}
function updateRightDrawer(newValue) {
  rightDrawerOpen.value = newValue;
}

function updateRightDrawerInput(newValue) {
  updatedDrawerTaskInput.value.title = newValue;
}
function updateTasks(el) {
  tasks.value = tasks.value.filter((e) => e !== el);
  if (el.done === false) {
    tasks.value.push(el);
  }
}

function deleteTask() {
  tasks.value = tasks.value.filter((e) => e !== updatedDrawerTaskInput.value);
  completedTasks.value = completedTasks.value.filter(
    (e) => e !== updatedDrawerTaskInput.value
  );

  localStorage.setItem('completeTasks', JSON.stringify(completedTasks.value));
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
}
function updateCompletedTasks(newValue) {
  completedTasks.value = completedTasks.value || [];

  completedTasks.value.push(newValue);

  completedTasks.value = completedTasks.value.filter((e) => e.done === true);

  updateTasks(newValue);
  localStorage.setItem('completeTasks', JSON.stringify(completedTasks.value));
}
</script>
<template>
  <q-layout
    @keyup.esc="rightDrawerOpen = false"
    class="bg-grey-2"
    view="LHr lpR lFr"
  >
    <q-header bordered class="header bg-primary text-white" elevated>
      <div class="q-px-lg q-pt-xl q-mb-md q-mt-xl">
        <div class="text-h3">TODO</div>
        <div class="text-subtitle1">{{ formatData }}</div>
      </div>
      <q-img class="header-image absolute-top" src="../statics/mountains.jpg" />
    </q-header>
    <LeftModalWindow />
    <TaskInfo
      :rightDrawerOpen="rightDrawerOpen"
      :tasks="tasks"
      :drawerTaskInput="drawerTaskInput"
      :updatedDrawerTaskInput="updatedDrawerTaskInput"
      @update:right-drawer-open="updateRightDrawer"
      @update:drawer-task-input="updateRightDrawerInput"
      @tasks-change="deleteTask"
    />
    <q-page-container class="column">
      <TodoList
        :tasks="tasks"
        :completeTasks="completedTasks"
        @open-right-dialog="openRightDrawer"
        @complete-task="updateCompletedTasks"
      />
    </q-page-container>
    <q-footer class="bg-grey-2">
      <q-input
        ref="input"
        v-model="taskInput"
        bg-color="white"
        class="text-h6 q-ma-md"
        outlined
        placeholder="Add task"
        @keyup.enter="addTask"
      >
        <template v-slot:prepend>
          <q-btn
            color="primary"
            dense
            flat
            icon="add"
            round
            size="md"
            @click="addTask"
          />
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<style>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.8;
}
</style>
