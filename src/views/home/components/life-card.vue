<template>
  <div class="life-card">
    <div class="card-content">
      <span>{{ item.content }}</span>
    </div>
    <div class="card-image">
      <img :src="item.image_urls[0]" alt="">
    </div>
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
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .card-content {
    padding: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  }

  .card-image {
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }
  }
}
</style>    
