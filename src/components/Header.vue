<template>
  <v-app-bar app color="indigo" dark flat class="px-12">
    <v-btn>
        <span>TODO</span>
    </v-btn>
    <v-spacer></v-spacer>
    <router-link to="/addtoto">
    <v-btn class=" white--text" rounded to="/AddTodo">
            Add Todo
     </v-btn>
    </router-link>
    <router-link to="/logout">
    <v-btn class=" white--text" rounded to="/logout">
            Logout
     </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name : "Header"
}
</script>

<style>

</style>