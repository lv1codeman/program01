<script setup>
import BKbtn from '@/components/buttons'
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllSubjects } from '@/apis/subjectAPI'
const router = useRouter()
const route = useRoute()
const store = useProgramStore()
const loading = ref(true)
const pageShow = ref(false)

console.log('sessionStorage.getItem user_role', sessionStorage.getItem('user_role'))
pageShow.value =
  sessionStorage.getItem('user_role') == 'admin' || sessionStorage.getItem('user_role') == 'staff' ? true : false

if (!pageShow.value) {
  router.push({ path: '/login' })
}

// console.log('pageShow value=', pageShow.value)
console.log('route.params = ', route.params)

const targetCheck = () => {
  if (!route.params.domain_name) {
    return [route.params.category_name]
  } else {
    return [route.params.category_name, route.params.domain_name]
  }
}

const dialogSuccessVisible = ref(false)
const submitProgramData = () => {
  const target = targetCheck()
  if (target.length > 1) {
    // 類別之下的領域
    let categoryItem = store.programData.category.find((item) => item.category_name === target[0])
    let domainItem = categoryItem.domain.find((item) => item.domain_name === target[1])
    if (domainItem) {
      let temp = []
      tableData.value.forEach((item) => {
        temp.push(item)
      })
      domainItem.course = temp
    }
  } else {
    // 只有類別
    let categoryItem = store.programData.category.find((item) => item.category_name === target[0])
    if (categoryItem) {
      let temp = []
      tableData.value.forEach((item) => {
        temp.push(item)
      })
      categoryItem.course = temp
    }
  }

  console.log('route.params.isFromLoad =', route.params.isFromLoad)
  if (route.params.isFromLoad) {
    router.push({ path: '/agent/edit' })
  } else {
    router.push({ path: '/agent/check' })
  }

  // dialogSuccessVisible.value = true
}

const pageTitle = computed(() => {
  const category_name = route.params.category_name
  const domain_name = route.params.domain_name
  let title = ''

  if (category_name) {
    title += category_name + '-'
  }

  if (domain_name) {
    title += domain_name + '-'
  }
  return title
})

const subjectList = ref([])

const fetchAllSubject = async () => {
  try {
    let res = await getAllSubjects()
    subjectList.value = res
  } catch (error) {
    console.error('Error fetching subjects:', error)
  }
}

const generateData = () => {
  const data = []

  subjectList.value.forEach((item, index) => {
    data.push({
      key: index,
      label:
        item.subject_id +
        '. ' +
        item.subject_sub_id +
        '/' +
        item.subject_name +
        '/' +
        item.subject_unit +
        '/' +
        item.subject_sys +
        '/' +
        '(' +
        item.subject_credit +
        '/' +
        item.subject_hour +
        ')'
    })
  })
  // console.log('data=', data)
  return data
}

const target = targetCheck()
const selectedcourse = ref([])

const data = ref([])
const data2 = ref([])
const transferData = ref([])
const transferData2 = ref([])
const tableData = ref([])

onMounted(async () => {
  await fetchAllSubject()
  data.value = generateData()
  loading.value = false

  console.log('store.programData @ onMounted = ', store.programData)
  // console.log('target[0]=', target[0])

  let categoryItem = store.programData.category.find((item) => item.category_name === target[0])
  let domainItem = categoryItem?.domain.find((item) => item.domain_name === target[1])
  if (target.length > 1) {
    // 類別之下的領域
    if (domainItem?.course && domainItem.course.length > 0) {
      domainItem.course.forEach((item) => {
        transferData.value.push(item.subject_id - 1)
      })
    }
  } else {
    // 只有類別
    if (categoryItem?.course && categoryItem.course.length > 0) {
      categoryItem.course.forEach((item) => {
        transferData.value.push(item.subject_id - 1)
      })
    }
  }
  selectedcourse.value = transferData.value
  console.log(transferData.value)
  data2.value = data.value

  data.value = data2.value.filter((_, index) => !transferData.value.includes(index))
  // 在畫面產生時讀入已有的課程到"匯入前檢查"
  transferData.value.forEach((item) => {
    tableData.value.push(subjectList.value[item])
  })
})

const confirm = () => {
  transferData2.value.forEach((item) => {
    // 如果右transfer框的科目沒有在tableData中，則匯入課程
    if (!tableData.value.includes(subjectList.value[item])) tableData.value.push(subjectList.value[item])
  })

  const rightKeys = new Set(transferData2.value)
  console.log(rightKeys)
  // 左框排除右框的項目後存入左框
  data.value = data.value.filter((item) => !rightKeys.has(item.key))
  // 清空右框数据
  transferData2.value = []
}

const deleteRow = (index, row) => {
  console.log('row.subject_id = ', row.subject_id)
  console.log('刪除前:', transferData.value)
  // transferData.value = transferData.value.filter((value) => value !== row.subject_id)
  transferData.value.splice(index, 1)
  console.log('刪除後:', transferData.value)

  console.log('data2.value = ', data2.value)
  data.value = data2.value.filter((_, index) => !transferData.value.includes(index))
  console.log('data.value = ', data.value)
  tableData.value.splice(index, 1)
}
const delTable = () => {
  data.value = data2.value
  transferData.value = null
  tableData.value = []
}
const dialogSuccess = () => {
  dialogSuccessVisible.value = false
  router.push({ path: '/checkStructure' })
}

// const submit = async () => {
//   // 回傳到server端
//   console.log('學程資料: ', JSON.stringify(store.programData))
//   let res = await submitProgram(JSON.stringify(store.programData))
//   console.log('submit response=', res)
// }
</script>

<template>
  <div class="page-container">
    <pagetitle
      >{{ pageTitle }} 科目設定
      <!-- <el-button type="primary" style="margin-left: 10px">教學引導</el-button> -->
      <BKbtn
        type="primary"
        icon="fa-circle-play"
        iconClass="mr-4 fontsize-16"
        :style="{ marginLeft: '10px', padding: '0 12px' }"
      >
        教學引導
      </BKbtn>
      <BKbtn
        type="warning"
        icon="fa-circle-left"
        iconClass="mr-4 fontsize-16"
        @click="submitProgramData"
        :style="{ marginLeft: '10px', padding: '0 12px' }"
      >
        返回
      </BKbtn>
    </pagetitle>

    <el-transfer
      v-model="transferData2"
      filterable
      filter-placeholder="請輸入關鍵字篩選"
      :data="data"
      :titles="['單位科目', '學程科目']"
      :button-texts="['左移', '右移']"
      :right-default-checked="selectedcourse"
      v-loading="loading"
    >
      <template #left-footer>
        <el-button class="transfer-footer" size="default" style="visibility: hidden">showRes</el-button>
      </template>
      <template #right-footer>
        <!-- <el-button type="primary" class="transfer-footer" size="default" @click="confirm">確認</el-button> -->
        <BKbtn
          type="primary"
          icon="fa-check"
          iconClass="mr-4 fontsize-16"
          @click="confirm"
          :style="{ marginLeft: '10px', padding: '0 12px' }"
        >
          確認
        </BKbtn>
      </template>
    </el-transfer>
    <pagetitle>{{ pageTitle }} 科目列表</pagetitle>
    <div class="tabelDataBox">
      <el-table :data="tableData" style="width: 100%" max-height="500" stripe>
        <el-table-column fixed prop="subject_id" label="ID" width="50" sortable />
        <el-table-column prop="subject_sub_id" label="科目代碼" width="130" sortable />
        <el-table-column prop="subject_name" label="科目名稱" width="240" sortable />
        <el-table-column prop="subject_unit" label="單位" width="120" />
        <el-table-column prop="subject_sys" label="學制" width="120" />
        <!-- <el-table-column prop="subject_eng_name" label="科目英文名稱" width="300" /> -->
        <el-table-column prop="subject_credit" label="學分" width="120" />
        <el-table-column prop="subject_hour" label="學時" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index, scope.row)">
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-button style="margin-top: 10px" type="warning" @click="submitProgramData"> 返回 </el-button> -->
      <BKbtn
        type="warning"
        icon="fa-circle-left"
        iconClass="mr-4 fontsize-16"
        @click="submitProgramData"
        :style="{ marginTop: '10px', padding: '0 12px' }"
      >
        返回
      </BKbtn>
      <el-button style="margin-top: 10px" @click="delTable"> 清空表格 </el-button>
    </div>

    <el-dialog v-model="dialogSuccessVisible" style="width: 300px">
      <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
        <template #extra>
          <el-button type="primary" @click="dialogSuccess">返回學程資訊頁面</el-button>
          <!-- <el-button type="primary" @click="submit">送出</el-button> -->
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.tabelDataBox {
  padding: 0 90px;
}

/*scrollbar*/
:deep(::-webkit-scrollbar) {
  width: 10px;
}
:deep(::-webkit-scrollbar:vertical) {
  width: 15px;
}
:deep(::-webkit-scrollbar:horizontal) {
  height: 15px;
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
  white-space: nowrap;
}
:deep(.el-transfer-panel__item) {
  width: 500px;
}

@media screen and (max-width: 818px) {
  :deep(.el-transfer) {
    --el-transfer-panel-width: 300px;
  }
  .tabelDataBox {
    padding: 0;
  }
}
</style>
