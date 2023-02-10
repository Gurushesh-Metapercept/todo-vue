<template>
  <v-container class="my-auto">
    <v-col cols="8" class="mx-auto d-flex justify-end">
      <v-btn color="primary" @click="compose({})">Add Todo</v-btn>
    </v-col>
  </v-container>
  <v-dialog v-model="dialogCompose" width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Compose Message
      </v-card-title>
      <v-card-text class="pa-5"> </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn class="ml-auto" @click="saveDraft()" outlined color="primary"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddTodoDialog",
  data() {
    return {
      dialogCompose: false,
    };
  },
  methods: {
    compose() {
      this.dialogCompose = true;
    },
    saveDraft() {
      this.dialogCompose = false;
    },
  },
};
</script>

<style>
</style>