<script setup>
import { ref } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits(['complete-task', 'open-right-dialog']);
const task = ref(props.task);
function completeTask() {
  task.value.done = !task.value.done;
  emit('complete-task', task);
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
    <q-item-section @click="emit('open-right-dialog', task)">
      <q-item-label class="text-subtitle1">{{ task.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped></style>
