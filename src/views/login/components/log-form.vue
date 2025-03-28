<template>
    <div class="log-form">
        <ljq-input
            v-for="item in items"
            :key="item.prop"
            v-model="formData[item.prop]"
            :label="item.label"
            :placeholder="item.placeholder"
        />
        <van-button
          type="primary"
          @click="handleClick"
        >{{ btnText }}</van-button>
    </div>
</template>

<script setup lang="ts">
import { useVModel } from '@/composable/useVModel';

class ItemType {
  prop: string = '';
  label: string = '';
  placeholder: string = '';
}

const props = defineProps<{
  modelValue: Record<string, any>;
  items: ItemType[];
  btnText: String;
}>();

const emits = defineEmits(['update:modelValue', 'btn-click'])

const formData = useVModel<Record<string, any>, 'modelValue'>(props, emits, 'modelValue');

const handleClick = () => {
  emits('btn-click');
}
</script>

<style lang="less" scoped>
.log-form {
  .van-button {
    margin-top: 72px;
    width: 100%;
    border-radius: 48px;
  }
}
</style>
