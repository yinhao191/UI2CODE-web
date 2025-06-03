<template>
  <div>
    <div class="mt-15 box-border h-160 w-300 rounded-3xl bg-[#1a1a1a] p-10">
      <n-image
        object-fit="contain"
        :src="src"
      />
    </div>
    <div class="mt-5">
      <i class="i-fe:user" />
      <span class="ml-5 text-gray-500">fxxxx-Mnse2025 | Today 10:25</span>
    </div>
  </div>
</template>

<script setup>
defineProps(['src'])
</script>

<style scoped>

</style>
