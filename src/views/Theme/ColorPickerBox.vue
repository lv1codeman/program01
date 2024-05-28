<!-- ColorPickerBox.vue -->
<template>
  <div class="colorBox">
    <div class="title"></div>
    <div class="showPalette-single">
      <div class="palette">
        <el-color-picker v-model="colorValue" :predefine="predefineColors" @change="handleChange" color-format="hex" />
      </div>
      <div>{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  predefineColors: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  cssVariable: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const colorValue = ref(props.modelValue)

watch(colorValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleChange = () => {
  emit('change', props.cssVariable, colorValue.value)
}
</script>

<style lang="scss" scoped>
.showPalette-single {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
  text-align: center;
  .palette {
    width: 50px;
  }
}
</style>
