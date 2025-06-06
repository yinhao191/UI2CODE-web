<template>
  <component @generate="handleGenerate" :is="generated ? vantPlayground : guide" :code="code" />
</template>

<script setup>
import { ref } from 'vue'
import { onMounted  } from 'vue'
import guide from './guide.vue'
import vantPlayground from './vant-playground.vue'
let generated = ref(false)
let code = ref("");
function handleGenerate(val) {
  code.value = val;
  generated.value = true;

}
</script>

  <style>
  /* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
