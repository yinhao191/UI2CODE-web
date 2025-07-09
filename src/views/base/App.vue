<template>
  <component :is="store.generated ? vantPlayground : guide" />
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '@/store'
import guide from './guide.vue'
import vantPlayground from './vant-playground.vue'

const store = usePlaygroundStore()
</script>

  <style>
  /* 自定义编辑器样式 */
:root {
  --image-url: url('');
}
</style>
