<template>
  <div class="item" :class="{show:showItem}">
    <div class="item-divider">
							<span class="divider-icon">
								<img src="../../../static/image/haibao.png"/>
							</span>
      <span class="divider-title" style="color: #000;">通知通告</span>
      <span class="clearFix1" @click="openTztgList()">更多</span>
    </div>
    <ul class="item-list">

      <li class="item-detile" v-for="(item,index) in underlinpic" @click="showDetail(item.id)">
        <span :title="item.title">{{item.title | omitTitle(13)}} </span>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    props: ['showItem'],
    computed: {
      underlinpic () {
        return this.$store.state.informItem.listItem
      }
    },
    methods: {
      showDetail(id){
        netintech.ajaxCore.ajax(config.getNoticeById,{id:id},"POST",{
          Authorization: netintech.BASE64.encode(netintech.getRandom6() + ':' + netintech.Storage.get('config').token)
        }).done((res) => {
          this.$store.commit('closeAll')
          this.$store.commit('changeDetail',res.result)
          this.$store.commit('showInformOpen1')
        });
      },
      openTztgList(){
        this.$store.commit('closeAll');
        this.$store.commit('showTztgList1')
      }
    }
  }
</script>

<style>
  .item-detile {
    height: 43px;
    position: relative;
    line-height: 50px;
    font-size: 14px;
    padding: 0 18px;
    color: #000;
    background:url("../../../static/image/underline.png") no-repeat bottom center;
    cursor: pointer;
  }
  .item-detile:last-child{
    background: none;
  }

  .item-detile:not(:last-child):after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 3px;
  }

  .item-detile > span {
    display: inline-block;
  }

  /*  */

  .item-detile > a {
    color: #000000;
  }

  .item-detile i {
    position: absolute;
    border-radius: 50%;
    background-color: rgb(255, 23, 23);
    width: 6px;
    height: 6px;
    left: 0px;
    top: 50%;
  }
  .clearFix1{ position: absolute; right: 30px; cursor: pointer;}
</style>
