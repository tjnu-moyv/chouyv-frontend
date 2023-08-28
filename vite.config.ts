import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    // 启动项目自动弹出浏览器
    open: true,
    // 启动端口
    port: 80,
    /*proxy: {
      '/api': {
        // 实际请求地址
        target: 'http://surkaa.shop:9000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      },
    }*/
  }
})
