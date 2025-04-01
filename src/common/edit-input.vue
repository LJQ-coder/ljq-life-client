<template>
  <div class="simple-input">
    <textarea
      v-model="editorContent"
      rows="8"
      placeholder="填写描述"
      class="border rounded p-2 w-full"
    />
    <div class="input-size">
      已输入 {{ editorContent.length }} 字
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useVModel } from '@/composable/useVModel'

const props = defineProps<{
  modelValue: string,
}>()

const emit = defineEmits(['update:modelValue'])

const editorContent = useVModel(props, emit, 'modelValue');
</script>

<style lang="less" scoped>
.simple-input textarea {
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  border: none;
}

.input-size {
  color: gray;
  text-align: right;
}
</style>
