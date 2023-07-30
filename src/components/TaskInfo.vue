<script setup>
import { onUpdated, ref, toRef } from 'vue';
import { date, useQuasar } from 'quasar';
const props = defineProps([
  'rightModalOpen',
  'updatedDrawerTaskInput',
  'modalDescriptionInput',
  'modalTaskInput'
]);
const emit = defineEmits([
  'update:rightModalOpen',
  'update:modalTaskInput',
  'tasksChange'
]);
const $q = useQuasar();
const isModalVisible = toRef(props, 'rightModalOpen');
const titleInput = ref(props.modalTaskInput);
const currentTask = toRef(props, 'updatedDrawerTaskInput');
const descriptionInput = ref(props.modalDescriptionInput);

onUpdated(() => {
  titleInput.value = props.modalTaskInput;
  descriptionInput.value = props.modalDescriptionInput;
});

function closeRightDrawer() {
  emit('update:rightModalOpen', false);
}
function updateDrawerTaskInput(event) {
  emit('update:modalTaskInput', titleInput.value, descriptionInput.value);
  event.target.blur();
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
    emit('tasksChange');

    closeRightDrawer();
  });
}
</script>
<template>
  <q-drawer
    v-model="isModalVisible"
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
      @keyup.enter="updateDrawerTaskInput($event)"
      outlined
    >
      <template v-slot:prepend>
        <q-btn
          color="primary"
          dense
          flat
          round
          @click.stop="currentTask.done = !currentTask.done"
        >
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
      placeholder="Добавить описание"
      outlined
      @keyup.enter="updateDrawerTaskInput($event)"
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
