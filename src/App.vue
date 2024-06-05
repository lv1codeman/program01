<script setup></script>

<template>
  <RouterView />
</template>

<style lang="scss">
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
