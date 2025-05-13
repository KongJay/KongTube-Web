<template>
  <div :class="['header-bar','header-bar-'+theme]">
    <div class="menu">
      <el-popover
          :width="categoryPartCount * (150 + 21) +24"
          trigger="hover"
          :show-arrow="false"
          :offset="22"
          placement="bottom-start"
      >
        <template #reference>
          <router-link to="/" class="iconfont icon-logo">
            首页
          </router-link>
        </template>
        <div class="nav-list">
          <div class="nav-part" v-for="index in categoryPartCount">
                <router-link class="nav-item" v-for="item in categoryStore.categoryList.slice(
                    (index-1) * partCount ,index * partCount
                )" :to="`/v/${item.categoryCode}`">
                  <span class="icon" v-if="item.icon">
                    <img :src="`${proxy.Api.sourcePath}${item.icon}`" />
                  </span>
                  <span class="category-name">{{item.categoryName}}</span>
                </router-link>
          </div>
        </div>
      </el-popover>
    </div>

    <div class="search-body">
      <div class="search-panel">
        <div class="search-panel-inner">
          <div class="input-panel">
            <input/>
            <div class="iconfont icon-search"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-panel">
      <div class="user-avatar">
        <template v-if="Object.keys(loginStore.userInfo).length>0">
          <Avatar
              class="avatar"
              :avatar="loginStore.userInfo.avatar"
              :userId="loginStore.userInfo.userId"
              :width="35"
              :lazy="false"
              @mouseover="getUserCountInfo"
          ></Avatar>
          <div class="user-info-panel">
            <div class="nick-name">
              {{ loginStore.userInfo.nickName }}
            </div>
            <div class="count-info">
              <div class="count-info-item">
                <div class="count-vale">{{ userCountInfo.focusCount }}</div>
                <div class="count-title">关注</div>
              </div>
              <div class="count-info-item">
                <div class="count-vale">{{ userCountInfo.fansCount }}</div>
                <div class="count-title">粉丝</div>
              </div>
              <div class="count-info-item">
                <div class="count-vale">{{ userCountInfo.currentCoinCount }}</div>
                <div class="count-title">硬币</div>
              </div>
            </div>
            <router-link
                :to="`/user/${loginStore.userInfo.userId}`"
                class="item iconfont icon-user"
            >
              <span class="item-name">个人中心</span>
              <span class="iconfont icon-left"></span>
            </router-link>
            <router-link
                :to="`/ucenter/video`"
                class="item iconfont icon-play"
            >
              <span class="item-name">投稿管理</span>
              <span class="iconfont icon-left"></span>
            </router-link>
            <div class="logout item iconfont icon-logout" @click="logout">退出登录</div>
          </div>
        </template>
        <Avatar
            v-else
            :width="35"
            :lazy="false"
            @click="login"
        ></Avatar>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-message"></div>
        <div>消息</div>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-collection"></div>
        <div>收藏</div>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-history"></div>
        <div>历史</div>
      </div>
      <div class="user-panel-item">
        <div class="iconfont icon-light"></div>
        <div>创作中心</div>
      </div>
      <div class="btn-upload">
        <el-button type="primary" @click="handleUpload" size="large">
          <span class="iconfont icon-upload"></span>
          <span>投稿</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, getCurrentInstance, onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCategotyStore} from "@/store/categoryStore.js";
const categoryStore = useCategotyStore();
const {proxy} = getCurrentInstance();
const route = useRoute();
const router = useRouter();
import {useLoginStore} from "@/stores/loginStore";
import Avatar from "@/components/Avatar.vue";

defineOptions({
  name: "LayoutHeader"
})

const loginStore = useLoginStore();

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  }
})

const handleUpload = () => {
  // 投稿逻辑
}
const login = () => {
  loginStore.setLogin(true);
};
const userCountInfo = ref({});
const getUserCountInfo = async () => {
  let result = await proxy.Request({
    url: proxy.Api.getUserCountInfo,
  });
  if (!result) {
    return;
  }
  userCountInfo.value = result.data;
}
const logout = async () => {
  proxy.Confirm({
    message: "确定要退出登录吗？",
    okfun: async () => {
      let result = await proxy.Request({
        url: proxy.Api.logout,
      })
      if (!result) {
        return;
      }
      loginStore.saveUserInfo({})
    }
  })
}
const partCount = 5;
const categoryPartCount = computed(() => {
  return Math.ceil(categoryStore.categoryList.length / partCount);
})

</script>

<style scoped lang="scss">
.header-bar {
  width: 100%;
  height: 64px;
  padding: 0px 25px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .search-body {
    color: #61666d;

    .search-panel {
      margin: 0px auto;
      position: relative;
      max-midth: 80px;

      .search-panel-inner {
        width: 100%;
        position: absolute;
        top: 10px;
        left: 0px;
        border: 1px solid #e3e5e7;
        border-radius: 8px;
        overflow: hidden;
        z-index: 1001;

        .input-panel {
          display: flex;
          align-items: center;
          background: #f1f2f3;

          input {
            width: 100%;
            border: none;
            background: #f1f2f3;
            border-radius: 5px;
            padding: 8px 10px;
            margin: 3px 10px 3px 10px;

            &:focus {
              outline: none;

            }
          }

          .iconfont {
            font-size: 20px;
            margin-right: 10px;
            color: #2f3238;
            width: 35px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
              background: #ddd;
            }
          }
        }
      }
    }
  }

  .menu {
    display: flex;
    align-items: center;

    a {
      text-decoration: none;

      &.router-link-active {
        font-weight: bold;
      }
    }

    .icon-logo {
      font-size: 16px;

      &::before {
        float: left;
        margin-top: -3px;
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }

  .user-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .user-avatar {
      position: relative;
      overflow: hidden;
      margin-right: 13px;
      height: 35px;
      width: 35px;

      .avatar {
        transition: transform 0.3s;
        position: absolute;
        z-index: 10001;
        left: 0px;
        top: 0px;
      }

      .user-info-panel {
        padding: 10px 20px 10px;
        background: #fff;
        width: 300px;
        position: absolute;
        top: 60px;
        left: -150px;
        border-radius: 5px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;

        .nick-name {
          font-size: 16px;
          text-align: center;
          line-height: 40px;
          color: var(--text3);
        }

        .count-info {
          margin: 10px 0px;
          display: flex;
          justify-content: space-around;

          .count-info-item {
            text-align: center;

            .count-title {
              color: var(--text3);
              margin-top: 5px;
            }

            .count-value {
              text-align: center;
              color: var(--text)
            }
          }
        }

        .item {
          font-size: 14px;
          display: block;
          text-align: left;
          line-height: 40px;
          color: var(--text3);
          padding: 0px 20px;
          text-decoration: none;
          display: flex;
          justify-content: space-between;

          .item-name {
            flex: 1;
          }

          &::before {
            margin-right: 15px;
          }

          &:hover {
            background: #e8e8e8;
            border-radius: 5px;
          }
        }

        .logout {
          display: block;
          margin-top: 10px;
          border-top: 1px solid #ddd;
          cursor: pointer;
        }
      }

      &:hover {
        overflow: visible;

        .avatar {
          transform: scale(2) translateY(10px) translateX(-10px);
        }

        .user-info-panel {
          opacity: 1;
        }
      }
    }

    .user-panel-item {
      text-align: center;
      cursor: pointer;
      padding: 0px 30px;

      .iconfont {
        text-align: center;
        font-size: 20px;
        font-weight: normal;
      }
    }

    .btn-upload {
      margin-left: 10px;

      .el-button {
        background: #fb7299;
        border-color: #fb7299;
        border-radius: 8px;
        padding: 0px 20px;

        .iconfont {
          &::before {
            margin-right: 5px;
          }
        }
      }
    }
  }

  &-light {
    color: #fff;

    .menu-item {
      color: #fff;
    }

    a {
      color: #fff;
    }
  }

  &-dark {
    background: white;
    color: #61666d;

    .menu-item {
      color: #61666d;
    }

    a {
      color: #61666d;
    }
  }
}
.nav-list{
 display: flex;
  .nav-part{
    &:last-child {
      border-right:none;
    }
    padding: 0px 10px;
    border-right:1px solid #ddd;
    .nav-item{
      display:flex;
      padding:0px 10px;
      height: 35px;
      border-radius:3px;
      cursor:pointer;
      align-items:center;
      width: 150px;
      text-decoration: none;
      color:#2f3238;
      &:hover {
        background: #ddd;
      }
      .icon {
        width: 25px;
        height: 25px;
        overflow: hidden;
        margin-right: 5px;

        img {
          width: 100%;
        }
      }
      .category-name{
        flex: 1;
      }
    }
  }
}
</style>