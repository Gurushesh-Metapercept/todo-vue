<template>
  <v-container>
    <div class="cards">
      <v-card
        class="
          d-block
          mx-auto
          d-flex
          flex-column
          justify-space-between
          customCard
        "
        width="350"
        height="auto"
        max-width="350px"
        outlined
        v-for="todo in todosList"
        :key="todo.title"
      >
        <v-card-title class="text-wrap">{{ todo.title }}</v-card-title>
        <v-card-text>
          {{ todo.task }}
        </v-card-text>
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
    </div>
  </v-container>
  <!-- <v-card
    class="mx-auto d-flex justify-center flex-wrap"
    max-width="1200px"
    flat
  >
    <div class="ma-4 custom_card" v-for="todo in todosList" :key="todo.title">
      <v-card class="d-block" width="350" height="auto" outlined>
        <v-card-title>{{ todo.title }}</v-card-title>
        <v-card-text>
          {{ todo.task }}
        </v-card-text>
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
    </div>
  </v-card> -->
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

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  components: {
    ErrorMessage,
  },
  props: {
    todosList: Array,
  },
  setup() {
    const notify = (msg) => {
      toast.success(msg, {
        autoClose: 1000,
      }); // ToastOptions
    };
    return { notify };
  },
  data() {
    return {
      dialogCompose: false,
      updateTitle: "",
      updateTask: "",
      todoId: "",
      err_show: false,
      err_message: "",
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
        this.notify("Todo updated...✨");
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
.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-auto-rows: 1fr;
}

/* Screen larger than 600px? 2 column */
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Screen larger than 900px? 3 columns */
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>