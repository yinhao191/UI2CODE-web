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
  import { Repl, File, useStore, useVueImportMap,compileFile } from '@vue/repl'
  import Monaco from '@vue/repl/monaco-editor'
  import { computed } from 'vue';
  import { ref } from 'vue'
  import welcomeSFCCode from './template/welcomeSFCCode.vue?raw'
  import vantInjectCode from './vant4.js?raw'
  import mainCode from './template/main.vue?raw'

  const MAIN_FILE = 'src/PlaygroundMain.vue'
  
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
    welcomeSFC: mainCode
  })

  const store = useStore({
    builtinImportMap: finalImportMap,
    template,
    mainFile: ref(MAIN_FILE)
  })


  const injectFile = new File("src/vantInject.js", vantInjectCode)
  store.addFile(injectFile)
  const appFile = new File("src/App.vue", welcomeSFCCode)
  store.addFile(appFile)
  store.setActive('src/App.vue')
  store.files[MAIN_FILE].hidden = true

  for (const [filename, file] of Object.entries(store.files)) {
    if (filename === store.activeFilename) continue
    compileFile(store, file).then((errs) => store.errors.push(...errs))
  }
  
  
  

  

  </script>
  
  <style>
  /* 自定义编辑器样式 */
  .vue-repl {
    height: 600px;
    margin: 20px;
  }
  </style>
  