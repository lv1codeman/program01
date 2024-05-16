<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref } from 'vue'
import subjectList from '@/assets/data/subjectList.js'
const generateData = () => {
  const data = []
  const data_pre = []

  subjectList.forEach((item) => {})
  // subjectList.subjectID + subjectList.subjectName

  const states = [
    '1EIEE2002530 碩士班 論文寫作(一)',
    'Illinois',
    'Maryland',
    'Texas',
    'Florida',
    'Colorado',
    'Connecticut'
  ]

  states.forEach((city, index) => {
    data.push({
      label: city,
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
  --el-transfer-panel-width: 400px;
}
@media screen and (max-width: 818px) {
  :deep(.el-transfer) {
    --el-transfer-panel-width: 300px;
  }
}
</style>
