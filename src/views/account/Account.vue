<template>
  <ModalDialog
      :show="loginStore.showLogin"
      :buttons=" dialogConfig.buttons"
      width="1000px"
      :showCancel="false"
      @close=" closeDialog">
    <div class="dialog-panel">
      <div class="bg">
        <img src="../../assets/login_bg.png"></img>
      </div>
      <el-form
          class="login-repister"
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          @submit.prevent>

        <div class="tab-panel">
          <div :class="[opType == 1 ? 'active' :'']" @click="showPanel(1)">登录</div>
          <el-divider direction="vertical"/>
          <div :class="[opType == 0 ? 'active' :'']" @click="showPanel(0)">注册</div>
        </div>

        <!--input输入-->
        <el-form-item prop="email">
          <el-input
              clearable
              placeholder="请输入邮箱"
              v-model.trim="formData.email"

              size="large"
          >
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" v-if="opType == 1"><!--            登录-->
          <el-input
              show-password
              placeholder="请输入密码"
              v-model.trim="formData.password"
              size="large"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <div v-if="opType == 0"> <!--        注册-->
          <el-form-item prop="nickName">
            <el-input
                clearable
                placeholder="请输入昵称"
                v-model.trim="formData.nickName"

                size="large"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="registerPassword">
            <el-input
                show-password
                placeholder="请输入密码"
                v-model.trim="formData.registerPassword"
                size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="reRegisterPassword">
            <el-input
                show-password
                placeholder="请再次输入密码"
                v-model.trim="formData.reRegisterPassword"
                size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <div class="input">
              <el-input
                  clearable
                  placeholder="请输入验证码"
                  v-model.trim="formData.checkCode"

                  size="large"
              >
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span>
                </template>
              </el-input>
            </div>
            <img :src="checkCodeInfo.checkCodebase64" @click="changeCheckCode"/>

          </div>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              size="large"
              class="login-btn"
              @click="dnSubmit">
          <span v-if="opType == 0">
            注册</span>
            <span v-if="opType == 1">
            登录</span>
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </ModalDialog>
</template>
<script setup lang="ts">
import {getCurrentInstance, nextTick, onMounted, onUpdated, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import type {ValidateCallback, ValidationRule} from "@/utils/Verify.js";
import validators from "@/utils/Verify.js";
import ModalDialog from "@/components/ModalDialog.vue";
import {Value} from "sass";
import {useLoginStore} from "@/stores/loginStore.js";
import md5 from "js-md5";
const {proxy} = getCurrentInstance();


const route = useRoute();
const router = useRouter();

const loginStore = useLoginStore();
const checkCodeInfo = ref({});
const closeDialog = () => {
  loginStore.setLogin(false);
}
const changeCheckCode = async () => {
  let result = await proxy.Request({
    url: proxy.Api.checkCode,
  });
  if (!result) {
    return;
  }
  checkCodeInfo.value = result.data;
}
const dialogConfig = ref({
  show: true,
  buttons: [],
})
const formData = ref({});
const formDataRef = ref();
const checkPassword = (rule: ValidationRule, value: string, callback: ValidateCallback) => {

  if (Value != formData.value.registerPassword) {
    callback(new Error(rule.message))
  } else {
    callback();
  }
}
const rules = {
  email: [{
    required: true,
    message: "请输入邮箱",
  },
    {
      validator: proxy.Verify.email,
      message: "请输入正确的邮箱",
    }],
  password: [{
    required: true,
    message: "请输入密码",
  },
  ],
  nickName: [{
    required: true,
    message: "请输入昵称",
  },
  ],
  registerPassword: [{
    required: true,
    message: "请输入密码",
  },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数组，字母，特殊字符，8-18位",
    }],
  reRegisterPassword: [{
    required: true,
    message: "请再次输入密码",
  },
    {
      validator: validators.password,
      message: "两次输入的密码不一致",
    }],
  checkCode: [{
    required: true,
    message: "请输入图片验证码",
  },]
};
const dnSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(params, formData.value);
    params.checkCodeKey = checkCodeInfo.value.checkCodeKey;
/*    if(opType.value == 1){
      params.password = md5(params.password);
    }*/
    let result = await proxy.Request({
      url: opType.value == 0 ?proxy.Api.register : proxy.Api.login,
      params,
      errorCallback:() =>{
        changeCheckCode();
      },
    });
    if (!result) {
      return;
    }
    if(opType.value == 0){
      proxy.Message.success("注册成功");
      showPanel(1);
    }else if(opType.value == 1) {
      proxy.Message.success("登录成功");
      loginStore.setLogin(false);
      loginStore.setUserInfo(result.data);
    }
  });
};
onUpdated(() => {
  showPanel(1);
})

const resetForm = () => {
  changeCheckCode();
  nextTick(() => {
        formDataRef.value.resetFields();
        formData.value = {};
      }
  )
}
const opType = ref(1);
const showPanel = (value: number) => {
  opType.value = value
  if(loginStore.showLogin){
    resetForm();
  }
}
onMounted(() => {
  showPanel(1);
})

</script>

<style scoped lang="scss">
.dialog-panel {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .bg {
    width: 450px;
    height: 580px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .login-repister {
    width: 350px;

    .tab-panel {
      margin: 10px auto;
      display: flex;
      width: 130px;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;

      .active {
        color: var(--blue2);
      }
    }

    .no-account {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      width: 100%;
    }

    .bottom-btn {
      margin-bottom: 0px;
    }
  }
}

.check-code-panel {
  display: flex;
  align-items: center;
  width: 100%;

  input {
    flex: 1;
  }

  .right-panel {
    margin-left: 5px;
    cursor: pointer;
  }

  .img {
    cursor: pointer;
  }
}
</style>