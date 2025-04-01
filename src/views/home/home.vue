<template>
  <div class="home">
    <AppHeader
      class="home-header"
      title="Home"
      hide-left
    >
      <template #right>
        <i class="iconfont icon-xiaoxizhongxin" />
      </template>
    </AppHeader>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.home {

  .icon-xiaoxizhongxin {
    font-size: 18px;
  }
}
</style>
