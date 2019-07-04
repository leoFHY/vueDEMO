import Vue from 'vue'
import Vuex from 'vuex'
import util from '../util.js';
import underlinpic from '../../static/image/underline.png'

import login from '../components/login/login'
import index from '../components/index/index'
import settingBg from '../components/index/Setting.js'

Vue.use(Vuex)
Vue.use(util)

/**
 * 桌面右边显示效果
 * @type {{state: {showNotice: boolean, showItem: boolean, underlinpic}, mutations: {toggleNotice: (function(*)), changeShowItem: (function(*))}}}
 */
const QbdsjNotice = {
  /**
   * showNotice {Bool} 是否显示右侧列表
   * showItem {Bool} 显示右侧列表子项目(只用于淡入动画效果)
   */
  state: {
    showNotice: true,
    showItem: false,
    underlinpic: underlinpic
  },
  mutations: {
    /**
     * 切换右侧列表(打开/关闭)
     * @param state
     */
    toggleNotice (state) {
      state.showNotice = !state.showNotice
    },
    /**
     * 列表子项目是否显示
     * @param state
     */
    changeShowItem (state) {
      state.showItem = true
    }
  }
}

/**
 * 桌面搜索显示效果
 * @type {{state: {showSearch: boolean}, mutations: {toggleSearch: QbdsjSearch.mutations.toggleSearch}}}
 */
const QbdsjSearch = {
  // 否打开搜索框
  state: {
    showSearch: false
  },
  mutations: {
    /**
     * 打开或关闭搜索框
     * @param state
     */
    toggleSearch: function (state) {
      state.showSearch = !state.showSearch
    }
  }
}

/**
 * 桌面背景以及切换效果
 * @type {{state: {bgImgArr: Array, showBgIdx: number, currentBg: string}, mutations: {setCurrentBg: Background.mutations.setCurrentBg}, actions: {ajaxmenuArrAC: (function(*, *))}}}
 */
const Background = {
  /**
   * bgImgArr {Array} 背景图片url数组
   * showBgIdx {Number} 当前显示图片下标
   */
  state: {
    bgImgArr: [

    ],
    showBgIdx: 0,
    currentBg:""//存储当前页面图片URL
  },
  mutations: {
    /**
     * 设置currentBg,用于桌面当前目录显示
     * @param state
     * @param num
     */
    setCurrentBg: function (state,num) {
      state.showBgIdx = state.showBgIdx + num;
      state.currentBg = state.bgImgArr[state.showBgIdx];
    },
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getBackgroundPic,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          // console.log(res);
          let data = [];
          let resbg = res.result.bgimg;
          let index = res.result.imgId;
          let indexOf = 0;
          for(let i=0; i<resbg.length; i++){
            let val = resbg[i]|| {};
            data.push(val.picpath);
            if(val.id == index){
              indexOf = i;
            }
          }


          store.state.showBgIdx = indexOf;
          store.state.bgImgArr = data;
          store.state.currentBg = data[indexOf];
        }
      });
    }
  }
}

/**
 * 快捷栏操作
 * @type {{state: {menuArr: [null,null,null,null,null]}, actions: {ajaxmenuArrAC: (function(*, *))}, mutations: {}}}
 */
const menuIcon = {
  state: {
    /**
     * 快捷栏静态数据
     */
    menuArr: []
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.leftMenu,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.menuArr = res.result || []

        }
      });
    }
  },
  mutations:{}
}

/**
 * 桌面APP操作
 * @type {{state: {deskArr: [null,null,null,null,null,null], deskAdd: {iconUrl: string, name: string, isOpen: string}}, actions: {ajaxmenuArrAC: (function(*, *))}, mutations: {addItem: (function(*, *=)), delItem: (function(*, *, *=))}}}
 */
const deskIcon = {
  state: {
    /**
     * 桌面静态数据
     */
    deskArr: [],
    /**
     * 桌面+号icon
     */
    deskAdd:{
      'iconUrl': './static/image/add-icon.gif',
      'name': '',
      'isOpen':'1'
    }
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getDeskSystems,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.deskArr = res.result || [];
         let list = store.state.deskArr;
         for(let i=0;i<list.length;i++){
              list[i].isOpen = "5";
         }
          store.state.deskArr=list;
          store.state.deskArr.push(store.state.deskAdd);
          console.log( store.state.deskArr);
          store.dispatch("ajaxmenuArrACAddIcon",true);
        }
      });
    }
  },
  mutations:{
    /**
     * 添加一个APP
     * @param state
     * @param json [JSON] app所有信息
     */
    addItem(state,json){
      json.isOpen = "5";
      let data = state.deskArr;
      data.pop();
      data.push(json);
      /**
       * 11.23
       * @type {Array}
       */
      let newData = [];
      for(let i= 0; i < data.length; i++){
        newData.push(data[i].id);
      }
      netintech.ajaxCore.ajax(config.insertOrUpdateDeskSys,{systems: JSON.stringify(newData)},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
        }
      });
      data.push(state.deskAdd);
      state.deskArr = data;

    },
    /**
     * 删除一个APP
     * @param state
     * @param json [JSON] app所有信息
     * @param num [int] 数组内下标
     */
    delItem(state,json){

      if(json.type != undefined && json.type != ""){
        let item = state.deskArr;
        // console.log(item);
        let test = item.filter((ele)=>{ return ele.id == json.id});
        let num = item.indexOf(test[0])
        if(num != -1){
          item.splice(num,1)
        }else{
          netintech.msg("查无此项","警报")
        }
        state.deskArr = item;
        let data = state.deskArr;

        /**
         * 11.23
         * @type {Array}
         */
        let newData = [];
        for(let i= 0; i < data.length; i++){
          newData.push(data[i].id);
        }

        netintech.ajaxCore.ajax(config.insertOrUpdateDeskSys,{systems: JSON.stringify(newData)},"POST",{
          Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
        }).done((res) => {
          if(res.status == 10001){
            console.log("操作成功");
          }
        });
      }
    }
  }
}

/**
 * 添加APP弹框中操作
 * @type {{state: {addArr_STXT: [null,null], addArr_SZTP: [null,null], addArr_BDYY: [null,null]}, actions: {ajaxmenuArrAC: (function(*, *))}, mutations: {deleteApp: (function(*, *)), saveApp: (function(*)), addAppList: (function(*, *=))}}}
 */
const addIcon = {
  state: {
    /**
     * 添加跳框中的静态数据(省厅系统)
     */
    addArr_STXT: [],
    /**
     * 添加跳框中的静态数据(苏州平台)
     */
    addArr_SZTP: [],
    /**
     * 添加跳框中的静态数据(本地应用)
     */
    addArr_BDYY: []
  },
  actions:{
    ajaxmenuArrACAddIcon(store,arg){
      netintech.ajaxCore.ajax(config.getRoleSystems,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.addArr_STXT = res.result.stxt.arrAddKey("type","2");
          store.state.addArr_SZTP = res.result.szpt.arrAddKey("type","1");
          store.state.addArr_BDYY = res.result.bdxt.arrAddKey("type","0");
          // store.state.addArr_STXT = res.result.stxt.arrAddKey("type","STXT");
          // store.state.addArr_SZTP = res.result.szpt.arrAddKey("type","SZTP");
          // store.state.addArr_BDYY = res.result.bdxt.arrAddKey("type","BDYY");
          if(arg){
            let item  = store.rootState.deskIcon.deskArr;
            item.pop();
            let deskItem = item;
            let item1 = store.state.addArr_STXT;
            let item2 = store.state.addArr_SZTP;
            let item3 = store.state.addArr_BDYY;
            for(let i = 0;i < deskItem.length;i++){
              let id = deskItem[i].id;
              let test = item1.filter((ele)=>{ return ele.id == id});
              let num = item1.indexOf(test[0])
              if(num != -1){
                item1.splice(num,1)
              }
              let test2 = item2.filter((ele)=>{ return ele.id == id});
              let num2 = item2.indexOf(test2[0])
              if(num2 != -1){
                item2.splice(num2,1)
              }
              let test3 = item3.filter((ele)=>{ return ele.id == id});
              let num3 = item3.indexOf(test3[0])
              if(num3 != -1){
                item3.splice(num3,1)
              }
            }
            store.state.addArr_STXT = item1;
            store.state.addArr_SZTP = item2;
            store.state.addArr_BDYY = item3;
            store.rootState.deskIcon.deskArr.push(store.rootState.deskIcon.deskAdd);
          }
        }
      });
    }
  },
  mutations:{
    /**
     * 删除一个app
     * @param state
     * @param json [JSON] app所有信息
     */
    deleteApp(state,json){
      let item,test,num;
      switch (json.type){
        case '2':
          item = state.addArr_STXT;
          test = item.filter((ele)=>{ return ele.id == jso.id});
          num = item.indexOf(test[0])
          if(num != -1){
            item.splice(num,1)
          }else{
            netintech.msg("查无此项","警报")
          }
          state.addArr_STXT = item;
          break;
        case '1':
          item = state.addArr_SZTP;
          test = item.filter((ele)=>{ return ele.id == json.id});
          num = item.indexOf(test[0])
          if(num != -1){
            item.splice(num,1)
          }else{
            netintech.msg("查无此项","警报")
          }
          state.addArr_SZTP = item;
          break;
        case '0':// BDYY
          item = state.addArr_BDYY;
          test = item.filter((ele)=>{ return ele.id == json.id});
          num = item.indexOf(test[0])
          if(num != -1){
            item.splice(num,1)
          }else{
            netintech.msg("查无此项","警报")
          }
        default:
          item = [];
      }
    },
    /**
     * 将新数据保存数据库
     * @param state
     */
    saveApp(state){
      let json = {};
      json.stxt = state.addArr_STXT;
      json.szpt = state.addArr_SZTP;
      json.bdxt = state.addArr_BDYY;

      netintech.ajaxCore.ajax(config.updateAddSys,{systems:JSON.stringify(json)},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){


        }
      });
    },
    sysInfoById(state,arr){
      // console.log(arr);
      netintech.ajaxCore.ajax(config.getSysInfoById,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          // store.state.addArr_STXT = res.result;
        }
      });
    },
    /**
     * 将桌面删除的APP添加回添加数组中
     * @param state
     * @param json [JSON] app所有信息
     */
    addAppList(state,json){
      if(json.type != undefined && json.type != ""){
        switch (json.type){
          case '2':
            json.isOpen = '2';
            // delete json.type;
            state.addArr_STXT.push(json);
            break;
          case '1':
            json.isOpen = '2';
            // delete json.type;
            state.addArr_SZTP.push(json);
            break;
          case '0':
            json.isOpen = '2';
            /**
             *12.21号隐藏，因为桌面点击删除APP后返回到对应的列表应用。再从列表点击添加到桌面，如果不刷新就无法从效应列表应用里消失。
             */
            // delete json.type;

            state.addArr_BDYY.push(json);
            break;
          default:

            break;
        }
      }
    }
  }
}



/**
 * 页面弹框显示/隐藏
 * @type {{state: {showAddApp: boolean, showPassWrod: boolean, showInform: boolean, showSearch: boolean, showrili: boolean, showriliAdd: boolean}, mutations: {showAddApp1: (function(*)), showPassWrod1: (function(*)), showInformOpen1: (function(*)), showInformClose1: (function(*)), showSearchOpen1: (function(*)), showSearchClose1: (function(*)), showRili1: (function(*)), showRiliAddOpen: (function(*)), showRiliAddClose: (function(*)), closeAll: (function(*))}}}
 */
const IndexShow = {
  state:{
    showAddApp:false,
    showPassWrod:false,
    showInform:false,
    showSearch:false,
    showrili:false,
    showriliAdd:false,
    showriliDetail:false,
    showSetting:false,
    showDelApp:false,
    showDelButton:false,
    showTztgList:false,
    showriliEdit:false,
    confirmButton:false
  },
  mutations:{
    showAddApp1 (state) {
      state.showAddApp = !state.showAddApp
    },
    showPassWrod1(state){
      state.showPassWrod = !state.showPassWrod
    },
    showInformOpen1(state){
      state.showInform = true
    },
    showInformClose1(state){
      state.showInform = false
    },
    showSearchOpen1(state){
      state.showSearch = true
    },
    showSearchClose1(state){
      state.showSearch = false
    },
    showRili1(state){
      state.showrili = !state.showrili
    },
    showRiliAddOpen(state){
      state.showriliAdd = true
    },
    showRiliAddClose(state){
      state.showriliAdd = false
    },
    showRiliDetailOpen(state){
      state.showriliDetail = true
    },
    showRiliDetailClose(state){
      state.showriliDetail = false
    },
    showSetting(state){
      state.showSetting = !state.showSetting
    },
    showDelAppOpen(state){
      state.showDelApp = true
    },
    showDelAppClose(state){
      state.showDelApp = false
    },
    showDelButtonOpen(state){
      state.showDelButton = true;
    },
    showDelButtonClose(state){
      state.showDelButton = false;
    },
    confirmButtonOpen(state){
      state.confirmButton = true;
    },
    confirmButtonClose(state){
      state.confirmButton = false;
    },
    showTztgList1(state){
      state.showTztgList = !state.showTztgList
    },
    showriliEditOpen(state){
      state.showriliEdit = true;
    },
    showriliEditClose(state){
      state.showriliEdit = false;
    },
    closeAll(state){
      state.showAddApp = false;
      state.showPassWrod = false;
      state.showInform = false;
      state.showSearch = false;
      state.showrili = false;
      state.showriliAdd = false;
      state.showriliDetail = false;
      state.showSetting = false;
      state.showTztgList = false;
      state.showriliEdit = false;
      state.confirmButton = false;
    }
  }
}

/**
 * 数据总览内容
 * @type {{state: {currentCount: number, todayCount: number, allCount: number}, actions: {ajaxmenuArrAC: (function(*, *))}}}
 */
const dataPandect ={
  state:{
    currentCount:0,//在线人数
    todayCount:0,//今日浏览
    allCount:0//总浏览数
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getLoginCount,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.currentCount = res.result.currentCount;
          store.state.todayCount = res.result.todayCount;
          store.state.allCount = res.result.allCount;
        }
      });
    }
  }
}

/**
 * 首页通知通告内容
 * @type {{state: {listItem: [null,null,null,null], detialItem: {content: string, title: string, writer: string, addtime: string}}, actions: {ajaxmenuArrAC: (function(*, *))}, mutations: {changeDetail: (function(*, *))}}}
 */
const informItem = {
  state:{
    /**
     * 通知通告list
     */
    listItem:[],
    /**
     * 详细页面静态数据
     */
    detialItem:{
      content:"<p></p>",
      title:"",
      writer:"",
      addtime:""
    }
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getTopNotices,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.listItem = res.result;
        }
      });
    }
  },
  mutations:{
    /**
     * 变更详细页面静态数据
     * @param state
     * @param json
     */
    changeDetail(state,json){
      state.detialItem = json;
    }
  }
}

/**
 * 搜索显示内容
 * @type {{state: {application: [null,null], news: [null,null,null,null]}, mutations: {searchAI: (function(*, *=)), deleteApp2: (function(*, *))}}}
 */
const Search = {
  state:{
    /**
     * APP区域静态数据
     */
    application:[],
    /**
     * 新闻区域静态数据
     */
    news:[]
  },
  mutations:{
    /**
     * 搜索内容
     * @param state
     * @param word
     */
    searchAI(state,word){
      netintech.ajaxCore.ajax(config.searchInfo,{searchWord:word},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          state.application = res.result.application.arrAddKey("isOpen","3");
          state.news = res.result.news;
        }
      });
    }
  }
}

/**
 * 首页日历内容
 * @type {{state: {listItem: [null,null,null,null]}, actions: {ajaxmenuArrAC: (function(*, *))}, mutations: {changeDetail: (function(*, *))}}}
 */
const riliDate = {
  state:{
    /**
     * 日历静态list
     */
    listItem:[]
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getTodayScheduleList,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.listItem = res.result;

        }
      });
    }
  },
  mutations:{
    refreshRiliDate(state){
      netintech.ajaxCore.ajax(config.getTodayScheduleList,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          state.listItem = res.result;
          // console.log(state.listItem+'1');
        }
      });
    }
    // changeDetail(state,json){
    //   state.detialItem = json;
    // }
  }
}

const riliList = {
  state:{
    /**
     * 日历静态list
     */
    listItem:[]
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getScheduleList,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.listItem = res.result;
        }
      });
    }
  },
  mutations:{
    refreshRiliList(state){
      netintech.ajaxCore.ajax(config.getScheduleList,{},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          state.listItem = res.result;
          // console.log(state.listItem+'2');
        }
      });
    }
    // changeDetail(state,json){
    //   state.detialItem = json;
    // }
  }
}

const riliDetail = {
  state:{
    /**
     * 日历静态数据
     */
    listItem:{
      id:0,
      title:"",
      content:"",
      isallday:"",
      starttime:"",
      schtime:"",
      strSchTime:""
    }
  },
  actions:{

  },
  mutations:{
    setRiliDetail(state,calendarId){
      netintech.ajaxCore.ajax(config.getScheduleById,{id:calendarId},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          state.listItem.id = calendarId;
          state.listItem.title = res.result.title;
          state.listItem.content = res.result.content;
          state.listItem.isallday = res.result.isallday;
          state.listItem.starttime = res.result.starttime;
          state.listItem.schtime = res.result.schtime;
          state.listItem.strSchTime = res.result.strSchTime;
        }
      });
    }
  }
}

const tztgList = {
  state:{
    ItemList:[],
    pageSize:1,
    currentPage:5,/**一页显示多少个数据**/
    total:0,
    allPage:0
  },
  actions:{
    ajaxmenuArrAC(store,arg){
      netintech.ajaxCore.ajax(config.getNotices,{currentPage:store.state.pageSize,pageSize:store.state.currentPage},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          store.state.ItemList = res.result;
          // console.log(store.state.ItemList);
          let total = res.total;
          let currentPage = store.state.currentPage;
          store.state.total = total;
          store.state.allPage = Math.ceil(total/currentPage);
        }
      });
    }
  },
  mutations:{
    changeItemList(state,pageSize){
      netintech.ajaxCore.ajax(config.getNotices,{currentPage:state.pageSize,pageSize:state.currentPage},"POST",{
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if(res.status == 10001){
          state.ItemList = res.result;
          let total = res.total;
          let currentPage = state.currentPage
          state.total = total;
          state.allPage = Math.ceil(total/currentPage);
          state.pageSize = pageSize;
        }
      });
    }
  }
}

const store = new Vuex.Store({
  modules: {
    QbdsjNotice,
    QbdsjSearch,
    Background,
    menuIcon,
    deskIcon,
    login,
    index,
    IndexShow,
    addIcon,
    dataPandect,
    informItem,
    Search,
    riliDate,
    riliList,
    riliDetail,
    settingBg,
    tztgList
  }
})

export default store
