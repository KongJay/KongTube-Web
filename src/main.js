import '@/assets/scss/base.scss'

import ModalDialog from '@/components/ModalDialog.vue'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import '@/assets/icon/iconfont.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies'
import Verify from "@/utils/Verify.js";
import Message from "@/utils/Message.js";
import Request from "@/utils/Request.js";
import {Api} from "@/utils/Api.js";
import Avatar from "@/components/Avatar.vue";
import Cover from "@/components/Cover.vue";
import Confirm from "@/utils/Confirm.js";
import Utils from "@/utils/Utils.js";
const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.component('modalDialog', ModalDialog)
app.component('avatar', Avatar)
app.component('cover', Cover)
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.bodyMaxWidth = 1850;
app.config.globalProperties.bodyMinWidth = 1250;
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.Api = Api;
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.imageThumbnailSuffix = "_thumbnail.jpg";
app.mount('#app')