import Vue from "vue";
import VueVirtualScroller from "vue-virtual-scroller";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueVirtualScroller);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
