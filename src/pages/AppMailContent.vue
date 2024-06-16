<script setup>
import { ref, watchEffect } from 'vue';
import { db } from "../firebase_settings/index.js";
import { useRoute } from 'vue-router';
import { doc, getDoc, addDoc, collection, getDocs, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore";
import AppButton from "../components/AppButton.vue";

const loadingDoc = ref(true);
const loadingDocs = ref(true);
const mailContentTop = ref([]);
const mailContent = ref([]);
const status = ref("未回答");
const detail = ref("");
const route = useRoute();

// データを取得して表示
watchEffect(async () => {
    console.log(route.params.id);
    const querySnapshot = await getDoc(doc(db, `todo`, route.params.id));

    // トップのデータを取得
    mailContentTop.value = querySnapshot.data();
    console.log(querySnapshot.data());
    mailContentTop.value.timestamp = formatTimestampToDate(mailContentTop.value.timestamp);
    loadingDoc.value = false;

    //レスを取得
    const parentDocRef = doc(db, 'todo', route.params.id);
    const postCollectionRef = collection(parentDocRef, 'post');

    // 'post' コレクションを降順にクエリ
    const postsQuery = query(postCollectionRef, orderBy('timestamp'));
    const querySnapshot2 = await getDocs(postsQuery);

    // データを取得
    mailContent.value = querySnapshot2.docs.map(doc => doc.data());
    console.log(querySnapshot2.docs.map(doc => doc.data()));

    loadingDocs.value = false;

});

const onClickPost = async () => {
    // レスデータを追加
    await addDoc(collection(doc(db, 'todo', `${route.params.id}`), `post`), {
        detail: detail.value,
        timestamp:serverTimestamp(),
    });

    const parentDocRef = doc(db, 'todo', route.params.id);
    const postCollectionRef = collection(parentDocRef, 'post');

    //ドキュメントを更新
    await updateDoc(parentDocRef, 
    {   status: status.value,
        timestamp:serverTimestamp(),
     });

    //更新後、ドキュメントのデータを取得
    const querySnapshot = await getDoc(doc(db, `todo`, route.params.id));

    // トップのデータを取得
    mailContentTop.value = querySnapshot.data();
    console.log(querySnapshot.data());
    mailContentTop.value.timestamp = formatTimestampToDate(mailContentTop.value.timestamp);
    loadingDoc.value = false;

    // 'post' コレクションを降順にクエリ
    const postsQuery = query(postCollectionRef, orderBy('timestamp'));
    const querySnapshot2 = await getDocs(postsQuery);

    // データを取得
    mailContent.value = querySnapshot2.docs.map(doc => doc.data());
    console.log(querySnapshot2.docs.map(doc => doc.data()));

    loadingDocs.value = false;

}

const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}/${month}/${day}`;
}

</script>

<template>
    <main>


        <div v-if="loadingDoc">Loading...</div>

        <div class="todo-container">
            <div class="header-container">
                <div class="tag-container">
                    <div class="tag">チーム{{ mailContentTop.team }}</div>
                    <div class="tag">{{ mailContentTop.process }}</div>
                    <div class="tag">{{ mailContentTop.pic }}</div>
                    <div class="tag">{{ mailContentTop.status }}</div>
                </div>
            </div>

            <div class="mail-container">
                <div class="mail-title">{{ mailContentTop.subject }} </div>
                <div class="detail-container">{{ mailContentTop.detail }}</div>
                <div class="date-container">
                    <div class="date-detail">更新日：{{ mailContentTop.timestamp }}</div>
                    <div class="date-detail">〇日前</div>
                </div>
            </div>
        </div>


        <div v-if="loadingDocs"></div>

        <div class="todo-container" v-for="data, index in mailContent" :key="index">
            <div class="mail-container">
                <div class="detail-container">{{ data.detail }}</div>
                <div class="date-container">
                    <div class="date-detail"></div>
                </div>
                <div class="icon-container">
                    <div>
                        <img class="iconimage" src="../images/pen.png" alt="編集アイコン" />
                        <img class="iconimage" src="../images/delete.png" alt="削除アイコン" />
                    </div>
                </div>
            </div>
        </div>

        <div class="input-container">

            <textarea v-model="detail"></textarea>
            <div class="radio-container">
                <div>ステータス:</div>
                <div class="radio">
                    <input type="radio" name="status" value="未回答" v-model="status" />
                    <label for="statusA">未回答</label>
                </div>
                <div class="radio">
                    <input type="radio" name="status" value="返事待ち" v-model="status" />
                    <label for="statusB">返事待ち</label>
                </div>
                <div class="radio">
                    <input type="radio" name="status" value="完了" v-model="status" />
                    <label for="statusC">完了</label>
                </div>
            </div>
        </div>
        <div class="button-container">
            <AppButton :onClick="onClickPost">送信</AppButton>
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

.header-container {
    display: flex;
    justify-content: space-between;
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

.icon-container {
    display: flex;
    justify-content: flex-end;
}

.iconimage {
    height: 20px;
    margin-left: 12px;
    transition: 0.1s;
}

.iconimage:hover {
    cursor: pointer;
    transform: translate(1px, 1px);
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

.button-container {
    margin-top: 18px;
    text-align: center;
}
</style>
