<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref } from 'vue'
import { subjectList } from '@/assets/data/subjectList.js'

const store = useProgramStore()
console.log(store.programData)
console.log(JSON.stringify(store.programData))

const generateData = () => {
  const data = []

  subjectList.forEach((item, index) => {
    data.push({
      label:
        item.subjectID +
        '/' +
        item.subjectName +
        '/' +
        item.unit +
        '/' +
        item.sys +
        '/' +
        '(' +
        item.credit +
        '/' +
        item.hour +
        ')',
      key: index
    })
  })
  return data
}

const data = ref(generateData())
const value = ref([])
const showRes = () => {
  console.log(value.value)
}
</script>
<template>
  <div class="page-container">
    <pagetitle>設定課程</pagetitle>

    <el-transfer
      v-model="value"
      filterable
      filter-placeholder="State Abbreviations"
      :data="data"
      :titles="['單位科目', '學程科目']"
      :button-texts="['左移', '右移']"
    >
      <template #left-footer>
        <el-button class="transfer-footer" size="default" style="visibility: hidden">showRes</el-button>
      </template>
      <template #right-footer>
        <el-button class="transfer-footer" size="default" @click="showRes">顯示結果</el-button>
      </template>
    </el-transfer>
    <pagetitle>課程檢查</pagetitle>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-transfer) {
  text-align: center;
  --el-transfer-panel-width: 400px;
}
:deep(.el-transfer-panel__list) {
  overflow-x: auto; // 啟用橫向卷軸
  white-space: nowrap; //避免內容換行
}
:deep(.el-transfer-panel__item) {
  display: inline-block;
  width: 500px; //設定內容item寬度，根據內容的長度調整
}
@media screen and (max-width: 818px) {
  :deep(.el-transfer) {
    --el-transfer-panel-width: 300px;
  }
}
</style>
