<template>
  <div class="B9Z_AddCoat">

    <div class="B1ZA_Tittle B9ZA_Tittle" style="background-color: RGBA(255,255,255,0.6)">
      <i></i>
      <div>应用</div>
      <span class="clearFix" @click="openSearchDetail()"></span>
    </div>
    <div class="B9Z_Content">

      <ul class="B1ZC_Package B2ZC_Scroll" style="background-color: RGBA(255,255,255,0)">

        <li class="B1ZC_FunctionButton2" v-for="(item,index) in showApplication">
          <icon :iconData="item" :key="index"></icon>
        </li>
      </ul>
    </div>
    <div class="B1ZA_Tittle B21ZA_Tittle2" style="background-color: RGBA(255,255,255,0.6)">
      <i></i>
      <div>通知通报</div>

    </div>
    <div class=" B9Z_Content2 ">
      <ul>
        <li class="B2ZC_List1 Ellipsis" v-for="(item,index) in showNews" @click="showDetail(item.id)">{{ item .title}}</li>

      </ul>
    </div>

  </div>
</template>

<script>
  import icon from './icon.vue'
  export default {
    computed:{
      showApplication(){
        return this.$store.state.Search.application
      },
      showNews(){
        return this.$store.state.Search.news
      }
    },
    components:{
      icon
    },
    methods: {
      openSearchDetail(){
        this.$store.commit('showSearchClose1')
      },
      showDetail(id){
        netintech.ajaxCore.ajax(config.getNoticeById,{id:id},"POST",{
          Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
        }).done((res) => {
          this.$store.commit('changeDetail',res.result)
          this.$store.commit('showSearchClose1')
          this.$store.commit('showInformOpen1')
        });
      }
    }
  }
</script>

<style>
  *::-webkit-scrollbar-track{ width: 8px; background-color: RGBA(0,0,0,0.5); border-radius: 10px;}
  *::-webkit-scrollbar{ width: 8px; background-color: RGBA(255,255,255,0.6); border-radius: 10px;}
  *::-webkit-scrollbar-thumb{ width: 10px; background-color: RGBA(255,255,255,0.6); border-radius: 10px;}
  .cuPo{
    cursor: pointer;
  }
  .B9Z_AddCoat{
    width: 640px;
    position: absolute;
    left: 32%;
    top: 22%;
  }
  @media all and (max-width: 1440px) {
    .B9Z_AddCoat{
      width: 640px;
      position: absolute;
      left: 23%;
      top: 15%;
    }
  }
  .B9Z_AddCoat i{
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .B9ZA_Tittle{
    width: 640px;
    background-color: rgba(114,121,146,.64);
  }
  .B9Z_Content{
    width: 640px;
    padding-bottom: 0;
    border-radius: 0;
    height: 237px;
    background-color: RGBA(255,255,255,0.89);

    padding-top: 3px;
    padding-bottom: 40px;
    /*text-align: center;*/

    background: rgba(255,255,255,.89);
    border-radius: 0 0 8px 8px;
  }
  .B2ZA_Tittle2{
    border-radius: 0;
    width: 640px;
    background-color: rgba(114,121,146,.64);
  }
  .B9Z_Content2{
    width: 640px;
    height: 280px;
    overflow: auto;
    border-radius: 0 0 10px 10px    ;
    text-align: center;
    background: rgba(255,255,255,.89);
    padding: 0 45px ;
  }
  .B9Z_Content2 li{
    width: 560px;
    padding: 20px 0 ;
    color: #000000;
    text-align: left;
    border-top: 1px solid rgba(102,165,212,.65)   ;
    cursor: pointer;
  }
  .B9Z_Content2 li:nth-child(1){
    border-top:none;
  }
  .B21ZA_Tittle2 {
    border-radius: 0;
    width: 640px;
    background-color: rgba(114,121,146,.64);
  }
  .B1ZC_Package.B2ZC_Scroll{
    padding-left: 44px;
  }
  .B1ZC_Package.B2ZC_Scroll li{
    display: inline-block;
  }
</style>
