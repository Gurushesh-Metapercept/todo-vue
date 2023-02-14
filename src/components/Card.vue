<template>
  <v-snackbar v-model="snackbar" :timeout="2000" color="success">
    {{ this.err_message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-container>
    <v-row style="max-width: 1200px" class="mx-auto">
      <v-col
        h-screen
        v-for="todo in todosList"
        :key="todo.title"
        cols="12"
        sm="4"
      >
        <v-card
          class="h-100 d-flex flex-column justify-space-between"
          variant="outlined"
        >
          <v-card-title class="text-wrap">{{ todo.title }}</v-card-title>
          <v-card-text> {{ todo.task }} </v-card-text>
          <v-card-actions>
            <v-btn
              icon
              color="indigo"
              @click="editTodo(todo.id, todo.title, todo.task)"
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="deleteTodo(todo.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogCompose" width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Update todo
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form>
          <v-text-field
            label="Title *"
            :rules="rules"
            hide-details="auto"
            class="mb-2"
            v-model="updateTitle"
            @keyup.enter="updateTodo"
          ></v-text-field>
          <v-textarea
            outlined
            name="input-7-4"
            label="Task *"
            :rules="rules"
            v-model="updateTask"
            @keyup.enter="updateTodo"
          ></v-textarea>
          <ErrorMessage :err_show="err_show" :err_message="err_message" />
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn class="ml-auto" @click="cancelPop()" outlined color="red"
          >Cancel</v-btn
        >
        <v-btn color="indigo" class="custom_btn" @click="updateTodo()">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import ErrorMessage from "./ErrorMessage.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  components: {
    ErrorMessage,
  },
  props: {
    todosList: Array,
  },

  data() {
    return {
      dialogCompose: false,
      updateTitle: "",
      updateTask: "",
      todoId: "",
      err_show: false,
      err_message: "",
      snackbar: false,
    };
  },
  methods: {
    async updateTodo() {
      if (this.updateTitle != "" && this.updateTask != "") {
        const docRef = doc(db, "todos", this.todoId);

        const uData = await {
          title: this.updateTitle,
          task: this.updateTask,
        };

        setDoc(docRef, uData)
          .then((docRef) => {
            console.log("todo updated...", docRef);
          })
          .catch((err) => {
            console.log(err);
          });

        this.dialogCompose = false;
        this.err_show = false;
        this.snackbar = true;
        this.err_message = "Todo updated...😉";
      } else if (this.updateTitle == "" || this.updateTask == "") {
        console.log("can not blank");
        this.err_show = true;
        this.err_message = "Field cannot be blank";
      }
    },
    deleteTodo(id) {
      console.log(id);
      const docRef = doc(db, "todos", id);

      deleteDoc(docRef).then(() => {
        console.log("deleted");
        this.snackbar = true;
        this.err_message = "Todo deleted...✌";
      });
    },
    editTodo(id, title, task) {
      console.log(id, title, task);
      (this.dialogCompose = true), console.log(id);

      this.updateTitle = title;
      this.updateTask = task;
      this.todoId = id;
    },
    compose() {
      this.dialogCompose = true;
    },
    cancelPop() {
      this.dialogCompose = false;
    },
  },
};
</script>

<style>
</style>