<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import IconChild_more from '@/components/icons/IconChild_more.vue'
import IconChild_end from '@/components/icons/IconChild_end.vue'
import transToTree from '@/utils/tree/objToTree.js'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { getUnitPrograms, getUnitPGById, submitProgram } from '@/apis/programAPI'
import transformServerJSON from '@/utils/transformServerJSON.js'
const store = useProgramStore()
const programstruct = ref()
const router = useRouter()

// const data = transToTree(programstruct.value)

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
const data = ref([])

// 直接從store中讀取
// programstruct.value = store.programData
// data.value = transToTree(programstruct.value)

const loadFromServer = async () => {
  try {
    let user_unit = sessionStorage.getItem('user_unit')
    console.log('user_unit=', user_unit)
    console.log('store.currentPGId=', store.currentPGId)

    let res = await getUnitPGById({ unit: user_unit, program_id: store.currentPGId })
    console.log('res= ', res.data)
    let resJson = transformServerJSON(res.data)
    store.setProgramData(resJson)
    programstruct.value = resJson
    data.value = transToTree(programstruct.value)
  } catch (error) {
    console.error('Error loading data from server:', error)
  }
}
onMounted(() => {
  loadFromServer()
})
const gocheck = () => {
  router.push({ path: '/createStructure' })
}
const loading = ref(true)

// const updateProgram = async () => {
// 更新學程資料

// console.log('學程資料: ', JSON.stringify(store.programData))
// let res = await submitProgram(JSON.stringify(store.programData))
// console.log('submit response=', res)
// }
const backToManagePrograms = () => {
  router.push({ path: '/managePrograms' })
}

const submit = async () => {
  // 送出前檢查
  console.log(store.programData)
  let resultMsg = ''
  let p = store.programData

  p.category.forEach((c) => {
    // 如果類別沒有課程(代表要有領域)
    if (!c.course || c.course.length <= 0) {
      // 如果類別沒有領域，顯示訊息
      if (c.domain.length <= 0) {
        // console.log(`類別 ${c.category_name} 尚未指定科目`)
        resultMsg += '類別 ' + c.category_name + ' 尚未指定科目<br/>'
      } else {
        // 如果有領域，檢查領域
        c.domain.forEach((d) => {
          // 每個領域中，沒有科目的項目，顯示訊息
          if (!d.course || d.course.length <= 0) {
            // console.log(`領域 ${d.domain_name} 尚未指定科目`)
            resultMsg += '領域 ' + d.domain_name + ' 尚未指定科目<br/>'
          }
        })
      }
    }
  })
  console.log(resultMsg)
  if (!resultMsg) {
    // 回傳到server端
    console.log('學程資料: ', JSON.stringify(store.programData))
    let res = await submitProgram(JSON.stringify(store.programData))
    console.log('submit response=', res)

    ElMessage({
      type: 'success',
      message: '學程新增成功',
      showClose: true,
      duration: 3000,
      offset: window.screen.height / 15
    })
    router.push({ path: '/managePrograms' })
  } else {
    ElMessageBox.alert(resultMsg, '學程架構錯誤', {
      confirmButtonText: '確認',
      dangerouslyUseHTMLString: true,
      draggable: true
    })
      .then((res) => {
        console.log('user click  OK.', res)
      })
      .catch((e) => {
        console.log('user click cancel.', e)
      })
  }
}
</script>
<template>
  <div class="page-container">
    <pagetitle
      >學程資訊
      <el-button type="success" @click="submit" style="margin-left: 10px">送出</el-button>
      <el-button type="warning" @click="backToManagePrograms" style="margin-left: 10px">返回</el-button>
    </pagetitle>
    <div v-if="programstruct">
      <el-descriptions :column="descriptionColNum" size="default" border :direction="descriptDirection">
        <el-descriptions-item label="名稱" label-align="center"> {{ programstruct.program_name }}</el-descriptions-item>
        <el-descriptions-item label="設置單位" label-align="center">
          {{ programstruct.program_unit }}</el-descriptions-item
        >
        <el-descriptions-item label="類型" label-align="center"> {{ programstruct.program_type }}</el-descriptions-item>

        <el-descriptions-item
          class-name="item_url"
          label-class-name="item_url_label"
          label="網址"
          label-align="center"
          span="3"
        >
          <div class="item_url_content">
            {{ programstruct.program_url }}
          </div></el-descriptions-item
        >
        <el-descriptions-item label="修畢條件" label-align="center">
          {{ programstruct.program_criteria }}</el-descriptions-item
        >
        <el-descriptions-item label="最低應修學分數" label-align="center">
          {{ programstruct.program_minCredit }}</el-descriptions-item
        >
        <el-descriptions-item label="非本系學分數" label-align="center">
          {{ programstruct.program_nonSelfCredit }}</el-descriptions-item
        >
      </el-descriptions>
      <pagetitle>學程架構</pagetitle>

      <div class="program-structure" v-for="category in programstruct.category" :key="category.key">
        <div v-if="category.domain.length === 0">
          <el-tooltip class="box-item" effect="dark" content="點我開始設定課程" placement="right">
            <router-link
              class="baseItem islink"
              style="margin-bottom: 10px"
              :to="{ name: 'setSubject', params: { category_name: category.category_name } }"
              >{{ category.category_name }}</router-link
            >
          </el-tooltip>
        </div>
        <div v-else>
          <div class="baseItem">{{ category.category_name }}</div>
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
                  params: { category_name: category.category_name, domain_name: domain.domain_name }
                }"
              >
                {{ domain.domain_name }}</router-link
              >
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="description">請在以下樹形結構檢查學程架構是否正確</div>

      <el-tree class="tree" style="max-width: 600px" :data="data" :props="defaultProps" default-expand-all />
    </div>
    <div v-else class="loading" v-loading="loading">資料讀取中</div>
    <el-button type="warning" @click="backToManagePrograms">返回</el-button>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-loading-mask) {
  background-color: rgba(255, 255, 255, 0.5);
}

.loading {
  height: 200px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_url_content {
  word-break: break-all;
}

.description {
  margin: 30px 0;
}
:deep(.el-tree-node__content) {
  padding: 15px;
}
.tree {
  margin: 20px 0 20px 50px;
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
