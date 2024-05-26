<script setup>
import { ref, watchEffect } from 'vue';
import { db } from "../firebase_settings/index.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const loading = ref(true);
const mailContent = ref([]);
const mailId = ref([]);

// ドキュメントを取得して表示
watchEffect(async () => {
  const dataRef = collection(db, "todo");
  const q = await query(dataRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  // ドキュメントのIDを取得
  mailId.value = querySnapshot.docs.map(doc => doc.id);

  // ドキュメントのデータを取得
  mailContent.value = querySnapshot.docs.map(doc => doc.data());
  console.log(mailContent.value)
  loading.value = false
});

</script>

<template>
  <main>
    <div class="title-container">
      <h1>ToDoList</h1>
      <p>すべて / A / B / C / D</p>
      <p>すべて / 対応中 （ 未回答 / 返事待ち ） / 完了</p>
    </div>

    <div v-if="loading">Loading...</div>

    <div class="todo-container" v-for="data, index in mailContent" :key="index"
      @click="$router.push(`mail/${mailId[index]}`)">
      <div class="tag-container">
        <div class="tag">チーム{{ data.team }}</div>
        <div class="tag">{{ data.process }}</div>
        <div class="tag">{{ data.pic }}</div>
        <div class="tag">{{ data.status }}</div>
      </div>
      <div class="mail-container">
        <div class="mail-title">{{ data.subject }} </div>
        <div class="detail-container">{{ data.detail }}</div>
        <div class="date-container">
          <div class="date-detail">問い合わせ日時：{{ data.date }}</div>
          <div class="date-detail">更新日：{{ data.date }}</div>
          <div class="date-detail">〇日前</div>
        </div>
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
  margin: 24px auto;
  padding: 12px;
  width: 800px;
  border-radius: 8px;
  border: solid 1px gray;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.12);
  transition: transform 0.1s ease;
}


.todo-container:hover {
  background-color: #f4f9ff;
  cursor: pointer;
  transform: translate(1px, 1px);
}

.tag-container {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: small;
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 8px;
}

.date-container {
  display: flex;
  justify-content: flex-end;
  margin: 8px;
}

.date-detail {
  margin: 0 8px;
  font-size: small;
}

.mail-container {
  padding-left: 8px;
  margin-top: 16px;
  font-size: large;
}


.mail-title {
  margin-top: 8px;
}

.detail-container {
  padding: 8px;
  font-size: medium;
}
</style>
