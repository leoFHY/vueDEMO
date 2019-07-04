import Vue from 'vue'

/**
 * 自定义指令—自动获取焦点
 */
Vue.directive('focus', {
  update: function (el) {
    el.focus()
  }
})
export default {Vue}
