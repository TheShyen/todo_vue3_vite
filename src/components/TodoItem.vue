<script setup>
import { ref } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits([
  'switching-state',
  'open-right-dialog',
  'delete-task'
]);

const task = ref(props.task);
const showContextMenu = ref(false);

function changeTaskState() {
  task.value.done = !task.value.done;
  emit('switching-state', task.value);
}
function deleteTask() {
  emit('delete-task', task);
}
</script>
<template>
  <q-item v-ripple :class="{ 'done bg-blue-1': task.done }">
    <q-item-section avatar>
      <q-btn color="primary" dense flat round @click="changeTaskState">
        <q-checkbox
          v-model="task.done"
          class="no-pointer-events"
          color="teal"
        />
      </q-btn>
    </q-item-section>
    <q-item-section
      @click="emit('open-right-dialog', task)"
      @contextmenu.prevent="showContextMenu = !showContextMenu"
    >
      <q-popup-proxy context-menu class="column">
        <q-menu v-model="showContextMenu">
          <q-item clickable class="flex-center">
            <q-icon name="delete" color="red" />
            <q-item-section class="q-ml-xs" @click="deleteTask"
              >Удалить</q-item-section
            >
          </q-item>
          <q-item v-if="!task.done" clickable class="flex-center">
            <q-icon name="done" color="green" />
            <q-item-section @click="changeTaskState" class="q-ml-xs"
              >Пометить как завершенное</q-item-section
            ></q-item
          >
          <q-item v-if="task.done" clickable class="flex-center">
            <q-icon name="done" color="green" />
            <q-item-section @click="changeTaskState" class="q-ml-xs"
              >Пометить как незавершенное</q-item-section
            ></q-item
          >
        </q-menu>
      </q-popup-proxy>
      <q-item-label class="text-subtitle1">{{ task.title }}</q-item-label>
    </q-item-section>
    <q-item-label
      class="q-mt-xs text-grey-7"
      style="text-decoration: none"
      v-if="task.description"
    >
      <q-icon name="note" />
      Заметка
    </q-item-label>
  </q-item>
</template>

<style lang="scss" scoped></style>
