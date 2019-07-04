<template>
  <div class="B1Z_AddCoat">
    <div class="B1ZA_Tittle">
      <i></i>
      <div>添加应用</div>
      <span class="clearFix" @click="hideAddApp()"></span>

    </div>

    <div class="B1Z_Content">
      <div class="B1Z_Paging">
        <p class="B1ZP_Btn1" @click="showSTXT()">本地应用</p>
        <p class="B1ZP_Btn2" @click="showSZPT()">苏州平台</p>
        <p class="B1ZP_Btn3" @click="showBDYY()">省厅系统</p>
      </div>

      <ul class="B1ZC_Package2" :class="{addAPPHide:!showCard.BDYY}">
        <div class="B1ZCP_div"  v-for="(item,index) in iconArr_STXT" >
          <icon :iconData="item" :key="index" ></icon>
        </div>
      </ul>
      <ul class="B1ZC_Package4" :class="{addAPPHide:!showCard.SZPT}">
        <div class="B1ZCP_div"  v-for="(item,index) in iconArr_SZPT">
          <icon :iconData="item" :key="index"></icon>
        </div>

      </ul>
      <ul class="B1ZC_Package3" :class="{addAPPHide:!showCard.STXT}">
        <div class="B1ZCP_div"  v-for="(item,index) in iconArr_BDYY">
          <icon :iconData="item" :key="index"></icon>
        </div>
      </ul>
    </div>

  </div>
</template>

<script>
  import icon from './icon.vue'
  export default {
    data:function(){
      return {
        showCard:{
          STXT:true,
          SZPT:false,
          BDYY:false
        }
      }
    },
    mounted() {
      $(".B1Z_Paging p").eq(0).addClass("B1Z_Paging1");
      $(".B1Z_Paging p").click(function(){
        $(this).addClass("B1Z_Paging1").siblings().removeClass("B1Z_Paging1");
      });
    },
    components:{
      icon
    },
    methods:{
      showSTXT(){
        this.showCard.STXT = true;
        this.showCard.SZPT = false;
        this.showCard.BDYY = false;
      },
      showSZPT(){
        this.showCard.STXT = false;
        this.showCard.SZPT = true;
        this.showCard.BDYY = false;
      },
      showBDYY(){
        this.showCard.STXT = false;
        this.showCard.SZPT = false;
        this.showCard.BDYY = true;
      },
      hideAddApp() {
        this.$store.commit('showAddApp1')
      }
    },
    computed: {
      iconArr_STXT: function () {
        return this.$store.state.addIcon.addArr_STXT
      },
      iconArr_SZPT: function () {
        return this.$store.state.addIcon.addArr_SZTP
      },
      iconArr_BDYY: function () {
        return this.$store.state.addIcon.addArr_BDYY
      }
    }
  }
</script>
<style>
  .addAPPHide{ display: none;}
  .B1Z_AddCoat{
    position: absolute;
    left: 30%;
    top: 30%;
    width:616px;
    height: 368px;

  }
  @media all and (max-width: 1440px) {
    .B1Z_AddCoat{
      width: 640px;
      position: absolute;
      left: 21%;
      top: 30%;
    }
  }
  .B1ZA_Tittle{
    padding:8px  14px  ;
    background: rgba(255,255,255,0.51);
    border-radius: 8px 8px 0 0;
  }
  .B1Z_Content{
    background: rgba(255,255,255,0.89);
    /*background: rgba(173,185,207,.34);*/
  }
  /*弹窗图标*/
  .B1ZA_Tittle i{
    width: 30px;
    height: 30px;
    background-image: url(../../../static/image/B1_Yingyong.png);
    float: left;
  }
  .B1Z_AddCoat i{
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .B1ZA_Tittle div{
    color: #000;
    margin-left: 20px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
  }
  .B1ZA_Tittle span{
    width: 30px;
    height: 30px;
    display: block;
    background-image: url(../../../static/image/B1_Close.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
    cursor: pointer;
  }
  .B1Z_Content{
    padding-top: 3px;
    padding-bottom: 40px;
    text-align: center  ;
    /*background: rgba(175,189,213,.65);*/
    background: rgba(255,255,255,.8);
    border-radius: 0 0 8px 8px;
    height: 80%;
  }
  /*分页*/
  .B1Z_Paging{
    width: 412px;
    margin:0 auto       ;
    border-radius: 12px;
    font-size: 0;
    color: #000;
  }
  .B1Z_Paging p{

    display: inline-block;
    padding: 12px 33px ;
    font-size: 16px ;
    font-weight: bold;
    cursor: pointer;
  }
  .B1ZP_Btn1{
    padding-left: 37px;
    border-radius: 10px 0 0 10px;
    background-color: rgba(198,198,198,.8);
  }
  .B1ZP_Btn2{
    border-right:1px solid #d9e5f0;
    border-left:1px solid #d9e5f0;
    background-color: rgba(198,198,198,.6);
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;

  }
  .B1ZP_Btn3{
    padding-right: 37px;
    border-radius: 0 10px 10px 0 ;
    background-color: rgba(198,198,198,.6);
  }
  /*内容按钮*/
  .B1Z_Content li{
    margin:30px  10px 10px 30px ;
    display: inline-block;
  }
  .B1ZC_Package a {
    width: 96px;
  }
  .B1ZC_Package i{
    width: 60px;
    height: 60px;
    background-image: url(../../../static/image/B1_PapperFile.png );
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }

  .B1Z_Paging1{
    background-color: #008aff;
    color: #fff;
  }
  .B1ZC_Package4{ height: 242px; overflow: auto;}
  .B1ZC_Package2{ height: 242px; overflow: auto;}
  .B1ZC_Package3{ height: 242px; overflow: auto;}
  .B1ZCP_div{ float: left; margin: 10px;}
  .B1ZC_Package1{ height: 90%; margin-left: 3%; width: 97%; overflow: auto; margin-top: 3%;}
  .B1ZC_Package1::-webkit-scrollbar-track{ width: 10px; background-color: RGBA(0,0,0,0.5); border-radius: 10px;}
  .B1ZC_Package1::-webkit-scrollbar{ width: 10px; background-color: RGBA(255,255,255,0.6); border-radius: 10px;}
  .B1ZC_Package1::-webkit-scrollbar-thumb{ width: 10px; background-color: RGBA(255,255,255,0.6); border-radius: 10px;}
</style>
