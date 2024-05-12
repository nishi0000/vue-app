<script setup>
import { ref } from "vue";
import {db} from "../firebase_settings/index.js";
import { addDoc, collection,serverTimestamp } from "firebase/firestore";

const subject = ref("");
const date = ref("");
const team = ref("");
const pic = ref("");
const detail = ref("");
const status = ref("");


const onClickPost = async () => {
  await addDoc(collection(db, "todo"), {
            subject:subject.value,
            date:date.value,
            team:team.value,
            pic:pic.value,
            detail:detail.value,
            status:status.value,

            timestamp: serverTimestamp(),
});
};
</script>

<template>
  <p>post</p>

  メール件名:<input v-model="subject" type="text" /><br>
  日付:<input v-model="date" type="text" /><br>
  チーム:<input v-model="team" type="text" /><br>
  担当者:<input v-model="pic" type="text" /><br>
  メール詳細:<textarea v-model="detail" type="text" /><br>
  ステータス:<input v-model="status" type="text" />
  
  
  <button @click="onClickPost">test</button>
</template>
