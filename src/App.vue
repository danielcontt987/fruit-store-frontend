<template>
  <router-view />
</template>

<script>
  import axios from 'axios';
  export default{
    created() {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$store.dispatch('login/saveToken', token);
      }
    }
  }
</script>