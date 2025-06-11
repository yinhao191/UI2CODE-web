<template>
  <div>
    <div class="mt-15 box-border h-160 w-300 rounded-3xl bg-[#1a1a1a] p-10">
      <n-image
        object-fit="contain"
        :src="src"
        preview-disabled
      />
    </div>
    <div class="mt-5">
      <i class="i-fe:user text-gray-500" />
      <span class="ml-5 text-gray-500">fxxxx-Mnse2025 | {{ formatDateTime(time) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['src', 'time'])

/**
 * 日期格式化函数，支持替换今天/昨天显示
 * @param isoString ISO 8601 格式日期字符串
 * @returns 格式化后的日期字符串
 */
function formatDateTime(isoString: string): string {
  // 解析日期并验证有效性
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime()))
    return 'Invalid Date'

  // 获取当前时间参照点
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const inputDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  // 计算日期差值（考虑本地时区）
  const diffDays = Math.round((today.getTime() - inputDay.getTime()) / 86400000)

  // 格式化时间部分（HH:mm:ss）
  const timeStr = [
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
    date.getSeconds().toString().padStart(2, '0'),
  ].join(':')

  const dateStr = [
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-')

  // 根据日期差返回不同格式
  switch (diffDays) {
    case 0: return `Today ${timeStr}`
    case 1: return `Yesterday ${timeStr}`
    default:
      // 完整日期格式化（YYYY-MM-DD）
      return `${dateStr} ${timeStr}`
  }
}
</script>

<style scoped>

</style>
