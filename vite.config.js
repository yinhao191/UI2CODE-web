import fs from 'node:fs'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import removeNoMatch from 'vite-plugin-router-warn'
import VueDevTools from 'vite-plugin-vue-devtools'
import { pluginIcons, pluginPagePathes } from './build/plugin-isme'

export default defineConfig(({ mode }) => {
  console.log(mode)
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH, VITE_PROXY_TARGET } = viteEnv
  console.log('public target: %s, proxy taget: %s', VITE_PUBLIC_PATH, VITE_PROXY_TARGET)

  return {
    optimizeDeps: {
      exclude: ['vant-repl'],
    },
    base: VITE_PUBLIC_PATH || '/',
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
          fs: {
            fileExists: fs.existsSync,
            readFile: file => fs.readFileSync(file, 'utf-8'),
          },
        },
      }),
      // Vue(),
      VueJsx(),
      VueDevTools(),
      Unocss(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: false,
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: false,
      }),
      // 自定义插件，用于生成页面文件的path，并添加到虚拟模块
      pluginPagePathes(),
      // 自定义插件，用于生成自定义icon，并添加到虚拟模块
      pluginIcons(),
      // 移除非必要的vue-router动态路由警告: No match found for location with path
      removeNoMatch(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '~': path.resolve(process.cwd()),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3200,
      open: false,
      proxy: {
        '/mock-api': {
          // target: 'https://m1.apifoxmock.com/m1/6094781-5785319-default',
          target: 'http://127.0.0.1:4523/m1/6094781-5785319-default', // 后端服务部署后替换为服务器地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mock-api/, ''),
          secure: false,
          configure: (proxy, options) => {
            // 配置此项可在响应头中看到请求的真实地址
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
            })
          },
        },
        '/api': {
          // target: 'https://m1.apifoxmock.com/m1/6094781-5785319-default', // 后端服务部署后替换为服务器地址
          target: 'http://47.108.176.177:8000', // 后端服务部署后替换为服务器地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          secure: false,
          configure: (proxy, options) => {
            // 配置此项可在响应头中看到请求的真实地址
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
            })
          },
        },
      },
    },
    build: {
      rollupOptions: {

      },
    },
    preview: {

    },

  }
})
