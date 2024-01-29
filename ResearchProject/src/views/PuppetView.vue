<template>
  <div class="w-[70%] h-[70%]">
    <Puppet />
  </div>
</template>

<script>
import MickyMouse from '../components/svg/SvgMickyMouse.vue';
import Puppet from '@/components/Puppet.vue';
import anime from 'animejs';

var receivedData = '';

const duration = 1000;

export default {
  mounted() {
    this.emitter.on('openai', (data) => {
      receivedData = data;
      const cleanedData = receivedData.replace(/`|javascript|js/gi, '');

const regex = /this\.puppet\('(#\w+)', \[(-?\d+), (-?\d+)\], \[(-?\d+), (-?\d+)\]\);/g;
let match;
let matchFound = false;

while ((match = regex.exec(cleanedData)) !== null) {
  matchFound = true;

  const bodyPart = match[1];
  const position = [parseInt(match[2]), parseInt(match[3])];
  const rotation = [parseInt(match[4]), parseInt(match[5])];

  if (bodyPart === "#rightArm") {
    this.puppet('#rightArm', [position], [rotation]);
  } else if (bodyPart === "#leftArm") {
    this.puppet('#leftArm', [position], [rotation]);
  } else if (bodyPart === "#leftLeg") {
    this.puppet('#leftLeg', [position], [rotation]);
  } else if (bodyPart === "#rightLeg") {
    this.puppet('#rightLeg', [position], [rotation]);
  } else if (bodyPart === "#body") {
    this.puppet('#body', [position], [rotation]);
  } else if (bodyPart === "#head") {
    this.puppet('#head', [position], [rotation]);
  } else {
    console.log("error");
  }
}

if (!matchFound) {
  alert("Oops something went wrong try again")
}



    });
  },
  components: {
    MickyMouse,
    Puppet,
  },
  methods: {
    puppet(target, translatXValues, rotateValues) {
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
