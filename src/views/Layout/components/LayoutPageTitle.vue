<template>
  <div class="pageTitle">
    <slot />
  </div>
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
.pageTitle::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: -5px;
  left: 0;
  filter: invert(91%) sepia(14%) saturate(209%) hue-rotate(159deg) brightness(100%) contrast(94%);
  background: url('@/assets/images/drop.png') no-repeat;
  background-size: contain;
  z-index: -1;
  // border: 2px solid blue;
}
</style>
