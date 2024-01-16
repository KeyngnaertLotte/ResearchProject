<!-- Loader.vue -->
<template>
      <div class="spinner"></div>
  </template>
  
  <script>
  import anime from 'animejs';
  
  export default {
    mounted() {
      // Use anime.js to animate the spinner
      anime({
        targets: '.spinner',
        rotate: '+=360deg',
        loop: true,
        easing: 'linear',
        duration: 1000,
      });
    },
  };
  </script>
  
  <style scoped>
  
  .spinner {
    border: 4px solid #333;
    border-top: 4px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  