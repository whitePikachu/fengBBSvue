import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { prismjsPlugin } from "vite-plugin-prismjs";
export default defineConfig({
  optimizeDeps: {
    include: ["@kangc/v-md-editor/lib/theme/vuepress.js"],
  },
  //  配置服务器
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    prismjsPlugin({
      languages: "all",
    }),
  ],
});
