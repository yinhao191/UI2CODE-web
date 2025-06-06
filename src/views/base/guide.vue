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
        <n-button round :disabled="!fileListLengthRef" color="#222625" class="absolute bottom-4 right-4 px-10 py-2 text-gray" @click="handleClick">
          <template #icon>
            <i class="i-me:awesome?mask text-28" />
          </template>
          Generate
        </n-button>
      </div>
      <n-upload
        v-model:file-list="fileList"
        :action="uploadUrl"
        ref="uploadRef"
        :default-upload="false"
        :max="1"
        :multiple="false"
        @change="handleChange"
        @finish="handleFinish"
        @before-upload="handleBeforeUpload"
        :data="{
          account_id: '000'
        }"
      >
        <i class="i-fe:image self-start pt-30 text-20 hover:bg-trueGray" />
      </n-upload>
    </div>

    <div class="mx-auto f-c-c flex-col container">
      <n-tabs type="bar" animated class="custom-tabs self-start">
        <n-tab-pane name="Image to code recently" tab="Image to code recently" class="f-c-c flex-wrap justify-between">
          <recentImage :src="imageURL" />
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

<script lang="js" setup>
import recentImage from './components/recent-image.vue'
import { defineComponent, ref } from 'vue'
const uploadUrl = 'http://8.137.36.56:8000/ai/generate-code'
const imageURL = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'

const emit = defineEmits(['generate']);
const fileListLengthRef = ref(0);
const uploadRef = ref(null);

function generateCode(code) {
  // 假装调接口生成代码
  //const { data } = await api.generateCode({ image: })
  console.log("组件通信")
  console.log("ui2code："+code)
  emit('generate', code);
}
function handleBeforeUpload() {
  $message.loading('图片上传中...');
}
function handleChange(options) {
  console.log("文件列表变化", options);
  fileListLengthRef.value = options.fileList.length;
}
function handleFinish({file, event}) {
  console.log(event);
  const response = JSON.parse(event?.target.response);
  const code = response.data.genCode;
  generateCode(code);
}
function handleClick() {
  uploadRef.value?.submit();
  $message.loading('代码生成中...', {
    duration: 15000
  });
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
