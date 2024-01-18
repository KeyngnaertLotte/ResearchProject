<script setup>

</script>

<template>
  <div class="flex flex-col justify-between items-center w-full h-full p-4">
  <RouterView/>
    <nav class="text-white flex flex-row items-center justify-center gap-4 w-full justify-self-end">
      <RouterLink to="/">Home</RouterLink>
      <p>/</p>
      <RouterLink to="/canvas">Canvas</RouterLink>
    </nav>
  </div>
</template>

