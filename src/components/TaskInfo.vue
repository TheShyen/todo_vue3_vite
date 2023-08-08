<script setup>
import { reactive, ref, toRef, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
const props = defineProps(['isRightModalOpen', 'selectedTask']);
const emit = defineEmits([
  'update:isRightModalOpen',
  'update:selectedTask',
  'deleteTask',
  'changeTaskState',
  'changeTaskInTasks'
]);
const $q = useQuasar();

const hasInputAlert = ref(false);
const currentTask = ref(props.selectedTask);
const titleInput = ref('');
const descriptionInput = ref('');
watchEffect(() => {
  titleInput.value = currentTask.value?.title;
  descriptionInput.value = currentTask.value?.description;
});

function closeRightDrawer() {
  emit('update:isRightModalOpen', false);
}
function onUpdateModalInputs(event) {
  if (!event.target.value.trim()) {
    hasInputAlert.value = true;
    return;
  }
  currentTask.value.title = titleInput.value;
  currentTask.value.description = descriptionInput.value;

  emit('update:selectedTask', currentTask.value);
  emit('changeTaskInTasks', currentTask.value);
  event.target.blur();
}
function changeTaskState() {
  currentTask.value.done = !currentTask.value.done;
  emit('changeTaskState', currentTask.value);
}
function showDialogModal() {
  $q.dialog({
    title: 'Confirm',
    message: 'Удалить задачу?',
    noEscDismiss: false,

    ok: {
      push: true,
      color: 'negative'
    },
    cancel: {
      push: true
    }
  }).onOk(() => {
    emit('deleteTask', currentTask.value);

    closeRightDrawer();
  });
}
</script>
<template>
  <q-drawer
    v-model="props.isRightModalOpen"
    :width="400"
    bordered
    class="column"
    side="right"
  >
    <q-btn
      class="q-ma-md self-end"
      color="primary"
      flat
      icon="close"
      square
      @click="closeRightDrawer"
    />
    <div class="q-ml-md text-red text-h6" v-if="hasInputAlert">
      Напишите что-нибудь
    </div>
    <q-input
      v-model="titleInput"
      @update:model-value="hasInputAlert = false"
      :class="{ 'done bg-blue-1': currentTask?.done }"
      class="q-ma-md q-mt-md text-h5"
      @keyup.enter="onUpdateModalInputs($event)"
      outlined
    >
      <template v-slot:prepend>
        <q-btn color="primary" dense flat round @click.stop="changeTaskState">
          <q-checkbox
            :model-value="currentTask?.done"
            class="no-pointer-events"
            color="teal"
          />
        </q-btn>
      </template>
    </q-input>
    <q-input
      v-model="descriptionInput"
      class="q-ma-md q-mt-xs text-h6"
      type="textarea"
      placeholder="Добавить описание"
      outlined
      @keyup.enter="onUpdateModalInputs($event)"
    >
    </q-input>

    <q-btn
      class="q-ma-md q-mt-xs self-start"
      color="brown-5"
      icon="delete"
      label="Удалить"
      @click="showDialogModal"
    />
  </q-drawer>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
  color: #624949;
}
</style>
