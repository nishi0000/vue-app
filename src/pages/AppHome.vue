<script setup>
import { ref, watchEffect } from 'vue';
import { db } from "../firebase_settings/index.js";
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
  <main>
    <div class="title-container">
      <h1>ToDoList</h1>
      <p>A / B / C / D</p>
      <p>すべて / 回答が必要 / 返事待ち / 完了</p>
    </div>

    <div v-if="loading">Loading...</div>

    <div class="todo-container" v-for="data, index in data" :key="index">
      <div class="tag-container">
        <div class="tag">チーム{{ data.team }}</div>
        <div class="tag">{{ data.status }}</div>
        <div class="tag">{{ data.pic }}</div>
        <div class="tag">{{ data.process }}</div>
      </div>
      <div class="mail-container">
        <div class="mail-title">メール件名:{{ data.subject }} </div>
        <div>日付:{{ data.date }}</div>
        <div>〇日前</div>
        <div class="detail-container">詳細:{{ data.detail }}</div>
      </div>
    </div>


    <br />
    <br />
    <br /> <br /> <br /> <br /> <br /> <br />
  </main>
</template>


<style scoped>
.title-container {
  width: 800px;
  margin: 0 auto;
}

.todo-container {
  /* background-color: aqua; */
  margin: 12px auto;
  padding: 12px;
  width: 800px;
}

.tag-container {
  display: flex;
  gap: 8px;
}

.mail-container {
  padding-left: 16px;
}

.tag {
  font-size: small;
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 8px;
}

.mail-title {
  margin-top: 8px;
}

.detail-container {
  white-space: pre-line;
}

.todo-container:hover {
  background-color: #f4f9ff;
}
</style>
