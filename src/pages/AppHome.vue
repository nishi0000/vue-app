<script setup>
import { ref, watchEffect } from 'vue';
import {db} from "../firebase_settings/index.js";
import { collection, getDocs } from "firebase/firestore";

const loading = ref(true); // ローディング状態を管理するリファレンス
const data = ref([])
// ドキュメントを取得して表示
watchEffect(async () => {
  const querySnapshot = await getDocs(collection(db, "breadproduct"));
  data.value = querySnapshot.docs.map(doc => doc.data()); 
  console.log(data.value)
  loading.value = false
})
</script>

<template>

    <h1>Home</h1>
    <div v-if="loading">Loading...</div>
    <ul v-for="data,index in data" :key="index">
      <li>商品名:{{ data.breadName }} </li>
      <li>お店の名前:{{ data.storeName }}</li>
      <li>値段:{{ data.price }}</li>
      <li>詳細:{{ data.detail }}</li>
    </ul>


  <br />
  <br />
  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />
</template>