<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
// import { ref } from 'vue'

const store = useProgramStore()
// console.log(store.programData)
// console.log(JSON.stringify(store.programData))
const programstruct = store.programData

console.log(programstruct.category)
</script>
<template>
  <div class="page-container">
    <pagetitle>頁面名稱</pagetitle>
  </div>
</template>
<style lang="scss" scoped></style>
