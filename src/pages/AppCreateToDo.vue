<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase_settings/index.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const subject = ref("");
const date = ref("");
const team = ref("");
const pic = ref("");
const detail = ref("");
const process = ref("");

onMounted(() => {
  // 現在の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // 月と日が1桁の場合、2桁にする
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  // 年月日を yyyy-mm-dd 形式にする
  const todayDate = `${year}-${month}-${day}`;

  // 日付入力フィールドに現在の日付をセット
  date.value = todayDate;
});


const onClickPost = async () => {
  await addDoc(collection(db, "todo"), {
    subject: subject.value,
    date: date.value,
    team: team.value,
    pic: pic.value,
    detail: detail.value,
    status: "未回答",
    process: process.value,
    completed: false,
    timestamp: serverTimestamp(),
  });
};

</script>

<template>
  <p>post</p>

  メール件名:<input v-model="subject" type="text" /><br>
  日付:<input v-model="date" type="date" /><br>
  <div class="radio-container">
    <div>チーム:</div>
    <div class="radio">
      <input type="radio" name="team" value="A" v-model="team" />
      <label for="teamA">A</label>
    </div>
    <div class="radio">
      <input type="radio" name="team" value="B" v-model="team" />
      <label for="teamB">B</label>
    </div>
    <div class="radio">
      <input type="radio" name="team" value="C" v-model="team" />
      <label for="teamA">C</label>
    </div>
    <div class="radio">
      <input type="radio" name="team" value="D" v-model="team" />
      <label for="teamB">D</label>
    </div>
  </div>
  担当者:<input v-model="pic" type="text" /><br>
  案件名:<input v-model="process" type="text" /><br>
  メール詳細:<textarea v-model="detail" variant="standard" type="text" multiline /><br>


  <button @click="onClickPost">test</button>
</template>


<style scoped>
.radio-container {
  display: flex;
}

.radio {
  margin-left: 16px;
}
</style>
