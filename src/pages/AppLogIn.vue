<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useAuth } from "../stores/user";
import AppButton from "../components/AppButton.vue";

const userProfile = useAuth();
const email = ref("");
const password = ref("");
const inputType = ref("password");

const onClickLogin = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value) // firebaseにログイン
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};

const onClickEyeIcon = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};

</script>

<template>
  <main>
    <form action="">
      <div class="container">
        <h2>ログイン画面</h2>
      </div>
      <label>メールアドレス</label>
      <div class="inputcontainer">
        <input v-model="email" type="text" placeholder="メールアドレス" />
      </div>
      <label>パスワード</label>
      <div class="inputcontainer">
        <input v-model="password" :type="inputType" placeholder="パスワード" />
        <img
          class="eyeicon"
          src="../images/eyeopen.png"
          @click="onClickEyeIcon"
          v-if="inputType === 'password'"
        />
        <img
          class="eyeicon"
          src="../images/eyeclose.png"
          @click="onClickEyeIcon"
          v-if="inputType === 'text'"
        />
      </div>
      <p>{{ userProfile.token }}</p>
      <div class="container">
        <div><AppButton :onClick="onClickLogin">ログイン</AppButton></div>
        <div><AppButton :onClick="onClickLogin">新規登録</AppButton></div>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 300px;
  margin: 64px auto;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 16px;
  box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.24);
}

h2 {
  font-weight: normal;
  font-size: 20px;
}

.container {
  text-align: center;
}

input {
  max-width: 300px;
  width: 90%;
  border: none;
  height: 20px;
  font-size: large;
}

input:focus {
  outline: none;
}

.inputcontainer {
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px;
}

.eyeicon {
  height: 20px;
  margin-top: 2px;
  margin-right: 5px;
}

.eyeicon:hover {
  opacity: 0.7;
}

@media screen and (max-width: 428px) {
  main {
    border: none;
    box-shadow: none;
  }
}
</style>
