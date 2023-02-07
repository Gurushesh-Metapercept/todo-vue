<template>
  <div
    class="d-flex justify-center ma-4 custom_card"
    v-for="todo in todos"
    :key="todo.title"
  >
    <v-card class="custom__card" width="350" outlined>
      <v-card-title>{{ todo.title }}</v-card-title>
      <v-card-text>
        {{ todo.task }}
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">Edit</v-btn>
        <v-btn text>Delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  props: {
    todos: Array,
  },
};
</script>

<style>
.custom_card {
  cursor: pointer;
}
</style>