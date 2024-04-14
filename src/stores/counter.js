import { defineStore } from 'pinia';

export const useStoreCounter = defineStore('counter', {
  state: () => ({
    count: 100,
    count2: 2,
    user: {
      name: 'John Doe',
    },
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});