import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tsconfigPaths(),
    AutoImport({
      imports: ['vue'],
      resolvers: [VantResolver()],
    }),
    Components({
      dirs: ['src/views'], // 自定义组件所在的目录，可根据实际情况修改
      extensions: ['vue'], // 组件文件的扩展名
      deep: true, // 是否递归查找子目录
      // dts: 'src/components.d.ts',
      resolvers: [VantResolver()],
    }),
  ],
  // assetsInclude: ['**/*.png'],
  css: {
    preprocessorOptions: {
      less: {
        // additionalData: `@import "@/styles/global.less";`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
