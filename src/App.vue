<script setup>
// 測試接口函數
import { getCategory } from '@/apis/testAPI'

getCategory().then((res) => {
  console.log(res)
})
</script>

<template>
  <!-- 一級路由出口組件 -->
  <RouterView />
</template>

<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>
