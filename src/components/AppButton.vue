<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    onClick : Function,
});
 
</script>

<template>
    <button @click="props.onClick"><slot></slot></button>
</template>

<style scoped>
button {
    background-color: #083d82;
    color: white;
    padding: 8px 24px;
    border-radius: 8px;
    border: none;
    transition: 0.1s;
    margin: 8px 8px;
}

button:hover {
        opacity: 0.8;
        transform: translate3d(1px, 2px, 0);
    }
</style>