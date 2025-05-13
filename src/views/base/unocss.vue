<template>
  <div class="personal-rag">
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen" x-gap="10" y-gap="10">
      <n-grid-item>
        <ragCard />
      </n-grid-item>
      <n-grid-item>
        <ragCard />
      </n-grid-item>
      <n-grid-item>
        <ragCard />
      </n-grid-item>
    </n-grid>

    <n-modal v-show="showModal">
      <n-upload directory-dnd multiple action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ArchiveIcon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </n-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ragCard from '../../components/rag/rag-card.vue'

const showModal = ref(true)
</script>

<style scoped>
.personal-rag {
  margin: 20px;
  overflow-y: scroll;
}
</style>
