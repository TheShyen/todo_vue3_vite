<script setup>
import { ref, toRef, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
const props = defineProps([
  'isRightModalOpen',
  'selectedTask',
  'modalDescriptionInput',
  'modalTaskInput'
]);
const emit = defineEmits([
  'update:isRightModalOpen',
  'update:selectedTaskFields',
  'deleteTask',
  'changeTaskState'
]);
const $q = useQuasar();

const titleInput = ref(props.modalTaskInput);
const currentTask = toRef(props, 'selectedTask');
const descriptionInput = ref(props.modalDescriptionInput);
watchEffect(() => {
  titleInput.value = props.modalTaskInput;
  descriptionInput.value = props.modalDescriptionInput;
});
function closeRightDrawer() {
  emit('update:isRightModalOpen', false);
}
function onUpdateModalInputs(event) {
  emit('update:selectedTaskFields', titleInput.value, descriptionInput.value);
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
    <q-input
      v-model="titleInput"
      :class="{ 'done bg-blue-1': currentTask.done }"
      class="q-ma-md q-mt-md text-h5"
      @keyup.enter="onUpdateModalInputs($event)"
      outlined
    >
      <template v-slot:prepend>
        <q-btn color="primary" dense flat round @click.stop="changeTaskState">
          <q-checkbox
            v-model="currentTask.done"
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
