<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>
<template>
  <el-affix :offset="0">
    <LayoutNav />
    <LayoutHeader />
  </el-affix>
  <div class="page-container-outer">
    <RouterView />
  </div>
  <LayoutFooter />
</template>
<style scoped lang="scss">
.page-container-outer {
  min-height: 506px;
  background: var(--el-bg-color-page);
  padding-top: 5px;
}
</style>
