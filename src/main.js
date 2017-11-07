// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VuexStore from '@/store/index'

// axios 类ajax请求工具 
// 通过使用vue-axios注册到vue实例中，在任何一个vue的实例中都可以使用`this.axios`发起请求
// import axios from 'axios'
// import vueAxios from 'vue-axios'
// Vue.use(vueAxios, axios)

// iview UI组件库
import iView from 'iview'
import 'iview/dist/styles/iview.css'	// 使用 CSS
Vue.use(iView)

// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


Vue.use(Vuex)
const store = new Vuex.Store(VuexStore)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
