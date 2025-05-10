<template>
  <el-config-provider :locale="zhCn" :message="config">
      <router-view/>
  </el-config-provider>
</template>

<script setup lang="ts">
import {ElConfigProvider} from 'element-plus'

import {ref, reactive, getCurrentInstance, nextTick} from "vue";
const {proxy} = getCurrentInstance();
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const config = ref({
  max: 1,
});
</script>
<style lang="scss" scoped>

</style>
