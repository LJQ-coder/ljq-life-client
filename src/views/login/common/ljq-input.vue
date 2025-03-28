<template>
  <div class="ljq-input">
    <span class="input-label">{{ label }}</span>
    <van-field
      v-model="innerValue"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useVModel } from '@/composable/useVModel';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  }
})

const emits = defineEmits(['update:modelValue'])

const innerValue = useVModel(props, emits, 'modelValue')
</script>

<style lang="less" scoped>
.ljq-input {
  margin-top: 32px;

  .input-label {
    display: inline-block;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 500;
    color: #3E3E3E;
  }

  .van-field {
    border-radius: 48px;
  }
}
</style>
