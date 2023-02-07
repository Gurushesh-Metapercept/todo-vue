<template>
  <v-app id="tasl">
    <Header />
    <AddTodo />
    <div class="boxx">
      <Card :todos="todos" />
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Card from "../components/Card.vue";
import AddTodo from "@/components/AddTodo.vue";
export default {
  components: {
    Header,
    Card,
    AddTodo,
  },
  data() {
    return {
      todos: [
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time",
        },
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time",
        },
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time",
        },
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time",
        },
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time",
        },
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time",
        },
        {
          title: "ths is tiele",
          task: "thsi is task and you have to complete within time thsi is task and you have to complete within time",
        },
      ],
    };
  },
};
</script>

<style>
.boxx {
  display: flex;
  justify-content: center;
  max-width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-top: 2rem;
}
</style>