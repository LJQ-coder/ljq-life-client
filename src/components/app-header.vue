<template>
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
</style>
