<script setup>
import { defineProps } from "vue";
import AppButton from "./AppButton.vue";

const props = defineProps({
  onClickYes: Function,
  onClickNo: Function,
});
</script>

<template>
  <div class="modaloverlay">
    <div class="modalcontainer">
      <p><slot></slot></p>
      <AppButton type="button" @click="props.onClickYes">はい</AppButton>
      <AppButton type="button" @click="props.onClickNo">いいえ</AppButton>
    </div>
  </div>
</template>

<style scoped>
.modaloverlay {
  /* 画面全体を覆う設定 */
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modalcontainer {
  z-index: 5;
  width: 50%;
  border-radius: 8px;
  max-width: 300px;
  padding: 1em;
  background: #fff;
  color: black;
  text-align: center;
}
</style>
