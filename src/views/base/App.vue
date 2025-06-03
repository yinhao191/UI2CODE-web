<template>
  <component :is="generated ? vantPlayground : guide" />
</template>

<script setup>
import { ref } from 'vue'
import guide from './guide.vue'
import vantPlayground from './vant-playground.vue'

const generated = ref(false)
</script>

  <style>
  /* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
