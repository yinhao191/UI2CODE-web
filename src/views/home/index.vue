<template>
  <AppPage show-footer>
    <div class="flex">
      <n-card class="min-w-200 w-30%">
        <div class="flex items-center">
          <n-avatar round :size="60" :src="userStore.avatar" class="flex-shrink-0" />
          <div class="ml-20 flex-col">
            <span class="text-20 opacity-80">
              Hello, {{ userStore.nickName ?? userStore.username }}
            </span>
            <span class="mt-4 opacity-50">当前角色：{{ userStore.currentRole?.name }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-60">
          一个人几乎可以在任何他怀有无限热忱的事情上成功。
        </p>
        <p class="mt-12 text-right text-12 opacity-40">
          —— 查尔斯·史考伯
        </p>
      </n-card>
      <n-card class="ml-12 w-70%" title="✨ 欢迎使用 ui2code 1.0">
        <p class="opacity-60">
          ui2code 是面向 AI 时代的前端智能研发平台,
          能够根据设计图直接生成前端源代码,
          支持用户自定义组件的代码生成,
          为前端研发带来高质、高效、高产的研发体验。
        </p>
        <footer class="mt-12 flex items-center justify-end">
          <n-button
            type="primary"
            ghost
            tag="a"
            href="#"
            target="__blank"
          >
            使用文档
          </n-button>
        </footer>
      </n-card>
    </div>
    <div class="mt-12 flex">
      <n-card class="w-50%" title="💯 特性" segmented>
        <template #header-extra>
          <span class="opacity-90 text-highlight">👏 核心功能</span>
        </template>

        <ul class="opacity-90">
          <li class="py-4">
            🆒
            <b>图生代码：</b>
            <span>基于设计图智能生成前端代码，满足多终端设备的响应式布局需求。</span>
          </li>
          <li class="py-4">
            🍇
            <b>语义化与可复用性：</b>
            <span>智能识别并优化重复的 UI 元素，生成语义清晰、结构合理的高质量代码。</span>
          </li>
          <li class="py-4">
            🤹 <b>导出与集成：</b>
            <span>支持下载单个文件和导出整个工程，便于用户将代码资产高效集成至开发项目。</span>
          </li>
          <li class="py-4">
            🎨 <b>自定义UI组件生成：</b>
            <span>支持用户自定义UI组件的代码生成。</span>
          </li>
          <li class="py-4">
            👏
            <b>用户资产管理：</b>
            统一存储和管理生成的代码资产，提供查看、编辑、导出等功能。
          </li>
        </ul>

        <n-divider class="mb-0! mt-12!">
          <p class="text-14 opacity-60">
            更多实用功能，持续开发中...
          </p>
        </n-divider>
      </n-card>

      <n-card class="ml-12 w-50%" title="🛠️ 技术栈" segmented>
        <VChart :option="skillOption" autoresize />
      </n-card>
    </div>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

const userStore = useUserStore()

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
])

const skillOption = {
  tooltip: {
    trigger: 'item',
    formatter({ name, value }) {
      return `${name} ${value}%`
    },
  },
  legend: {
    left: 'center',
  },
  series: [
    {
      top: '12%',
      type: 'pie',
      radius: ['35%', '90%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 36,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 38.5, name: 'Vue' },
        { value: 37.0, name: 'JavaScript' },
        { value: 6.5, name: 'CSS' },
        { value: 6.2, name: 'HTML' },
        { value: 1.8, name: 'Other' },
      ],
    },
  ],
}
</script>
