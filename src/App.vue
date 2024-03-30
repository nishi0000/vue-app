<script setup>
import { ref } from "vue";
const test = ref(0);
const userInputTask = ref("");
const userIncompleteTasks = ref([]);
const userCompleteTasks = ref([])

const add = (event) => {
  console.log(event.pageX);
  test.value++
}

const taskAdd = () => {
  if(userInputTask.value !== ""){
    userIncompleteTasks.value.push(userInputTask.value)
    userInputTask.value = ""
  }
}

const incompleteTaskDelete = (index) => userIncompleteTasks.value.splice( index, 1 )
const completeTaskDelete = (index) => userCompleteTasks.value.splice( index, 1 )

const taskComplete = (index) => {
  userCompleteTasks.value.push(userIncompleteTasks.value[index])
  userIncompleteTasks.value.splice( index, 1 )
  console.log(userCompleteTasks.value)
}

const taskReturn = (index) => {
  userIncompleteTasks.value.push(userCompleteTasks.value[index])
  userCompleteTasks.value.splice( index, 1 )
}

</script>

<template>
  <h1>Hello,World!</h1>
  <h2>{{ test }}</h2>
  <button @click="add">+1</button><br />
  <input v-model="userInputTask" @keyup.enter="taskAdd" type="text"/><button @click="taskAdd">追加</button>
  <p>やることリスト</p>
  <li v-for="userIncompleteTask,index in userIncompleteTasks">
    {{ userIncompleteTask }} 
    <button @click="taskComplete(index)">完了</button>
    <button @click="incompleteTaskDelete(index)">削除</button>
  </li>
  <p>終わったリスト</p>
  <li v-for="userCompleteTask,index in userCompleteTasks">
    {{ userCompleteTask }} 
    <button @click="taskReturn(index)">戻す</button>
    <button @click="completeTaskDelete(index)">削除</button>
  </li>
</template>

<style scoped></style>
