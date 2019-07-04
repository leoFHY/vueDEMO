import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../router'

Vue.use(Vuex)
const settingBg = {
  state: {
    imgList: [
      // {
      //   'id':'1',
      //   'url': './static/image/bj/1.png'
      // },
      // {
      //   'id':'2',
      //   'url': './static/image/bj/2.png'
      // },
      // {
      //   'id':'3',
      //   'url': './static/image/bj/3.png'
      // },
      // {
      //   'id':'4',
      //   'url': './static/image/bj/4.png'
      // },
      // {
      //   'id':'5',
      //   'url': './static/image/bj/5.png'
      // },
      // {
      //   'id':'6',
      //   'url': './static/image/bj/6.png'
      // },
      // {
      //   'id':'7',
      //   'url': './static/image/bj/7.png'
      // },
      // {
      //   'id':'1',
      //   'url': './static/image/bj/1.png'
      // },
      // {
      //   'id':'2',
      //   'url': './static/image/bj/2.png'
      // },
      // {
      //   'id':'3',
      //   'url': './static/image/bj/3.png'
      // },
      // {
      //   'id':'4',
      //   'url': './static/image/bj/4.png'
      // },
      // {
      //   'id':'5',
      //   'url': './static/image/bj/5.png'
      // },
      // {
      //   'id':'6',
      //   'url': './static/image/bj/6.png'
      // },
      // {
      //   'id':'7',
      //   'url': './static/image/bj/7.png'
      // },
      // {
      //   'id':'5',
      //   'url': './static/image/bj/5.png'
      // },
      // {
      //   'id':'6',
      //   'url': './static/image/bj/6.png'
      // },


    ],
    imgList2: [],
    imgShowIndex: 1,
    isShow: true,
    pageSize: 8,
    currentBg: "",//存储当前页面图片URL
    currentPicId: "",
  },
  actions: {
    ajaxmenuArrAC(store, arg) {
      netintech.ajaxCore.ajax(config.getBackgroundPic, {}, "POST", {
        Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
      }).done((res) => {
        if (res.status == 10001) {

          store.state.imgList2 = res.result.bgimg;
          store.state.currentPicId = res.result.imgId;
        }
      });
    }
  },
  getters: {
    imgListGetters(state, getters, rootState, rootGetters) {
      let imgList2 = state.imgList2;
      let pageSize = state.pageSize;
      let settingBgPageNums = getters.settingBgPageNums;
      let imgShowIndex = state.imgShowIndex;
      if (imgShowIndex < 1) {
        imgShowIndex = 1;
      } else if (imgShowIndex > settingBgPageNums) {
        imgShowIndex = settingBgPageNums
      }
      return state.imgList2.slice((imgShowIndex - 1) * state.pageSize, (imgShowIndex) * state.pageSize)
    },
    settingBgPageNums(state) {
      return Math.ceil(state.imgList2.length / state.pageSize)
    },
    settingBgPrevIndex(state, getters) {
      if (state.imgShowIndex <= 1) {
        return getters.settingBgPageNums
      }
      return state.imgShowIndex - 1
    },
    settingBgNextIndex(state, getters) {
      if (state.imgShowIndex >= getters.settingBgPageNums) {
        return 1
      }
      return state.imgShowIndex + 1
    }
  },
  mutations: {

    /**
     *
     * @param state
     * @param num 页数
     */
    // changeBg(state, num) {
    //   let thisNum = (num - 1) * 8;
    //   let list = state.imgList2;
    //   let newList = [];
    //   for (let i = 0; i < 8; i++) {
    //     newList.push(list [thisNum + i]);
    //   }
    //   console.log(newList);
    //
    //   state.imgList = newList;
    //
    // },
    imgShowIndexMU(state, arg) {
      state.imgShowIndex = arg;
    },
    currentPicIdMU(state,arg){
      state.currentPicId=arg;
    }


  }
};
export default settingBg

