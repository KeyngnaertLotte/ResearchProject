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
  
  const initialRotationRA = -10;
  const finalRotationRA = 10;
  
  const initialRotationLA = -10;
  const finalRotationLA = 10;
  
  const initialRotationLL = -5;
  const finalRotationLL = 5;
  
  const initialRotationRL = -5;
  const finalRotationRL = 5;
  
  const initialRotationB = 0;
  const finalRotationB = 0;
  
  const initialRotationH = 0;
  const finalRotationH = 0;
  
  const translateDistanceX = 5;
  
  export default {
    mounted() {
      this.rightArm();
      this.leftArm();
      this.rightLeg();
      this.leftLeg();
      this.body();
      this.head();
      this.emitter.on("openai", (data) => {receivedData = data, console.log("eheheheh" + receivedData), console.log(data)})
    },
    components: {
      MickyMouse,
    },
    methods: {
      rightArm() {
        anime({
          targets: '#rightArm',
          rotate: [initialRotationRA, finalRotationRA],
          translateX: [0, translateDistanceX],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      leftArm() {
        anime({
          targets: '#leftArm',
          rotate: [initialRotationLA, finalRotationLA],
          translateX: [0, -translateDistanceX],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      leftLeg() {
        anime({
          targets: '#leftLeg',
          rotate: [initialRotationLL, finalRotationLL],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      rightLeg() {
        anime({
          targets: '#rightLeg',
          rotate: [initialRotationRL, finalRotationRL],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      body() {
        anime({
          targets: '#body',
          rotate: [initialRotationB, finalRotationB],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      head() {
        anime({
          targets: '#head',
          rotate: [initialRotationH, finalRotationH],
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