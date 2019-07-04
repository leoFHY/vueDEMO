<template>
  <div class="B25Z_AddCoat ">
    <div class="B1ZA_Tittle  B3ZA_Tittle">
      <i></i>
      <div style="font-size: 16px">通知通告</div>
      <span class="clearFix" @click="closeInform()"></span>

    </div>
    <div class="B1Z_Content B3Z_Content">
      <div class="B3A_Tittle">
        <h1>{{showDate.title}}</h1>
        <p class="B3AT_Jiange">
          <span>{{showDate.addtime}}</span>
          <span>发布者：{{showDate.writer}}</span>
        </p>
      </div>
      <div class="B3A_Content">
        <p v-html="showDate.content">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    computed:{
      showDate(){
        return this.$store.state.informItem.detialItem
      }
    },
    methods:{
      closeInform(){
        this.$store.commit('showInformClose1')
      }
    }
  }
</script>

<style>

  .B25Z_AddCoat{
    width: 660px;
    position: absolute;
    left: 25%;
    top: 15%;
  }
  @media all and (max-width: 1440px) {
    .B25Z_AddCoat{
      width: 660px;
      position: absolute;
      left: 20%;
      top: 15%;
    }
  }
  .B25Z_AddCoat i{
    background-repeat: no-repeat;
    background-position: center;
  }

  .B25ZA_Tittle2 i{
    background-image: url("../../../static/image/B1_Lingdang.png");
  }
  /*通知通报栏字体*/
  .B2Z_Content2 li{
    width: 600px;
    padding: 20px 0 ;
    color: #fff;
    text-align: left;
    border-top: 1px solid rgba(102,165,212,.65)   ;
    cursor: pointer;
  }
  .B2Z_Content2 li:nth-child(1){
    border-top:none;
  }
  .B3A_Tittle{
    padding-bottom: 20px;
    color: #000;
  }
  .B3A_Tittle h1 {
    font-weight: normal;
    margin: 30px 0 26px;
  }
  .B3AT_Jiange span:nth-child(1),
  .B3AT_Jiange span:nth-child(2)
  {
    margin-right: 20px;
  }
  .B3A_Tittle{
    border-bottom: 1px dashed #7a8391;
  }
  .B3A_Content{ max-height: 400px; overflow: auto; color: #000;}
  .B3A_Content::-webkit-scrollbar-track{ width: 10px; background-color: RGBA(0,0,0,0.5); border-radius: 10px;}
  .B3A_Content::-webkit-scrollbar{ width: 10px; background-color: RGBA(255,255,255,0.6); border-radius: 10px;}
  .B3A_Content::-webkit-scrollbar-thumb{ width: 10px; background-color: RGBA(255,255,255,0.6); border-radius: 10px;}

  .B3A_Content p{
    padding:15px 0;
    text-indent: 32px;
    line-height: 40px;
    word-spacing:4px;
    text-align:left;
  }
  .B3Z_Content{

    padding-left: 40px;
    padding-right: 40px;
  }
  .B3Z_Content i{
    display: inline-block;
    width: 380px;
    height: 277px;
    background-image: url(../../../static/image/641.png);
    background-size: 100% 100%;
    background-repeat:no-repeat;
  }
</style>
