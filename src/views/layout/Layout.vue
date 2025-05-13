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
    <!--- 固定在顶部-->
    <div class="category-fixed">
      <div class="category-fixed-inner"
           v-show="showFixedCategory && navActionStore.fixedCategory"
           :style="{
      'max-width':proxy.bodyMaxWidth+'px',
      'min-width':proxy.bodyMinWidth+'px',
      }"
           @mouseover="lineCategoryMouseHandler(1)"
           @mouseout="lineCategoryMouseHandler(0)"
      >
        <Category :showType="1"  :mouseOver="mouseOver"></Category>
      </div>
    </div>

    <div class="body-container"
         :style="{
      'max-width':proxy.bodyMaxWidth+'px',
      'min-width':proxy.bodyMinWidth+'px',
      }"
    >
      <div class="category">
        <Category :showType="0"></Category>
      </div>
      <div class="body-main">
        <router-view></router-view>
      </div>
    </div>
    <Account></Account>
  </div>
</template>
<script setup lang="ts">
import {mitter} from "@/eventbus/eventBus.js";
import {ref, reactive, getCurrentInstance, nextTick, onMounted, onUnmounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {navActionStore} from "@/store/navActionStore.js";

const {proxy} = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const navActionStore = navActionStore();
import LayoutHeader from "@/views/layout/LayoutHeader.vue";
import Account from "@/views/account/Account.vue";
import Category from "@/views/layout/Category.vue";

onMounted(() => {
  window.addEventListener("scroll", windowScrollHandler);
  window.addEventListener("resize", windowResizeHandler);
})
onUnmounted(() => {
  window.removeEventListener("scroll", windowScrollHandler);
  window.removeEventListener("resize", windowResizeHandler);
})
const showFixedHeader = ref(false);
const showFixedCategory = ref(false);
const showFixedTopHandler = (curScroollTop) => {
  if (curScrollTop <= 20) {
    showFixedHeader.value = false;
  } else {
    showFixedHeader.value = true;
  }
  if (curScrollTop > 250) {
    showFixedCategory.value = true;
  } else {
    showFixedCategory.value = false;
  }
}
const windowScrollHandler = () => {
  var curScrollTop = window.scrollY;
  showFixedTopHandler(curScrollTop);
  mitter.emit("windowScroll", curScrollTop);
}
const windowResizeHandler = () => {
  mitter.emit("windowResize")
}
const mouseOver = ref(false);
const lineCategoryMouseHandler =(type:number) =>{
    mouseOver.value = type == 1;
}
</script>
<style>
body {
  background: #ededed !important;
}
</style>
<style lang="scss" scoped>
.main-container {
  position: relative;
  background: #fff;
  margin: 0px auto;
  min-height: calc(100vh);

  .header {
    margin: 0px auto;
    height: 180px;
    background-color: #7c9ce1;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    position: relative;
    background-image: url("../../assets/banner_bg.png");
  }

  .header-fixed {
    position: fixed;
    width: 100%;
    z-index: 1001;
    top: 0px;
    background: #fff;
    height: 64px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  .category-fixed {
    position: fixed;
    z-index: 1000;
    top: 64px;
    width: 100%;
    background: #fff;
    padding: 10px 150px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

    .category-fixed-inner {
      margin: 0px auto;
    }
  }

  .body-container {
    padding: 0px var(--bodyPadding);

    .category {
      margin-top: 20px;
    }
    height: 1500px;
  }
}

@media screen and (max-width: 1500px) {
  .main-container {
    .body-container {
      padding: 0px 60px;
    }
  }
}
</style>