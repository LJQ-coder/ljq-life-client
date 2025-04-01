<template>
  <div class="upload">
    <div>
      <AppHeader
        class="upload-header"
        title="Upload"
        @click-back="goBack"
      />
      <van-uploader v-model="fileList" :after-read="afterRead" :multiple="false"/>
      <div class="upload-caption">
        <EditInput v-model="content"></EditInput>
      </div>
      <van-divider />
    </div>

    <van-button
        type="primary"
        @click="publish"
      >发布笔记</van-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { usePostStore } from '@/stores'
import { postApi } from "@/api/modules"

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const content = ref('');
const fileList = ref()

onBeforeMount(() => {
  fileList.value = postStore.uploaderFiles
})

const afterRead = (files: any) => {
  fileList.value = [files]
}

// 定义编辑器的配置选项
const editorOptions = {
  theme: 'snow', // 主题样式
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // 加粗、倾斜、下划线、删除线
      ['blockquote', 'code-block'], // 引用、代码块
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 有序列表、无序列表
      [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进调整
      [{ 'size': ['small', false, 'large', 'huge'] }], // 字号选择
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 标题级别
      [{ 'color': [] }, { 'background': [] }], // 文字颜色、背景颜色
      [{ 'align': [] }], // 对齐方式
      ['link', 'image'] // 链接、图片
    ]
  }
};

// 编辑器初始化完成的回调函数
const handleEditorReady = () => {
  console.log('编辑器已准备好');
};

const publish = async () => {
  // const params = {
  //  content: content.value,
  //  title: '',
  //  file: fileList.value[0].file
  // }
  console.log(fileList.value[0])
  const formData = new FormData()
  formData.append('title', '')
  formData.append('content', content.value)
  formData.append('images', fileList.value[0].file)
  await postApi.postImage(formData)
}

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="less" scoped>
.upload {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  background-color: #fff;

  .upload-header {
    margin-bottom: 16px;
  }

  .upload-caption {
    margin-top: 16px;
  }

  .van-button {
    border-radius: 48px;
  }
}
</style>

