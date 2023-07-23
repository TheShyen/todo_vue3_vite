<script setup></script>

<template>
  <q-drawer
    :width="350"
    bordered
    class="bg-grey-3 column"
    show-if-above
    side="left"
  >
    <q-input
      class="search text-h6"
      label="Search"
      standout="bg-teal-3 text-white"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-btn
      flat
      icon="add"
      outlined
      size="15px"
      class="q-pa-md text-h6 fixed-bottom q-mb-md"
      >Создать список</q-btn
    >
  </q-drawer>
</template>

<style lang="scss" scoped></style>
