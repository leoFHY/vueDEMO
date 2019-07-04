import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router'
Vue.use(Vuex)
 const index ={
  state:{

  },
  mutations:{
    indexInit:function(){
      let _config = netintech.Storage.get("config");
      if(_config != "" && _config != null && _config != undefined){
      }else{
        router.push('/');
      }
    }
  },
  actions: {
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.outSystem,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          let policeId = netintech.BASE64.encode(res.result);
          netintech.Storage.set("pId", policeId)
        }
      });
    }
  }
};
 export default index

