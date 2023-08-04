<script setup>
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['createTask']);

const taskInput = ref('');
const input = ref(null);
const showAt = ref(false);
onMounted(() => {
  input.value.focus();
});
watch(taskInput, () => (showAt.value = false));
function addTask() {
  if (!taskInput.value.trim().length) {
    showAt.value = true;
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
    <div class="q-ml-md text-red text-h6" v-if="showAt">
      Напишите что-нибудь
    </div>
    <q-input
      ref="input"
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
