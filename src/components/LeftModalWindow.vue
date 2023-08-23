<script setup>
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';
import data from '../service/service';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();

const createListInput = ref('');
const lists = ref(data);
const searchInput = ref('');

watch(
  () => searchInput.value,
  () => {
    if (searchInput.value) {
      filteredTasks();
      router.push('/search/' + searchInput.value);
    } else {
      router.push('/main');
    }
  }
);

function prompt() {
  $q.dialog({
    title: 'Создание нового списка',
    message: 'Введите имя списка',
    prompt: {
      model: createListInput.value,
      isValid: (val) => val.length > 2,
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk((name) => {
    const newPage = {
      id: Date.now().toString(),
      name: name,
      tasks: [],
      completedTasks: []
    };
    lists.value.push(newPage);
    localStorage.setItem('data', JSON.stringify(lists.value));
  });
}
function handleDeleteList(elem) {
  lists.value.splice(
    lists.value.findIndex((item) => item.id === elem.id),
    1
  );
  localStorage.setItem('data', JSON.stringify(lists.value));
  router.go(-1);
}
function filteredTasks() {
  const tasksMatchingSearch = [];
  lists.value.forEach((todoList) => {
    const filteredTasksInList = todoList.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    const filteredCompletedTasksInList = todoList.completedTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    tasksMatchingSearch.push(
      ...filteredTasksInList,
      ...filteredCompletedTasksInList
    );
  });

  localStorage.setItem('search', JSON.stringify(tasksMatchingSearch));
}
</script>

<template>
  <q-drawer
    :width="280"
    bordered
    class="bg-grey-3 column"
    show-if-above
    side="left"
    :breakpoint="500"
  >
    <q-input
      v-model="searchInput"
      class="text-h6 q-ma-xs"
      label="Search"
      standout="bg-teal-5 text-white"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list class="bg-grey-3 q-mt-md q-ma-xs">
      <q-item
        clickable
        v-ripple
        v-for="item in lists"
        :key="item.id"
        class="self-start"
        @click="router.push('/' + item.id)"
      >
        <q-menu context-menu>
          <q-list style="min-width: 200px">
            <q-item clickable v-close-popup @click="handleDeleteList(item)">
              <q-icon name="delete" color="red" class="self-center q-mr-xs" />
              <q-item-section>Удалить</q-item-section>
            </q-item>
          </q-list>
        </q-menu>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <q-icon name="list" color="primary" size="23px" /> {{ item.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-btn
      flat
      icon="add"
      outlined
      size="15px"
      class="q-pa-md text-h6 fixed-bottom q-mb-md"
      @click="prompt"
      >Создать список</q-btn
    >
  </q-drawer>
</template>

<style lang="scss" scoped></style>
