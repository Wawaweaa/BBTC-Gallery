import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: false,  // 禁用 public 目录，因为我们删除了它
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'  // 明确指定入口文件
    }
  }
})