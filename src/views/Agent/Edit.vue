<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import regex from '@/assets/regex/regex.js'
import IconChild_more from '@/components/icons/IconChild_more.vue'
import IconChild_end from '@/components/icons/IconChild_end.vue'
import { unitList } from '@/assets/data/unitList.js'
import transToTree from '@/utils/tree/objToTree.js'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import BtnIconLeft from '@/components/buttons/BtnIconLeft.vue'
import { deleteProgram, getUnitPGById, submitProgram } from '@/apis/programAPI'
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
    // let user_unit = sessionStorage.getItem('user_unit')
    // console.log('user_unit=', user_unit)
    // console.log('store.currentPGId=', store.currentPGId)

    // let res = await getUnitPGById({ unit: user_unit, program_id: store.currentPGId })
    // console.log('res= ', res.data)
    // let resJson = transformServerJSON(res.data)
    // store.setProgramData(resJson)
    // programstruct.value = resJson
    programstruct.value = store.programData
    data.value = transToTree(programstruct.value)
  } catch (error) {
    console.error('Error loading data from server:', error)
  }
}
onMounted(() => {
  loadFromServer()
  console.log(programstruct.value)
  dynamicValidateForm.value['program_name'] = programstruct.value.program_name
  dynamicValidateForm.value['program_url'] = programstruct.value.program_url
  dynamicValidateForm.value['program_type'] = programstruct.value.program_type
  dynamicValidateForm.value['program_unit'] = programstruct.value.program_unit
  dynamicValidateForm.value['program_minCredit'] = programstruct.value.program_minCredit
  dynamicValidateForm.value['program_nonSelfCredit'] = programstruct.value.program_nonSelfCredit
  dynamicValidateForm.value['program_criteria'] = programstruct.value.program_criteria
})

const dynamicValidateForm = ref({})
const labelPosition = ref('right')

const gocheck = () => {
  router.push({ path: '/agent/create' })
}
const loading = ref(true)

// const updateProgram = async () => {
// 更新學程資料

// console.log('學程資料: ', JSON.stringify(store.programData))
// let res = await submitProgram(JSON.stringify(store.programData))
// console.log('submit response=', res)
// }
const backToManagePrograms = () => {
  router.push({ path: '/agent' })
}

const formRef = ref()
const unitListAll = unitList
const programOptions = ref(['學分學程', '微學程'])
const criteriaOptions = ref(['以課程數', '以學分數'])
const minNonSelfCredit = ref(1)
const minCredit = ref(15)
const typeChange = () => {
  if (dynamicValidateForm.value.program_type == '微學程') {
    // 設定最小值為0
    minNonSelfCredit.value = 0
    // 設定非本系學分數值為0
    dynamicValidateForm.value.program_nonSelfCredit = 0
    // 設定最小值為8
    minCredit.value = 8
    // 設定最低學分數值為8
    dynamicValidateForm.value.program_minCredit = 8
  } else {
    if (dynamicValidateForm.value.program_nonSelfCredit == 0) {
      minNonSelfCredit.value = 1
      dynamicValidateForm.value.program_nonSelfCredit = 1
      minCredit.value = 15
      dynamicValidateForm.value.program_minCredit = 15
    }
  }
}
const rules = ref({
  program_name: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  program_url: { required: true, pattern: regex.reg_url, message: '網址格式錯誤', trigger: 'blur' },
  program_type: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  program_unit: { required: true, message: '請輸入單位名稱', trigger: 'blur' },
  program_criteria: { required: true, message: '請輸入修畢條件', trigger: 'blur' },
  program_minCredit: { required: true, message: '請輸入最低應修學分數', trigger: 'blur' },
  program_nonSelfCredit: { required: true, message: '請輸入非本系學分數', trigger: 'blur' }
})

const submit = async (formEl) => {
  if (!formEl) {
    return
  }

  formEl.validate(async (valid) => {
    if (valid) {
      // 寫入學程資料
      store.programData.program_name = dynamicValidateForm.value.program_name
      store.programData.program_url = dynamicValidateForm.value.program_url
      store.programData.program_type = dynamicValidateForm.value.program_type
      store.programData.program_unit = dynamicValidateForm.value.program_unit
      store.programData.program_minCredit = dynamicValidateForm.value.program_minCredit
      store.programData.program_nonSelfCredit = dynamicValidateForm.value.program_nonSelfCredit
      store.programData.program_criteria = dynamicValidateForm.value.program_criteria

      // 檢查學程架構
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
      // 如果學程架構有誤，resultMsg會有訊息，否則為空白
      if (!resultMsg) {
        // 回傳到server端
        console.log('學程資料: ', JSON.stringify(store.programData))
        // 刪除DB中原本的program，將目前修改好的新增到DB
        console.log('store.currentPGId = ', store.currentPGId)
        const resD = await deleteProgram({ program_id: store.currentPGId })
        console.log('delete res = ', resD)
        let res = await submitProgram(JSON.stringify(store.programData))
        console.log('submit response=', res)

        ElMessage({
          type: 'success',
          message: '學程修改成功',
          showClose: true,
          duration: 3000,
          offset: window.screen.height / 15
        })
        router.push({ path: '/agent' })
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
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const needEdit = ref(false)
const getClass = (c) => {
  needEdit.value = true
  return {
    noSubject: !c.domain.length > 0 && (!c.course || c.course.length == 0)
  }
}
const getClassD = (d) => {
  needEdit.value = true
  return {
    noSubject: (d.course && !d.course.length > 0) || !d.course
  }
}

const check = (c) => {
  if (!c.domain.length > 0 && (!c.course || c.course.length == 0)) return '未設定科目，點此可編輯科目'
  else {
    return '已設定科目，點此可繼續編輯'
  }
}
const checkD = (d) => {
  if ((d.course && !d.course.length > 0) || !d.course) return '未設定科目，點此可編輯科目'
  else {
    return '已設定科目，點此可繼續編輯'
  }
}

const checkPencil = (c) => {
  if (!c.domain.length > 0 && (!c.course || c.course.length == 0)) return true
  else {
    return false
  }
}
const checkPencilD = (d) => {
  if ((d.course && !d.course.length > 0) || !d.course) return true
  else {
    return false
  }
}
</script>
<template>
  <div class="page-container">
    <pagetitle
      >學程資訊
      <el-button type="success" @click="submit(formRef)" class="ml-10">送出</el-button>
      <BtnIconLeft
        type="warning"
        icon="fa-circle-left"
        iconClass="mr-3 mb-1"
        @click="backToManagePrograms"
        :style="{ marginLeft: '10px', padding: '0 12px' }"
      >
        返回
      </BtnIconLeft>
    </pagetitle>
    <div v-if="programstruct">
      <el-form
        ref="formRef"
        :model="dynamicValidateForm"
        :label-position="labelPosition"
        label-width="auto"
        class="demo-dynamic"
        :hide-required-asterisk="true"
        :rules="rules"
      >
        <!-- el-form加入這行以套用驗證 :rules="rules" -->
        <div class="program-setting">
          <el-form-item class="my-grid-item" prop="program_name" label="學程名稱" clearable>
            <el-input v-model="dynamicValidateForm.program_name" placeholder="請輸入學程名稱" />
          </el-form-item>
          <el-form-item class="my-grid-item" prop="program_url" label="學程網址" clearable>
            <el-input v-model="dynamicValidateForm.program_url" placeholder="請輸入學程網址" />
          </el-form-item>
          <el-form-item class="my-grid-item" prop="program_type" label="學程類型">
            <el-segmented v-model="dynamicValidateForm.program_type" :options="programOptions" @change="typeChange" />
          </el-form-item>

          <el-form-item class="my-grid-item" prop="program_criteria" label="修畢條件">
            <el-segmented v-model="dynamicValidateForm.program_criteria" :options="criteriaOptions" />
          </el-form-item>
          <el-form-item class="my-grid-item" prop="program_minCredit" label="">
            <template #label
              ><span class="lineHeight1">最低應修<br />學分數</span></template
            >
            <el-input-number v-model="dynamicValidateForm.program_minCredit" :min="minCredit" :max="30" />
          </el-form-item>
          <el-form-item class="my-grid-item" prop="program_nonSelfCredit" label="非本系學分數">
            <template #label
              ><span class="lineHeight1">非本系學<br />分數</span></template
            >
            <el-input-number v-model="dynamicValidateForm.program_nonSelfCredit" :min="minNonSelfCredit" :max="10" />
          </el-form-item>
          <el-form-item class="my-grid-item" prop="program_unit" label="設置單位">
            <el-select
              v-model="dynamicValidateForm.program_unit"
              filterable
              placeholder="請選擇單位(可輸入文字篩選)"
              style="width: 240px"
            >
              <el-option v-for="item in unitListAll" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <pagetitle>學程架構</pagetitle>
      <div class="program-structure" v-for="category in programstruct.category" :key="category.key">
        <div style="display: flex" v-if="category.domain.length === 0">
          <el-tooltip popper-class="tps" class="box-item" effect="dark" :content="check(category)" placement="right">
            <router-link
              class="baseItem islink"
              :class="getClass(category)"
              style="margin-bottom: 10px"
              :to="{ name: 'setSubject', params: { category_name: category.category_name } }"
            >
              <span v-if="checkPencil(category)">
                <font-awesome-icon icon="fa-pencil" class="fontsize-15 mr-2"></font-awesome-icon>
              </span>
              {{ category.category_name }}
            </router-link>
          </el-tooltip>
        </div>
        <div v-else>
          <div class="baseItem" :class="getClass(category)">
            {{ category.category_name }}
          </div>
        </div>

        <div class="domainblock" v-for="(domain, index) in category.domain" :key="domain.index">
          <div class="domainblock_left">
            <span v-if="!(category.domain.length == index + 1)"
              ><IconChild_more class="set-icon-size"></IconChild_more
            ></span>
            <span v-else> <IconChild_end class="set-icon-size"></IconChild_end></span>
          </div>
          <div class="domainblock_right">
            <el-tooltip class="box-item" effect="dark" :content="checkD(domain)" placement="right">
              <router-link
                class="baseItem islink domain"
                :class="getClassD(domain)"
                :to="{
                  name: 'setSubject',
                  params: { category_name: category.category_name, domain_name: domain.domain_name }
                }"
              >
                <span v-if="checkPencilD(domain)">
                  <font-awesome-icon icon="fa-pencil" class="fontsize-15 mr-2"></font-awesome-icon> </span
                >{{ domain.domain_name }}</router-link
              >
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="description">請在以下樹形結構檢查學程架構是否正確</div>

      <el-tree class="tree" style="max-width: 600px" :data="data" :props="defaultProps" default-expand-all />
    </div>
    <div v-else class="loading" v-loading="loading">資料讀取中</div>
    <el-button type="success" @click="submit(formRef)">送出</el-button>
    <BtnIconLeft type="warning" icon="fa-circle-left" @click="backToManagePrograms"> 返回 </BtnIconLeft>
  </div>
</template>
<style lang="scss" scoped>
// element-plus預設在兩個按鈕之間有間隔12px
// .el-button + .el-button {
//   margin-left: 0px !important;
// }
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

.program-setting {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  column-gap: 10px;
  padding: 0 100px;
  .my-grid-item {
    grid-column: span 1;
  }
}
:deep(.el-segmented) {
  background-color: rgb(255, 255, 255);
}
.noSubject {
  color: var(--el-color-danger);
}
.box-item {
  background-color: red;
}
</style>
