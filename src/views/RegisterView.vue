<template>
  <v-card class="mx-auto py-10 px-10 mt-10" max-width="500" outlined>
    <ErrorMessage :err_show="err_show" :err_message="err_message" />
    <div>
      <v-card-title>Register</v-card-title>
      <v-text-field
        label="Name"
        :rules="rules"
        hide-details="auto"
        class="mb-2"
        v-model="name"
      ></v-text-field>
      <v-text-field
        label="example@gmail.com"
        :rules="rules"
        hide-details="auto"
        class="mb-2"
        v-model="email"
      ></v-text-field>
      <v-text-field label="Password" v-model="password"></v-text-field>
    </div>
    <v-card-actions>
      <v-btn elevation="1" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>
 
 <script>
// import { createUserWithEmailAndPassword } from "@firebase/auth";
// import { auth } from "../firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init";
import router from "@/router";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "RegisterView",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      err_message: "",
      err_show: false,
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((credential) => {
          console.log(credential);
          console.log(this.email, this.password);
          router.push("/");
          this.err_show = false;
        })
        .catch((err) => {
          console.log(err.message);
          this.err_message = err.message;
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