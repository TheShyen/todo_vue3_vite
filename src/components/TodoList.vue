<script setup>
import TodoItem from './TodoItem.vue';
import { ref } from 'vue';

defineProps(['tasks', 'completedTasks']);
const emit = defineEmits([
  'change-task-state',
  'open-right-dialog',
  'delete-task'
]);
const showCompleteTasks = ref(true);

function myTweak(offset) {
  return { minHeight: offset ? `calc(85vh - ${offset}px)` : '90vh' };
}
</script>

<template>
  <q-page :style-fn="myTweak" class="page">
    <div
      v-if="!tasks?.length && !completedTasks?.length"
      class="plug text-h4 text-blue-grey q-mt-xl"
    >
      Добавьте новую задачу!
    </div>
    <q-list v-if="tasks?.length" bordered class="bg-white q-ma-md" separator>
      <TodoItem
        v-for="task in tasks"
        :key="task?.id"
        :task="task"
        @open-right-dialog="emit('open-right-dialog', task)"
        @change-task-state="emit('change-task-state', task)"
        @delete-task="emit('delete-task', task)"
      />
    </q-list>
    <q-btn-dropdown
      v-if="completedTasks?.length"
      class="q-ml-md q-mt-md"
      color="primary"
      no-caps
      @click="showCompleteTasks = !showCompleteTasks"
      label="Завершенные"
    >
    </q-btn-dropdown>
    <template v-if="completedTasks?.length">
      <q-list
        v-if="showCompleteTasks"
        bordered
        class="bg-white q-ma-md"
        separator
      >
        <TodoItem
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
          @open-right-dialog="emit('open-right-dialog', task)"
          @change-task-state="emit('change-task-state', task)"
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

.plug {
  display: flex;
  justify-content: center;
}
</style>
