<template>
  <router-view />
</template>

<script>
import axios from 'axios';
export default {
  beforeMount() {
    this.delay(3000);
  },
  created() {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.$store.dispatch('login/saveToken', token);
      this.$store.dispatch('login/saveUserId', userId);
    }
  },
  methods: {
    delay(ms) {
      const startPoint = new Date().getTime();
      while (new Date().getTime() - startPoint <= ms) {
        /* wait */
      }
    }
  }
}
</script>