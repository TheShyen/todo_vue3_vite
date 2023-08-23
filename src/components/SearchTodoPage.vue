<script setup>
import {
  computed,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRef,
  watch,
  watchEffect
} from 'vue';
import TodoList from './TodoList.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';
import data from '../service/service';
import { useRoute } from 'vue-router';

const isRightModalOpen = ref(false);
const selectedTask = ref(null);
const tasks = ref([]);
const completedTasks = ref([]);
const newData = ref([]);
const route = useRoute();
const input = computed(() => route.params.input);

onMounted(() => {
  tasks.value = getItemFromData();
  console.log('mount');
});

function getItemFromData() {
  return [...(JSON.parse(localStorage.getItem('search')) || [])];
}
watch(input, () => {
  tasks.value = getItemFromData();
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
  if (currentTask.done === false) {
    newData.value = data.map((list) => {
      const index = list.tasks.findIndex((item) => item.id === currentTask.id);
      list.tasks.map((e) => {
        if (e.id === currentTask.id) {
          list.tasks.splice(index, 1);
        }
      });

      return { ...list };
    });
  } else {
    newData.value = data.map((list) => {
      const index = list.completedTasks.findIndex(
        (item) => item.id === currentTask.id
      );
      list.completedTasks.map((e) => {
        if (e.id === currentTask.id) {
          list.completedTasks.splice(index, 1);
        }
      });
      return { ...list };
    });
  }
  localStorage.setItem('data', JSON.stringify(newData.value));
}
function switchingState(currentTask) {
  currentTask.done = !currentTask.done;
  if (currentTask.done === true) {
    newData.value = data.map((list) => {
      const index = list.tasks.findIndex((item) => item.id === currentTask.id);
      list.tasks.map((e) => {
        if (e.id === currentTask.id) {
          list.tasks.splice(index, 1);
          list.completedTasks.push(currentTask);
        }
      });

      return { ...list };
    });
  } else {
    newData.value = data.map((list) => {
      const index = list.completedTasks.findIndex(
        (item) => item.id === currentTask.id
      );
      list.completedTasks.map((e) => {
        if (e.id === currentTask.id) {
          list.completedTasks.splice(index, 1);
          list.tasks.push(currentTask);
        }
      });
      return { ...list };
    });
  }

  localStorage.setItem('data', JSON.stringify(newData.value));
}

function onChangeTaskInTasks(currentTask) {
  if (!currentTask.done) {
    newData.value = data.map((list) => {
      const updatedTasks = list.tasks.map((e) =>
        e.id === currentTask.id ? currentTask : e
      );
      return { ...list, tasks: updatedTasks };
    });
  } else {
    newData.value = data.map((list) => {
      const updatedTasks = list.completedTasks.map((e) =>
        e.id === currentTask.id ? currentTask : e
      );
      return { ...list, completedTasks: updatedTasks };
    });
  }
  localStorage.setItem('data', JSON.stringify(newData.value));
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
