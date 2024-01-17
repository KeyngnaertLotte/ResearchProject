<script setup>
import PuppetView from './views/PuppetView.vue';
import OpenAiView from './views/OpenAiView.vue';

</script>

<template>
  <header>
    <nav class="text-white">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/canvas">Canvas</RouterLink>
    </nav>
  </header>
  <RouterView/>
</template>

