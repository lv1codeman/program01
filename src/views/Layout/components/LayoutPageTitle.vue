<script setup>
import IconDrop from '@/components/icons/IconDrop.vue'
</script>
<template>
  <div class="pageTitle"><IconDrop class="set-icon-size"></IconDrop><slot /></div>
</template>

<style scoped lang="scss">
.pageTitle {
  position: relative;
  font-size: 26px;
  font-weight: bolder;
  margin: 20px 0 10px 0;
  padding: 10px;
  z-index: 2;
  letter-spacing: 2px;
  color: var(--el-text-color-primary);
}
.set-icon-size {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -28px;
  left: -16px;
  z-index: -1;
  fill: var(--el-color-primary-light-7);
}
// .pageTitle::before {
//   content: '';
//   width: 100px;
//   height: 100px;
//   position: absolute;
//   top: -30px;
//   left: -20px;
//   // filter: invert(91%) sepia(14%) saturate(209%) hue-rotate(159deg) brightness(100%) contrast(94%);
//   fill: rgb(255, 0, 0);
//   // background: url('@/assets/images/drop.png') no-repeat;
//   background: url('@/assets/icon/drop.svg') no-repeat;
//   background-size: contain;
//   z-index: -1;
//   // border: 2px solid blue;
// }
</style>
