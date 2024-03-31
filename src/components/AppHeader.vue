<script setup>
import { ref } from "vue";
const baseUrl = process.env.VUE_APP_URL
const naviText = ref("")
const mouseOver = (text) => {
    naviText.value = text
}
</script>

<template>
    <header>
        <div>
            <RouterLink :to = "`${baseUrl}/`">
                <img class="logo-pc" src="../images/logo-pc.png" alt="ロゴ">
            </RouterLink>
            <RouterLink :to = "`${baseUrl}/login`">
                <img class="iconimage" @mouseover="() => mouseOver('ログイン')" @mouseleave="() => mouseOver('')" src="../images/signin.png" alt="ログインアイコン">
            </RouterLink>
            <RouterLink :to = "`${baseUrl}/`">
                <img class="iconimage" src="../images/home.png" @mouseover="() => mouseOver('ホーム')" @mouseleave="() => mouseOver('')" alt="ホームアイコン">
            </RouterLink>
            <RouterLink :to = "`${baseUrl}/userprofile`">
                <img class="iconimage" src="../images/usericon.png" @mouseover="() => mouseOver('プロフィール')" @mouseleave="() => mouseOver('')" alt="設定アイコン">
            </RouterLink>
            <RouterLink :to = "`${baseUrl}/about`">
                <img class="iconimage" src="../images/breadadd.png" @mouseover="() => mouseOver('テスト')" @mouseleave="() => mouseOver('')" alt="設定アイコン">
            </RouterLink>
        </div>
        <div class="navitext">{{naviText}}</div>
    </header>
</template>

<style scoped>
header {
    background-color: #083d82;
    height: 70px;
    display: flex;
    justify-content: flex-start;
}

.logo-pc {
    height: 70px;
}

.iconimage {
  height: 32px;
  margin-left: 16px;
  margin-bottom: 5px;
  transition: 0.1s; 
}

.iconimage:hover {
  transform: translate3d(1px, 1px, 0);
}

.navitext {
  color: white;
  margin-left: 20px;
  margin-bottom: 4px;
  margin-top: auto;
}

</style>
