<template>
  <CommonPage>
    <n-card title="📖 上传说明">
      需上传三个文件，分别为 <n-tag round>
        UI组件图片(.png)
      </n-tag>、<n-tag round>
        组件使用代码(.vue)
      </n-tag>、<n-tag
        round
      >
        使用说明文档(.md)
      </n-tag>。请注意：
      <br>
      1. 图片尽量清晰，不包含除该组件外其他组件元素。
      <br>
      2. 使用代码语法正确，可在工程中编译渲染。
      <br>
      3. 说明文档请说明组件的使用方式。
    </n-card>

    <n-upload
      class="mx-auto w-[75%] p-20 text-center" :custom-request="handleUpload" :max="maxFileNum"
      :accept="allowedTypes" :file-list="fileList" :multiple="true"
      @update:file-list="handleFileListChange" @before-upload="onBeforeUpload" @remove="onRemoveUpload"
    >
      <n-upload-dragger>
        <div v-if="!uploadImage.url" class="h-150 f-c-c flex-col">
          <i class="i-mdi:upload mb-12 text-68 color-primary" />
          <n-text class="text-14 color-gray">
            点击或者拖动文件到该区域来上传
          </n-text>
        </div>

        <div v-else class="h-150 f-c-c">
          <n-image class="m-auto h-100%" :src="uploadImage.url" preview-disabled />
        </div>
      </n-upload-dragger>
    </n-upload>

    <n-steps class="mx-auto f-c-c">
      <n-step title="组件图片" :status="uploadFiles.png">
        <div class="n-step-description">
          <p>图片清晰，尺寸合理</p>
        </div>
      </n-step>
      <n-step title="使用代码" :status="uploadFiles.vue">
        <div class="n-step-description">
          <p>语法正确，未超过最大长度</p>
        </div>
      </n-step>
      <n-step title="说明文档" :status="uploadFiles.md">
        <div class="n-step-description">
          <p>未超过指定大小(20KB)</p>
        </div>
      </n-step>
    </n-steps>
  </CommonPage>
</template>

<script setup>
import { reactive, ref } from 'vue'

defineOptions({ name: 'ImgUpload' })

// 允许的文件类型
const allowedTypes = '.vue,.md,.png'
// 文件列表（响应式）
const fileList = ref([])
const maxFileNum = ref(3)

const uploadImage = reactive({})

const uploadFiles = reactive({})

// function onBeforeUpload({ file }) {
//   if (!file.file?.type.startsWith('image/')) {
//     $message.error('只能上传图片')
//     return false
//   }
//   return true
// }

async function handleUpload({ file, onFinish }) {
  console.warn('upload : ', file)
  // 处理图片
  if (file.type === 'image/png') {
    uploadImage.url = URL.createObjectURL(file.file)
    uploadImage.fileName = file.name
  }
  // 模拟上传
  $message.loading('上传中...')
  // 上传成功
  const fileType = file.name.split('.')[1]
  uploadFiles[fileType] = 'finish'
  onFinish()
  return { handleUpload }
}

function handleFileListChange(data) {
  fileList.value = data
}

// 上传前校验
function onBeforeUpload({ file }) {
  console.warn('before upload : ', file)
  // 获取文件扩展名
  const fileExt = `${file.file.name.split('.').pop().toLowerCase()}`

  // 检查文件类型
  if (!allowedTypes.includes(fileExt)) {
    window.$message.error(`不支持的文件类型：${fileExt}`)
    return false
  }

  // 重复检查 → 失败立即返回
  if (fileList.value.some(f => f.type === fileExt || f.name.split('.').pop().toLowerCase() === fileExt)) {
    window.$message.error(`已存在 ${fileExt} 类型文件`)
    return false
  }

  // 阻止默认上传行为（如果需要自行处理上传）
  return true
}

function onRemoveUpload(uploadFileInfo) {
  console.warn(uploadFileInfo)
  const fileType = uploadFileInfo.file.name.split('.')[1]
  uploadFiles[fileType] = 'process'
  if (fileType === 'png') {
    Object.keys(uploadImage).forEach(k => delete uploadImage[k])
  }
  return true
}
</script>
