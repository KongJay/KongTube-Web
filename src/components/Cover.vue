<template>
  <div id="image-panel" ref="coverRef"
       :style="{

    'border-radius': borderRadius,
    width: width?width+'px':'100%',
    height: width?width *scale + 'px':'100%',
       }">
    <el-image :lazy="lazy" :src=" fileSource || fileImage" :fit="fit" v-if="fileSource || fileImage">
      <template #placeholder>
        <div class="loding" :style="{height: loadingHeight + 'px'}">
          <img :src="proxy.Utils.getLocalImage('playing.gif')"/>
        </div>
      </template>
    </el-image>
    <div v-else class="no-image">
      请选择图片
    </div>
    <el-image-viewer
        v-if="showViewer"
        :hide-on-click-modal="true"
        @close="()=>{showViewer = false; }"
        :url-list="imageList"
        :teleported="true">


    </el-image-viewer>
  </div>
</template>
<script setup lang="ts">
import {computed, ref, getCurrentInstance, onMounted} from "vue";
const {proxy} = getCurrentInstance();
const props = defineProps({

  source: {
    type: [String, File]
  },
  width: {
    type: Number,
  },
  //图片类型
  fit: {
    type: String,
    default: 'scale-down'
  },
  //图片预览
  preview: {
    type: Boolean,
    default: false,
  },
  img404: {
    type: String,
    default: "404_cover.png"
  },
                                                                                                              defaultImage:{
    type: String,
  },
  //图片圆角
  borderRadius: {
    type: String,
    default: "5px",
  },
  lazy: {
    type: Boolean,
    default: true
  },
  //缩放比例
  scale: {
    type: Number,
    default: 0.6
  },
});
const fileImage = ref();
const fileSource = computed(() => {
  if(!props.source && !props.defaultImage){
    fileImage.value = null;
    return null;
  }
  if(!props.source && props.defaultImage){
    return proxy.Utils.getLocalImage(props.defaultImage);
  }
  if(props.source instanceof File){
    let img = new FileReader();
    img.readAsDataURL(props.source);
    img.onload=({target}) =>{
        fileImage.value = target.result;
    };
    return null;
  }else if(typeof props.source === "string"){
      return `${proxy.Api.sourcePath}${props.source}`;
  }else {
    return;
  }
})
const imageList = computed(() => {
  if(!props.preview){
    return [];
  }
  const sourceImg =
      proxy.Api.sourcePath + props.source.replace(proxy.imageThumbnailSuffix, "");
  return [sourceImg];
});
const showViewer = ref(false);
const showViewerHandle = () => {
  if(!props.preview){
    return;
  }
  showViewer.value=true;
};
const coverRef = ref();
const loadingHeight = ref();
onMounted(() => {
  loadingHeight.value = coverRef.value.clientWidth * props.scale;
})
</script>
<style scoped lang="scss">
.image-panel {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;


  :deep(.el-image) {
    width: 100%;
    height: 100%;

  }

  :deep(.is-loading) {
    display: none;
  }

  :deep(.el-image__wrapper) {
    position: relative;
    vertical-align: top;
    width: 100%;
    height: 100%;
    display: flex;
  }

  .icon-image-error {
    margin: 0px auto;
    font-size: 20px;
    color: #838383;
    height: 100%;
  }

  .loading {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {

      width: 20px;
    }
  }

  .no-image {
    text-align: center;
    color: #9f9f9f;
  }

}
</style>