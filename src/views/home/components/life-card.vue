<template>
  <div class="life-card">
    <span>{{ item.content }}</span>
    <img :src="item.image_urls[0]" alt="">
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  item: any
}>()
</script>

<style lang="less" scoped>
.life-card {
  margin-bottom: 24px;
  background-color: #fff;

  img {
    width: 100%;
    max-height: 78px;
  }
}
</style>
