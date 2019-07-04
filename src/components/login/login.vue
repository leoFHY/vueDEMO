<template>
  <div class="LoginAll">
    <div class="Lo_Main">
      <div class="LoM_bg"></div>
      <img src="../../../static/image/login/title.png" alt="" class="LoM_title">
      <div class="LoM_main">
        <div class="LoMM_div LoMMd_buser">
          <div class="LoMMd_button" @click="openLogin()">
            <div class="Lommdb_bk1"></div>
            <div class="Lommdb_bk2"></div>
            <div class="Lommdb_bk3"></div>
            <div class="Lommdb_bk4"></div>
            <img src="../../../static/image/login/Login_user.png" alt="" class="Lommdb_img">
          </div>
          <div class="LoMMd_text">用户登录</div>
        </div>
        <div class="LoMM_div LoMMd_busb" @click="loginCA()">
          <div class="LoMMd_button">
            <div class="Lommdb_bk1"></div>
            <div class="Lommdb_bk2"></div>
            <div class="Lommdb_bk3"></div>
            <div class="Lommdb_bk4"></div>
            <img src="../../../static/image/login/Login_ca.png" alt="" class="Lommdb_img">
          </div>
          <div class="LoMMd_text">CA登录</div>
        </div>
      </div>
      <div class="LoM_footer">Copyright &copy; 昆山市公安局情报中心 2017 版权所有 </div>
    </div>
    <div class="Lo_dialog" @click="closeLogin()">

    </div>
    <div class="Lolog_Login">
      <div class="LologL_main">
        <div class="LologLM_input"><img src="../../../static/image/login/icon_user.png" alt=""><input type="text" autofocus="autofocus" placeholder="用户名" v-model="loginInput.userName" @keyup.enter="loginbutton()"></div>
        <div class="LologLM_input"><img src="../../../static/image/login/icon_pass.png" alt=""><input type="password" placeholder="密码" v-model="loginInput.passWord" @keyup.enter="loginbutton()"></div>
      </div>
      <a class="LologL_noPassWrod"> </a>
      <a class="LologL_button" @click="loginbutton()">登 录</a>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  export default {
    data:function (){
      return {
        loginInput:{
          userName: "",
          passWord: ""

        }
      }
    },
    mounted: function(){
      let param = netintech.getHash();
      let paramData = netintech.BASE64.decode(param);
      let paramArray = paramData.split(':');
      if(paramArray[1] != '' && paramArray[1] != undefined){
        netintech.ajaxCore.ajax(config.caLoginByNum,{"num":paramArray[1]},"POST").done((res) => {
          if(res.status == 10001){
            netintech.msg("登录成功,欢迎您"+res.result.userName);
            var sessionConfig = res.result;
            netintech.Storage.set("config",sessionConfig);
            router.push('/index');
          }else{
            if(res.status == '10010' || res.status == '10011' || res.status == '10012'){
              netintech.msg(res.desc);
            }else{
              netintech.msg(res.desc+",错误码是:"+res.status);
            }
          }
        });
      }
    },
    methods:{
      /**
       * show登陆页面弹跳框
       */
      openLogin:function(){
        $(".Lo_dialog").show();
        $(".Lolog_Login").show();
      },
      /**
      * hide登陆页面弹跳框
      */
      closeLogin:function(){
        $(".Lo_dialog").hide();
        $(".Lolog_Login").hide();
      },
      /**
       * 登录功能
       */
      loginbutton:function(){
        if(this.loginInput.passWord !== '' && this.loginInput.userName == ''){
          netintech.msg("用户名不能为空");
        }else if(this.loginInput.passWord == '' && this.loginInput.userName !== '') {
          netintech.msg("密码不能为空");
        }else if(this.loginInput.passWord == '' || this.loginInput.userName == '') {
          netintech.msg("请填写用户名及密码");
        } else{
          let _config = {
            userName:this.loginInput.userName,
            passWord:this.loginInput.passWord
          };
          this.$store.dispatch('setLoginState',_config);
          this.$store.dispatch('loginCommit');
        }

      },
      loginCA(){
        let num = netintech.getRandom6();
        netintech.ajaxCore.ajax(config.getCaLogin,{"num":num},"POST").done((res) => {
          if(res.status == 10001){
            window.location.href = res.result;
          }
        });
      }

    }
  }

</script>

<style>
  *{ margin: 0; padding: 0;}
  html,body{ width: 100%; hight: 100%; }
  .LoginAll{ position: relative; top: 0; left: 0; width: 100%; height: 100%;}
  .Lo_Main{ width: 100%; height: 100%; position: relative; overflow: hidden;}
  .LoM_bg{ width: 100%; height: 100%; position: relative; background-image: url("../../../static/image/login/bg.png"); background-repeat: no-repeat; background-position: center; background-size: cover; z-index: 1;}
  .LoM_title{ position: absolute; top: 19%; left: 0; right: 0; margin-left: auto; margin-right: auto; height: 18%; z-index: 5;}

  .LoM_main{ position: absolute; top: 50%; left: 50%; margin-left: -235px; width: 470px; height: 190px; z-index: 5;}
  .LoMM_div{ position: absolute; top: 0; width: 134px; height: 190px; }
  .LoMMd_buser{ left: 0;}
  .LoMMd_busb{ right: 0;}
  .LoMMd_button{ position: absolute; top: 0; left: 0; width: 134px; height: 134px; cursor: pointer;}
  .LoMMd_button div{ position: absolute; top: 0; left: 0; width: 134px; height: 134px; background-repeat: no-repeat; background-position: center; background-size: 100% 100%; transition: all 1s;}
  .LoMMd_button:hover > .Lommdb_bk1{ transform: rotate(720deg);}
  .LoMMd_button:hover > .Lommdb_bk2{ transform: rotate(-360deg);}
  /*.LoMMd_button:hover > .Lommdb_bk3{ transform: rotate(360deg);}*/
  .LoMMd_button:hover > .Lommdb_bk4{ transform: rotate(-720deg);}
  .Lommdb_bk1{ background-image: url("../../../static/image/login/fk1.png"); z-index: 8;}
  .Lommdb_bk2{ background-image: url("../../../static/image/login/fk2.png"); z-index: 7;}
  .Lommdb_bk3{ background-image: url("../../../static/image/login/fk3.png"); z-index: 6;}
  .Lommdb_bk4{ background-image: url("../../../static/image/login/fk4.png"); z-index: 9;}
  .Lommdb_img{ position: absolute; display: block; width: 100px; height: 100px; margin-left: -50px; left: 50%; top: 50%; margin-top: -50px;}

  .LoMMd_text{ position: absolute; top: 134px; left: 0; width: 100%; height: 56px; line-height: 56px; text-align: center; color: #00f0ff; font-size: 16px;}

  .LoM_footer{ position: absolute; width: 100%; bottom: 0; height: 50px; line-height: 50px; text-align: center; font-size: 14px; color: #9a9da5; border-top: 1px solid RGBA(255,255,255,0.15); z-index: 5;}

  .Lo_dialog{ display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: RGBA(0,0,0,0.3); z-index: 999;}
  .Lolog_Login{ display: none; position: fixed; top: 50%; left: 50%; width: 336px; height: 240px; margin-left: -168px; margin-top: -134px; border-radius: 5px; background-color: RGBA(255,255,255,0.85); z-index: 1000;}
  .LologL_main{ width: 296px; height: 106px; margin-top: 40px; margin-left: auto; margin-right: auto;}
  .LologLM_input{ width: 100%; height: 42px; border: 1px solid #bac0c0; border-radius: 3px; background-color: #fff;}
  .LologLM_input:first-child{ margin-bottom: 18px;}
  .LologLM_input img{ display: block; width: 12px; margin-left: 14px; margin-right: 10px; margin-top: 13px; float: left;}
  .LologLM_input input{ height: 36px; width: 250px; border: none; margin-top: 2px; float: left; background-color: RGBA(255,255,255,0);}
  .LologLM_input input:focus{ outline: none;}
  .LologL_noPassWrod{ display: block; margin-top: 15px; margin-left: 228px; margin-bottom: 24px; font-size: 14px; color: #999999; cursor: pointer;}
  .LologL_button{ display: block; width: 248px; height: 42px; margin-left: auto; margin-right: auto; line-height: 42px; background-color: #36aafb; border-radius: 3px; text-align: center; font-size: 18px; color: #FFF; cursor: pointer;}
</style>
