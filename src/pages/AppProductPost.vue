<script setup>
import { ref } from "vue";
import {db} from "../firebase_settings/index.js";
import { addDoc, collection,serverTimestamp } from "firebase/firestore";

const breadName = ref("");
const storeName = ref("");
const homepageUrl = ref("");
const photoUrl = ref("");
const price = ref(0);
const detail = ref("");

const onClickPost = async () => {
  await addDoc(collection(db, "breadproduct"), {
            breadName:breadName.value,
            storeName:storeName.value,
            homepageUrl:homepageUrl.value,
            bookmark:0,
            photoUrl:photoUrl.value,
            star:0,
            review: 0,
            price:price.value,
            detail:detail.value,
            timestamp: serverTimestamp(),
});
};
</script>

<template>
  <p>post</p>
  商品名:<input v-model="breadName" type="text" /><br>
  お店の名前:<input v-model="storeName" type="text" /><br>
  ホームページURL:<input v-model="homepageUrl" type="text" /><br>
  価格:<input v-model="price" type="text" /><br>
  商品詳細:<textarea v-model="detail" type="text" />
  
  
  <button @click="onClickPost">test</button>
</template>





