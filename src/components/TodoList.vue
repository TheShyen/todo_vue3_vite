<template>
  <q-page :style-fn="myTweak">
    <q-list
      v-for="(task, index) in tasks"
      bordered
      class="bg-white q-ma-md"
      separator
      @open-right-dialog="$emit('open-right-dialog', task)"
    >
      <TodoItem
        :key="task.id"
        :task="task"
        @open-right-dialog="$emit('open-right-dialog', task)"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import TodoItem from './TodoItem.vue';

defineProps(['tasks']);
defineEmits(['delete-task', 'open-right-dialog']);

function myTweak(offset) {
  return { minHeight: offset ? `calc(85vh - ${offset}px)` : '90vh' };
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>
