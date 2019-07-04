<template>
  <div class="desktop-icon">
    <a :target="isTarget(iconData.url)">
      <div :class="{animation1:showDelApp}">
        <img :src="iconData.iconUrl" @click="backurl(iconData.isOpen,iconData)"/>
        <div class="I101_img" v-if="showDel(iconData.isOpen)" @click="delApp(iconData)"></div>
      </div>
      <span class="desktop-icon-name" v-if="iconData.name!='' && iconData.isOpen != '2' && iconData.isOpen != '3'">{{iconData.name}}</span>
      <span class="desktop-icon-name" v-if="iconData.name!='' && (iconData.isOpen == '2' || iconData.isOpen == '3')" style="color: #000;">{{iconData.name}}</span>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['iconData'],
    computed:{
      showDelApp () {
        return this.$store.state.IndexShow.showDelApp
      }
    },
    methods:{
      isTarget(url){
        if(url){
          return "_blank"
        }else{
          return ""
        }
      },
      backurl(isOpen,iconData){
        switch (isOpen){
          case '0':
            if(iconData.url){

              if(!this.$store.state.IndexShow.showDelApp){
                let pid = netintech.Storage.get("pId");
                window.open(iconData.url+"?username="+netintech.BASE64.decode(pid),"_blank")
              }else{
                netintech.msg("如需要跳转到【"+iconData.name+"】,请先点击保存")
              }
            }
            break;
          case '1':
            this.$store.commit('closeAll');
            this.$store.commit('showAddApp1');
            break;
          case '2':
            this.$store.commit('deleteApp',iconData);
            this.$store.commit('addItem',iconData);
            this.$store.commit('saveApp');
            this.$store.commit('confirmButtonOpen');
            break;
          case '3':
            if(iconData.url){
              if(!this.$store.state.IndexShow.showDelApp){
                let pid = netintech.Storage.get("pId");
                window.open(iconData.url+"?username="+netintech.BASE64.decode(pid),"_blank")
              }else{
                netintech.msg("如需要跳转到【"+iconData.name+"】,请先点击保存")
              }
            }
            break;
          case '5':
            if(iconData.url){
              if(!this.$store.state.IndexShow.showDelApp){
                let pid = netintech.Storage.get("pId");
                window.open(iconData.url+"?username="+netintech.BASE64.decode(pid),"_blank")
              }else{
                netintech.msg("如需要跳转到【"+iconData.name+"】,请先点击保存")
              }
            }
            break;
            default:
            return ''
        }
      },
      showDel(isOpen){
        let show = false;
        if( this.$store.state.IndexShow.showDelApp && isOpen == '5'){
          show = true;
        }
        return show;
      },
      delApp(iconData){
        let _this=this;
        netintech.confirm("确定是否删除","确认","取消",function(index){
          _this.$store.commit('delItem',iconData);
          _this.$store.commit('addAppList',iconData);
          _this.$store.commit('saveApp');
          layer.closeAll();
          console.log(index);
        },function(index){
          console.log(index);
        });
      }
    }
  }
</script>

<style>
  .menu-icon-wrap .desktop-icon {
    margin-top: 26px;
  }

  .desktop-icon {
    position: relative;
    text-align: center;
    width: 92px;
  }

  .desktop-icon img {
    border-radius: 8px;
    box-shadow: 0.5px 0.866px 0px 0px rgba(0, 0, 0, 0.28);
    width: 60px;
    height: 60px;
  }

  .desktop-icon-name {
    display: block;
    font-size: 14px;
    width: 92px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto;
    text-align: center;
  }

  .menu-icon-wrap .desktop-icon-name {
    margin-top: 10px;
  }

  .I101_img {
    position: absolute;
    right: 13px;
    content: "";
    display: inline-block;
    top: -8px;
    right: 8px;
    background: url(../../../static/image/closeApp.png)no-repeat right bottom;
    width: 22px;
    height: 22px;
  }




</style>
