// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入一级路由
import router from "./router/index"

Vue.config.productionTip = false

//引入vuex 
import store from "./store/index"

//引入css样式重置表
import "./assets/css/reset.css"

//引入公共组件
import "./components/index"

//引入公共过滤器
import "./filter/index"

//引入element-ui 模板
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);




/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})
