<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref } from 'vue'

const store = useProgramStore()
// console.log(store.programData)
// console.log(JSON.stringify(store.programData))
const programstruct = ref(store.programData)

console.log(programstruct.value.category)
// const categoryEditable = ref(false)
</script>
<template>
  <div class="page-container">
    <pagetitle>學程架構</pagetitle>

    <div class="programDetail">
      名稱: {{ programstruct.name }} <br />網址: {{ programstruct.url }} <br />類型: {{ programstruct.type }} <br />
      修畢條件: {{ programstruct.criteria }} <br />最低應修學分數: {{ programstruct.minCredit }} <br />非本系學分數:
      {{ programstruct.nonSelfCredit }} <br />設置單位: {{ programstruct.unit }} <br />{{ programstruct }}
      <div class="blank"></div>
      <div class="blank"></div>
      <div class="category" v-for="category in programstruct.category" :key="category.key">
        <div v-if="category.domain.length === 0">
          <!-- <el-button type="primary" @click="handleButtonClick">{{ category.categoryName }}</el-button> -->
          <router-link :to="{ name: 'setSubject', params: { categoryName: category.categoryName } }">{{
            category.categoryName
          }}</router-link>
        </div>
        <div v-else>
          {{ category.categoryName }}
        </div>
        <div class="domain" v-for="domain in category.domain" :key="domain.index">
          <router-link
            :to="{ name: 'setSubject', params: { categoryName: category.categoryName, domainName: domain.domainName } }"
            >{{ domain.domainName }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.blank {
  height: 1rem;
}
.domain {
  text-indent: 20px;
}
</style>
