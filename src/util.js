/**
 * Created by admin on 2017/7/18.
 * !!!!!重写window,增加新的命名空间netintech
 */
import base64 from 'base-64';
import moment from 'moment';
import MD5 from 'js-md5';
import router from './router'
// import EDpass from '../static/encryption.js'

window.netintech = {};//重写window,增加新的命名空间netintech
window.netintech.rootParam = {};//新增一个root参数空间
const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  var bus = new Vue();
  window.netintech.moment = moment;
  window.netintech.Bus = bus;
  window.netintech.MD5 = MD5;
  // window.netintech.EDpass=EDpass;
  /**
   * 获取当前dom节点位置
   * @param e
   * @returns {{top: number, left: number}}
   */
  window.netintech.getAbsCoordinates = function (e) {
    var pos = {top: 0, left: 0};
    while (e) {
      pos.left += e.offsetLeft;
      pos.top += e.offsetTop;
      e = e.offsetParent;
    }
    return pos;
  };
  /**
   *
   */
  window.netintech.BASE64 = base64;
  /**
   * 数组内增加特定属性
   * @param key
   * @param value
   * @returns {Array}
   */
  Array.prototype.arrAddKey = function (key, value) {
    for (var i = 0; i < this.length; i++) {
      this[i][key] = value;
    }
    return this
  };
  /**
   * 克隆json
   */
  Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this))
  };
  /**
   * 随机取数组内元素
   * @param count
   * @returns {Array.<*>}
   */
  Array.prototype.getRandomArrayElements = function (count) {
    var arr = this;
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  };
  /**
   * 查看数组里有没有这个值
   * @param str
   * @returns {boolean}
   */
  Array.prototype.hasValue = function (str) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === str) {
        return true;
      }
    }
    return false;
  };
  /**
   * localStorage
   * @type {{set: (function(*=, *=)), get: (function(*=)), clear: (function()), remove: (function(*=))}}
   */
  window.netintech.storage = {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    get(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    clear() {
      localStorage.clear();
    },
    remove(key) {
      localStorage.removeItem(key)
    }
  };
  /**
   * sessionStorage
   * @type {{set: (function(*=, *=)), get: (function(*=)), clear: (function()), remove: (function(*=))}}
   */
  window.netintech.Storage = {
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    },
    get(key) {
      return JSON.parse(sessionStorage.getItem(key));
    },
    clear() {
      sessionStorage.clear();
    },
    remove(key) {
      sessionStorage.removeItem(key)
    }
  };
  /**
   * ajax封装
   * @type {{timeout: number, ajax: window.netintech.ajaxCore.ajax, ajax2: window.netintech.ajaxCore.ajax2}}
   */
  window.netintech.ajaxCore = {
    timeout: 60000,
    /**
     * async不可以传null,你可以不传(formdate)
     * @param url
     * @param data
     * @param method
     * @param headers
     * @param loading
     * @param async
     * @returns {*}
     */
    ajax: function (url, data, method, headers, loading, async) {
      var index = layer.load(0, {skin: "layer-load"});
      var _config;
      //如果你传的是{}的配置
      if (arguments.length === 1 && $.type(url) === 'object') {
        _config = config.appCode+url;
      } else {
        _config = {
          url: config.appCode + url,
          type: method,
          headers: headers,
          data: data,
          timeout: netintech.ajaxCore.timeout,
          async: async === null ? true : async,
          cache: false
        }
      }
      let defer = $.Deferred();
      if (!method) {
        method = "POST";
      } else {
      }
      var globalXHR = $.ajax(_config).success((res) => {
        layer.close(index);
        res.status = parseInt(res.status);
        defer.resolve(res);
        if (res.desc === '传入token不正确!') {
          layer.open({content: '登录过期或者您已从其他地方登陆'});
          Bus.$emit('to-Right-loginOut', true)
        }
        switch (res.status) {
          case 10001:
            break;
          case 10002:
            netintech.msg(res.desc+",错误码是:"+res.status);
            break;
          case 10003:
            netintech.msg(res.desc+",错误码是:"+res.status);
            break;
          case 10004:
            netintech.msg(res.desc+",错误码是:"+res.status);
            // $state.go('login');$rootScope.login_out();
            break;
          case 10005:
            router.push('/login');
            netintech.Storage.clear();
            break;
        }
      }).error((res, status) => {
        layer.close(index);
        defer.reject(res);
        if (res.statusText == 'timeout') {
          layer.alert('连接超时');
        } else if (status == 'error' && res.status == 500) {
          layer.alert(arguments[2] ? arguments[2] : '后台接口处理异常');
        } else if (status == 'error') {
          layer.alert('连接后台接口异常');
        }
      });
      return defer;
    },
    /**
     * JsonString传输
     * @param url
     * @param data
     * @param method
     * @param headers
     * @param async
     * @returns {*}
     */
    ajax2: function (url, data, method, headers, async) {
      var index = layer.load(0, {skin: "layer-load"});
      var defer = $.Deferred();
      if (!method) {
        method = "POST";
      } else {
      }
      var globalXHR = $.ajax({
        url: config.appCode + url,
        timeout: ajaxCore.timeout,
        type: method,
        headers: headers,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        async: async === null ? true : async
      }).success(function (res) {
        res.status = parseInt(res.status);
        layer.close(index);
        defer.resolve(res);
        if (res.desc === '传入token不正确!') {
          lauer.open({content: '登录过期或者您已从其他地方登陆'});
          Bus.$emit('to-Right-loginOut')
        }
        switch (res.status) {
          case 10001:
            break;
          case 10002:
            break;
          case 10003:
            break;
          case 10004://token过期
            // $state.go('login');$rootScope.login_out();
            break;
        }
      }).error(function (res, status) {
        layer.close(index);
        if (res.statusText == 'timeout') {
          layer.msg('连接超时');
        } else if (status == 'error' && res.status == 500) {
          layer.msg(arguments[2] ? arguments[2] : '后台接口处理异常');
        } else if (status == 'error') {
          layer.msg(arguments[2] ? arguments[2] : '后台接口处理异常');
        }
      });
      return defer;
    }
  };
  //随机6位数
  window.netintech.getRandom6 = function () {
    return parseInt(Math.random() * Math.pow(10, 6));
  };
  /**
   * 获取session中过的token
   * @returns {boolean}
   */
  window.netintech.getToken = function () {
    return Storage.get('loginresult') ? Storage.get('loginresult').token : false
  };
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  };
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind(el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  });
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  });
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // 逻辑...
  };
  //是否正整数
  window.netintech.isPositiveNum = (data) => {
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(data)
  };
  /**
   * msg弹跳框
   * @param content
   * @param title
   */
  window.netintech.msg = (content,title) => {
    layer.open({
      title: title || '提示',
      content: content
    });
  }
  /**
   * layer弹框
   * @param content
   */
  window.netintech.alert = (content) =>{
    layer.alert(content);
  }
  /**
   * 确认提示框
   * @param title [string] 提示框标题
   * @param rightTitle [string] 正确按钮显示文字
   * @param failTitle [string] 错误按钮显示文字
   * @param rightBack [callBack] 点击正确按钮回调
   * @param failBack [callBack] 点击错误按钮回调
   */
  window.netintech.confirm = (title,rightTitle,failTitle,rightBack,failBack) =>{
    layer.confirm(title, {
      btn: [rightTitle,failTitle] //按钮
    }, rightBack, failBack);
  }
  /**
   * 获取地址栏参数信息(仅单参数)
   * @returns {*}
   */
  window.netintech.getHash = () =>{
    let loc = window.location.href;
    let data1 = loc.split('?');
    let text = data1[1];
    if(text != "" && text != undefined){
      let data2 = text.split('=');
      return data2[1];
    }else{
      return ""
    }
  }
  /**
   * 截取字段
   * @param str
   * @param num
   * @returns {*}
   */
  window.netintech.len = function(str,num){
    if(str.length <= num){
      return str;
    }else{
      return str.substr(0,num-1)
    }
  }
};
export default MyPlugin;
