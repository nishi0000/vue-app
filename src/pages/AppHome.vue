<script setup>
import { ref, watchEffect } from 'vue';
import {db} from "../firebase_settings/index.js";
import { collection, getDocs } from "firebase/firestore";

const loading = ref(true); 
const data = ref([])
// ドキュメントを取得して表示
watchEffect(async () => {
  const querySnapshot = await getDocs(collection(db, "todo"));
  data.value = querySnapshot.docs.map(doc => doc.data()); 
  console.log(data.value)
  loading.value = false
})
</script>

<template>

    <h1>ToDoList</h1>
    <p>A / B / C / D</p>
    <p>すべて / 回答が必要 / 返事待ち / 完了</p>
    <div v-if="loading">Loading...</div>
    <ul v-for="data,index in data" :key="index">
      <li>チーム{{data.team}} ステータス:{{ data.status }} 担当者:{{ data.pic }}</li>
      <li>メール件名:{{ data.subject }} </li>
      <li>日付:{{ data.date }} 〇日前</li>
      <li>詳細:{{ data.detail }}</li>
    </ul>


  <br />
  <br />
  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />
</template>