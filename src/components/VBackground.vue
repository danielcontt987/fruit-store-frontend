<template>
    <v-img alt="" src="../assets/img/background.jpg" width="100%" class="custom-image">
      <div class="overlay">
        <span class="overlay-text">Texto encima de la imagen</span>
      </div>
    </v-img>
  </template>
  
  <script>
 
  </script>
  
  <style scoped>
  .custom-image {
    position: relative;
    width: 100%;
    height: auto;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.691);
  }
  
  .overlay-text {
    font-size: 24px;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  