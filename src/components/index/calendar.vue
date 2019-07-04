<template>

  <div class=" B8Z_AddCoat">
    <div class="B8_Tittle">
      <i></i>
      <div>日历</div>
      <span class="clearFix" @click="closeRili()"></span>

    </div>
    <div class="B018Z_Content">
      <div class="B018ZC_div" v-if="showOnlyAdd(calendarDetail)">
        <div class="B8_Date clearFix ">
          <p>{{showDate(0).year()}}年{{showDate(0).month()}}月</p>
          <span class="B8D_Plus " @click="openRiliAdd()"><i></i>增加</span>
        </div>
      </div>
      <div class="B018ZC_div" v-for="(item,index) in calendarDetail" v-if="showHid(item)">
        <div class="B8_Date clearFix ">
          <p>{{showDate(index).format("YYYY")}}年{{showDate(index).format("MM")}}月</p>
          <span class="B8D_Plus " @click="openRiliAdd()"><i></i>增加</span>
        </div>
        <div class=" B8ZC_List clearFix">
          <div class="B8Z_Items1" v-for="(item1,index1) in item">
            <div v-for="(item2,index2) in item1.sdlist" @click="openRiliDetail(item2.id)">
              <div :class="classIsFirst(index2).class1" class="clearFix" style="cursor: pointer"><h3>{{ isfirst(showDate2(item1.datetime).day,index2)}}</h3><em>{{item2.title}}</em></div>
              <div :class="classIsFirst(index2).class2" class="clearFix" style="cursor: pointer"><p>{{ isfirst(showDate2(item1.datetime).week,index2)}}</p><em>{{isall(item2.starttime)}}</em></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
//  alert(moment().subtract(0,'month').year()+"年"+moment().subtract(0,'month').month()+"月");

  export default {
    data(){
      return {

      }
    },
    computed: {
      calendarDetail() {
        return this.$store.state.riliList.listItem
      }
    },
    methods:{
      /**
       * 关闭日历弹框
       */
      closeRili(){
        this.$store.commit('showRili1')
      },
      /**
       * 打开日历弹框
       */
      openRiliAdd(){
        this.$store.commit('closeAll');
        this.$store.commit('showRiliAddOpen')
      },
      openRiliDetail(id){
        this.$store.commit('closeAll');
        this.$store.commit('showRiliDetailOpen')
        this.$store.commit('setRiliDetail',id)
      },
      showHid(item){
        if(item.length == 0){
          return false
        }else{
          return true
        }
      },
      showDate(num){
        let date = new moment();
        return date.subtract(num,'month');
      },
      showDate2(date){
        let date1 = moment(date);
        let json = {};
        json.day = date1.date();
        let week = moment(date).day();
        switch (week){
          case (1):
            json.week = '周一';
            break;
          case (2):
            json.week = '周二';
            break;
          case (3):
            json.week = '周三';
            break;
          case (4):
            json.week = '周四';
            break;
          case (5):
            json.week = '周五';
            break;
          case (6):
            json.week = '周六';
            break;
          case (0):
            json.week = '周日';
            break;
          default:
            json.week = '';
        }
        return json;
      },
      isall(time1){
        if(time1 == null){
          return '全天'
        }else{
          return time1
        }
      },
      isfirst(str,index){
        if(index == 0){
          return str
        }else{
          return ""
        }
      },
      classIsFirst(index){
        let json1 = {}
        if(index == 0){
          json1.class1 = "B8ZI_Days1";
          json1.class2 = "B8ZI_Days2";
        }else{
          json1.class1 = "B8ZI_Days3";
          json1.class2 = "B8ZI_Days4";
        }
        return json1
      },
      showOnlyAdd(array){
        let status = false;
        let list1 = array;
        if(list1.length != 0){
          let isShow = 0;
          for (let i= 0;i < list1.length;i++){
            if(list1[i].length != 0){
              isShow++;
            }
          }
          if(isShow == 0){
            status = true;
          }
        }

        return status;
      },
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
  .B8_Zhuomian{

    height: 900px;
    background-image: url(../../../static/image/B1_beijin.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .B8_Tittle{
    padding: 8px 14px;
    background: rgba(255,255,255,0.51);
    border-radius: 8px 8px 0 0;
  }
  .B8_Tittle div {
    height: 30px;
    color: #000;
    margin-left: 20px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
  }
  .B8_Tittle span{
    width: 30px;
    height: 30px;
    display: block;
    background-image: url(../../../static/image/B1_Close.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
  }


  .B8_Tittle i{
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../../static/image/rili.png);
    float: left;
  }


  /*日历弹框*/
  .B8Z_AddCoat{
    left: 38%;
    width: 420px;
    top:15%;
    position: absolute;
    font-size:16px;
  }


  .B8_Date{
    margin-top: 24px;
    color: #fff;
  }
  .B8_Date p{

    display: inline-block;
  }
  .B8D_Plus{
    display: inline-block;
    width: 75px;
    height: 35px;
    margin-top: -10px;
    margin-bottom: 10px;
    background-color: #00b7ee;
    border-radius: 2px ;
    text-align: center;
    line-height: 35px;
    float: right;
  }
  .B8D_Plus i{
    width: 18px;
    height: 18px;
    background-image: url(../../../static/image/plus.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: left;
    margin: 7px 0 7px 7px;


  }
  .B018Z_Content{
    padding: 20px 15px 40px;
    background: rgba(175,189,213,0.3);
    border-radius: 0 0 8px 8px;
    text-align: left;
    padding-bottom: 20px;
    padding-top:0;
    height:583px;
    overflow-y:scroll;
  }
  .B8ZC_List{
    padding: 0 20px 25px;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.89);
    color: #000;
    text-align: left;
    padding-bottom:0;

  }
  .B8ZC_List div{

    padding-bottom:0;
  }

  .B8ZI_Days1 h3{
    width: 40px;
    display: inline-block;
    font-size: 24px;
    color: #5e36f4;
    margin-right: 30px;
    float: left;
  }
  .B8ZI_Days1 em{
    display: inline-block;
    font-style: normal;
    float: left;
    margin-top: 4px;
  }
  .B6ZC_List .B8ZI_Days2{
    color: #666;
    padding-top: 0;
  }
  .B8ZI_Days2 p{
    color: #666;
    padding-top: 0;
    width: 40px;
    margin-right: 30px;
    font-size: 14px;
    float: left;
  }
  .B8ZI_Days2 em{
    float: left;
    font-style: normal;
    font-size: 14px;
  }
  .B6ZC_List .B8ZI_Days3,.B6ZC_List .B8ZI_Days4{
    padding-left: 70px;
  }
  .B8ZI_Days4{
    padding-left: 70px;
    color: #666;
    font-size: 14px;

  }
  .B8ZI_Days3{
    padding-left: 70px;
    margin-top: 15px;

  }
  .B8ZC_List .B8Z_Items1{
    padding: 10px 0 11px;
    padding-bottom: 15px    ;
    border-bottom:1px dashed #8699aa;
  }
  .B8ZC_List .B8Z_Items1:last-child{
    border-bottom:none;
  }
  .B8ZI_Days1{

  }
  .B8ZI_Days2{
    color: #666;
  }
</style>
