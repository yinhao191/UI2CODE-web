<script setup lang='ts'>
import { ref } from 'vue'

const msg = ref('Hello Vant!')
</script>

<template>
  Button：
  <Button type="primary">
    {{ msg }}
  </Button>
  <van-divider />
  van-button：
  <van-button type="primary">
    {{ msg }}
  </van-button>
  <van-divider />
  van-Button：
  <van-Button type="primary">
    {{ msg }}
  </van-Button>
</template>
