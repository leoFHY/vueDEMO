<template>
  <div class="notice-mask" :class="{hide:!showNotice}">
    <div class="drag-wrap" id="dragWrap" >
      <!--<div id="test" style="min-height: 92%;">-->
      <tongzhihaibao :showItem="showItem"></tongzhihaibao>
      <rili :showItem="showItem"></rili>
      <shujuzonglan :showItem="showItem"></shujuzonglan>
      <div class="loader" ref="loader">
        <div class="loader-inner line-scale-pulse-out">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <!-- 用来滚动到底层 -->
      <div id="nullBottom" style="height:0px; overflow:hidden" ref="nullBottom"></div>
    </div>
  </div>

</template>

<script>
  import tongzhihaibao from './tongzhihaibao'
  import rili from './rili'
  import shujuzonglan from './shujuzonglan'

  export default {
    computed: {
      underlinpic () {
        return this.$store.state.QbdsjNotice.underlinpic
      },
      showNotice () {
        return this.$store.state.QbdsjNotice.showNotice
      },
      showItem () {
        return this.$store.state.QbdsjNotice.showItem
      }
    },
    mounted: function () {
      this.$store.commit('changeShowItem')
    },
    components: {
      tongzhihaibao,
      rili,
      shujuzonglan
    },
    methods: {
      /**
       * 上拉加载执行函数
       * @param e
       */
      loadMore: function (e) {
        var startY = 0, prevY = 0, nowY = 0, _this = this
        var $dragWrap = _this.$refs.dragwrap

        /**
         * 获取加载数据函数
         */
        function loadmore () {
//          var newItem = '<div class="item">\n\t<div class="item-divider">\n\t\t<span class="divider-icon">\n\t\t\t<img src="./static/image/haibao.png"/>\n\t\t</span>\n\t\t<span class="divider-title">通知海报</span>\n\t</div>\n\t<ul class="item-list">\n\t\t<li class="item-detile">\n\t\t\t<a href="#">\n\t\t\t\t<i></i>\n\t\t\t\t<span>有责敢担当 出力又出彩 </span>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class="item-detile">\n\t\t\t<a href="#">\n\t\t\t\t<i></i>\n\t\t\t\t<span>有责敢担当 出力又出彩 </span>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class="item-detile">\n\t\t\t<a href="#">\n\t\t\t\t<span>张浦建立全省首家区镇综治联动...</span>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class="item-detile">\n\t\t\t<a href="#">\n\t\t\t\t<span>张浦建立全省首家区镇综治联的... </span>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class="item-detile">\n\t\t\t<a href="#">\n\t\t\t\t<span>张浦建立全省首家区镇综治联的... </span>\n\t\t\t</a>\n\t\t</li>\n\t</ul>\n</div>'
//          // $dragWrap.insertBefore(newItem, _this.$refs.loadmore)
//          $(_this.$refs.loadmore).before(newItem)
//          _this.$refs.loadmore.previousElementSibling.className += ' show'
//          $($dragWrap).animate({
//            scrollTop: _this.$refs.nullBottom.offsetTop
//          }, 1500)
//
//          _this.$refs.loader.style.opacity = 0
//          _this.$refs.loader.style.height = 0
//          _this.$refs.loadmore.style.marginTop = '166px'
        }

        /**
         * 加载动画 loadAnimation
         * @param chaY
         */
        function loadAmt (chaY) {
          $dragWrap.style.top = chaY * 10 < -100 ? -100 : chaY * 10
          if ($dragWrap.style.top !== '' || $dragWrap.style.top.slice(2) < -100) {
            $dragWrap.style.top = '-100px'
          }
          _this.$refs.loadmore.style.marginTop = '144px'
          _this.$refs.loader.style.opacity = 1
          _this.$refs.loader.style.height = '22px'
        }

        /**
         * 鼠标move时触发事件
         * @param e
         */
        function moveFun (e) {
          e.preventDefault()
          nowY = e.y
          var chaY = nowY - prevY
          if (chaY < 0) {
            prevY = e.y
            loadAmt(chaY)
          }
          prevY = e.y
        }

        /**
         * mouseup时触发函数
         * @param e
         */
        function upFun (e) {
          e.preventDefault()
          nowY = e.y
          var chaY = nowY - startY
          if (chaY <= -10) {
            setTimeout(loadmore, 2000)
          }
          $dragWrap.style.top = 0
          $dragWrap.removeEventListener('mousemove', moveFun)
          $dragWrap.removeEventListener('mouseup', upFun)
        }

        startY = e.y
        prevY = e.y
        e.target.addEventListener('mousemove', moveFun)
        $dragWrap.addEventListener('mouseup', upFun)
      }
    }
  }
</script>

<style>
  .notice-mask {
    padding-top: 48px;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    right: 0;
    top: 0;
    width: 312px;
    height: 100%;
    z-index: 10;
    transition: all .5s;
  }

  .notice-mask.hide {
    right: -312px;
  }

  .drag-wrap {
    position: absolute;
    width: 106%;
    height: 100%;
    top: 0px;
    overflow-y: scroll;
    transition: all .5s;
    padding-top: 48px;
    color: #000;
  }

  .item {
    border-radius: 8px;
    margin: 10px 8px 10px 13px;
    min-height: 30px;
    width: 291px;
    overflow: hidden;
    transition: all 0.5s;
    opacity: 0;
  }

  .item.show {
    opacity: 1;
  }

  .item-divider {
    /*background-color: rgba(0,0,0,0.18);*/
    background-color: rgba(204, 204, 204, 0.8);
    /*background-color: rgba(255, 255, 255, 0.51);*/
    width: 291px;
    height: 41px;
    line-height: 41px;
    padding: 0 15px;
  }

  .divider-title {
    font-size: 16px;
    margin-left: 8px;
    color: rgb(255, 255, 255);
    font-weight: bold;
  }

  .divider-icon {
    width: 25px;
    height: 21px;
    position: relative;
    top: 5px;
  }

  .item-list {
    padding: 15px 20px;
    background-image: linear-gradient(90deg, rgba(233, 233, 233, 0.7) 0%, rgba(255, 255, 255, 0.89) 100%);
    /*background-image: linear-gradient(90deg, rgba(203, 203, 203, 0.5) 0%, rgba(243, 243, 243, 0.5) 100%);*/
  }



  /*  */



  .item-time {
    display: inline-block;
    margin-right: 20px;
  }

  /* 数据总览 */

  .data-icon {
    position: absolute;
    left: 0;
    top: 32%;
  }

  .data-name {
    margin: 0 80px 0 20px;
  }

  .data-count {
    width: 40px;
  }

  /* 下拉加载 */

  .loadmore {
    /*background: url('../../../static/image/underline.png') no-repeat top center;*/
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.42);
    line-height: 3.214;
    /*position: absolute;*/
    width: 100%;
    bottom: 0;
    left: 0;
    margin-top: 166px;
    transition: all .3s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;

    /* 以下两个属性目前并未支持，写在这里为了减少风险 */
    -o-user-select: none;
    user-select: none;
  }

  .loadmore:hover {
    cursor: move;
  }

  /* 加载动画 */
  .loader {
    text-align: center;
    /*opacity: 0;*/
    height: 0;
    overflow: hidden;
    /*transition: ;*/
  }

  .line-scale-pulse-out > div {
    height: 15px;
  }
</style>
