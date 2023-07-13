<script setup>
defineProps(['task']);
</script>
<template>
  <q-item :key="task.id" v-ripple :class="{ 'done bg-blue-1': task.done }">
    <q-item-section avatar>
      <q-btn
        color="primary"
        dense
        flat
        round
        @click.stop="task.done = !task.done"
      >
        <q-checkbox
          v-model="task.done"
          class="no-pointer-events"
          color="teal"
        />
      </q-btn>
    </q-item-section>
    <q-item-section @click="$emit('open-right-dialog', task)">
      <q-item-label class="text-subtitle1">{{ task.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped></style>
