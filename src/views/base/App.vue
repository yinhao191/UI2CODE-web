<template>
  <CommonPage>
    <Repl
      :store="store"
      :editor="Monaco"
      :theme="theme"
      :show-compile-output="true"
      @keydown.ctrl.s.prevent
    />
  </CommonPage>
</template>

<script setup lang="ts">
import { useStore } from '@/composables/store'
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import { ref } from 'vue'

const theme = ref('dark') // 或 'light'
const store = useStore()
</script>

  <style>
  /* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
