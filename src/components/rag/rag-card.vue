<template>
  <n-card content-style="padding: 0;" hoverable>
    <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
      <n-tab-pane name="组件" display-directive="show">
        <n-skeleton v-show="loading" height="200px" width="100%" :sharp="false" />
        <n-flex v-show="!loading" justify="center">
          <n-image width="200" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" :on-load="closeLoading" />
        </n-flex>
      </n-tab-pane>
      <n-tab-pane name="关于" display-directive="show">
        ROCKLIFE
      </n-tab-pane>
    </n-tabs>
    <template #footer>
      <span style="float: right;">上传于 2024-01-02 13:44:12</span>
    </template>
    <template #action>
      <n-flex justify="end">
        <n-button type="info">
          修改
        </n-button>
        <n-button type="error">
          删除
        </n-button>
      </n-flex>
    </template>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
function closeLoading() {
  loading.value = false
}
</script>

  <style scoped>
  .n-card {
  max-width: 300px;
}
</style>
