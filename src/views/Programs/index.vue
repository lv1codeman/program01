<template>
  <div class="page-container">
    <h2>學分學程檢查</h2>

    <div class="box">
      <h4>復健諮商學分學程</h4>
      <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: relative;

  .item {
    flex: 1;
  }
}
</style>
