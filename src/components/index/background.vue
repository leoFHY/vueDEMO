<template>
  <div class="bg" ref="bg">
    <img :src="showBack" class="bg_img" alt="">
    <div class="bg-btn-wrap">
      <a class="prev-bar menu-btm-bar " href="#" @click.prevent="beforeBg()"></a>
      <a class="next-bar menu-btm-bar " href="#" @click.prevent="afterBg()"></a>
    </div>
  </div>
</template>

<script>
  import backgroundPic from '../../../static/image/bgtest.png'

  export default {
    data(){
      return{
        background:backgroundPic
      }
    },
    computed: {
      bgArr: function () {
        return this.$store.state.Background.bgImgArr
      },
      showBg: function () {
        return this.$store.state.Background.showBgIdx
      },
      showBack(){//显示背景图片
        return this.$store.state.Background.currentBg
      }
    },
    methods: {
      /**
       * 按钮向前
       */
      beforeBg(){
        let index = this.$store.state.Background.showBgIdx;
        if(index > 0){
          this.$store.commit('setCurrentBg',-1)
        }
      },
      /**
       * 按钮向后
       */
      afterBg(){
        let index = this.$store.state.Background.showBgIdx;
        let length = this.$store.state.Background.bgImgArr.length;
        if(index < length-1){
          this.$store.commit('setCurrentBg',1)
        }
      }
    }
  }
</script>

<style>
  .bg {
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
  }

  .bg-btn-wrap {
    position: absolute;
    bottom: 0;
  }
  .bg_img{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
  }
  .menu-btm-bar {
    width: 17px;
    height: 16px;
    margin: 15px 13px;
    display: inline-block;
  }

  .menu-btm-bar.unuse {
    opacity: 0.7;
  }

  .prev-bar {
    background: url('../../../static/image/prev-btm-bar.png') no-repeat center center;
  }

  .next-bar {
    background: url('../../../static/image/next-btm-bar.png') no-repeat center center;
  }
</style>
