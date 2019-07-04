<template>
  <div class="item" :class="{show:showItem}">
    <div class="item-divider">
							<span class="divider-icon">
								<img src="../../../static/image/rili.png"/>
							</span>
      <span class="divider-title" style="color: #000;">日历</span>
      <span class="clearFix1" @click="openRili()">更多</span>
    </div>
    <ul class="item-list">
      <li class="item-detile" v-for="(item,index) in underlinpic" >
        <a href="#" @click="openRiliDetail(item.id)"><span class="item-time">{{allDay(item.starttime)}}</span><span v-html="item.title" class="item_title" :title="item.title"></span></a>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    props: ['showItem'],
    computed: {
      underlinpic () {
        let list = this.$store.state.riliDate.listItem;
        /**
         * sortTime创建函数根据sortTime从小到大排序
         **/
        function  sortTime(a,b){
          return a.starttime-b.starttime
        }
        /**
         * 将starttime等于null改为数值0
         **/
        for(let i=0;i<list.length;i++){
          if(list[i].starttime == null){
            list[i].starttime = 0;
          }
        }

        list.sort(sortTime).reverse();

        if (list.length == 0){
          list = [{
            "title":"",
            "starttime":"-1"
          },{
            "title":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今日无日程",
            "starttime":"-1",
          },{
            "title":"",
            "starttime":"-1",
          }]
        }
        /**
         * 截取前3个数组值
         */
        return list.slice(0,3);
      }
    },
    methods:{
      openRili(){
        this.$store.commit('closeAll');
        this.$store.commit('showRili1')
      },
      openRiliDetail(id){
        if(id != undefined){
          this.$store.commit('closeAll');
          this.$store.commit('showRiliDetailOpen')
          this.$store.commit('setRiliDetail',id)
        }
      },
      allDay(string){
        if(string == undefined || string == ""){
          return "全天"
        }else if(string == '-1'){
          return ""
        }else{
          return string
        }
      }
    }
  }
</script>

<style>
.clearFix1{ position: absolute; right: 30px; cursor: pointer;}
.clearFix1:active{ opacity: 0.6;}
.item-time{vertical-align: middle;}
.item_title{max-width:140px;max-height:50px;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;display: inline-block;vertical-align: middle;}
.item-detile{ overflow: hidden;}
</style>
