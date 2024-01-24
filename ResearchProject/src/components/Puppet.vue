<template>
    <svg id="Puppet" data-name="Puppet"  xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <g id="leftLeg" transform-origin="250 440">
      <!-- <circle cx="250" cy="440" r="1" fill="green" id="pivotPoint" /> -->
      <path v-for="(bodyPartPath, index) in leftLegPath" :key="index" :d="bodyPartPath.pathData" />
    </g>
    <g id="rightLeg" transform-origin="315 445">
      <!-- <circle cx="315" cy="445" r="5" fill="green" id="pivotPoint" /> -->
      <path v-for="(bodyPartPath, index) in rightLegPath" :key="index" :d="bodyPartPath.pathData" />
    </g>
    <g id="leftArm" transform-origin="255 285">
      <!-- <circle cx="255" cy="275" r="1" fill="red" id="pivotPoint" /> -->
      <path v-for="(bodyPartPath, index) in leftArmPath" :key="index" :d="bodyPartPath.pathData" />
   </g>
    <g id="rightArm" transform-origin="310 275">
      <!-- <circle cx="310" cy="275" r="1" fill="red" id="pivotPoint" /> -->
      <path v-for="(bodyPartPath, index) in rightArmPath" :key="index" :d="bodyPartPath.pathData" />
    </g>
    <g id="body" transform-origin="285 350">
      <!-- <circle cx="285" cy="350" r="1" fill="green" id="pivotPoint" /> -->
      <path v-for="(bodyPartPath, index) in bodyPath" :key="index" :d="bodyPartPath.pathData" />
   </g>
    <g id="head" transform-origin="280 265">
      <!-- <circle cx="280" cy="265" r="5" fill="green" id="pivotPoint" /> -->
      <path v-for="(bodyPartPath, index) in headPath" :key="index" :d="bodyPartPath.pathData" />
     </g>
</svg>
</template>


<script>
export default {
  data() {
    return {
      bodyParts: JSON.parse(localStorage.getItem('puppet')),
      leftLegPath: [],
      rightLegPath: [],
      leftArmPAth: [],
      rightArmPath: [],
      headPath: [],
      bodyPath:[]
    };
  },
  mounted() {
    this.leftLegPath = this.bodyParts.filter((bodyPart) => bodyPart.id === 'leftLeg');
    this.rightLegPath = this.bodyParts.filter((bodyPart) => bodyPart.id === 'rightLeg');
    this.leftArmPath = this.bodyParts.filter((bodyPart) => bodyPart.id === 'leftArm');
    this.rightArmPath = this.bodyParts.filter((bodyPart) => bodyPart.id === 'rightArm');
    this.headPath = this.bodyParts.filter((bodyPart) => bodyPart.id === 'head');
    this.bodyPath = this.bodyParts.filter((bodyPart) => bodyPart.id === 'body');
  },
};
</script>
