import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/ai-api': {
        target: 'https://open.bigmodel.cn/api/paas',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai-api/, '')
      }
    }
  },
  build: {
    outDir: 'docs'
  }
})
