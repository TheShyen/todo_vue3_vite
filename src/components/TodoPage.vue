<script setup>
import { computed, onMounted, ref, watch } from 'vue';
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
const completedTasks = ref([]);
const database = ref([]);

const pageId = computed(() => route.params.pageId);
const tasksFromData = computed(
  () => data?.find((item) => item.id === pageId.value)?.tasks
);
const nameList = computed(
  () => data?.find((item) => item.id === pageId.value)?.name
);
const completedTasksFromData = computed(
  () => data?.find((item) => item.id === pageId.value)?.completedTasks
);

onMounted(() => {
  if (localStorage.getItem('data') === null) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  tasks.value.push(...(getItemFromData()?.tasks || []));
  completedTasks.value.push(...(getItemFromData()?.completedTasks || []));
});

function getItemFromData() {
  const arr = [...(JSON.parse(localStorage.getItem('data')) || [])];
  addList(arr);
  return arr.find((item) => item.id === pageId.value);
}

watch(tasks.value, () => {
  localStorage.setItem('data', JSON.stringify(data));
  console.log('watch');
});
watch(completedTasks.value, () => {
  localStorage.setItem('data', JSON.stringify(data));
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
  completedTasks.value.splice(calculateIndex(completedTasks, task), 1);
  completedTasksFromData.value.splice(
    calculateIndex(completedTasksFromData, task),
    1
  );
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
    completedTasks.value.push(currentTask);
    completedTasksFromData.value.push(currentTask);
    handleTasksChange(currentTask);
  } else {
    tasks.value.push(currentTask);
    tasksFromData.value.push(currentTask);
    handleCompletedTasksChange(currentTask);
  }
}

function onChangeTaskInTasks(currentTask) {
  if (!currentTask.done) {
    database.value = data.map((list) => {
      const updatedTasks = list.tasks.map((e) =>
        e.id === currentTask.id ? currentTask : e
      );
      return { ...list, tasks: updatedTasks };
    });
  } else {
    database.value = data.map((list) => {
      const updatedTasks = list.completedTasks.map((e) =>
        e.id === currentTask.id ? currentTask : e
      );
      return { ...list, completedTasks: updatedTasks };
    });
  }
  localStorage.setItem('data', JSON.stringify(database.value));
}
</script>
<template>
  <Header :nameList="nameList" />
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

  <AddTask @create-task="onCreateTask" />
</template>

<style></style>
