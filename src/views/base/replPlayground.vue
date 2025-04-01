<template>
    <Repl
      :store="store"
      :editor="Monaco"
      @keydown.ctrl.s.prevent
      :theme="theme"
      :showCompileOutput="true"
    />
  </template>
  
  <script setup>
  import { Repl, File, useStore, useVueImportMap } from '@vue/repl'
  import Monaco from '@vue/repl/monaco-editor'
  import { computed } from 'vue';
  import { ref } from 'vue'
  import welcomeSFCCode from './playground/template/welcomeSFCCode.vue?raw'
  import vantInjectCode from './playground/vant3.js?raw'
  
  const theme = ref('dark') // 或 'light'
  const {
    importMap
  } = useVueImportMap({
    runtimeDev: "https://cdn.jsdelivr.net/npm/vue@3.5.13/+esm",
    runtimeProd: "https://cdn.jsdelivr.net/npm/vue@3.5.13/+esm",
  })
  const finalImportMap = computed( () => ({
    ...importMap.value,
    imports: {
      ...importMap.value.imports,
      'vant': 'https://cdn.jsdelivr.net/npm/vant@4.9.18/+esm',
    }
    
  }))

  const template = ref({
      welcomeSFC: welcomeSFCCode,
    })

  const store = useStore({
    builtinImportMap: finalImportMap,
    template
  })

  const injectFile = new File("src/vantInject.js", vantInjectCode)
  store.addFile(injectFile)
  
  
  

  

  </script>
  
  <style>
  /* 自定义编辑器样式 */
  .vue-repl {
    height: 600px;
    margin: 20px;
  }
  </style>
  