<template>
  <v-card class="mx-auto py-10 px-10 mt-10" max-width="500" outlined>
    <div>
      <span class="white--red">{{
        this.err_message ? this.err_message : ""
      }}</span>
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
    <div class="grey--text ms-4">
      <router-link to="/register">Create account</router-link>
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      err_message: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((credential) => {
          console.log(credential);
          console.log(this.email, this.password);
          console.log("login successfull..");
          router.push("/alltodos");
        })
        .catch((err) => {
          console.log(err.message);
          this.err_message = err.message;
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