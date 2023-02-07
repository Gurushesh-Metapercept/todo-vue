<template>
  <v-card class="mx-auto py-10 px-10 mt-10" max-width="500" outlined>
    <div>
      <v-card-title>Register</v-card-title>
      <v-text-field
        label="Name"
        :rules="rules"
        hide-details="auto"
        class="mb-2"
        v-bind="name"
      ></v-text-field>
      <v-text-field
        label="example@gmail.com"
        :rules="rules"
        hide-details="auto"
        class="mb-2"
        v-bind="email"
      ></v-text-field>
      <v-text-field label="Password" v-bind="password"></v-text-field>
    </div>

    <v-card-actions>
      <v-btn elevation="1" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>
 
 <script>
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase/init";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((credential) => {
          console.log(credential);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
 
 <style>
</style>