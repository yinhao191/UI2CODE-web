<template>
  <CommonPage>
    <Repl
      :store="store"
      :editor="Monaco"
      theme="dark"
      :show-compile-output="true"
      @keydown.ctrl.s.prevent
    />
  </CommonPage>
</template>

<script setup>
import { Repl, useStore } from 'vant-repl'
import Monaco from 'vant-repl/monaco-editor'
import { ref } from 'vue'

const store = useStore(
  {
    vueVersion: ref('2.6.14'),
    vantVersion: ref('2.10.1'),
  },
)
</script>

  <style>
  /* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
