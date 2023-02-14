<template>
  <v-app>
    <!-- Header  -->
    <Header />
    <!--  Add TODO Button  -->
    <div class="wrapper">
      <v-container class="my-auto">
        <v-row>
          <v-btn class="mx-auto" color="indigo" @click="compose({})"
            >Add Todo</v-btn
          >
        </v-row>
      </v-container>

      <!-- Pop Up Component for Adding Todo -->
      <v-dialog v-model="dialogCompose" width="500">
        <v-card>
          <v-card-title class="headline black" primary-title>
            Add your todo
          </v-card-title>
          <v-card-text class="pa-5">
            <v-form>
              <v-text-field
                label="Title *"
                :rules="rules"
                hide-details="auto"
                class="mb-2"
                v-model="newTodo"
                @keyup.enter="addTodo"
              ></v-text-field>
              <v-textarea
                outlined
                name="input-7-4"
                label="Task *"
                v-model="newTask"
                :rules="rules"
                @keyup.enter="addTodo"
              ></v-textarea>
              <ErrorMessage :err_show="err_show" :err_message="err_message" />
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <v-btn class="ml-auto" @click="cancelPop()" outlined color="red"
              >Cancel</v-btn
            >

            <v-btn color="indigo" class="custom_btn" @click="addTodo">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- Erro Message Component  -->
    <!-- <ErrorMessage :success_show="success_show" :err_message="err_message" /> -->

    <!-- Todo Card Component  -->

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="mx-auto"
    ></v-progress-circular>
    <Card v-else :todosList="todosList" />

    <!-- notification -->
    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      {{ this.err_message }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Card from "../components/Card.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

import { auth, db } from "../firebase/init";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export default {
  components: {
    Header,
    Card,
    ErrorMessage,
  },
  data() {
    return {
      todosList: [],
      newTodo: "",
      newTask: "",
      err_show: false,
      // success_show: false,
      err_message: "",
      dialogCompose: false,
      loading: true,
      displayEmail: "",
      snackbar: false,
    };
  },

  methods: {
    async addTodo() {
      console.log("add todo function");
      if (this.newTodo != "" && this.newTask != "") {
        // this.todosList.push({ title: this.newTodo, task: this.newTask });
        await addDoc(collection(db, "todos"), {
          title: this.newTodo,
          task: this.newTask,
        });
        this.newTodo = "";
        this.newTask = "";
        // this.success_show = true;
        this.err_show = false;
        this.dialogCompose = false;
        this.snackbar = true;
        this.err_message = "New todo created ✨";
      } else if (
        (this.newTodo != "" && this.newTask == "") ||
        (this.newTodo == "" && this.newTask != "") ||
        (this.newTask == "" && this.newTodo == "")
      ) {
        this.err_message = "Please complete all required fields 😒";
        this.success_show = false;
        this.err_show = true;
      }
    },
    compose() {
      this.dialogCompose = true;
    },
    cancelPop() {
      this.dialogCompose = false;
    },
  },
  async mounted() {
    let currentUser = localStorage.getItem("currentUser");
    console.log("currentUser" + currentUser);
    onSnapshot(collection(db, "todos"), (snapshot) => {
      const tt = [];
      snapshot.forEach((doc) => {
        const todoz = {
          ...doc.data(),
          id: doc.id,
        };
        tt.push(todoz);
      });
      (this.loading = false), (this.todosList = tt);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("uid == " + user.uid);
        console.log(user);
      } else {
        // User is signed out
        // ...
      }
    });
  },
  created() {
    setTimeout(() => {
      this.success_show = false;
    }, 100);
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