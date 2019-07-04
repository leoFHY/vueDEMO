<template>
  <div class=" B014Z_AddCoat ">
    <div class="B014_Tittle">
      <i></i>
      <div style="font-size: 16px">修改密码</div>
      <span class="clearFix" @click="showPassWrod()"></span>

    </div>
    <div class="B014Z_Content">
      <div class="B014ZC_List">
        <div class="B014ZCL_Mima1"><span>初始化密码</span>     <input type="password"  value="asddsasd" v-model="passWord.befordPass" @keyup.enter="commitPassWrod()">  </div>
        <div class="B014ZCL_Mima2"><span>新密码</span>         <input type="password"  value="asddsasd" v-model="passWord.newPass" @keyup.enter="commitPassWrod()">  </div>
        <div class="B014ZCL_Mima3"><span>确认新密码 </span>    <input type="password"  value="asddsasd" v-model="passWord.newPass2" @keyup.enter="commitPassWrod()">  </div>
      </div>
      <a class="netintechButton" @click="commitPassWrod()">保存</a>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  export default{
    data:function(){
      return {
        passWord:{
          befordPass:"",
          newPass:"",
          newPass2:""
        }
      }
    },
    methods:{
      /**
       * 显示修改密码弹框
       */
      showPassWrod(){
        this.$store.commit('showPassWrod1');
      },
      /**
       * 提交修改密码操作
       */
      commitPassWrod(){
        let isOk=false;
        if(this.passWord.befordPass == ''){
          if(this.passWord.newPass == '' && this.passWord.newPass2 == '' ){
            netintech.msg("输入值不能为空");
          }else if(this.passWord.newPass !== ''&& this.passWord.newPass2 == ''){
            netintech.msg("请填写完整");
          }else if(this.passWord.newPass == ''&& this.passWord.newPass2 !== ''){
            netintech.msg("请填写完整");
          }else {
            isOk = true;
          }
        }else{
          if(this.passWord.newPass == ''&& this.passWord.newPass2 == '' ){
            netintech.msg("请输入新密码");
          }else if(this.passWord.newPass !== ''&& this.passWord.newPass2 == ''){
            netintech.msg("请再次输入新密码");
          }else if(this.passWord.newPass == '' && this.passWord.newPass2 !== ''){
            netintech.msg("请输入新密码");
          }else if(this.passWord.newPass !== this.passWord.newPass2 ){
            netintech.msg("两次密码不相同");
          }else{
            isOk = true;
          }
        }

        if(isOk){
          let _config = {
            oldpwd: netintech.MD5(this.passWord.befordPass),
            newpwd: netintech.MD5(this.passWord.newPass)
          };
          if(this.passWord.newPass == this.passWord.newPass2){
            netintech.ajaxCore.ajax(config.updatePwd,_config,"POST",{
              Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
            }).done((res) => {
              if(res.status == 10001){
                netintech.msg("密码修改成功, 请重新登录");
                netintech.Storage.remove('config');
                this.$store.commit('closeAll');
                router.push('/');
              }else if(res.status == 10013){
                netintech.msg(res.desc)
              }
            });
          }else{
            netintech.msg("确认密码错误");
          }
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

  .B014Z_AddCoat{
    width: 460px;
    left: 0;
    top: 35%;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;

  }
  .B014_Tittle{
    padding: 8px 14px;
    background: rgba(255,255,255,0.51);
    border-radius: 8px 8px 0 0;
  }
  .B014_Tittle div {
    height:30px;
    color: #000;
    margin-left: 20px;
    line-height: 30px;
    display: inline-block;
    font-weight: bold;
  }
  .B014_Tittle span {
    width: 30px;
    height: 30px;
    display: block;
    background-image: url(../../../static/image/B1_Close.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
  }
  /*修改密码*/
  .B014_Tittle{
    /*width: 360px;*/
  }
  .B014_Tittle i{
    width: 30px;
    height: 30px;
    float: left;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../../static/image/yaoshi.png);
  }
  .B014Z_Content{
    font-size: 16px;
    color: #000;
    padding: 20px 15px 40px ;
    text-align: center;
    background: rgba(175,189,213,0.4);
    border-radius: 0 0 8px 8px;
  }

  .B014ZC_List{
    padding: 0 20px 25px ;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.89);
    color: #666666;
  }
  .B014ZC_List div{
    padding: 20px 0  11px;
    border-bottom:1px solid #bbbbbc ;
    padding-left: 80px;
  }
  .B014ZC_List input{
    height: 22px;
    background-color: transparent;
    border:none ;
  }
  .B014ZC_List span{
    display: inline-block;
    width: 130px;
    margin-left: -73px;
    text-align: left;

  }
  .netintechButton{
    display: block;
    width: 30%;
    height: 35px;
    line-height: 35px;
    border-radius: 3px;
    background-color: #F5932A;
    text-align: center;
    font-size: 18px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
  }
</style>
