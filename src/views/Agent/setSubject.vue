<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, computed } from 'vue'
import { subjectList } from '@/assets/data/subjectList.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useProgramStore()
// console.log(JSON.stringify(store.programData))

const targetCheck = () => {
  if (!route.params.domainName) {
    return [route.params.categoryName]
  } else {
    return [route.params.categoryName, route.params.domainName]
  }
}
const dialogSuccessVisible = ref(false)
const submitProgramData = () => {
  // console.log(tableData.value)
  console.log(store.programData)

  const target = targetCheck()
  console.log('target=', target)
  if (target.length > 1) {
    // 類別之下的領域
    console.log(target[0] + ' - ' + target[1])
    let categoryItem = store.programData.category.find((item) => item.categoryName === target[0])
    let domainItem = categoryItem.domain.find((item) => item.domainName === target[1])
    if (domainItem) {
      let temp = []
      tableData.value.forEach((item) => {
        temp.push(item)
      })
      domainItem.course = temp
    }
    console.log(domainItem)
  } else {
    // 只有類別
    console.log(target[0])
    let categoryItem = store.programData.category.find((item) => item.categoryName === target[0])
    if (categoryItem) {
      let temp = []
      tableData.value.forEach((item) => {
        temp.push(item)
      })
      categoryItem.course = temp
    }
    console.log(categoryItem)
  }
  console.log(store.programData)
  console.log(JSON.stringify(store.programData))
  dialogSuccessVisible.value = true
}

const pageTitle = computed(() => {
  const categoryName = route.params.categoryName
  const domainName = route.params.domainName
  let title = ''

  if (categoryName) {
    title += categoryName + '-'
  }

  if (domainName) {
    title += domainName + '-'
  }

  title += '課程設定'
  return title
})

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
const tableData = ref([])

const showRes = () => {
  console.log(value.value)
  value.value.forEach((item) => {
    console.log(subjectList[item])
    tableData.value.push(subjectList[item])
  })
}

const deleteRow = (index) => {
  tableData.value.splice(index, 1)
}
const delTable = () => {
  tableData.value = []
}
// const onAddItem = () => {
//   // now.setDate(now.getDate() + 1)
//   tableData.value.push({
//     id: 1,
//     unit: '電機工程學系',
//     subjectID: '1EIEE2002530',
//     sys: '碩士班',
//     subjectName: '論文寫作(一)',
//     subjectNameEng: 'Thesis Writing I',
//     credit: 3,
//     hour: 3
//   })
// }
const dialogSuccess = () => {
  dialogSuccessVisible.value = false
}
</script>
<template>
  <div class="page-container">
    <!-- <el-button @click="target">show</el-button> -->
    <pagetitle>{{ pageTitle }}</pagetitle>

    <el-transfer
      v-model="value"
      filterable
      filter-placeholder="請輸入關鍵字篩選"
      :data="data"
      :titles="['單位科目', '學程科目']"
      :button-texts="['左移', '右移']"
    >
      <template #left-footer>
        <el-button class="transfer-footer" size="default" style="visibility: hidden">showRes</el-button>
      </template>
      <template #right-footer>
        <el-button class="transfer-footer" size="default" @click="showRes">確認</el-button>
      </template>
    </el-transfer>
    <pagetitle>匯入前檢查</pagetitle>
    <el-table :data="tableData" style="width: 100%" max-height="500" stripe>
      <el-table-column fixed prop="id" label="ID" width="50" sortable />
      <el-table-column prop="subjectID" label="科目代碼" width="120" sortable />
      <el-table-column prop="subjectName" label="科目名稱" width="200" sortable />
      <el-table-column prop="unit" label="單位" width="120" />
      <el-table-column prop="sys" label="學制" width="120" />
      <el-table-column prop="subjectNameEng" label="科目英文名稱" width="300" />
      <el-table-column prop="credit" label="學分" width="120" />
      <el-table-column prop="hour" label="學時" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> Remove </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top: 10px" type="primary" @click="submitProgramData"> 匯入 </el-button>
    <el-button style="margin-top: 10px" @click="delTable"> 清空表格 </el-button>

    <el-dialog v-model="dialogSuccessVisible" style="width: 300px">
      <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
        <template #extra>
          <el-button type="primary" @click="dialogSuccess">Back</el-button>
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
/*scrollbar*/

// :deep(::-webkit-scrollbar) {
//   width: 15px;
// }
// :deep(::-webkit-scrollbar-thumb) {
//   -webkit-border-radius: 50px;
//   border-radius: 50px;
//   // border: 3px solid rgba(0, 0, 0, 0);
//   background-color: #b60808;
//   // box-shadow: 12px 12px 0 #5b5b5b inset;
//   border-left: none;
//   transition: 0.5s;
// }
// :deep(::-webkit-scrollbar-thumb:hover) {
//   box-shadow: 12px 12px 0 #9d9d9d inset;
// }

/*scrollbar*/
:deep(::-webkit-scrollbar) {
  width: 10px;
}
:deep(::-webkit-scrollbar:vertical) {
  width: 10px;
}
:deep(::-webkit-scrollbar:horizontal) {
  height: 10px;
}
:deep(::-webkit-scrollbar-thumb) {
  -webkit-border-radius: 4px;
  border-radius: 4px;

  background: var(--el-color-primary-light-5);
}

:deep(.el-transfer) {
  text-align: center;
  --el-transfer-panel-width: 400px;
}
:deep(.el-transfer-panel__list) {
  // overflow-x: auto; // 啟用橫向卷軸
  white-space: nowrap; //避免內容換行
}
:deep(.el-transfer-panel__item) {
  // display: inline-block;
  width: 500px; //設定內容item寬度，根據內容的長度調整
}
@media screen and (max-width: 818px) {
  :deep(.el-transfer) {
    --el-transfer-panel-width: 300px;
  }
}
</style>
