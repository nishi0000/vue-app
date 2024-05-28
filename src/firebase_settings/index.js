
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6RxfWQHaqRue4uDw4g1rdlcqdHJa8a7E",
   authDomain: "vue-app-52c59.firebaseapp.com",
   projectId: "vue-app-52c59",
   storageBucket: "vue-app-52c59.appspot.com",
   messagingSenderId: "284243100735",
   appId: "1:284243100735:web:a0d216427634970731648a"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth()



export { db, auth };