<script setup>
import paper from 'paper';
import { ref, onMounted } from 'vue';
import MickyMouse from '@/components/svg/SvgMickyMouse.vue';
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
const chosenStrokeColor = ref('#000000');
const chosenFillColor = ref('noColor');
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

const changeStrokeColor = (color) => {
  chosenStrokeColor.value = color;
  console.log(chosenStrokeColor);
};

const changeFillColor = (color) => {
  chosenFillColor.value = color;
  console.log(chosenFillColor);
};

onMounted(() => {
  paper.setup(document.getElementById('paper-canvas'));
  tool = new paper.Tool();

  tool.onMouseDown = function (e) {
    path = new paper.Path();
    path.strokeColor = chosenStrokeColor.value;
  };

  tool.onMouseDrag = function (e) {
    path.add(e.point);
  };

  tool.onMouseUp = function (e) {
    if (chosenFillColor.value != 'noColor')
      path.fillColor = chosenFillColor.value;
    console.log(path);
    console.log(path.pathData);
    group.value.push({
      id: bodyParts.value[bodyPartCounter.value],
      pathData: path.pathData,
    });
  };
});

const saveSvg = () => {
  bodyPartCounter.value++;
  if (bodyPartCounter.value === 6) bodyPartCounter.value = 0;
  group.value.forEach((element) => {
    console.log(element);
  });
  console.log(bodyPartCounter);
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
</script>

<template>
  <div class="h-full w-full flex flex-row justify-between items-center">
    <div class="flex flex-col items-center justify-between h-1/2 w-1/3">
      <div>
        <p class="text-white mb-4">Stroke color:</p>
        <div
          v-for="color in colors"
          class="color-box inline-block rounded-[50%] cursor-pointer w-[20px] h-[20px] mx-[5px]"
          :style="{ backgroundColor: color }"
          @click="changeStrokeColor(color)"
        ></div>
      </div>
      <div>
        <p class="text-white mb-4">Fill color:</p>
        <div
          class="color-box inline-block rounded-[50%] cursor-pointer w-[20px] h-[20px] mx-[5px]"
          @click="changeFillColor('noColor')"
        >
          <XCircle :size="20" class="text-red-500" />
        </div>
        <div
          v-for="color in colors"
          class="color-box inline-block rounded-[50%] cursor-pointer w-[20px] h-[20px] mx-[5px]"
          :style="{ backgroundColor: color }"
          @click="changeFillColor(color)"
        ></div>
      </div>
    </div>
    <div
      class="w-fit h-full flex items-center justify-center bg-white border-2 border-solid rounded-lg"
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
      <MickyMouse class="absolute h-full scale-[.85] opacity-15" />
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
      <a
        class="bg-[#333] text-white rounded-[5px] w-1/2 cursor-pointer flex flex-row gap-4 p-4"
        @click.prevent="clearCanvas"
        ><Trash2 />Clear Canvas</a
      >
      <a
        class="bg-[#333] text-white rounded-[5px] w-1/2 cursor-pointer flex flex-row gap-4 p-4"
        @click.prevent="saveSvg"
      >
        <template v-if="spacedBodypart() === 'head'">
          <Save /> Save drawing
        </template>
        <template v-else> <ArrowBigRight /> Next bodypart </template>
      </a>
      <a
        class="bg-[#333] text-white rounded-[5px] w-1/2 cursor-pointer flex flex-row gap-4 p-4"
        @click.prevent="restartDrawing"
        ><RotateCcw /> Restart whole drawing</a
      >
    </div>
  </div>
</template>
