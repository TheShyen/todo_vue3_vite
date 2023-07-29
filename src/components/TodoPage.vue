<script setup>
import { onMounted, ref } from 'vue';
import TodoList from './TodoList.vue';
import AddTask from './AddTask.vue';
import LeftModalWindow from './LeftModalWindow.vue';
import TaskInfo from './TaskInfo.vue';
import Header from './Header.vue';

const rightModalOpen = ref(false);
const modalTaskInput = ref('');
const modalDescriptionInput = ref('');

const updatedDrawerTaskInput = ref('');

const tasks = ref([]);
const completedTasks = ref([]);

onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem('tasks'));
  completedTasks.value = JSON.parse(localStorage.getItem('completeTasks'));
});

function addTask(newTask) {
  tasks.value = tasks.value || [];
  tasks.value.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
}

function openRightDrawer(task) {
  rightModalOpen.value = true;
  modalTaskInput.value = task.title;
  modalDescriptionInput.value = task.description;
  updatedDrawerTaskInput.value = task;
}
function updateRightDrawer(newValue) {
  rightModalOpen.value = newValue;
}

function updateRightDrawerInput(newTitle, newDescription) {
  updatedDrawerTaskInput.value.title = newTitle;
  updatedDrawerTaskInput.value.description = newDescription;
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
}
function updateTasks(el) {
  tasks.value = tasks.value.filter((e) => e !== el);
  if (el.done === false) {
    tasks.value.push(el);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
}

function deleteTask() {
  tasks.value = tasks.value.filter((e) => e !== updatedDrawerTaskInput.value);
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
  completedTasks.value = completedTasks.value.filter(
    (e) => e !== updatedDrawerTaskInput.value
  );

  localStorage.setItem('completeTasks', JSON.stringify(completedTasks.value));
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
    @keyup.esc="rightModalOpen = false"
    class="bg-grey-2"
    view="LHr lpR lFr"
  >
    <Header />
    <LeftModalWindow />
    <TaskInfo
      :rightModalOpen="rightModalOpen"
      :tasks="tasks"
      :modalTaskInput="modalTaskInput"
      :modalDescriptionInput="modalDescriptionInput"
      :updatedDrawerTaskInput="updatedDrawerTaskInput"
      @update:right-modal-open="updateRightDrawer"
      @update:modal-task-input="updateRightDrawerInput"
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
    <AddTask @create-task="addTask" />
  </q-layout>
</template>

<style></style>
