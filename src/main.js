import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入elementui
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入公共样式
import '../src/assets/css/common.css'
// 引入字体图标
import './assets/font/iconfont.css'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// axios挂载在原型
import axios from 'axios'
Vue.prototype.axios=axios
// 设置axios公共请求头
axios.defaults.baseURL='http://work.08321.org/'
// 引入qs, 
// qs.stringify()将对象 序列化成URL的形式，以&进行拼接
// qs.parse()将URL解析成对象的形式
import qs from 'qs'
Vue.prototype.qs=qs;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
