import { compileFile, File, useStore as useReplStore, useVueImportMap } from '@vue/repl'
import { computed, ref, watchEffect } from 'vue'
import mainCode from '../template/main.vue?raw'
import vantInjectCode from '../template/vant4.js?raw'
import welcomeSFCCode from '../template/welcomeSFCCode.vue?raw'

const MAIN_FILE = 'src/PlaygroundMain.vue'

// export interface Initial {
//   serializedState?: string
//   versions?: Versions
// }
// export type VersionKey = 'vue' | 'openTiny' | 'typescript'
// export type Versions = Record<VersionKey, string>

const template = ref({
  welcomeSFC: mainCode,
})

export function useStore() {
  // const versions = reactive(initial.versions)
  // const compiler = shallowRef<typeof import('vue/compiler-sfc')>()

  const {
    importMap,
  } = useVueImportMap({
    runtimeDev: 'https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js',
    runtimeProd: 'https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js',
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
