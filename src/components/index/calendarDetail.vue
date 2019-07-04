<template>
  <div class=" B6Z_AddCoat"   >

    <!--弹窗标题-->
    <div class=" B6_Tittle ">
      <i></i>
      <div>事件详情</div>
      <span class="clearFix" id="B6_Cancel" @click="closecalendarDetail()"></span>
    </div>

    <!--弹窗内容-->
    <div class="B6Z_Content" >
      <!--弹窗上方按钮-->
      <div class="B6ZA_Zenshan clearFix   ">
        <a class="B6ZAZ_Add1" @click="delCalendarDetail(calendarDetail.id)"></a>
        <a  class="B6ZAZ_Add2" id="B6_Edit" @click="OoenRiliEdit()"></a>
      </div>
      <div class="B6ZC_List" style="background-color: RGBA(255,255,255,0.89)">
        <!--段落-->
        <div class="B6ZCL_Items">
          <div class="B6ZCLI_Title" :title="calendarDetail.title">{{calendarDetail.title}}</div>
          <div class="B6ZCLI_Paragraph B6ZCLI_Border" :title="calendarDetail.content">{{calendarDetail.content}}</div>
          <div class="B6ZCLI_TimeCoat">时间</div>
          <p class="B6ZCLI_Date">{{calendarDetail.strSchTime}}  {{calendarDetail.starttime}}</p>
        </div>
      </div>
      <!--按钮-->
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    computed: {
      calendarDetail() {
        return this.$store.state.riliDetail.listItem
      }
    },
    methods:{
      closecalendarDetail(){
        this.$store.commit('closeAll');
      },
      OoenRiliEdit(){
        this.$store.commit('closeAll');
        this.$store.commit('showriliEditOpen');
      },
      showtime(strtime){
        let sTime = moment.unix(strtime)
        return sTime;
      },
      delCalendarDetail(id){
        let $this = this;
        netintech.confirm("确认删除?","确认","取消",function(){
          netintech.ajaxCore.ajax(config.deleteSchedule,{id:id},"POST",{
            Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
          }).done((res) => {
            if(res.status == 10001){
              $this.$store.commit('closeAll');
              $this.$store.commit('refreshRiliDate');
              $this.$store.commit('refreshRiliList');
              netintech.msg("操作成功");
            }
          });
        },function(){});

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
  .Ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .B6_Zhuomian{

    height: 900px;
    background-image: url(../../../static/image/B1_beijin.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .B6_Tittle{
    padding: 8px 14px;
    background: rgba(255,255,255,0.51);
    border-radius: 8px 8px 0 0;
  }
  .B6_Tittle div {
    color: #000;
    margin-left: 20px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
  }
  .B6_Tittle span{
    width: 30px;
    height: 30px;
    display: block;
    background-image: url(../../../static/image/B1_Close.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
  }


  .B6_Tittle i{
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../../static/image/rili.png);
    float: left;
  }

  .B6ZC_List div {

    border-bottom: 1px solid #c1cede;
    padding-left: 80px;
  }
  .B6ZC_List span {
    display: inline-block;
    width: 130px;
    margin-left: -73px;
    text-align: left;
  }

  /*事件详情*/

  .B6ZA_Zenshan{

  }
  .B6ZA_Zenshan  a{
    display: inline-block;
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .B6ZAZ_Add1{
    background-image: url(../../../static/image/delete.png);
  }
  .B6ZAZ_Add2{
    background-image: url(../../../static/image/edit.png);
  }
  .B6ZC_List{
    padding: 0 20px 25px;
    border-radius: 8px;
    background-color: rgba(255,255,255,.89);
    color: #000;
    text-align: left;
  }
  .B6ZC_List div{
    padding: 10px 0  11px;
  }

  .B6ZCLI_Title{
    font-size: 18px;
    font-weight:bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .B6ZCL_Items {
    font-size: 14px;
  }

  .B6ZCLI_Border{
    border-bottom: 1px dashed #95b0c8;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .B6ZCLI_TimeCoat{
    color: #6e7176;
    border-bottom: none !important;
  }
  .B6Z_AddCoat{
    width: 420px;
    left: 38%;
    top: 26%;
    position: absolute;
  }

  .B6Z_Content{
    padding: 20px 15px 40px;
    text-align: center;
    background: rgba(175,189,213,.3);
    border-radius: 0 0 8px 8px;
    padding-bottom: 20px;
  }
  .B6ZC_Button {
    width: 100px;
    height: 40px;
    background-color: #f5932a;
    line-height: 40px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 2px;
  }
</style>
