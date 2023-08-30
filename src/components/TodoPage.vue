<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import TodoList from './TodoList.vue';
import AddTask from './AddTask.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';
import { useRoute } from 'vue-router';
import { useTodoListsStore } from '../store/TodoListsStore';
import { router } from '../../router';
const route = useRoute();
const store = useTodoListsStore();

const isRightModalOpen = ref(false);
const selectedTask = ref(null);
const tasks = ref([]);
const completedTasks = ref([]);

const pageId = computed(() => route.params.pageId);
const currentList = computed(() => store.getList(pageId));

onMounted(() => {
  tasks.value.push(...(currentList.value?.tasks || []));
  completedTasks.value.push(...(currentList.value?.completedTasks || []));
});

watch(
  () => pageId.value,
  () => {
    tasks.value.splice(0, tasks.value.length);
    tasks.value.push(...currentList.value.tasks);
    completedTasks.value.splice(0, completedTasks.value.length);
    completedTasks.value.push(...currentList.value.completedTasks);
  }
);

function calculateIndex(array, task) {
  return array.value?.findIndex((item) => item.id === task.id);
}
function onCreateTask(newTask) {
  currentList.value.tasks.push(newTask);
  tasks.value.push(newTask);
}
function onOpenRightDialog(task) {
  isRightModalOpen.value = true;
  selectedTask.value = task;
}

function handleTasksChange(task) {
  tasks.value.splice(calculateIndex(tasks, task), 1);
  currentList.value.tasks.splice(
    calculateIndex(currentList.value.tasks, task),
    1
  );
}
function handleCompletedTasksChange(task) {
  completedTasks.value.splice(calculateIndex(completedTasks, task), 1);
  currentList.value.completedTasks.splice(
    calculateIndex(currentList.value.completedTasks, task),
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
    currentList.value.completedTasks.push(currentTask);
    handleTasksChange(currentTask);
  } else {
    tasks.value.push(currentTask);
    currentList.value.tasks.push(currentTask);
    handleCompletedTasksChange(currentTask);
  }
}

function onChangeTaskInTasks(currentTask) {
  store.changeTaskStateInList(currentTask, pageId);
}
</script>
<template>
  <Header :nameList="currentList?.name" />
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
