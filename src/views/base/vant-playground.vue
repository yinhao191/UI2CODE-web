<template>
  <CommonPage>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item @click="gotoGuidePage">
          首页
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          工作台
        </n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <Repl
      :store="store"
      :editor="Monaco"
      theme="dark"
      :show-compile-output="true"
      @keydown.ctrl.s.prevent
    />
  </CommonPage>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '@/store'
import { Repl, useStore } from 'vant-repl'
import Monaco from 'vant-repl/monaco-editor'
import { onMounted, ref } from 'vue'

const store = useStore(
  {
    vueVersion: ref('2.6.14'),
    vantVersion: ref('2.10.1'),
  },
)

const playgroundStore = usePlaygroundStore()

onMounted(() => {
  // 激活时加载数据
  const newData = playgroundStore.buildData
  store.activeFile.code = newData!.lastCode
})

function gotoGuidePage() {
  // 跳转到指南页面
  playgroundStore.reset()
}
</script>

  <style>
  /* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
