<template>
  <n-spin :show="loading">
    <template #description>
      代码生成中...
    </template>
    <div class="scanBox" v-show="loading">
      <div class="scan">
      </div>
    </div>
    <div class="min-h-screen bg-[rgb(34,38,37)] text-white" v-show="!loading">
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
          <n-button round :disabled="!fileListLengthRef" color="#222625" class="absolute bottom-4 right-4 px-10 py-2 text-gray" @click="handleClick">
            <template #icon>
              <i class="i-me:awesome?mask text-28" />
            </template>
            Generate
          </n-button>
        </div>
        <n-upload
          ref="uploadRef"
          :action="uploadUrl"
          :default-upload="false"
          :max="1"
          :multiple="false"
          :data="{
            account_id: '000',
          }"
          :custom-request="handleCustomRequest"
          @change="handleChange"
          @success="handleFinish"
          @before-upload="handleBeforeUpload"
        >
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
  </n-spin>
</template>

<script lang="ts" setup>
import type { BuildData } from '@/store'
import api from '@/api'
import { usePlaygroundStore } from '@/store'
import { onMounted, reactive, ref } from 'vue'
import recentImage from './components/recent-image.vue'
const loading = ref(false) // 控制加载状态

const uploadUrl = 'https://47.108.176.177:8000/ai/generate-code'
// const imageURL = 'https://xjl-ui2code.oss-cn-chengdu.aliyuncs.com/1234561749199281-c29ddfaa62f34be9abd4d5cba3909262.png?x-oss-signature-version=OSS4-HMAC-SHA256&x-oss-date=20250606T084121Z&x-oss-expires=604799&x-oss-credential=LTAI5tFmAbWeBLgwsGRa9S64%2F20250606%2Fcn-chengdu%2Foss%2Faliyun_v4_request&x-oss-signature=3f2f7ddcf7eb935537885820532a3d31b49a57b7432c675128c8b879504f6722 '
const store = usePlaygroundStore()

const recentData = reactive<BuildData[]>([])

const src = ref("https://xjl-ui2code.oss-cn-chengdu.aliyuncs.com/1234561750064644-1fb4e2e30bd343a791649448a4bc5133.png")


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

const fileListLengthRef = ref(0)
const uploadRef = ref(null)
const imageRef = ref("")
async function handleCustomRequest (obj: any) {
  try {
    const formData = new FormData();
    const dataUrl = await readFileAsDataURL(obj.file.file)
    formData.append('file', obj.file.file)
    formData.append('account_id', '123')
    console.log(formData.get('file'))
    imageRef.value = dataUrl + "";
    document.documentElement.style.setProperty('--image-url', "url("+dataUrl+")")

    await api.getImageCode(formData).then((res) => {
      console.log(res);
      handleFinish(res);
    });

  } catch (error) {
    console.log('文件读取失败', error)
  }
}
function readFileAsDataURL (file: UploadFileInfo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
function handleBeforeUpload() {
  $message.loading('图片上传中...')
}
function handleChange(options: any) {
  fileListLengthRef.value = options.fileList.length
}
function handleFinish(response: any) {
  //console.log(options)
 // const response = JSON.parse(res)
  loading.value = false
  const playgroundData: BuildData = {
    imagePath: response.data.createTime, // 待playground新增了图片对比功能后修改
    lastCode: response.data.genCode,
    createTime: response.data.createTime,
  }
  goToPlayground(playgroundData)
}
function handleClick() {
  uploadRef.value?.submit()
  loading.value = true
}
</script>

<style scoped>
.scanBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 100px 0;
  background-color: black;
}
.scan{
  width: 365px;
  height: 660px;
  background-image: var(--image-url);
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.scan::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 365px;
  height: 10px;
  background-image: var(--image-url);
  background-size: 100% auto;
  background-repeat: no-repeat;
  filter: grayscale(50%) sepia(100%) hue-rotate(120deg);
  opacity: 1;
  animation: move 1.8s linear infinite;    
}
@keyframes move{
            0%{
                top: 0;
                background-position: 6px 0px; 
            }
            10%{
                top: 180px;
                background-position: -6px -180px; 
            }
            20%{
                top: 300px;
                background-position: 6px -300px; 
            }
            30%{
                top: 420px;
                background-position: -6px -420px;
            }
            40%{
                top: 540px;
                background-position: 6px -540px;
            }
            50%{
                top: 660x;
                background-position: -6px -660px;
            }
            60%{
                top: 540px;
                background-position: 6px -540px;
            }
            70%{
                top: 420px;
                background-position: -6px -420px;
            }
            80%{
                top: 300px;
                background-position: 6px -300px; 
            }
            90%{
                top: 180px;
                background-position: -6px -180px; 
            }
            100%{
                top: 0;
                background-position: 6px 0px; 
            }
          
}

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
