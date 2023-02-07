import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBykd4uOiYQ_-hnrxKNEuu_SUjpCV5IqGI",
    authDomain: "todo-auto-870c8.firebaseapp.com",
    projectId: "todo-auto-870c8",
    storageBucket: "todo-auto-870c8.appspot.com",
    messagingSenderId: "715651698557",
    appId: "1:715651698557:web:dbf586fe53103ec5e04614"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);

  const db = getFirestore
  export default db

  export const auth = getAuth();