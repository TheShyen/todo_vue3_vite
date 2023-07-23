<script setup>
import { onMounted, onUpdated, ref, toRef } from 'vue';
import { useQuasar } from 'quasar';
const props = defineProps([
  'rightDrawerOpen',
  'tasks',
  'updatedDrawerTaskInput',
  'drawerTaskInput'
]);
const emit = defineEmits(['update:rightDrawerOpen', 'update:drawerTaskInput']);
const $q = useQuasar();
const isModalVisible = toRef(props, 'rightDrawerOpen');
const titleInput = ref(props.drawerTaskInput);

onUpdated(() => {
  titleInput.value = props.drawerTaskInput;
});

function closeRightDrawer() {
  emit('update:rightDrawerOpen', false);
}
function updateDrawerTaskInput(event) {
  emit('update:drawerTaskInput', titleInput.value);
  event.target.blur();
  // props.updatedDrawerTaskInput.title = props.drawerTaskInput;
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
    props.tasks.value = props.tasks.value.filter(
      (e) => e !== props.updatedDrawerTaskInput
    );
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
      class="q-ma-md q-mt-md text-h5"
      @keyup.enter="updateDrawerTaskInput($event)"
      outlined
    />
    <q-input
      class="q-ma-md q-mt-xs text-h6"
      label="Добавить описание"
      outlined
    />

    <q-btn
      class="q-ma-md q-mt-xs self-start"
      icon="delete"
      label="delete"
      @click="customBtn"
    />
  </q-drawer>
</template>

<style lang="scss" scoped></style>
