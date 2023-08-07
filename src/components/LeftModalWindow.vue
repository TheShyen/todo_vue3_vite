<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
const $q = useQuasar();
const createListInput = ref('');
const list = ref([]);
function prompt() {
  $q.dialog({
    title: 'Создание нового списка',
    message: 'Введите имя списка',
    prompt: {
      model: createListInput.value,
      isValid: (val) => val.length > 2,
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk((data) => {
    list.value.push(data);
  });
}
</script>

<template>
  <q-drawer
    :width="280"
    bordered
    class="bg-grey-3 column"
    show-if-above
    side="left"
    :breakpoint="500"
  >
    <q-input
      class="text-h6 q-ma-xs"
      label="Search"
      standout="bg-teal-3 text-white"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list bordered class="bg-white q-mt-md q-ma-xs" separator>
      <q-item v-ripple v-for="item in list" :key="item">
        <q-item-section>
          <q-item-label class="self-center text-subtitle1">{{
            item
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-btn
      flat
      icon="add"
      outlined
      size="15px"
      class="q-pa-md text-h6 fixed-bottom q-mb-md"
      @click="prompt"
      >Создать список</q-btn
    >
  </q-drawer>
</template>

<style lang="scss" scoped></style>
