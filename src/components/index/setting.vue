<template>
  <div class=" B2Z_AddCoat B4Z_AddCoat S1Z_AddCoat" id="setting">
    <div class="B1ZA_Tittle   S1_Tittle" style="background-color: RGBA(255,255,255,0.51)">
      <i></i>
      <div style="font-size: 16px">设置</div>
      <span class="clearFix" @click="closeset()"></span>

    </div>
    <div class="B4Z_Content S1Z_Content ">
      <div class="S01z_title">
        <div style="color: #000; margin-left: 30px;">设置默认背景</div>
      </div>
      <ul class="S1_ImgesCoat clearFix setImg  " id="setIMG">
        <li v-for="(item,index) in imgListFront" class="S2I_img" @click="addgou(item.id,item.picpath)">
             <span class="set_span" :class="{szgnb:currentPicId==item.id}">
                  <img :src="item.picpath" alt="" class="picture"/>
             </span>
        </li>

      </ul>
      <div class="S1_PageUp">
        <i class="S1P_Turn1" id="leftclick" @click="prev()"></i>
        <i class="S1P_Turn2" id="rightclick" @click="next()"></i>
      </div>
      <div class="S1Z_Shanchu">
        <div class="S1ZS_Sure">是否删除应用</div>
        <a class="S1ZC_Button" @click="showDel()">删除应用</a>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
//        study: 1
      }
    },

    computed: {

      imgListFront() {
        return this.$store.getters.imgListGetters
      },
      imgShowIndex() {
        return this.$store.state.settingBg.imgShowIndex
      },
      imgListGetters() {
        return this.$store.getters.imgListGetters
      },
      settingBgPrevIndex() {
        return this.$store.getters.settingBgPrevIndex
      },
      settingBgNextIndex() {
        return this.$store.getters.settingBgNextIndex
      },
      settingBgPageNums() {
        return this.$store.getters.settingBgPageNums
      },
      currentPicId(){
        return this.$store.state.settingBg.currentPicId
      }

    },
    mounted: function () {
//      this.$store.commit('changeBg',this.study);
    },
    methods: {

      addgou(id,url) {
        this.$store.state.Background.currentBg = url;
        netintech.ajaxCore.ajax(config.setbgpic, {id}, "POST", {
          Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
        }).done((res) => {
          if(res.status==10001){
            layer.msg("设置成功");
            this.$store.commit('currentPicIdMU',id)
          }else{
            layer.alert(res.desc)
          }
        });
      },
      closeset() {
        this.$store.commit('showSetting')
      },
      prev() {
        this.$store.commit('imgShowIndexMU', this.settingBgPrevIndex);
      },
      next() {
        this.$store.commit('imgShowIndexMU', this.settingBgNextIndex);
      },
      showDel() {
        this.$store.commit('closeAll')
        this.$store.commit('showDelAppOpen')
        this.$store.commit('showDelButtonOpen')
        this.$store.state.deskIcon.deskArr.pop();
      }
    }
  }
</script>

<style>
  @import '/static/css/Tanchuang.css';

  .showPage {
    display: none;
  }

  .S1Z_AddCoat {

  }

  .S1_ImgesCoat {
    padding-left: 0;

  }

  .S1_ImgesCoat li {
    padding-right: 13px;
  }

  .S2I_img {
    position: relative;

  }

  .picture {
    width: 100%;
    height: 100%;
  }

  .set_span {
    width: 120px;
    height: 80px;
  }

  .szgnb:after {
    position: absolute;
    right: 13px;
    content: "";
    display: inline-block;
    background: url(../../..//static/image/gou.png) no-repeat right bottom;
    width: 120px;
    height: 80px;
    border: 1px solid rgba(255, 234, 0, 1);
  }

  .setImg {
    max-height: 226px;
    overflow: hidden;
    padding-left: 10px;
  }

  .S01z_title {
    color: #ffffff;
    font-size: 14px;
    padding: 0 0 20px 0;
    margin-bottom: 5px;
  }

  .S01z_title div {
    float: left;
  }

  .S01z_title a {
    display: block;
    width: 80px;
    height: 25px;
    line-height: 25px;
    margin-top: -12px;
    background-color: #F5932A;
    text-align: center;
    border-radius: 5px;
    float: right;
  }

  .S01z_title a:active {
    opacity: 0.6;
  }

  .S1Z_Shanchu {
    padding: 20px 27px 0;
    border-top: 1px dashed #62768c;
    text-align: center;
  }

  .S1ZS_Sure {
    color: #000;
    font-size: 14px;
    text-align: left;
  }

  .S1ZC_Button {
    width: 146px;
    height: 40px;
    background-color: #00b7ee;
    line-height: 40px;
    margin-top: 27px;
    font-size: 18px;
    border-radius: 4px;
  }

  .clearFix:after {
    content: '';
    display: block;
    clear: both;
  }

  .Ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .S1_Zhuomian {

    height: 900px;
    background-image: url(../../../static/image/B1_beijin.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .S1_Tittle {
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px 8px 0 0;
  }

  .S1_Tittle div {
    height: 30px;
    color: #000;
    margin-left: 12px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
  }

  .S1_Tittle span {
    width: 27px;
    height: 27px;
    display: block;
    background-image: url(../../../static/image/B1_blackClose.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
  }

  .S1_Tittle i {
    width: 23px;
    height: 23px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../../static/image/setting.png);
    margin-top: 2px;
    float: left;
  }

  /*设置弹窗页*/

  .S1_ImgesCoat li {
    padding-right: 15px;
    padding-bottom: 20px;
    float: left;
  }

  .S1_ImgesCoat span {
    width: 120px;
    height: 80px;
    background-image: url(../../../static/image/shezhimorenbeijing.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
  }

  .S1I_img8 span {
    background-image: url(../../../static/image/duihao.png);
  }

  .S1Z_AddCoat {
    position: absolute;
    width: 580px;
    left: 0;
    right: 0;
    top: 25%;
    margin-left: auto;
    margin-right: auto;
  }

  .S1Z_Content {
    padding: 20px 15px 23px;
    text-align: left;
    background: rgba(255, 255, 255, .89);
    border-radius: 0 0 8px 8px;

  }

  .S1Z_Content p {
    color: #000;
    font-size: 14px;
    padding: 0 0 20px 0;
  }

  .S1_ImgesCoat {
    padding-left: 10px;
  }

  .S1_PageUp {
    margin-bottom: 20px;
    text-align: center;
  }

  .S1_PageUp i {
    width: 20px;
    height: 20px;
    display: inline-block;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .S1P_Turn1 {
    background-image: url(../../../static/image/turnleft.png);
    margin-right: 10px;
  }

  .S1P_Turn2 {
    background-image: url(../../../static/image/turnright.png);
  }
</style>
