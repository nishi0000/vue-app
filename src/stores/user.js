import { defineStore } from 'pinia';

export const useAuth = defineStore('user', {
  state: () => ({
    token:"",
  }),
});