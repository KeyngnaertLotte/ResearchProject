<template>
    <div class="w-full h-full flex justify-center items-center pt-10 pl-10">
      <MickyMouse />
    </div>
  </template>
  
  <script>
  import MickyMouse from '../components/svg/SvgMickyMouse.vue';
  import anime from 'animejs';

  var receivedData = ""

  const duration = 1000;
  
  
  export default {
    mounted() {
      this.puppet('#rightArm', [0, 5], [-10, 10]);
      this.puppet('#leftArm', [0, -5], [-10, 10]);
      this.puppet('#leftLeg', [0, 0], [-5, 5]);
      this.puppet('#rightLeg', [0, 0], [-5, 5]);
      this.puppet('#body', [0, 0], [0, 0]);
      this.puppet('#head', [0, 0], [-1, 1]);
      this.emitter.on("openai", (data) => {receivedData = data, console.log("eheheheh" + receivedData), console.log(data)})
    },
    components: {
      MickyMouse,
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