<template>
  <el-config-provider :locale="zhCn" :message="config">
      <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {ElConfigProvider} from 'element-plus'

import {ref, reactive, getCurrentInstance, nextTick, onBeforeMount} from "vue";
const {proxy} = getCurrentInstance();
import {useRoute, useRouter} from "vue-router";
import VueCookies from "vue-cookies";
const route = useRoute();
const router = useRouter();
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {useLoginStore} from "@/stores/loginStore";
import {useCategoryStore} from "@/stores/categoryStore";
const categoryStore = useCategoryStore();
const loginStore = useLoginStore();


const config = ref({
  max: 1,
});
//自动登录
const autoLogin= async () => {
  const token = VueCookies.get("token");
  if(!token){
    return;
  }
  let result = await proxy.Request({
    url: proxy.Api.autoLogin,
  });
  if(!result){
    return;
  }
  saveLoginInfo(result.data);
};
const saveLoginInfo = (loginInfo) => {
  if(!loginInfo){
    loginStore.saveUserInfo({});
  }else {
    loginStore.saveUserInfo(loginInfo);

  }
}
//分类
let categoryList = [];
let categoryMap = {};
const loadCategory = async () => {
  let result = await proxy.Request({
    url: proxy.Api.loadAllCategory,
  });
  if(!result){
    return;
  }
  categoryList = result.data;
  result.data.forEach((element) => {
    categoryMap[element.categoryCode] = element;
    element.children.forEach((item) => {
      categoryMap[item.categoryCode] = item;
    })
  });
  categoryStore.saveCategoryMap(categoryMap);
  categoryStore.saveCategoryList(categoryList);
};
onBeforeMount(() => {
  loadCategory();
  autoLogin();
});
</script>
<style lang="scss" scoped>

</style>
