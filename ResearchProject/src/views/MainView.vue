<script setup>
import PuppetView from '@/views/PuppetView.vue';
import OpenAiView from '@/views/OpenAiView.vue';

</script>

<template>
  <div class="w-full h-[90%] flex flex-row ">
    <div class="w-1/2 flex items-center justify-center">
    <PuppetView />
  </div>
  <div class="w-1/2">
    <OpenAiView />
  </div>
  </div>
</template>

