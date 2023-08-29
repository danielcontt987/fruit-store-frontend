<template>
  <router-view />
</template>

<script>
  import axios from 'axios';
  export default{
    created() {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$store.dispatch('login/saveToken', token);
        this.$store.dispatch('login/saveUserId', userId);
      }
    }
  }
</script>