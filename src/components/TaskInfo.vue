<script setup>
import { onMounted, onUpdated, ref, toRef } from 'vue';
import { useQuasar } from 'quasar';
const props = defineProps([
  'rightDrawerOpen',
  'updatedDrawerTaskInput',
  'drawerTaskInput'
]);
const emit = defineEmits([
  'update:rightDrawerOpen',
  'update:drawerTaskInput',
  'tasksChange'
]);
const $q = useQuasar();
const isModalVisible = toRef(props, 'rightDrawerOpen');
const titleInput = ref(props.drawerTaskInput);
const currentTask = toRef(props, 'updatedDrawerTaskInput');

onUpdated(() => {
  titleInput.value = props.drawerTaskInput;
});

function closeRightDrawer() {
  emit('update:rightDrawerOpen', false);
}
function updateDrawerTaskInput(event) {
  emit('update:drawerTaskInput', titleInput.value);
  event.target.blur();
}
function customBtn() {
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
      class="q-ma-md q-mt-xs text-h6"
      label="Добавить описание"
      outlined
    />

    <q-btn
      class="q-ma-md q-mt-xs self-start"
      color="brown-5"
      icon="delete"
      label="Удалить"
      @click="customBtn"
    />
  </q-drawer>
</template>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
  color: #5d4242;
}
</style>
