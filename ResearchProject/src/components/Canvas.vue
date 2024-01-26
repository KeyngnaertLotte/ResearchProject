<script setup>
import paper from 'paper';
import { ref, onMounted } from 'vue';
import MickyMouse from '@/components/svg/SvgMickyMouse.vue';

import { useRouter } from 'vue-router';
const router = useRouter();
import {
  XCircle,
  Trash2,
  Save,
  ArrowBigRight,
  RotateCcw,
} from 'lucide-vue-next';

var path;
var tool;
const group = ref([]);
const chosenFillColor = ref('#000000');
const bodyPartCounter = ref(0);

const colors = ref([
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
]);
const bodyParts = ref([
  'leftLeg',
  'rightLeg',
  'leftArm',
  'rightArm',
  'body',
  'head',
]);

const changeFillColor = (color) => {
  chosenFillColor.value = color;
  console.log(chosenFillColor);
};

onMounted(() => {
  paper.setup(document.getElementById('paper-canvas'));
  tool = new paper.Tool();

  tool.onMouseDown = function (e) {
    path = new paper.Path();
    path.strokeColor = '#000000';
  };

  tool.onMouseDrag = function (e) {
    path.add(e.point);
  };

  tool.onMouseUp = function (e) {
    path.fillColor = chosenFillColor.value;
    console.log("aaa" + path);
    console.log(path.pathData);
    group.value.push({
      id: bodyParts.value[bodyPartCounter.value],
      pathData: path.pathData,
      fill: chosenFillColor.value
    });
  };
});

const saveSvg = () => {
  if (group.value.length !== 0){
    bodyPartCounter.value++;
  paper.project.activeLayer.removeChildren();
  if (bodyPartCounter.value === 6) {
    bodyPartCounter.value = 0
    localStorage.clear()
    localStorage.setItem('puppet', JSON.stringify(group.value));
    router.push('/');
  }
  group.value.forEach((element) => {
    console.log(element);
  });
  console.log(bodyPartCounter);
  }
  else{
    alert("Please draw something first")
  }
};

const clearCanvas = () => {
  paper.project.activeLayer.removeChildren();
  group.value = [];

  // Re-initialize path and tool
  path = new paper.Path();
  tool = new paper.Tool();
};

const spacedBodypart = () => {
  if (bodyPartCounter.value === 0 || bodyPartCounter.value === 2) {
    return (
      bodyParts.value[bodyPartCounter.value].slice(0, 4).toLowerCase() +
      ' ' +
      bodyParts.value[bodyPartCounter.value].slice(4).toLowerCase()
    );
  } else if (bodyPartCounter.value === 1 || bodyPartCounter.value === 3) {
    return (
      bodyParts.value[bodyPartCounter.value].slice(0, 5).toLowerCase() +
      ' ' +
      bodyParts.value[bodyPartCounter.value].slice(5)
    ).toLowerCase();
  } else {
    return bodyParts.value[bodyPartCounter.value];
  }
};

const restartDrawing = () => {
  paper.project.activeLayer.removeChildren();
  group.value = [];
  localStorage.clear()
}

</script>

<template>
  <div class="h-full w-full flex flex-row justify-between items-center">
    <div class="flex flex-col items-center justify-between h-1/2 w-1/3 ">
      <p class="text-white mb-4">Fill color:</p>
      <button
        v-for="color in colors"
        :class="['color-box', 'inline-block', 'rounded-[50%]', 'cursor-pointer', 'mx-[5px]', 'w-[20px]', 'h-[20px]', { 'w-[30px] h-[30px]': chosenFillColor === color}, `bg-[${color}]`]"
        :style="{ backgroundColor: color }"
        @click="changeFillColor(color)"
      ></button>
    </div>

  
    <div
      class="w-fit h-fit  flex items-center justify-center bg-white border-2 border-solid rounded-lg"
    >
      <canvas
        width="560"
        height="600"
        class="block z-10 cursor-crosshair"
        @mousedown="startPainting"
        @mouseup="finishedPainting"
        @mousemove="draw"
        id="paper-canvas"
        ref="canvas"
      ></canvas>
      <MickyMouse class="absolute h-full xl:scale-[.85] opacity-15 scale-[.75]" />
    </div>
    <div class="flex flex-col justify-between w-1/3 gap-4 items-center">
      <div
        class="w-full flex flex-col items justify-center items-center text-center mb-10"
      >
        <h1 class="text-white font-bold text-4xl uppercase mb-2">
          {{ spacedBodypart() }}
        </h1>
        <p class="text-white flex flex-row gap-1 justify-center w-2/3">
          Draw the {{ spacedBodypart() }}. Once you're done drawing your
          {{ spacedBodypart() }} click on save drawing.
        </p>
      </div>
      <div class="w-full flex flex-col items-center justify-between gap-4"><button
        class="bg-[#333] text-white rounded-[5px] xl:w-1/2 cursor-pointer flex flex-row gap-4 p-4 w-5/6 hover:font-bold hover:border hover:border-white "
        @click.prevent="clearCanvas"
        ><RotateCcw />Clear Canvas</button
      >
      <button
        class="bg-[#333] text-white rounded-[5px] xl:w-1/2 cursor-pointer flex flex-row gap-4 p-4 w-5/6 hover:font-bold hover:border hover:border-white "
        @click.prevent="saveSvg"
      >
        <template v-if="spacedBodypart() === 'head'">
          <Save /> Save drawing
        </template>
        <template v-else> <ArrowBigRight /> Next bodypart </template>
      </button>
      <button
        class="absolute bg-[#333] text-white rounded-[5px] w-fit bottom-0 right-0 m-4 cursor-pointer flex flex-row gap-4 p-4 hover:font-bold hover:border hover:border-white"
        @click.prevent="restartDrawing"
        ><Trash2 /> Delete drawing</button
      ></div>
    </div>
  </div>
</template>
