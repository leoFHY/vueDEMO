<template>
  <div class="item" :class="{show:showItem}">
    <div class="item-divider">
							<span class="divider-icon">
								<img src="../../../static/image/shujuzonglan.png"/>
							</span>
      <span class="divider-title" style="color: #000;">数据总览</span>
    </div>
    <ul class="item-list">
      <li class="item-detile" :style="{'background':'url('+underlinpic+') no-repeat bottom center'}">
        <img src="../../../static/image/online-person.png" class="data-icon"/>
        <span class="data-name">在线人数</span>
        <span class="data-count">{{onLine}}</span>
      </li>
      <li class="item-detile" :style="{'background':'url('+underlinpic+') no-repeat bottom center'}">
        <img src="../../../static/image/today-count.png" class="data-icon"/>
        <span class="data-name">今日浏览</span>
        <span class="data-count">{{today1}}</span>
      </li>
      <li class="item-detile">
        <img src="../../../static/image/total-count.png" class="data-icon"/>
        <span class="data-name">总浏览数</span>
        <span class="data-count">{{allNum}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['showItem'],
    computed: {
      underlinpic () {
        return this.$store.state.QbdsjNotice.underlinpic
      },
      onLine(){
        return this.$store.state.dataPandect.currentCount;
      },
      today1(){
        return this.$store.state.dataPandect.todayCount;
      },
      allNum(){
        return this.$store.state.dataPandect.allCount;
      }
    }
  }
</script>

<style>

</style>
