<template>
  <div class="search-mask" :class="{hide:!showSearch}" @click.self="closeSearch">
    <div class="search-wrap hide">
      <a href="#" class="main-search-icon" @click="openSearchDetail()"></a>
      <input class="main-search" placeholder="搜索网页和应用" ref="mainsearch" v-model="searchWord"  v-show="showSearch" v-focus @keyup.enter="openSearchDetail()"/>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchWord:""
      }
    },
    computed: {
      /**
       * 是否打开搜索框
       * @returns {computed.showSearch|boolean|*}
       */
      showSearch: function () {
        return this.$store.state.QbdsjSearch.showSearch
      }
    },
    methods: {
      /**
       * 关闭搜索框
       * @param e event
       */
      closeSearch: function (e) {
        this.$store.commit('toggleSearch')
        this.$refs.mainsearch.value = ''
      },
      openSearchDetail(){
        let word = this.searchWord;
        console.log(word);
        if(word == ""){

          netintech.msg("请输入查找内容。");
        }else{
          this.$store.commit('showSearchOpen1');
          this.$store.commit('searchAI',word);
          this.$store.commit('toggleSearch');
          this.$refs.mainsearch.value = '';
          this.searchWord='';
        }
      }
    }
  }
</script>

<style>
  .search-wrap {
    position: absolute;
    left: 50%;
    transform: translateX(-55%);
    top: 10%;
    width: 498px;
    height: 48px;
    z-index: 99;
  }

  .main-search {
    border-style: solid;
    border-width: 1px;
    border-color: rgb(0, 0, 0);
    border-radius: 5px;
    background-image: linear-gradient(90deg, rgb(227, 227, 227) 0%, rgb(255, 255, 255) 61%);
    box-shadow: 0.5px 0.866px 40px 0px rgba(0, 0, 0, 0.22);
    width: 498px;
    height: 48px;
    font-size: 16px;
    color: #B4B4B4;
    line-height: 2.375;
    font-weight: bold;
    padding-left: 67px;
    padding-right: 15px;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #B4B4B4;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #B4B4B4
  }

  input:-ms-input-placeholder {
    color: #B4B4B4;
  }

  input::-webkit-input-placeholder {
    color: #B4B4B4;
  }

  .search-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .search-mask.hide {
    z-index: -1;
  }

  /**/

  .main-search-icon {
    position: absolute;
    width: 50px;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: url('../../../static/image/main-search.png') no-repeat center center;
  }

  .main-search-icon:after {
    content: "";
    position: absolute;
    right: 0;
    width: 1px;
    height: 38px;
    border-left: 1px solid rgb(192, 192, 192);
    top: 50%;
    transform: translateY(-50%);
  }

</style>
