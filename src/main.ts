import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/es/components/message/style/css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/theme-chalk/display.css";
import router, { setupRouter } from "./plugins/router";
function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  app.mount("#app");
}
bootstrap();
