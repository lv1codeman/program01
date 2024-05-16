<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref } from 'vue'
import { subjectList } from '@/assets/data/subjectList.js'
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
    />
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-transfer) {
  text-align: center;
  --el-transfer-panel-width: 500px;
}
@media screen and (max-width: 818px) {
  :deep(.el-transfer) {
    --el-transfer-panel-width: 300px;
  }
}
</style>
