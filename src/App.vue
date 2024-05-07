<script setup>
// 測試接口函數
// import { getServerData } from '@/apis/testAPI'

// getServerData().then((res) => {
//   console.log('from @/apis/testAPI: ', res)
// })
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
