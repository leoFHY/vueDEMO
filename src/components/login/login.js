import router from '../../router'
export default {
  state:{
    userName:"",
    passWord:""
  },
  mutations:{

  },
  actions: {
    /**
     * 构造函数
     * @param store
     * @param arg
     */
    setLoginState:function(store,arg){
      store.state.userName = arg.userName;
      store.state.passWord = arg.passWord;
    },
    /**
     * 执行登录
     * @param store
     */
    loginCommit:function(store){
      var pass = store.state.passWord;
      var _config = {
        "UserName": store.state.userName
      };
      netintech.ajaxCore.ajax(config.TLogin,_config,"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.MD5(pass))
      }).done((res) => {
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
  }
};
