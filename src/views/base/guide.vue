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
        <n-tab-pane name="Image to code recently" tab="Image to code recently" class="grid-container">
          <recentImage v-for="item in recentData" :key="item.createTime" :src="item.imagePath" :time="item.createTime" @click="goToPlayground(item)" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BuildData } from '@/store'
import api from '@/api'
import { usePlaygroundStore } from '@/store'
import { onMounted, reactive } from 'vue'
import recentImage from './components/recent-image.vue'

// const imageURL = 'https://xjl-ui2code.oss-cn-chengdu.aliyuncs.com/1234561749199281-c29ddfaa62f34be9abd4d5cba3909262.png?x-oss-signature-version=OSS4-HMAC-SHA256&x-oss-date=20250606T084121Z&x-oss-expires=604799&x-oss-credential=LTAI5tFmAbWeBLgwsGRa9S64%2F20250606%2Fcn-chengdu%2Foss%2Faliyun_v4_request&x-oss-signature=3f2f7ddcf7eb935537885820532a3d31b49a57b7432c675128c8b879504f6722 '
const store = usePlaygroundStore()

const recentData = reactive<BuildData[]>([])

onMounted(async () => {
  const userRecentData = await api.getRecentBuild(123456)
  let data = userRecentData.data
  // 取前8个
  data = data.slice(0, 8)
  recentData.push(...data)
})

function goToPlayground(data: BuildData) {
  // 与父附件通信，展示vant-playground
  store.setPlaygroundData(data)
}

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

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
}
</style>
