<template>
  <v-card class="addInput rounded-lg" color="white" outlined>
    <v-text-field
      label="Something you want to do later.."
      :rules="rules"
      hide-details="auto"
      class="mb-2 w-75"
    ></v-text-field>
    <v-btn color="indigo" class="ml-2"> Validate </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "AddTodo",
};
</script>

<style>
.addInput {
  min-width: 800px;
  margin: 0 auto;
  margin: 0 auto;
  margin-top: 7rem;
  background: #9c9292;
  padding: 2rem;
  display: flex;
}
</style>