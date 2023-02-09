<template>
  <v-app>
    <Header />
    <!-- <AddTodo /> -->
    <div class="wrapper">
      <v-card class="mx-auto py-10" max-width="800">
        <v-row class="d-flex mx-auto justify-center align-center">
          <v-col cols="4">
            <v-text-field
              label="Title"
              :rules="rules"
              hide-details="auto"
              class="mb-2"
              v-model="newTodo"
              @keyup.enter="addTodo"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Task"
              :rules="rules"
              hide-details="auto"
              class="mb-2"
              v-model="newTask"
              @keyup.enter="addTodo"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn color="indigo" class="ml-2 custom_btn" @click="addTodo">
              Add
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-row v-if="err_show" class="custom_error">
      <v-col cols="3" class="mx-auto">
        <v-alert dense outlined type="error">
          {{ this.err_message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="success_show" class="custom_error">
      <v-col cols="3" class="mx-auto">
        <v-alert dense text type="success">
          {{ this.err_message }}
        </v-alert>
      </v-col>
    </v-row>

    <v-card class="mx-auto d-flex justify-center flex-wrap" flat>
      <Card :todosList="todosList" />
    </v-card>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Card from "../components/Card.vue";

import { db } from "../firebase/init";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
  components: {
    Header,
    Card,
  },
  data() {
    return {
      todosList: [],
      newTodo: "",
      newTask: "",
      err_show: false,
      success_show: false,
      err_message: "",
    };
  },
  methods: {
    async addTodo() {
      console.log("cked");
      if (this.newTodo != "" && this.newTask != "") {
        // this.todosList.push({ title: this.newTodo, task: this.newTask });
        await addDoc(collection(db, "todos"), {
          title: this.newTodo,
          task: this.newTask,
        });
        this.newTodo = "";
        this.newTask = "";
        this.err_message = "New todo added";
        this.err_show = false;
        this.success_show = true;
      } else if (
        (this.newTodo != "" && this.newTask == "") ||
        (this.newTodo == "" && this.newTask != "") ||
        (this.newTask == "" && this.newTodo == "")
      ) {
        this.err_message = "please fill all the fields";
        this.success_show = false;
        this.err_show = true;
      }
    },
  },
  async mounted() {
    const colRef = collection(db, "todos");
    const docsSnap = await getDocs(colRef);
    console.log("from mounted");
    // console.log(docsSnap.docs);
    this.todosList = docsSnap.docs;
    docsSnap.forEach((doc) => {
      console.log(doc.data());
    });
  },
};
</script>

<style>
.wrapper {
  margin: 6rem;
}
.custom_error {
  margin-top: -5rem;
  max-height: 100px;
}
</style>