<template>
  <div class="C101_button" @click="confirm()">确定</div>
</template>

<script>
  export default {
    methods:{
      confirm(){
        this.$store.commit('closeAll')
        this.$store.commit('confirmButtonClose')
      }
    }
  }
</script>

<style>
  .C101_button{ position: fixed; right: 30%; top: 8%; width: 80px; height: 35px; line-height: 35px; background-color: #F5932A; text-align: center; border-radius: 3px; cursor: pointer;}
  .C101_button:active{ opacity: 0.6;}
</style>
