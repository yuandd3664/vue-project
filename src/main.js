// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Store from './store'
import Axios from 'axios'  //导入axios

//将axios挂载到原型上
Vue.prototype.$axios = Axios;
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // Store,
  components: { App },
  template: '<App/>'
})
