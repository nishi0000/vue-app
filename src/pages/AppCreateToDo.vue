<script setup>
import { ref } from "vue";
import { db } from "../firebase_settings/index.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const subject = ref("");
const date = ref("");
const team = ref("");
const pic = ref("");
const detail = ref("");
const status = ref("");
const process = ref("");

const onClickPost = async () => {
  await addDoc(collection(db, "todo"), {
    subject: subject.value,
    date: date.value,
    team: team.value,
    pic: pic.value,
    detail: detail.value,
    status: status.value,
    process: process.value,
    timestamp: serverTimestamp(),
  });
};
</script>

<template>
  <p>post</p>

  メール件名:<input v-model="subject" type="text" /><br>
  日付:<input v-model="date" type="text" /><br>
  <div class="radio-container">
    <div>チーム:</div>
    <div>
      <input type="radio" name="team" value="A" v-model="team" />
      <label for="teamA">A</label>
    </div>
    <div class="radio">
      <input type="radio" name="team" value="B" v-model="team" class="radio" />
      <label for="teamB">B</label>
    </div>
    <div>
      <input type="radio" name="team" value="C" v-model="team" class="radio" />
      <label for="teamA">C</label>
    </div>
    <div>
      <input type="radio" name="team" value="D" v-model="team" class="radio" />
      <label for="teamB">D</label>
    </div>
  </div>
  担当者:<input v-model="pic" type="text" /><br>
  案件名:<input v-model="process" type="text" /><br>
  メール詳細:<textarea v-model="detail" variant="standard" type="text" multiline /><br>
  ステータス:<input v-model="status" type="text" />


  <button @click="onClickPost">test</button>
</template>


<style scoped>
.radio-container {
  display: flex;
}
</style>
