<template>
  <el-button :class="props.customClass" :type="props.type" @click="handleClick" :style="props.style">
    <font-awesome-icon :icon="props.icon" :class="props.iconClass" />
    <slot>送出</slot>
  </el-button>
</template>

<script setup>
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
  },
  style: {
    type: Object,
    default: () => ({})
  },
  iconClass: {
    type: String,
    default: 'mr-2'
  }
})

const emit = defineEmits(['click'])

/* 如果父元件傳來的值需要做計算或轉換，這邊可以這樣寫
    const buttonType = computed(() => props.type)
  並且在<template>中原本的
    :type="props.type"
  需替換成
    :type="buttonType"
*/

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped></style>
