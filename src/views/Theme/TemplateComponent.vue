<template>
  <div class="templateSelect">
    <div :class="`template${templateNumber}`" @click="handleClick">
      <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  colors: {
    type: Array,
    required: true
  },
  templateNumber: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['select'])

const handleClick = () => {
  emit('select', props.templateNumber)
}
</script>

<style lang="scss" scoped>
.templateSelect {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .template {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
  }

  @for $i from 1 through 6 {
    .template#{$i} {
      @extend .template;
    }
  }
}
</style>
