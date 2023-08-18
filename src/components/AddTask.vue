<script setup>
import { onMounted, ref } from 'vue';
import Alert from './Alert.vue';

const emit = defineEmits(['createTask']);

const taskInput = ref('');
const input = ref(null);
const hasInputAlert = ref(false);

onMounted(() => {
  input.value.focus();
});
function addTask() {
  if (!taskInput.value.trim().length) {
    hasInputAlert.value = true;
    return;
  }
  const newTask = {
    title: taskInput.value,
    description: '',
    done: false,
    id: Date.now()
  };
  emit('createTask', newTask);
  taskInput.value = '';
}
</script>

<template>
  <q-footer class="bg-grey-2">
    <Alert v-if="hasInputAlert" />
    <q-input
      ref="input"
      @update:model-value="hasInputAlert = false"
      v-model="taskInput"
      bg-color="white"
      class="text-h6 q-ma-md"
      outlined
      placeholder="Add task"
      @keyup.enter="addTask"
    >
      <template v-slot:prepend>
        <q-btn
          color="primary"
          dense
          flat
          icon="add"
          round
          size="md"
          @click="addTask"
        />
      </template>
    </q-input>
  </q-footer>
</template>

<style lang="scss" scoped></style>
