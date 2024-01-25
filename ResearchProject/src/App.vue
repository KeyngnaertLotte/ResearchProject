<script setup>

</script>

<template>
  <div class="flex flex-col justify-between items-center w-screen h-screen p-4 overflow-hidden">
  <RouterView/>
    <nav class="text-white flex flex-row items-center justify-center gap-4 w-full justify-self-end md:text-xl">
      <RouterLink to="/">Home</RouterLink>
      <p>/</p>
      <RouterLink to="/canvas">Canvas</RouterLink>
    </nav>
  </div>
</template>

