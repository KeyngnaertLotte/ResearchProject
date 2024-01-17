<template>
    <div>
      <canvas ref="myCanvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawing: false,
        context: null,
      };
    },
    mounted() {
      this.context = this.$refs.myCanvas.getContext('2d');
    },
    methods: {
      startDrawing(event) {
        this.drawing = true;
        this.context.beginPath();
        this.context.moveTo(event.clientX - this.$refs.myCanvas.offsetLeft, event.clientY - this.$refs.myCanvas.offsetTop);
      },
      draw(event) {
        if (!this.drawing) return;
  
        this.context.lineTo(event.clientX - this.$refs.myCanvas.offsetLeft, event.clientY - this.$refs.myCanvas.offsetTop);
        this.context.stroke();
      },
      stopDrawing() {
        this.drawing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid white;
  }
  </style>
  