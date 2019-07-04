<template>
  <div class="header clear">
    <div class="title lf">昆山情报大数据工作平台</div>
    <div class="sub-title lf">昆山市局指挥中心情报信息中心，用户 &nbsp;&nbsp;<span >{{userName}}</span>，欢迎你！单位&nbsp;&nbsp;<span >{{unit}}</span>&nbsp;&nbsp;警号&nbsp;&nbsp;<span>{{policeno}}</span></div>

    <ul class="header-tabs rt">
      <li class="time" ref="time">周四 08：46</li>
      <li>
        <a href="#" class="search" @click="openSearch"></a>
      </li>
      <li>
        <a href="#" class="notice" @click="toggleNotice"></a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data:() =>{
      return {
        userName:netintech.Storage.get('config').userName,
        policeno:netintech.Storage.get('config').policeno,
        unit:netintech.Storage.get('config').unit,
        showInfo:true
      }
    },
    mounted: function () {
      var duration = 1000
      var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      var _this = this

      /**
       * 实现时间实时更新
       */
      function refreTime() {
        var nowDate = new Date()
        var w = nowDate.getDay()
        var mi = nowDate.getMinutes()
        mi = mi < 10 ? ('0' + mi) : mi
        var h = nowDate.getHours()
        h = h < 10 ? ('0' + h) : h
        var s = nowDate.getSeconds()
        s = s < 10 ? ('0' + s) : s
        if (s === '00' || s === 0) {
          clearInterval(timer)
          duration = 60000
          setInterval(refreTime, duration)
        }
        _this.$refs.time.innerHTML = weekArr[w] + ' ' + h + '：' + mi;

      }

      refreTime()
      var timer = setInterval(refreTime, duration)
    },
    methods: {
      /**
       * 打开或关闭右侧列表
       */
      toggleNotice: function () {
        this.$store.commit('toggleNotice')
      },
      openSearch: function () {
        /**
         * 打开搜索框
         */
        this.$store.commit('toggleSearch')
      },
    }
  }
</script>

<style>
  .header {
    background-color: rgba(0, 0, 0, 0.639);
    width: 100%;
    height: 48px;
    position: absolute;
    z-index: 99;
  }

  .title {
    font-size: 26px;
    padding-left: 28px;
    font-family: "FZY3JW";
    line-height: 42px;
    text-shadow: 1px 1.732px 2px rgba(0, 0, 0, 0.004);
  }

  .sub-title {
    margin-left: 16px;
    margin-top: 24px;
    color: rgba(255, 255, 255, 0.502);
  }

  /* 头部右侧功能按键 */

  .header-tabs {
    height: 48px;
    line-height: 48px;
  }

  .header-tabs > li {
    float: left;
    margin-right: 32px;
  }

  .header-tabs a {
    display: inline-block;
  }

  .notice {
    width: 22px;
    height: 18px;
    margin-top: 14px;
    background: url('../../../static/image/notice.png') no-repeat center center;
  }

  .search {
    width: 24px;
    height: 24px;
    margin-top: 13px;
    background: url('../../../static/image/search.png') no-repeat center center;
  }

  .time {
    font-size: 14px;
  }
  .sub-title span{
    color: #FFF;
  }


</style>
