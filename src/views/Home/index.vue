<script setup>
import { ref } from 'vue'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { programData, miniProgramData } from '@/assets/data/programData.js'
const programList = ref([])

programList.value = [programData.length, miniProgramData.length]
</script>
<template>
  <div class="page-container">
    <pagetitle>學程檢查平台</pagetitle>
    <p>
      本校至今已有設置{{ programList[0] }}個學分學程、{{
        programList[1]
      }}個微學程，為使本校學生在畢業前了解自身所學課程與各學程間的相關性，故建立本平台以利同學查詢。
    </p>
    <p class="warn">
      部分學程因規則複雜，故本系統資訊僅供參考，認證時仍須依各學程規定辦理，且申請認證的科目須至少1門非學生主系的專業科目。
    </p>
    <el-row class="tabGroup" justify="space-evenly">
      <el-col class="tab" :span="7" :xs="11">
        <RouterLink to="/programs"><el-button class="tab1">學分學程檢查</el-button></RouterLink>
      </el-col>
      <el-col class="tab" :span="7" :xs="11">
        <RouterLink to="/programs"><el-button class="tab1">微學程檢查</el-button></RouterLink>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
p {
  font-size: medium;
  &.warn {
    font-size: 14px;
    display: inline;
    font-weight: bold;
    background-color: var(--el-color-warning);
    color: var(--el-color-danger);
  }
}

.tabGroup {
  margin-top: 20px;
}
.tab {
  /* background-color: red; */
  text-align: center;
}
.tab1 {
  font-size: 40px;
  border-radius: 20px;
  padding: 80px 50px;
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 767px) {
  .tab1 {
    font-size: 20px;
    padding: 50px 20px;
  }
}
</style>
