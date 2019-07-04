<template>
  <div id="app" class="wrap">
    <desk-header></desk-header>
    <notice></notice>
    <search></search>
    <background></background>
    <menu-wrap></menu-wrap>
    <desk-wrap></desk-wrap>

    <indexAddDialog :class="{indexAddAppHide:!showAddApp}"></indexAddDialog>
    <changePW :class="{indexAddAppHide:!showPassWrod}"></changePW>
    <inform :class="{indexAddAppHide:!showinform}"></inform>
    <searchDeatil class="indexSearch" :class="{indexSearchAppHide:!showSearch}"></searchDeatil>
    <calendar :class="{indexAddAppHide:!showRili}"></calendar>
    <eventAdd :class="{indexAddAppHide:!showRiliAdd}"></eventAdd>
    <calendarDetail :class="{indexAddAppHide:!showRiliDetail}"></calendarDetail>
    <setting :class="{indexAddAppHide:!showSetting}"></setting>
    <closeAppDel :class="{indexAddAppHide:!showshowDelButton}"></closeAppDel>
    <tztgList :class="{indexAddAppHide:!showTztgList}"></tztgList>
    <editRili :class="{indexAddAppHide:!showriliEdit}"></editRili>
    <confirmApp :class="{indexAddAppHide:!confirmButton}"></confirmApp>
  </div>

</template>

<script>
  import deskHeader from './header'
  import notice from '../notice/notice'
  import search from './search'
  import background from './background'
  import menuWrap from './menuIcon.vue'
  import deskWrap from './deskIcon'
//  import store from "../../vuex/store"
  import indexAddDialog from './indexAddDialog.vue'
  import changePW from './changePassWord.vue'
  import inform from './inform.vue'
  import searchDeatil from './searchDetail.vue'
  import calendar from './calendar.vue'
  import eventAdd from './event_add.vue'
  import calendarDetail from './calendarDetail.vue'
  import setting from './setting.vue'
  import closeAppDel from './CloseAppDel.vue'
  import tztgList from './tztgList.vue'
  import editRili from './editRili.vue'
  import confirmApp from './confirm.vue'

  export default {
    name: 'app',
    components: {
      deskHeader,
      notice,
      search,
      background,
      menuWrap,
      deskWrap,
      indexAddDialog,
      changePW,
      inform,
      searchDeatil,
      calendar,
      eventAdd,
      calendarDetail,
      setting,
      closeAppDel,
      tztgList,
      editRili,
      confirmApp
    },
    mounted: function(){
      this.$store.commit('indexInit')
    },
    methods:{

    },
    computed:{
      showAddApp () {
        return this.$store.state.IndexShow.showAddApp
      },
      showPassWrod(){
        return this.$store.state.IndexShow.showPassWrod
      },
      showinform(){
        return this.$store.state.IndexShow.showInform
      },
      showSearch(){
        return this.$store.state.IndexShow.showSearch
      },
      showRili(){
        return this.$store.state.IndexShow.showrili
      },
      showRiliAdd(){
        return this.$store.state.IndexShow.showriliAdd
      },
      showRiliDetail(){
        return this.$store.state.IndexShow.showriliDetail
      },
      showSetting(){
        return this.$store.state.IndexShow.showSetting
      },
      showshowDelButton(){
        return this.$store.state.IndexShow.showDelButton
      },
      showTztgList(){
        return this.$store.state.IndexShow.showTztgList
      },
      showriliEdit(){
        return this.$store.state.IndexShow.showriliEdit
      },
      confirmButton(){
        return this.$store.state.IndexShow.confirmButton
      }
    }
  }
  /**
   * 初始化,当token为空时不可进入此页面
   */

</script>

<style>
  #app {

  }
  .indexAddAppHide{
    display: none;
  }
  .indexSearch{ height: 612px; transition: all 1s; overflow: hidden;}
  .indexSearchAppHide{
    height: 0;
  }
</style>
