<template>
  <div class="min-h-screen bg-[rgb(34,38,37)] text-white">
    <div class="mx-auto w-50% f-c-c flex-col px-4 py-16 container">
      <h1 class="mb-8 text-36px font-bold">
        What do you want to build?
      </h1>
      <p class="mb-4 text-16px text-gray-500">
        Empower development engineers to help improve x10 times efficiency
      </p>

      <div class="relative w-100%">
        <input
          placeholder="Paste links for pictures or design file, upload images"
          class="mt-30 h-120 w-full rounded-3xl bg-[rgb(51,54,52)] text-white"
        >
        <n-button round color="#222625" class="absolute bottom-4 right-4 px-10 py-2 text-gray" @click="generateCode">
          <template #icon>
            <i class="i-me:awesome?mask text-28" />
          </template>
          Generate
        </n-button>
      </div>
      <n-upload>
        <i class="i-fe:image self-start pt-30 text-20 hover:bg-trueGray" />
      </n-upload>
    </div>

    <div class="mx-auto f-c-c flex-col container">
      <n-tabs type="bar" animated class="custom-tabs self-start">
        <n-tab-pane name="Image to code recently" tab="Image to code recently" class="f-c-c flex-wrap justify-between">
          <recentImage :src="imageURL" @click="goToPlayground" />
          <recentImage :src="imageURL" />
          <recentImage :src="imageURL" />
          <recentImage :src="imageURL" />
          <recentImage :src="imageURL" />
          <recentImage :src="imageURL" />
          <recentImage :src="imageURL" />
          <recentImage :src="imageURL" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { onMounted } from 'vue'
import recentImage from './components/recent-image.vue'

const imageURL = 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'

// const recentBuildData = reactive({
//     createTime: String,
//     imagePath: String,
//     code: String
// })

onMounted(() => {
  api.getRecentBuild(1234)
})

function generateCode() {
  // 假装调接口生成代码
  $message.loading('代码生成中...')
}
</script>

<style scoped>
input::placeholder {
  position: relative;
  top: -40px;
  left: 15px;
}

:deep() span.n-tabs-tab__label {
  color: white !important;
}

:deep() .n-tabs-bar {
  background-color: white;
}
</style>
