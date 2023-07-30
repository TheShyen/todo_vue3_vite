<script setup>
import TodoItem from './TodoItem.vue';
import { ref } from 'vue';

defineProps(['tasks', 'completeTasks']);
const emit = defineEmits(['completeTask', 'openRightDialog', 'deleteTask']);
const showCompleteTasks = ref(true);

function myTweak(offset) {
  return { minHeight: offset ? `calc(85vh - ${offset}px)` : '90vh' };
}
</script>

<template>
  <q-page :style-fn="myTweak">
    <div v-if="!tasks?.length && !completeTasks?.length">EGC</div>
    <q-list v-if="tasks?.length" bordered class="bg-white q-ma-md" separator>
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @open-right-dialog="emit('openRightDialog', task)"
        @complete-task="emit('completeTask', task)"
        @delete-task="emit('deleteTask', task)"
      />
    </q-list>
    <q-btn-dropdown
      v-if="completeTasks?.length"
      class="q-ml-md q-mt-md"
      color="primary"
      no-caps
      @click="showCompleteTasks = !showCompleteTasks"
      label="Завершенные"
    >
    </q-btn-dropdown>
    <template v-if="completeTasks?.length">
      <q-list
        v-if="showCompleteTasks"
        bordered
        class="bg-white q-ma-md"
        separator
      >
        <TodoItem
          v-for="task in completeTasks"
          :key="task.id"
          :task="task"
          @open-right-dialog="emit('open-right-dialog', task)"
          @complete-task="emit('complete-task', task)"
        />
      </q-list>
    </template>
  </q-page>
</template>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>
