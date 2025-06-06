<template>
  <CommonPage>
    <Repl
      :store="store"
      :editor="Monaco"
      theme="dark"
      :show-compile-output="true"
      @keydown.ctrl.s.prevent
    />
  </CommonPage>
</template>

<script setup>
import { Repl, useStore } from 'vant-repl'
import Monaco from 'vant-repl/monaco-editor'
import { ref } from 'vue'
const props = defineProps({
  code: {
    type: String,
    default: "<template>\n  <div class=\"faq-container\">\n    <header class=\"header\">\n      <span class=\"back-icon\">&lt;</span>\n      <h1 class=\"title\">常见问题</h1>\n    </header>\n    <section class=\"faq-section\">\n      <div class=\"faq-item\">\n        <h2 class=\"faq-number\">01 /</h2>\n        <h2 class=\"faq-question\">什么是硬件钱包?</h2>\n        <p class=\"faq-answer\">\n          硬件钱包是数字人民币应用的硬件载体，基于安全芯片等高技术实现数字人民币相关功能。可前往银行柜面，或者其他自助办理渠道办理硬钱包卡片。\n        </p>\n      </div>\n      <div class=\"faq-item\">\n        <h2 class=\"faq-number\">02 /</h2>\n        <h2 class=\"faq-question\">如何开通硬件钱包?</h2>\n        <p class=\"faq-answer\">\n          可通过掌上银行贴一贴功能关联准账户硬件钱包。<br>\n          可通过数字人民币 APP-我的-硬钱包页面右上角“+”按钮将个人钱包关联至手机PAY中。\n        </p>\n      </div>\n      <div class=\"faq-item\">\n        <h2 class=\"faq-number\">03 /</h2>\n        <h2 class=\"faq-question\">如何使用硬件钱包?</h2>\n        <p class=\"faq-answer\">\n          将手机贴近POS机，碰一碰验证后，完成支付。<br>\n          将硬钱包卡片贴近POS机，碰一碰验证后，完成支付。\n        </p>\n      </div>\n    </section>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'FaqComponent'\n}\n<\/script>\n\n<style scoped>\n.faq-container {\n  width: 640px;\n  margin: 0 auto;\n}\n\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n.back-icon {\n  font-size: 24px;\n  color: #333;\n}\n\n.title {\n  font-size: 24px;\n  color: #333;\n  text-align: center;\n  flex: 1;\n}\n\n.faq-section {\n  padding: 20px;\n}\n\n.faq-item {\n  margin-bottom: 20px;\n}\n\n.faq-number {\n  display: inline-block;\n  font-size: 24px;\n  color: orange;\n  margin-right: 10px;\n}\n\n.faq-question {\n  display: inline-block;\n  font-size: 24px;\n  color: #333;\n}\n\n.faq-answer {\n  background-color: #f5f5f5;\n  padding: 20px;\n  margin-top: 10px;\n  font-size: 16px;\n  color: #666;\n  line-height: 1.5;\n}\n</style>"
  }
})
const store = useStore(
  {
    vueVersion: ref('2.6.14'),
    vantVersion: ref('2.10.1'),
    template: ref({
      welcomeSFC: props.code
    }),
  },
)
onMounted(() => {
  console.log("接收组件传值");
})
</script>

  <style>
  /* 自定义编辑器样式 */
.vue-repl {
  height: 600px;
  margin: 20px;
}
</style>
