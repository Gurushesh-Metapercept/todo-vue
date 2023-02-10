<template>
  <v-card class="mx-auto py-10 px-10 mt-10" max-width="500" outlined>
    <ErrorMessage :err_show="err_show" :err_message="err_message" />
    <div>
      <v-card-title>Login</v-card-title>
      <v-text-field
        label="example@gmail.com"
        :rules="rules"
        hide-details="auto"
        class="mb-2"
        v-model="email"
      ></v-text-field>
      <v-text-field label="Password" v-model="password"></v-text-field>
    </div>
    <div class="ms-4 text-end">
      <router-link to="/register">Don't have account?</router-link>
    </div>
    <v-card-actions>
      <v-btn elevation="1" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init";
import router from "@/router";
import ErrorMessage from "../components/ErrorMessage.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      email: "",
      password: "",
      err_show: false,
      err_message: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((credential) => {
          this.err_show = false;
          console.log(credential);
          console.log(this.email, this.password);
          console.log("login successfull..");
          router.push("/alltodos");
        })
        .catch((err) => {
          console.log(err.message);
          this.err_message = err.message;
          console.log(err.message);
          this.err_show = true;
        });
    },
    clickHandler() {
      console.log(this.email, this.password);
    },
  },
};
</script>

<style>
</style>