<template>
  <div>
    <div class="app-navbar">
      <i @click="switchTab('home')" class="iconfont icon-shouye-zhihui grid-item" :class="{ 'active': activeTab === 'home' }"></i>
      <van-uploader class="grid-item" :after-read="handleAfterRead" :multiple="false">
        <van-icon @click="switchTab('upload')" name="add" class="add-content grid-item"/>
      </van-uploader>
      <i @click="switchTab('profile')" class="iconfont icon-gerenzhongxin-zhihui grid-item" :class="{ 'active': activeTab === 'profile' }"></i>
    </div>
    <!-- 占位元素 -->
    <div class="navbar-placeholder"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router'
import { usePostStore } from '@/stores';

type TabType = 'home' | 'upload' | 'profile'

const router = useRouter()

const activeTab = ref('home')

const postStore = usePostStore()

const switchTab = (tab: TabType) => {
  activeTab.value = tab
  router.push({ name: tab })
}

const handleAfterRead = (files: any) => {
  postStore.setSelectedFiles(files)
  router.push({ name: 'upload' })
}
</script>

<style lang="less" scoped>
.app-navbar {
  position: fixed;  /* 新增固定定位 */
  bottom: 0;           /* 底部对齐 */
  left: 0;
  right: 0;
  z-index: 999;

  display: grid; /* 将父容器设为grid容器 */
  grid-template-columns: repeat(3, 1fr);
  height: 88px;
  padding: 0 16px 24px;
  background-color: white;
  border-radius: 16px 16px 0 0;

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    color: #a9a9a9;

    &.add-content {
      color: #487de3;
    }

    &.active {
      color: #383838;
      position: relative;

      &::after {
        position: absolute;
        content: ".";
        color: #487de3;
        top: 18px;
        left: 60px;
        // left: -12px;
      }
    }
  }
}

/* 占位元素样式 */
.navbar-placeholder {
  height: 88px; /* 与 app-navbar 高度相同 */
}
</style>    
