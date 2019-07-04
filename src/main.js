// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import util from './util'
import store from './vuex/store.js'
import router from './router'
import directive from './directive'
import filters from './filters'
// import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(filters)
Vue.use(util)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  directives: directive,
  template: '<App/>',
  components: {App}
})
