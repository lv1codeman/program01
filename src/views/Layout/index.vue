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
  <RouterView />
  <LayoutFooter />
</template>
