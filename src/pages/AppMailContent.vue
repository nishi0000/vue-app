<script setup>
import { ref, watchEffect } from 'vue';
import { db } from "../firebase_settings/index.js";
import { useRoute } from 'vue-router';
import { doc, getDoc } from "firebase/firestore";

const loading = ref(true);
const mailContent = ref([]);
const route = useRoute();

// ドキュメントを取得して表示
watchEffect(async () => {
    console.log(route.params.id);
    const querySnapshot = await getDoc(doc(db, `todo`, route.params.id));

    // ドキュメントのデータを取得
    mailContent.value = querySnapshot.data();
    console.log(querySnapshot.data());
    loading.value = false;
});

</script>

<template>
    <main>


        <div v-if="loading">Loading...</div>

        <div class="todo-container">
            <div class="tag-container">
                <div class="tag">チーム{{ mailContent.team }}</div>
                <div class="tag">{{ mailContent.process }}</div>
                <div class="tag">{{ mailContent.pic }}</div>
                <div class="tag">{{ mailContent.status }}</div>
            </div>
            <div class="mail-container">
                <div class="mail-title">{{ mailContent.subject }} </div>
                <div class="detail-container">{{ mailContent.detail }}</div>
                <div class="date-container">
                    <div class="date-detail">更新日：{{ mailContent.date }}</div>
                    <div class="date-detail">〇日前</div>
                </div>
            </div>
        </div>

        <div class="input-container">

            <textarea></textarea>
            <div class="radio-container">
                <div>ステータス:</div>
                <div class="radio">
                    <input type="radio" name="team" value="A" v-model="team" />
                    <label for="teamA">未回答</label>
                </div>
                <div class="radio">
                    <input type="radio" name="team" value="B" v-model="team" />
                    <label for="teamB">返事待ち</label>
                </div>
                <div class="radio">
                    <input type="radio" name="team" value="C" v-model="team" />
                    <label for="teamA">完了</label>
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
    margin: 12px auto;
    padding: 12px;
    width: 800px;
}


.todo-container:hover {
    background-color: #f4f9ff;
    cursor: pointer;
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

.input-container {
    text-align: center;
    margin-top: 48px;
}

textarea {
    width: 800px;
    height: 200px;
    margin: 0 auto;
}

.radio-container {
    display: flex;
    justify-content: center;
}

.radio {
    margin-left: 16px;
}
</style>
