<template>
  <v-card class="mx-auto py-10 px-10 mt-10" max-width="500" outlined>
    <div>
      <v-card-title>Login</v-card-title>
      <v-text-field
        label="example@gmail.com"
        :rules="rules"
        hide-details="auto"
        class="mb-2"
        v-bind="email"
      ></v-text-field>
      <v-text-field label="Password" v-bind="password"></v-text-field>
    </div>
    <div class="grey--text ms-4">
      <router-link to="/register">Create account</router-link>
    </div>
    {{ this.email }} {{ this.password }}
    <v-card-actions>
      <v-btn elevation="1" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      firebase
        .auto()
        .SignInWIthEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          (err) => {
            console.log(err);
          };
        });
    },
  },
};
</script>

<style>
</style>