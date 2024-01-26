<script setup>

</script>

<template>
  <div class="flex flex-col justify-between items-center w-screen h-screen p-4 overflow-hidden">
    <RouterView/>
    <nav class="text-white flex flex-row items-center justify-center gap-4 w-full justify-self-end xl:text-base text-lg">
      <RouterLink to="/" class="hover:font-bold focus:xl:text-lg focus:text-xl focus:font-bold focus:text-[#DE2A21] transition duration-300 ease-in-out" :class="{ 'xl:text-lg text-xl font-bold text-[#DE2A21]': $route.path === '/' }">Home</RouterLink>
      <p>/</p>
      <RouterLink to="/canvas" class="hover:font-bold focus:xl:text-lg focus:text-xl focus:font-bold focus:text-[#DE2A21] transition duration-300 ease-in-out" :class="{ 'xl:text-lg text-xl font-bold text-[#DE2A21]': $route.path === '/canvas' }">Canvas</RouterLink>
    </nav>
  </div>
</template>


