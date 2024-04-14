<script setup>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuth } from "../stores/user";

const userProfile = useAuth();

const onClickLogin = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, "test@gmail.com", "testtest")
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};

const onClickLogout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
        userProfile.$patch((state) => {
    state.token = "";
  });

    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <h1>ログイン画面</h1>
  <button @click="onClickLogin">ログイン</button>
  <button @click="onClickLogout">ログアウト</button>
  <p>{{ userProfile.token }}</p>
</template>
