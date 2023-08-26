import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "../src/assets/css/bootstrap/css/bootstrap.min.css";
import "../src/assets/css/style.css";

var storage = localStorage;
storage.setItem("urlBase", "https://tazarob.wo9.ir/");
storage.setItem("apiKey", "HelloTommy");


const app = createApp(App);

app.use(router);
app.mount("#app");
