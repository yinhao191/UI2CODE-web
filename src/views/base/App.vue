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
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
