<template>
    <div class="w-full h-full flex justify-center items-center ">
      <!-- <MickyMouse class="scale-[0.7]"/> -->
      <Puppet class="scale-[0.9]"/>
    </div>
  </template>
  
  <script>
  import MickyMouse from '../components/svg/SvgMickyMouse.vue';
  import Puppet from '@/components/Puppet.vue'
  import anime from 'animejs';

  var receivedData = ""

  const duration = 1000;
  
  
  export default {
    mounted() {
      this.emitter.on("openai", (data) => {
        receivedData = data
        console.log(receivedData)
         // Remove backticks and "javascript" from the received data
  const cleanedData = receivedData.replace(/`|javascript|js/ig, '');
  
  // Evaluate the cleaned data
  eval(cleanedData);
      })

    },
    components: {
      MickyMouse,
      Puppet
    },
    methods: {
      puppet(target, translatXValues, rotateValues){
        anime({
          targets: target,
          rotate: rotateValues,
          translateX: translatXValues,
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },

    },
  };
  
  
  
  </script>
  
  
  
  <style>
  .back {
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  </style>