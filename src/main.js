import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// import {initializeApp} from "firebase/app"


// const firebaseConfig = {
//   apiKey: "AIzaSyBykd4uOiYQ_-hnrxKNEuu_SUjpCV5IqGI",
//   authDomain: "todo-auto-870c8.firebaseapp.com",
//   projectId: "todo-auto-870c8",
//   storageBucket: "todo-auto-870c8.appspot.com",
//   messagingSenderId: "715651698557",
//   appId: "1:715651698557:web:dbf586fe53103ec5e04614"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
