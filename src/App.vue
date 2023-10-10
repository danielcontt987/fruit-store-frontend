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
    const token = localStorage.getItem('token');
    const userObj =   localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.$store.dispatch('login/saveToken', token);
      this.$store.dispatch('login/saveUserId', userId);
      this.$store.dispatch('login/saveUser', userObj);
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