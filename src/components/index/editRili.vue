<template>
  <div class=" B6Z_AddCoat"   >

    <!--弹窗标题-->
    <div class=" B6_Tittle ">
      <i></i>
      <div>事件详情</div>
      <span class="clearFix" id="B6_Cancel" @click="closeRiliAdd()"></span>
    </div>

    <!--弹窗内容-->
    <div class="B6Z_Content" >
      <!--弹窗上方按钮-->
      <div class="B6ZC_List" style="background-color: RGBA(255,255,255,0.89)">
        <!--段落-->
        <div class="B6ZCL_Items" style=" border-bottom: none;">
          <div class="B6ZCLI_Title">{{calendarDetail.title}}</div>
          <div class="B6ZCLI_Paragraph B6ZCLI_Border">{{calendarDetail.content}}</div>
          <div class="B5ZCL_Mima3 B5ZCL_Mima3" style=" padding-left: 80px;"><span>全天</span>    <input type="checkbox"  value="asddsasd" v-model="config.isAllDay">  </div>
          <div class="B5ZCL_Mima4" style=" padding-left: 80px;"><span>日期</span>     <input type="date"  value="2017-10-25" v-model="config.date1" :disabled="config.isAllDay">  <i class="dateicon"></i></div>
          <div class="B5ZCL_Mima5" style=" padding-left: 80px;"><span>时间</span>     <input type="time"  value="10：00     -     16:00" v-model="config.time1" :disabled="config.isAllDay">  </div>
        </div>
      </div>
      <!--按钮-->
      <a class="B5ZC_Button" @click="saveRiliAdd()">保存</a>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        config:{
          id:this.$store.state.riliDetail.listItem.id,
          title:this.$store.state.riliDetail.listItem.title,
          content:this.$store.state.riliDetail.listItem.content,
          isAllDay:false,
          date1:this.$store.state.riliDetail.listItem.schtime,
          time1:this.$store.state.riliDetail.listItem.starttime,
        }
      }
    },
    computed: {
      calendarDetail() {
        return this.$store.state.riliDetail.listItem
      }
    },
    methods:{
      closeRiliAdd(){
        this.$store.commit('showriliEditClose')
      },
      saveRiliAdd(){
        if(this.config.isAllDay == false ){
          if( this.config.time1 == '' && this.config.date1 !== ''){
            netintech.msg("请填写时间");
          }else if(this.config.time1 !== '' && this.config.date1 == ''){
            netintech.msg("请填写日期");
          }else if(this.config.time1 =='' || this.config.date1 ==''){
            netintech.msg("请填写完整");
          }
        }else{
          let _config = {};
          _config.id = this.$store.state.riliDetail.listItem.id;
          _config.title = this.$store.state.riliDetail.listItem.title;
          _config.content = this.$store.state.riliDetail.listItem.content;
          let timestamp = new Date(this.config.date1);
          let timestamp1 = timestamp.getTime();
          _config.schtime = timestamp1;
          if (this.config.isAllDay) {
            _config.isallday = 1;
            _config.starttime = "";
          } else {
            _config.starttime = this.config.time1;
            _config.isallday = 0;
          }
          netintech.ajaxCore.ajax(config.updateSchedule, _config, "POST", {
            Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
          }).done((res) => {
            if (res.status == 10001) {
              this.$store.commit('showriliEditClose');
              netintech.msg("修改成功");
              this.$store.commit('refreshRiliDate');
              this.$store.commit('refreshRiliList');
            }
          });
        }
      }
    }
  }
</script>

<style >
  .B6ZC_List span {
    display: inline-block;
    width: 130px;
    margin-left: -73px;
    text-align: left;
    color: #000;
    font-size: 16px;
  }
  .B6ZC_List input{
    background-color: transparent;
    border: none;
    width: 220px;
    height: 22px;
    margin-right: 57px;
    margin-left: -74px;
    vertical-align: middle;
  }
  .B5ZCL_Mima3,B5ZCL_Mima4,B5ZCL_Mima5 {
    padding: 20px 0 11px;
    border-bottom: 1px solid #c1cede;
    padding-left: 80px;
  }
  .B5ZCL_Mima3,B5ZCL_Mima4,B5ZCL_Mima5{

  }
  .B5ZCL_Mima3 input{
    width: 22px;
    height: 22px;
    margin-right: 261px;
    margin-left: -85px;
    vertical-align: middle;
  }

  .B5ZCL_Mima4 i{
    width: 25px;
    height: 25px;
    background-image: url(../../../static/image/rili2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    float: right;
    margin-right: 10px;
    cursor: pointer;

  }
  .B5ZCL_Mima4 .dateicon{
    position: relative;
    bottom:0;
    z-index: 1;
  }
  .B5ZCL_Mima4 input{
    margin-right: 18px;
  }
</style>
