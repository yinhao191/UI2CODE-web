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
    <div>
      <n-button @click="handlePreviewImage">
        原图对比
      </n-button>
      <Repl :store="store" :editor="Monaco" theme="dark" :show-compile-output="true" @keydown.ctrl.s.prevent />
    </div>
    <!-- 隐藏的图片预览组件 -->
    <n-image
      v-show="false"
      ref="imageRef"
      :src="previewSrc"
      :preview-src="previewSrc"
      :show-toolbar="true"
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
    vueVersion: ref('3.5.17'),
    vantVersion: ref('4.9.20'),
  },
)
const playgroundStore = usePlaygroundStore()

const previewSrc = playgroundStore.buildData?.imagePath
const imageRef = ref(null)

onMounted(() => {
  // 激活时加载数据
  const newData = playgroundStore.buildData
  store.activeFile.code = newData!.lastCode
})

function gotoGuidePage() {
  // 跳转到指南页面
  playgroundStore.reset()
}

function handlePreviewImage() {
  // 处理预览图片逻辑
  imageRef.value?.previewInstRef?.setPreviewSrc(previewSrc)
  imageRef.value?.previewInstRef?.toggleShow()
}
</script>

<style>
/* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
}
</style>
