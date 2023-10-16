import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
// import VueLodash from "vue-lodash";
// import lodash from "lodash";
import "./assets/global.scss";
import router from "./router";
createApp(App)
  .use(router)
  .use(Antd)
  // .use(VueLodash, { name: 'custom', lodash: lodash })
  .mount("#app");
