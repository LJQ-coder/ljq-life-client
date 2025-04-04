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
    <div class="home-content">
      <LifeCard
        v-for="item in posts"
        :key="item.id"
        v-bind="{ item }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { postApi } from "@/api/modules"
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const posts = ref<any[]>([])

watch(() => authStore.userInfo, async (newUserInfo) => {
  if (newUserInfo) {
    const res: any = await postApi.getPosts(newUserInfo.id)
    posts.value = res.posts
  }
}, { immediate: true })
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .icon-xiaoxizhongxin {
    font-size: 18px;
  }

  .home-content {
    padding: 24px;
  }
}
</style>
