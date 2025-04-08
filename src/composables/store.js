import { compileFile, File, useStore as useReplStore, useVueImportMap } from '@vue/repl'
import { computed, ref } from 'vue'
import mainCode from '../template/main.vue?raw'
import vantInjectCode from '../template/vant4.js?raw'
import welcomeSFCCode from '../template/welcomeSFCCode.vue?raw'

const template = ref({
  welcomeSFC: mainCode,
})

export function useStore() {
  const MAIN_FILE = 'src/PlaygroundMain.vue'
  const {
    importMap,
  } = useVueImportMap({
    runtimeDev: 'https://cdn.jsdelivr.net/npm/vue@3.5.13/+esm',
    runtimeProd: 'https://cdn.jsdelivr.net/npm/vue@3.5.13/+esm',
  })
  const finalImportMap = computed(() => ({
    ...importMap.value,
    imports: {
      ...importMap.value.imports,
      vant: 'https://cdn.jsdelivr.net/npm/vant@4.9.18/+esm',
    },
  }))
  const store = useReplStore({
    builtinImportMap: finalImportMap,
    template,
    mainFile: ref(MAIN_FILE),
  })

  const injectFile = new File('src/vantInject.js', vantInjectCode)
  store.addFile(injectFile)
  const appFile = new File('src/App.vue', welcomeSFCCode)
  store.addFile(appFile)
  store.setActive('src/App.vue')
  store.files[MAIN_FILE].hidden = true

  function init() {
    watchEffect(() => {
      compileFile(store, store.activeFile).then(errs => (store.errors = errs))
    })
    for (const [filename, file] of Object.entries(store.files)) {
      if (filename === store.activeFilename)
        continue
      compileFile(store, file).then(errs => store.errors.push(...errs))
    }
  }
  store.init = init
  return store
}
