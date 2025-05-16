import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8030,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8051',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('请求:', path) // 调试输出
          return path.replace(/^\/api/, '')
        },
      },
    },
  },
})
