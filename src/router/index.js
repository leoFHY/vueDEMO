import Vue from 'vue'
import Router from 'vue-router'
// import index from '../components/index/index'
// import login from '../components/login/login'

Vue.use(Router);
const login = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['@/components/login/Login.vue'], () => {
    resolve(require('@/components/login/Login.vue'))
  })
};

const index = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['@/components/index/index.vue'], () => {
    resolve(require('@/components/index/index.vue'))
  })
};

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '*',
      name: '404',
      component: login
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
