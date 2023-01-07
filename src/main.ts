import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/es/components/message/style/css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/theme-chalk/display.css";
import { setupRouter } from "./plugins/router";
import { pinia } from "./plugins/pinia";
import { setupEditor } from "./plugins/postmd";
function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  app.use(pinia);
  setupEditor(app);
  app.mount("#app");
}
bootstrap();
