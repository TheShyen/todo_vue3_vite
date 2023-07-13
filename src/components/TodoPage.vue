<script setup>
import { date } from 'quasar';
import { computed, onMounted, reactive, ref } from 'vue';
import TodoList from './TodoList.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const taskInput = ref('');
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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function openRightDrawer(task) {
  rightDrawerOpen.value = true;
  drawerTaskInput.value = task.title;
  updatedDrawerTaskInput.value = task;
}
function closeRightDrawer() {
  rightDrawerOpen.value = false;
}
function customBtn() {
  $q.dialog({
    title: 'Confirm',
    message: 'Удалить задачу?',
    noEscDismiss: false,

    ok: {
      push: true,
      color: 'negative'
    },
    cancel: {
      push: true
    }
  }).onOk(() => {
    tasks.value = tasks.value.filter((e) => e !== updatedDrawerTaskInput.value);
    closeRightDrawer();
  });
}
</script>
<template>
  <q-layout class="bg-grey-2" view="lHr lpR fFf">
    <q-header bordered class="header bg-primary text-white" elevated>
      <div class="q-px-lg q-pt-xl q-mb-md q-mt-xl">
        <div class="text-h3">TODO</div>
        <div class="text-subtitle1">{{ formatData }}</div>
      </div>
      <q-img class="header-image absolute-top" src="../statics/mountains.jpg" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="350"
      bordered
      class="bg-grey-3 column"
      show-if-above
      side="left"
    >
      <q-input
        class="search text-h6"
        label="Search"
        standout="bg-teal-3 text-white"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        flat
        icon="add"
        outlined
        size="15px"
        class="q-pa-md text-h6 fixed-bottom q-mb-md"
        >Создать список</q-btn
      >
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      :width="400"
      bordered
      class="column"
      side="right"
    >
      <q-btn
        class="q-ma-md self-end"
        color="primary"
        flat
        icon="close"
        square
        @click="closeRightDrawer"
      />
      <q-input
        v-model="drawerTaskInput"
        class="q-ma-md q-mt-md text-h5"
        @keyup.enter="updatedDrawerTaskInput.title = drawerTaskInput"
        outlined
      />
      <q-input
        class="q-ma-md q-mt-xs text-h6"
        label="Добавить описание"
        outlined
      />

      <q-btn
        class="q-ma-md q-mt-xs self-start"
        icon="delete"
        label="delete"
        @click="customBtn"
      />
    </q-drawer>

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

.search {
  padding: 10px 10px;
}

.input__add-task {
}
</style>
