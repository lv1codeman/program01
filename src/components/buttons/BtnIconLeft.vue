<template>
  <el-button class="btn" :class="buttonClass" :type="buttonType" @click="handleClick">
    <font-awesome-icon :icon="buttonIcon" class="mr-2" />
    <slot>送出</slot>
  </el-button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  onClick: {
    type: Function,
    required: true
  },
  customClass: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'primary'
  }
})

const emit = defineEmits(['click'])
const buttonClass = computed(() => props.customClass)
const buttonType = computed(() => props.type)
const buttonIcon = computed(() => props.icon)
const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
/* 你可以在这里添加自定义样式 */
.btn {
  line-height: 0;
  margin-left: 30px;
}
</style>
