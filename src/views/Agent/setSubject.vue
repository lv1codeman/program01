<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref } from 'vue'

// const generateData = () => {
//   const data = []
//   const states = [
//     'California',
//     'Illinois',
//     'Maryland',
//     'Texas',
//     'Florida',
//     'Colorado',
//     'Connecticut'
//   ]

//   states.forEach((city, index) => {
//     data.push({
//       label: city,
//       key: index
//     })
//   })
//   return data
// }

// const data = ref(generateData())
const value = ref([])
</script>
<template>
  <div class="page-container">
    <pagetitle>設定課程</pagetitle>
    <el-transfer v-model="value" filterable filter-placeholder="State Abbreviations" :data="data" />
  </div>
</template>
<style lang="scss" scoped></style>
