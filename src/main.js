import Vue from 'vue'
import App from './App.vue'
import vueRouter from './router'
import ElementUI from 'element-ui';
import '@/assets/them-css/element-#000000/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n';
import { vuexStore } from '@/vuex/index';

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  // 引入i18n实例
  i18n,
  // 引入vuex
  store: vuexStore,
  router: vueRouter,
  render: h => h(App)
}).$mount('#app')
