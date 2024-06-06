<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, onUnmounted } from 'vue'
// import IconNextLevel from '@/components/icons/IconNextLevel.vue'
// import IconNextLevel_more from '@/components/icons/IconNextLevel_more.vue'
import IconChild_more from '@/components/icons/IconChild_more.vue'
import IconChild_end from '@/components/icons/IconChild_end.vue'
import transToTree from '@/utils/tree/objToTree.js'
const store = useProgramStore()
const programstruct = ref(store.programData)
// const ps = programstruct
console.log(`programstruct= ${programstruct.value.category[0].categoryName}`)

const data = transToTree(programstruct.value)

// console.log(`ps: ${data}`)

// ps.value.category.forEach((c) => {
//   console.log(`c name: ${c.categoryName}`)
//   c.domain.forEach((d) => {
//     console.log(`domain name: ${d.domainName}`)
//   })
// })

const defaultProps = {
  children: 'children',
  label: 'label'
}

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
    <div class="program-structure" v-for="category in programstruct.category" :key="category.key">
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

      <div class="domainblock" v-for="(domain, index) in category.domain" :key="domain.index">
        <div class="domainblock_left">
          <span v-if="!(category.domain.length == index + 1)"
            ><IconChild_more class="set-icon-size"></IconChild_more
          ></span>
          <span v-else> <IconChild_end class="set-icon-size"></IconChild_end></span>
        </div>
        <div class="domainblock_right">
          <el-tooltip class="box-item" effect="dark" content="點我開始設定課程" placement="right">
            <router-link
              class="baseItem islink domain"
              :to="{
                name: 'setSubject',
                params: { categoryName: category.categoryName, domainName: domain.domainName }
              }"
            >
              {{ domain.domainName }}</router-link
            >
          </el-tooltip>
        </div>
        <!-- <div>
          <div class="courseblock" v-for="(course, index) in domain.course" :key="course.index">
            <div class="courseblock_left">
              <span v-if="!(domain.course.length == index + 1)"
                ><IconChild_more class="set-icon-size"></IconChild_more
              ></span>
              <span v-else> <IconChild_end class="set-icon-size"></IconChild_end></span>
            </div>
            <div class="courseblock_right">
              {{ course.subjectName }}
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <el-tree
    class="tree"
    style="max-width: 600px"
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    default-expand-all
  />
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
// .set-icon-size {
//   width: 30px;
// }
.tree {
  margin: 20px 0 0 50px;
}
.program-structure {
  padding-left: 50px;
}

.domainblock {
  display: flex;
  padding-left: 10px;
  // flex-wrap: wrap;
}
.domainblock_right {
  display: flex;
  align-items: center;
  width: 85%;
  padding: 5px 0;
}

.courseblock {
  display: flex;
  padding-left: 40px;
}
.courseblock_right {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.set-icon-size {
  // float: left;
  // margin-right: 50px;
  height: 100%;
}

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
  // margin-top: 5px;
  background-color: #ccc;
  border: none;
}
.domain {
  // margin-left: 50px;
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
  // margin-top: 5px;
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
