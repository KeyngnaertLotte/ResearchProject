<template>
  <div class="h-full">
    <div class="flex justify-center mb-4">
      <div v-for="color in colors" class="color-box inline-block rounded-[50%] cursor-pointer w-[20px] h-[20px] mx-[5px]" :style="{ backgroundColor: color }" @click="changeColor(color)"></div>
    </div>
    <canvas class="block w-full h-[90%] cursor-crosshair bg-white border-2 border-solid rounded-lg" @mousedown="startPainting" @mouseup="finishedPainting" @mousemove="draw" id="canvas"></canvas>
    <div class="flex flex-row justify-between">
      <a class="block bg-[#333] text-white rounded-[5px] cursor-pointer" @click.prevent="clearCanvas">Clear Canvas</a>
      <a class="block bg-[#333] text-white rounded-[5px] cursor-pointer" @click.prevent="saveSvg">Save drawing as SVG</a>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const painting = ref(false);
    const canvas = ref(null);
    const ctx = ref(null);
    const colors = ref(["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]);

    const changeColor = (color) => {
      ctx.value.strokeStyle = color;
    };

    const clearCanvas = () => {
      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    };

    const startPainting = (e) => {
      painting.value = true;
      draw(e);
    };

    const finishedPainting = () => {
      painting.value = false;
      ctx.value.beginPath();
    };

    const draw = (e) => {
      if (!painting.value) return;

      const rect = canvas.value.getBoundingClientRect();
      const scaleX = canvas.value.width / rect.width;
      const scaleY = canvas.value.height / rect.height;

      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      ctx.value.lineWidth = 1;
      ctx.value.lineCap = "round";

      ctx.value.lineTo(mouseX, mouseY);
      ctx.value.stroke();

      ctx.value.beginPath();
      ctx.value.moveTo(mouseX, mouseY);
    };

    onMounted(() => {
      canvas.value = document.getElementById("canvas");
      ctx.value = canvas.value.getContext("2d");

      // Set default stroke color
      ctx.value.strokeStyle = colors.value[0];

      // Resize canvas
      canvas.value.height = window.innerHeight * 0.6;
      canvas.value.width = window.innerWidth * 0.8;
    });

    return {
      painting,
      canvas,
      ctx,
      colors,
      changeColor,
      clearCanvas,
      startPainting,
      finishedPainting,
      draw,
    };
  },
};
</script>
