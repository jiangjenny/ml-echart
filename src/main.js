// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import router from './router/router.js'
// 全部导入
import ElementUi from 'element-ui'
Vue.use(ElementUi)
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/common.css'
import '../static/js/rem.js'
import md5 from 'js-md5'
// vuex
import store from './store/index.js'
// echarts
import echarts from 'echarts'
// font-Awesome字体图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
 from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
//全局注册
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$md5 = md5
axios.defaults.baseURL = 'http://127.0.0.1:8080/static/' 
// 请求后台数据是用Json放到请求体里面的

/* eslint-disable no-new */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)


Vue.filter('formatDate',(time)=>{
  return require("moment")(time).format('YYYY年MM月DD日');
})
Vue.filter('formatTime',(time)=>{
  return require("moment")(time).format('HH:mm:ss');
})
Vue.filter('getWeek',(time)=>{
  return "星期" + "日一二三四五六".charAt(time.getDay());
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
