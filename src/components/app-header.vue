<template>
  <div>
    <div class="app-header">
      <div>
        <van-icon
          v-if="!hideLeft"
          @click="handleClick"
          name="arrow-left"
          class="left-icon"
        />
        <span class="title">{{ title }}</span>
      </div>
      <slot name="right"></slot>
    </div>
    <!-- 占位元素 -->
    <div class="header-placeholder"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  hideLeft: boolean
}>()

const emit = defineEmits(['clickBack'])

const handleClick = () => {
  emit('clickBack')
}

const message = () => {

}
</script>

<style lang="less" scoped>
.app-header {
  position: fixed;  /* 新增固定定位 */
  top: 0;           /* 顶部对齐 */
  left: 0;
  right: 0;
  z-index: 999;     /* 确保层级最高 */

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  width: 100%;
  background-color: #fff;
  padding: 0 16px;

  .left-icon {
    color: black;
  }

  .title {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
  }
}

/* 占位元素样式 */
.header-placeholder {
  height: 48px; /* 与 app-header 高度相同 */
}
</style>    
