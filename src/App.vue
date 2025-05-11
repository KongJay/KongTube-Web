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
const loginStore = useLoginStore();


const config = ref({
  max: 1,
});
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
onBeforeMount(() => {
  autoLogin();
})
</script>
<style lang="scss" scoped>

</style>
