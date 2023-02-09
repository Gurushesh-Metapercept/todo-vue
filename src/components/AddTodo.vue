<template>
  <v-card class="addInput rounded-lg" color="white" outlined>
    <v-text-field
      label="Something you want to do later.."
      :rules="rules"
      hide-details="auto"
      class="mb-2 w-75"
    ></v-text-field>
    <v-btn color="indigo" class="ml-2"> Add </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "AddTodo",
};
</script>

<style>
</style>