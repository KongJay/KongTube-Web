<!--整体布局-->
<template>
  <div class="main-container"
       :style="{width:proxy.bodyMaxWidth+'px',
        minWidth:proxy.bodyMinWidth+'px'}">
    <div class="header">
      <LayoutHeader></LayoutHeader>
    </div>
    <div class="header-fixed" v-if="showFixedHeader">
      <LayoutHeader theme="dark"></LayoutHeader>
    </div>
    <Account></Account>
    <div class="body-inner"></div>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, getCurrentInstance, nextTick, onMounted} from "vue";
import LayoutHeader from "@/views/LayoutHeader.vue";

const {proxy} = getCurrentInstance();

import {useRoute, useRouter} from "vue-router";
import Account from "@/views/account/Account.vue";


const route = useRoute();
const router = useRouter();
onMounted(() => {
  window.addEventListener("scroll", windowScrollHandler);
})
const showFixedHeader = ref(false);
const windowScrollHandler = () => {
  var curScrollTop = window.scrollY;
  if (curScrollTop <= 20) {
    showFixedHeader.value = false;
  } else {
    showFixedHeader.value = true;
  }
}
</script>
<style>
body {
  background: #ededed !important;
}
</style>
<style lang="scss" scoped>
.main-container {
  background: #fff;
  margin: 0px auto;
  min-height: calc(100vh);


  .header {
    margin: 0px auto;
    height: 180px;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    position: relative;
    background-image: url("../assets/banner_bg.png");
  }

  .body-inner {
    height: 20000px;
  }

  .header-fixed {

    position: fixed;
    width: 100%;
    top: 0px;
  }
}
</style>