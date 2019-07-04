<template>
  <div class=" S2Z_AddCoat ">
    <div class="S2ZA_Tittle  ">
      <i></i>
      <div style="color:#000; font-size: 16px;">通知通报</div>
      <span class="clearFix" @click="closeTztg"></span>
    </div>


    <div class="S2Z_Content ClearFix">
      <div class="S2ZC_List  clearFix" style="min-height: 342px;">
        <ul>
          <li class="S2ZCL_Item " v-for="(item,index) in tztgList.ItemList">
            <a @click="showDetail(item.id)">{{item.title}}</a>
            <p>{{item.time}}</p>
          </li>
        </ul>

      </div>
      <div class="S2ZC_PageUp ClearFix">
        <p @click="pageTurn(-1,false)" style="cursor: pointer;">上一页</p>
        <em class="S2ZCP_Yeshu ">{{tztgList.pageSize}}/{{tztgList.allPage}}</em>
        <p @click="pageTurn(1,false)" style="cursor: pointer;">下一页</p>
        <em class="S2ZCP_Tiaozhuan"> 跳转到</em>
        <input type="number" class="S2ZCP_Input" v-model="page" @keyup.enter="pageTurn(page,true)">
        <em>页</em>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        page: this.$store.state.tztgList.pageSize
      }
    },
    computed: {
      tztgList () {
        return this.$store.state.tztgList;
      }
    },
    methods:{
      closeTztg(){
        this.$store.commit('showTztgList1')
      },
      showDetail(id){
        netintech.ajaxCore.ajax(config.getNoticeById,{id:id},"POST",{
          Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
        }).done((res) => {
          this.$store.commit('closeAll')
          this.$store.commit('changeDetail',res.result)
          this.$store.commit('showInformOpen1')
        });
      },
      pageTurn(num,isturn){
        let json = this.$store.state.tztgList;
        let page = json.pageSize;
        let pageEnd = json.allPage;
        let turnPage = -1;
        let isOk = false;
        if(isturn){
          if(Math.floor(num) == num){
            turnPage = num;
          }else{
            isOk = true;
            netintech.msg("请输入整数");
            this.page = page;
          }
        }else{
          turnPage = page + num;
        }
        if(turnPage > 0 && turnPage <= pageEnd && !isOk){
          json.pageSize= turnPage;
          this.$store.commit('changeItemList',turnPage);
        }else if(!isOk){
        }
      }
    }
  }
</script>

<style>
  .clearFix:after{
    content: '';
    display:block;
    clear: both;
  }
  .S2Z_AddCoat{
    width: 750px;
    position: absolute;
    left: 25%;
    top: 15%;
  }
  @media all and (max-width: 1440px) {
    .S2Z_AddCoat{
      width: 750px;
      position: absolute;
      left: 18%;
      top: 15%;
    }
  }
  .S2ZA_Tittle{
    padding: 7px 14px;
    background: rgba(255,255,255,0.51);
    border-radius: 8px 8px 0 0;
  }
  .S2ZA_Tittle i{
    width: 18px;
    height: 22px;
    background-image: url(../../../static/image/B1_Lingdang.png);
    float: left;
  }
  .S2ZA_Tittle div{
    height: 30px;
    color: #eaecf0;
    margin-left: 12px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
  }

  .S2Z_AddCoat i {
    margin-top: 4px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .S2ZA_Tittle span {
    width: 27px;
    height: 27px;
    display: block;
    background-image: url(../../../static/image/B1_Close.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor:pointer;
    float: right;
  }
  /*通知通报页*/

  .S2A_Tittle{
    border-bottom: 1px dashed #7a8391;
    padding-bottom: 20px;
  }
  .S2A_Tittle h1 {
    font-weight: normal;
    margin: 30px 0 26px;
  }
  .S2AT_Jiange span:nth-child(1),
  .S2AT_Jiange span:nth-child(2)
  {
    margin-right: 20px;
  }

  .S2A_Content p{
    padding:15px 0;
    text-indent: 32px;
    line-height: 40px;
    word-spacing:4px;
    text-align:left;
  }
  .S2Z_Content{
    padding-top: 20px;
    padding-bottom: 50px;
    padding-left: 40px;
    padding-right: 40px;

    background: rgba(255,255,255,.89);
    border-radius: 0 0 8px 8px;

  }
  .S2Z_Content i{
    display: inline-block;
    width: 380px;
    height: 277px;
    background-image: url(../../../static/image/641.png);
    background-size: 100% 100%;
    background-repeat:no-repeat;
  }

  .S2ZC_List li{
    width: 640px;
    padding: 18px 21px 11px 10px;
    border-bottom:1px solid rgba(0,0,0,0.15);

  }
  .S2ZC_List li:last-child{
    border-bottom: none;
  }
  .S2ZC_List li:after{
    content: '';
    display:block;
    clear: both;
  }
  .S2ZC_List li>a{
    width: 520px;
    display: block;
    float: left;
    color: #000;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .S2ZC_List li>p{
    font-size: 14px;
    color: #000;
    float: right;
  }
  .S2ZC_PageUp{
    width: 450px;
    height: 24px;
    padding-top: 26px;
    font-size: 14px;
    margin:0 auto   ;

  }
  .S2ZC_PageUp p{
    padding: 3px 5px;
    color: rgba(0,0,0,0.55);
    border:1px solid rgba(0,0,0,0.45)  ;
    border-radius: 2px;
    float: left;
  }
  .S2ZC_PageUp em{
    height: 28px;
    line-height: 28px;
    color: rgba(0,0,0,0.55);
    display: block;
    font-style:normal;
    float: left;
  }
  .S2ZCP_Input{
    width: 58px;
    height: 24px;
    color: rgba(0,0,0,0.5);
    text-indent: 40%;
    margin-right: 16px;
    border:1px solid rgba(0,0,0,0.45);
    border-radius: 2px;
    background-color: transparent;
    float: left;
  }
  .S2ZCP_Yeshu{
    padding:0 28px;
  }
  .S2ZCP_Tiaozhuan{
    padding: 0 20px ;
  }
</style>
