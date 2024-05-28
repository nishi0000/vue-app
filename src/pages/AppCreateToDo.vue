<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "../firebase_settings/index.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import AppButton from "../components/AppButton.vue";


const subject = ref("");
const date = ref("");
const team = ref("");
const pic = ref("");
const detail = ref("");
const process = ref("");
const router = useRouter();

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
  router.push(`/`);
};

</script>

<template>
  <main>
    <div class="input-title">問い合わせ日付</div>
    <div><input class="input-date" v-model="date" type="date" /></div>
    <div class="input-title">担当者</div>
    <div><input class="input-name" v-model="pic" type="text" /></div>
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
    <div class="input-title">案件名</div>
    <div><input class="input-name" v-model="process" type="text" /></div>
    <div class="input-title">メール件名</div>
    <div><input v-model="subject" class="input-mailtitle" type="text" /></div>
    <div class="input-title">メール詳細</div>
    <div><textarea class="textarea-mailcontent" v-model="detail" variant="standard" type="text" multiline /></div>
    <div class="button-container">
      <AppButton :onClick="onClickPost">送信</AppButton>
    </div>

  </main>
</template>


<style scoped>
main {
  /* background-color: aqua; */
  width: 80%;
  max-width: 600px;
  margin: 24px auto;
}

.input-mailtitle {
  width: 100%;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px;
  font-size: large;
}

.input-date {
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px;
  font-size: large;
}

.textarea-mailcontent {
  height: 300px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px;
  font-size: large;
}

.input-name {
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px;
  font-size: large;
}

.input-title {
  margin-top: 16px;
  margin-bottom: 8px;
}

.radio-container {
  display: flex;
  margin-top: 16px;
}

.radio {
  margin-left: 16px;
}

.button-container {
  margin-top: 18px;
  text-align: center;
}
</style>
