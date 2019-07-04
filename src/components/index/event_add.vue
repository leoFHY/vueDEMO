<template>
  <div class="   B5Z_AddCoat">
    <!--弹窗标题-->
    <div class="B5_title">
      <i></i>
      <div>日程增加</div>
      <span class="clearFix" @click="closeRiliAdd()"></span>

    </div>
    <!--弹窗内容-->
    <div class=" B5Z_Content">
      <div class="B5ZC_List">
        <div class="B5ZCL_Mima1"><span>标题</span>     <input type="text"  value="asddsasd" v-model="config.title">  </div>
        <div class="B5ZCL_Mima2"><span>内容</span>     <input type="text"  value="asddsasd" v-model="config.content">  </div>
        <div class="B5ZCL_Mima3 B5ZCL_Mima3"><span>全天</span>    <input type="checkbox"  value="asddsasd" v-model="config.isAllDay">  </div>
        <div class="B5ZCL_Mima4"><span>日期</span>     <input type="date"  value="2017-10-25" v-model="config.date1" class="dateinput">  <i></i></div>
        <div class="B5ZCL_Mima5"><span>时间</span>     <input type="time"  value="10：00     -     16:00" v-model="config.time1" :disabled="config.isAllDay">  </div>
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
          title:"",
          content:"",
          isAllDay:false,
          date1:"",
          time1:"00:00"
        }
      }
    },
    methods:{
      closeRiliAdd(){
        this.$store.commit('showRiliAddClose')
      },
      saveRiliAdd(){
        let isOk = false;
        if(this.config.isAllDay == false ){
          if(this.config.title == ''|| this.config.content == '' || this.config.time1 == '' || this.config.date1 == ''){
            netintech.msg("请填写完整");
          }else{
            isOk = true;
          }
        }else{
          if(this.config.title == ''&& this.config.content !== ''&& this.config.date1 !== ''){
            netintech.msg("请填写标题");
          }else if(this.config.title !==''&& this.config.content =='' && this.config.date1 !== ''){
            netintech.msg("请填写内容");
          }else if(this.config.title !==''&& this.config.content !=='' && this.config.date1 == '') {
            netintech.msg("请填写日期");
          }else if(this.config.title =='' || this.config.content =='' || this.config.date1 == ''){
            netintech.msg("请填写完整");
          }else{
            isOk = true;
          }
        }
        if(isOk){
          let _config = {};
          _config.title = this.config.title;
          _config.content = this.config.content;
          let timestamp = new Date(this.config.date1);
          let timestamp1 = timestamp.getTime();
          _config.schtime = timestamp1;
          if(this.config.isAllDay){
            _config.isallday = 1;
            _config.starttime = "";
          }else{
            _config.starttime = this.config.time1;
            _config.isallday = 0;
          }
//          console.log( _config);
          netintech.ajaxCore.ajax(config.addSchedules,_config,"POST",{
            Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
          }).done((res) => {
            if(res.status == 10001){

              this.$store.commit('showRiliAddClose');
              netintech.msg("添加成功");
              this.$store.commit('refreshRiliDate');
              this.$store.commit('refreshRiliList');
              this.config.title='';
              this.config.content='';
              this.config.isAllDay=false;
            }
          });
        }

      }
    }

  }
</script>

<style>
  input:focus{ outline: none;}
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
  .B5_Zhuomian{

    height: 900px;
    background-image: url(../../../static/image/B1_beijin.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .B5_title{
    padding: 8px 14px;
    background: rgba(255,255,255,0.51);
    border-radius: 8px 8px 0 0;
  }

  .B5_title span{
    width: 30px;
    height: 30px;
    display: block;
    background-image: url(../../../static/image/B1_Close.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
  }


  .B5_title i{
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../../static/image/rili.png);
    float: left;
  }
  .B5_title div{
    height: 30px;
    color: #000;
    margin-left: 20px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
    font-size: 16px;
  }
  .B5ZC_List div {
    padding: 20px 0 11px;
    border-bottom: 1px solid #c1cede;
    padding-left: 80px;
  }
  .B5ZC_List span {
    display: inline-block;
    width: 130px;
    margin-left: -73px;
    text-align: left;
    color: #000;
    font-size: 16px;
  }
  /*新增事件弹窗*/
  .B5Z_AddCoat{
    position: absolute;
    width: 420px;
    left: 38%;
    top: 16%;
    font-size: 16px;
  }
  .B5Z_Content{
    padding: 20px 15px 40px;
    padding-bottom: 20px;
    text-align: center;
    background: rgba(175,189,213,0.3);
    border-radius: 0 0 8px 8px;
  }
  .B5ZC_List{

    padding: 0 20px 25px;
    border-radius: 8px;
    background-color: rgba(255,255,255,.89);
    color: #666666;
  }
  .B5ZC_List input{
    background-color: transparent;
    border: none;
    width: 220px;
    height: 22px;
    margin-right: 57px;
    margin-left: -74px;
    vertical-align: middle;
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
    position: relative;
    bottom: 25px;
    z-index: 1;
  }
  .B5ZCL_Mima4 input{
    margin-right: 18px;
  }

  .B5ZC_Button{
    width: 100px;
    height: 40px;
    background-color: #f5932a;
    line-height: 40px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 2px;
  }
  .B5ZC_List .dateinput{
    width: 260px;
    position: relative;
    z-index: 2;
    padding-right: 25px;
    margin-right: 0!important;
  }
</style>
