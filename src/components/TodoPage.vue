<script setup>
import {
  computed,
  onMounted,
  onUpdated,
  ref,
  toRef,
  watch,
  watchEffect
} from 'vue';
import TodoList from './TodoList.vue';
import AddTask from './AddTask.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';
import { useRoute } from 'vue-router';
import data, { addList } from '../service/service';
const route = useRoute();

const isRightModalOpen = ref(false);
const selectedTask = ref(null);
const tasks = ref([]);
const completedTask = ref([]);

const pageId = computed(() => route.params.pageId);
const tasksFromData = computed(
  () => data?.find((item) => item.id === pageId.value)?.tasks
);
const calculateIndex = (array, task) => {
  return array.value.findIndex((item) => item.id === task.id);
};
onMounted(() => {
  const arr = [...(JSON.parse(localStorage.getItem('data')) || [])];
  addList(arr);
  console.log(data);
  const a = arr.find((item) => item.id === pageId.value);
  tasks.value.push(...(a?.tasks || []));
  console.log('mount');
  completedTask.value.push(
    ...(JSON.parse(localStorage.getItem('completeTasks')) || [])
  );
});

watch(tasks.value, () => {
  console.log(data);
  localStorage.setItem('data', JSON.stringify(data));
  console.log('watch');
});
watch(completedTask.value, () => {
  localStorage.setItem('completeTasks', JSON.stringify(completedTask.value));
});
watch(
  () => pageId.value,
  () => {
    const arr = [...(JSON.parse(localStorage.getItem('data')) || [])];
    const a = arr.find((item) => item.id === pageId.value);
    tasks.value.splice(0, tasks.value.length);
    tasks.value.push(...a.tasks);
  }
);

function onCreateTask(newTask) {
  tasksFromData.value.push(newTask);
  tasks.value.push(newTask);
}
function onOpenRightDialog(task) {
  isRightModalOpen.value = true;
  selectedTask.value = task;
}

function handleTasksChange(task) {
  tasks.value.splice(calculateIndex(tasks, task), 1);
  tasksFromData.value.splice(calculateIndex(tasksFromData, task), 1);
}
function handleCompletedTasksChange(task) {
  const index = completedTask.value.findIndex((item) => item.id === task.id);
  completedTask.value.splice(index, 1);
}

function onDeleteTask(task) {
  if (task.done === false) {
    handleTasksChange(task);
  } else {
    handleCompletedTasksChange(task);
  }
}
function switchingState(currentTask) {
  if (currentTask.done === true) {
    completedTask.value.push(currentTask);
    handleTasksChange(currentTask);
  } else {
    tasks.value.push(currentTask);
    handleCompletedTasksChange(currentTask);
  }
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
    @switching-state="switchingState"
  />
  <q-page-container class="column">
    <TodoList
      :tasks="tasks"
      :completed-tasks="completedTask"
      @open-right-dialog="onOpenRightDialog"
      @switching-state="switchingState"
      @delete-task="onDeleteTask"
    />
  </q-page-container>

  <AddTask @create-task="onCreateTask" />
</template>

<style></style>
