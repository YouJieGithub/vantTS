import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';
import vitecompressPlugin from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';
// @ts-ignore
// import styleImport, {VantResolve} from 'vite-plugin-style-import';
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // styleImport({
    //   resolves: [VantResolve()],
    // }),
    Components({
      resolvers: [VantResolver()],
    }),
    vitecompressPlugin({
      ext: '.gz',//gz br
      algorithm: 'gzip', //brotliCompress gzip
      deleteOriginFile: false
    }),
    /**
     * @warn 目前这个vite插件或vite本身机制导致一个致命bug,建议目前不要使用
     */
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    },
    // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  build: {
    minify: "terser",
    // 生产环境移除console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: true,   //将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
    open: false, //是否自动打开
    proxy: {
      "^/api": {
        // target: "http://192.168.3.100:9094/dxe/mobile", // 后端服务实际地址
        target: "http://192.168.0.198/dxe/mobile", // 后端服务实际地址
        // target: "http://39.106.140.225/dxe/mobile", // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
