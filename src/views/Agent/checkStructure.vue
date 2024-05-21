<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, onUnmounted } from 'vue'
import IconNextLevel from '@/components/icons/IconNextLevel.vue'
const store = useProgramStore()
// console.log(store.programData)
// console.log(JSON.stringify(store.programData))
const programstruct = ref(store.programData)

console.log(programstruct.value.category)
// const categoryEditable = ref(false)
const descriptionColNum = ref(3)
const descriptDirection = ref('horizontal')
const updateColumnNum = () => {
  if (window.innerWidth < 800) {
    descriptionColNum.value = 1
    descriptDirection.value = 'vertical'
  } else {
    descriptionColNum.value = 3
    descriptDirection.value = 'horizontal'
  }
}
updateColumnNum()
window.addEventListener('resize', updateColumnNum)

// 确保在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateColumnNum)
})
</script>
<template>
  <div class="page-container">
    <pagetitle>學程資訊</pagetitle>

    <el-descriptions
      class="margin-top"
      :column="descriptionColNum"
      size="default"
      border
      :direction="descriptDirection"
    >
      <!-- <template #extra>
        <el-button type="primary">Operation</el-button>
      </template> -->
      <el-descriptions-item label="名稱" label-align="center"> {{ programstruct.name }}</el-descriptions-item>
      <el-descriptions-item label="網址" label-align="center"> {{ programstruct.url }}</el-descriptions-item>
      <el-descriptions-item label="類型" label-align="center"> {{ programstruct.type }}</el-descriptions-item>
      <el-descriptions-item label="修畢條件" label-align="center"> {{ programstruct.criteria }}</el-descriptions-item>
      <el-descriptions-item label="最低應修學分數" label-align="center">
        {{ programstruct.minCredit }}</el-descriptions-item
      >
      <el-descriptions-item label="非本系學分數" label-align="center">
        {{ programstruct.nonSelfCredit }}</el-descriptions-item
      >
      <el-descriptions-item label="設置單位" label-align="center"> {{ programstruct.unit }}</el-descriptions-item>
    </el-descriptions>
    <pagetitle>學程架構</pagetitle>

    <div v-for="category in programstruct.category" :key="category.key">
      <div v-if="category.domain.length === 0">
        <el-tooltip class="box-item" effect="dark" content="點我開始設定課程" placement="right">
          <router-link
            class="baseItem islink"
            :to="{ name: 'setSubject', params: { categoryName: category.categoryName } }"
            >{{ category.categoryName }}</router-link
          >
        </el-tooltip>
      </div>
      <div v-else>
        <div class="baseItem">{{ category.categoryName }}</div>
      </div>
      <div v-for="domain in category.domain" :key="domain.index">
        <IconNextLevel class="next-level-icon" />
        <el-tooltip class="box-item" effect="dark" content="點我開始設定課程" placement="right">
          <router-link
            class="baseItem islink domain"
            :to="{ name: 'setSubject', params: { categoryName: category.categoryName, domainName: domain.domainName } }"
          >
            {{ domain.domainName }}</router-link
          >
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<!-- <style lang="scss">
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}
.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style> -->
<style lang="scss" scoped>
.blank {
  height: 1rem;
}

.cell-item {
  text-align: center;
}
.baseItem {
  // <router-link>最終是產生<a>，而<a>預設display: inline;所以要改成block
  display: block;
  padding: 5px 10px;
  font-size: 16px;
  width: fit-content;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #ccc;
  border: none;
}
.domain {
  margin-left: 50px;
}
// .nonlink {
//   background-color: #ccc;
//   border: none;
// }
.islink {
  display: block;
  background-color: $primaryColor;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  margin-top: 5px;
  // margin-left: 20px;
  width: fit-content;
  border: 1px solid var(--el-color-primary-light-3);
  color: white;
  &:hover {
    background-color: var(--el-color-primary-dark-2);

    cursor: pointer;
  }
}
</style>
