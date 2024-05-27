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

<style lang="scss">
// :root {
//   --nav-bg-color: $nav-bg-color;
// }
.test {
  color: $priceColor;
}
::-webkit-scrollbar {
  width: 13px;
}
// ::-webkit-scrollbar:vertical {
//   width: 10px;
// }
// ::-webkit-scrollbar:horizontal {
//   height: 10px;
// }
::-webkit-scrollbar-thumb {
  // -webkit-border-radius: 4px;
  // border-radius: 4px;

  background: var(--nav-bg-color);
}
</style>
