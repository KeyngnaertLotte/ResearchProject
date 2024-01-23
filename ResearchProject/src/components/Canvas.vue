<script setup>
import paper from "paper"
import { ref, onMounted } from 'vue'
import MickyMouse from '@/components/svg/SvgMickyMouse.vue'

var path;
var tool;
const group = ref([])


const colors = ref(["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]);
const bodyParts = ref(["leftLeg", "rightLeg", "leftArm", "rightArm", "body", "head"])

var number = 0

    // const changeColor = (color) => {
    //   ctx.value.strokeStyle = color;
    // };
onMounted(()=>{
  
paper.setup(document.getElementById('paper-canvas'));
  tool = new paper.Tool()

  tool.onMouseDown = function (e){
    path = new paper.Path();
    path.strokeColor = 'black';
  }

  tool.onMouseDrag = function (e){
    path.add(e.point)
  }

  tool.onMouseUp = function (e){
    path.fillColor = 'green'
    console.log(path)
    console.log(path.pathData)
    group.value.push({
      id: `${bodyParts[number]}`,
      pathData: path.pathData,
    });
  }
 
})

const saveSvg = () => {
  group.value.forEach(element => {
    console.log(element)
  });
  
}

const clearCanvas = () => {
  paper.project.activeLayer.removeChildren();
  group.value = []
  
  // Re-initialize path and tool
  path = new paper.Path();
  tool = new paper.Tool();
    }

</script>

<template>
  <div class="h-full w-full flex flex-col items-center">
    <div class="flex justify-center mb-4">
      <div v-for="color in colors" class="color-box inline-block rounded-[50%] cursor-pointer w-[20px] h-[20px] mx-[5px]" :style="{ backgroundColor: color }" @click="changeColor(color)"></div>
    </div>
    <div class="w-fit h-full flex items-center justify-center bg-white border-2 border-solid rounded-lg">
      
    <canvas width="560" height="600" class="block z-10  cursor-crosshair " @mousedown="startPainting" @mouseup="finishedPainting" @mousemove="draw"  id="paper-canvas" ref="canvas"></canvas>
    <MickyMouse class="absolute h-full scale-[.85] opacity-15"/>
    </div>
    <div class="flex flex-row justify-between w-1/2">
      <a class="block bg-[#333] text-white rounded-[5px] cursor-pointer" @click.prevent="clearCanvas">Clear Canvas</a>
      <a class="block bg-[#333] text-white rounded-[5px] cursor-pointer" @click.prevent="saveSvg">Save drawing as SVG</a>
    </div>
  </div>
</template>