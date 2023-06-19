import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { VueQueryPlugin } from "vue-query";


import "./assets/styles.css";
const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");




