import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
//element plus按需導入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/program01/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          //1. 配置elementPlus採用sass樣式配色系統
          importStyle: 'sass'
        })
      ]
    }),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自動導入定制化樣式文件進行樣式覆蓋
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
          @use "@/styles/mystyle.scss" as *;
        `
      }
    }
  },
  define: {
    'process.env': {}
  }
})
