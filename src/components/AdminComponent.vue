<template>
    <h1>Hola</h1>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  export default {
     name: "Admin",
  
     mounted(){
        if (this.token == null) {
            this.$router.push({
              name: "Login"
            });
        }
     },
     computed:{
        ...mapState({
          token: (state) => state.login.token
        })
     }
  }
  
  
  </script>
  
  <style>
  
  </style>