<script setup>
import { date } from 'quasar';
import { computed, nextTick, onMounted, ref } from 'vue';
import TodoList from './TodoList.vue';

import LeftModalWindow from './LeftModalWindow.vue';
import TaskInfo from './TaskInfo.vue';

const taskInput = ref('');
const rightDrawerOpen = ref(false);
const drawerTaskInput = ref('');
const updatedDrawerTaskInput = ref('');

const tasks = ref([
  {
    title: 'Get keyboard',
    done: false,
    id: 1
  },
  {
    title: 'Just coding',
    done: false,
    id: 2
  },
  {
    title: 'sleep',
    done: false,
    id: 3
  }
]);
const input = ref(null);
onMounted(() => {
  input.value.focus();
});
const formatData = computed(() => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, 'dddd D MMMM');
});

function addTask() {
  if (!taskInput.value.length) {
    return;
  }
  tasks.value.push({
    title: taskInput.value,
    id: Date.now(),
    done: false
  });
  taskInput.value = '';
}

function deleteTask(task) {
  tasks.value = tasks.value.filter((item) => item !== task);
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
function updateTasks() {
  tasks.value = tasks.value.filter((e) => e !== updatedDrawerTaskInput.value);
}
</script>
<template>
  <q-layout
    @keyup.esc="rightDrawerOpen = false"
    class="bg-grey-2"
    view="lHr lpR fFf"
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
      @tasks-change="updateTasks"
    />
    <q-page-container class="column">
      <TodoList :tasks="tasks" @open-right-dialog="openRightDrawer" />
      <q-input
        ref="input"
        v-model="taskInput"
        bg-color="white"
        class="text-h6 q-ma-lg"
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
    </q-page-container>
  </q-layout>
</template>

<style>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.8;
}
</style>
