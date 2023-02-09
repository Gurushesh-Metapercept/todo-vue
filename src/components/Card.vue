<template>
  <div class="ma-4 custom_card" v-for="todo in todosList" :key="todo.title">
    <v-card class="custom__card d-block" width="350" height="auto" outlined>
      <v-card-title>{{ todo.title }}</v-card-title>
      <v-card-text>
        {{ todo.task }}
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn text color="primary">Edit</v-btn> -->
        <v-btn icon color="red" @click="deleteTodo(todo.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  props: {
    todosList: Array,
  },
  methods: {
    deleteTodo() {
      console.log("asd");
    },
  },

  mounted() {
    console.log(this.todosList);

    console.log("from updated");
  },
};
</script>

<style>
.custom_card {
  cursor: pointer;
}
</style>