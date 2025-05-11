<template>
 <div>
   <router-link v-if="userId"  :to="`/user/${userId}`" target="_blank">
     <Cover
         :lazy="lazy"
         :width="width"
         :source="avatar"
         :defaultImage="defaultAvatar"
         borderRadius="50%"
         :scale="1"
     >
       </Cover>
   </router-link>
   <Cover
       v-else
       :lazy="lazy"
       :source="avatar"
       :defaultImage="defaultAvatar"
       borderRadius="50%"
       :scale="1"
       :width="width"
   >
   </Cover>
 </div>
</template>
<script setup lang="ts">
import {ref, getCurrentInstance} from "vue";
import {useRoute, useRouter} from "vue-router";
import Cover from '@/components/Cover.vue'
const {proxy} = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const defaultAvatar = ref("user.png");
const props = defineProps({
  userId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  width: {
    type: Number,
    default: 50
  },
  lazy: {
    type: Boolean,
    default: true
  }
})
</script>
<style scoped lang="scss">

</style>