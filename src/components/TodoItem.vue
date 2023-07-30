<script setup>
import { ref } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits(['completeTask', 'open-right-dialog', 'deleteTask']);
const task = ref(props.task);
const showContextMenu = ref(false);
function completeTask() {
  task.value.done = !task.value.done;
  emit('complete-task', task);
}
function deleteTask() {
  emit('delete-task', task);
}
</script>
<template>
  <q-item :key="task.id" v-ripple :class="{ 'done bg-blue-1': task.done }">
    <q-item-section avatar>
      <q-btn color="primary" dense flat round @click.stop="completeTask">
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
            <q-icon name="delete" />
            <q-item-section @click="deleteTask">Удалить</q-item-section>
          </q-item>
          <q-item clickable class="flex-center">
            <q-icon name="done" />
            <q-item-section @click="deleteTask"
              >Пометить как завершенное</q-item-section
            ></q-item
          >
        </q-menu>

        <!--        <q-btn-->
        <!--          class="q-ml-md q-mr-md q-mb-md"-->
        <!--          color="brown-5"-->
        <!--          icon="done"-->
        <!--          no-caps-->
        <!--          label="Пометить как завершенное"-->
        <!--          @click="showDialogModal"-->
        <!--        />-->
      </q-popup-proxy>
      <q-item-label class="text-subtitle1">{{ task.title }}</q-item-label>
    </q-item-section>
    <q-item-label class="q-mt-xs text-grey-7" v-if="task.description"
      ><q-icon name="note" /> Заметка</q-item-label
    >
  </q-item>
</template>

<style lang="scss" scoped></style>
