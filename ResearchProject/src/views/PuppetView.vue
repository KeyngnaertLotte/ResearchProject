<template>
  <div class="w-[70%] h-[70%]">
    <!-- <MickyMouse class="scale-[0.7]"/> -->
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
      console.log(receivedData);
      // Remove backticks and "javascript" from the received data
      const cleanedData = receivedData.replace(/`|javascript|js/gi, '');
      console.log('cleanedData: ' + cleanedData);

const regex = /this\.puppet\('(#\w+)', \[(-?\d+), (-?\d+)\], \[(-?\d+), (-?\d+)\]\);/g;
let match;

while ((match = regex.exec(cleanedData)) !== null) {
  const bodyPart = match[1];
  const position = [parseInt(match[2]), parseInt(match[3])];
  const rotation = [parseInt(match[4]), parseInt(match[5])];

  console.log(`${bodyPart}: Position ${position}, Rotation ${rotation}`);
  if (bodyPart === "#rightArm"){
  this.puppet('#rightArm', [position], [rotation]);
}
else if (bodyPart === "#leftArm"){
  this.puppet('#leftArm', [position], [rotation]);
}
else if (bodyPart === "#leftLeg"){
  this.puppet('#leftLeg', [position], [rotation]);
}
else if (bodyPart === "#rightLeg"){
  this.puppet('#rightLeg', [position], [rotation]);
}
else if (bodyPart === "#body"){
  this.puppet('#body', [position], [rotation]);
}
else if (bodyPart === "#head"){
  this.puppet('#head', [position], [rotation]);
}
else{
  console.log("error")
}
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
