<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { unitList } from '@/assets/data/unitList.js'
// import regex from '@/assets/regex/regex.js'
import { reactive, ref } from 'vue'
import { useProgramStore } from '@/stores/agentData.js'
import transformServerJSON from '@/utils/transformServerJSON.js'
const store = useProgramStore()
const formRef = ref()

import { selectProgram } from '@/apis/programAPI'
const loadFromServer = async () => {
  // 從SERVER讀取program_unit=user_unit的資料
  let res = await selectProgram({ unit: '公共事務與公民教育學系' })
  console.log('res= ', res.data)
  // 轉成系統JSON格式
  let resJson = transformServerJSON(res.data)
  console.log(JSON.stringify(resJson))
}

var categoryCount = 0
var domainCount = 1
//與下面的變數名稱互換來切換是否要有預設值，fot testing
const dynamicValidateForm_formal = reactive({
  program_name: '',
  program_url: '',
  program_type: '學分學程',
  program_unit: '',
  program_minCredit: 1,
  program_nonSelfCredit: 1,
  program_criteria: '以學分數',
  category: [
    {
      category_id: categoryCount++,
      category_Name: '類別1',
      category_MinCredit: 0,
      category_RequireNum: 0,
      domain: []
    }
  ]
})
const dynamicValidateForm = reactive({
  program_name: '學程1',
  program_url: '網址1',
  program_type: '學分學程',
  program_unit: '教育學院',
  program_minCredit: 1,
  program_nonSelfCredit: 1,
  program_criteria: '以學分數',
  category: [
    {
      category_id: categoryCount++,
      category_name: '類別1',
      category_minCredit: 0,
      category_requireNum: 0,
      domain: [
        // {
        //   domain_id: domainCount++,
        //   domain_name: '領域1',
        //   domain_minCredit: 0,
        //   domain_requireNum: 0
        // }
      ]
    }
  ]
})
console.log('dynamicValidateForm = ', JSON.stringify(dynamicValidateForm))
const addCategory = () => {
  dynamicValidateForm.category.push({
    // key: Date.now(),
    category_id: categoryCount++,
    category_name: '',
    category_minCredit: 1,
    category_requireNum: 1,
    domain: []
  })
}
const removeCategory = (item) => {
  const index = dynamicValidateForm.category.indexOf(item)
  if (index > 0) {
    dynamicValidateForm.category.splice(index, 1)
    categoryCount--
  } else {
    console.log('至少須有一個類別')
  }
}

const addDomain = (item) => {
  dynamicValidateForm.category[item].domain.push({
    // key: Date.now(),
    domain_id: domainCount++,
    domain_name: '',
    domain_minCredit: 1,
    domain_requireNum: 1
  })
}
const removeDomain = (categoryIndex, domain) => {
  const index = dynamicValidateForm.category[categoryIndex].domain.indexOf(domain)
  if (index !== -1) {
    dynamicValidateForm.category[categoryIndex].domain.splice(index, 1)
    domainCount--
  }
  console.log('removeDomain dynamicValidateForm = ', JSON.stringify(dynamicValidateForm))
}
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', JSON.stringify(dynamicValidateForm))
      store.setProgramData(dynamicValidateForm)
      router.push({ path: '/checkStructure' })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const programOptions = ref(['學分學程', '微學程'])
const criteriaOptions = ref(['以課程數', '以學分數'])

// console.log(unitList)
const unitListAll = unitList

const rules = ref({
  program_name: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  program_url: { required: true, /*pattern: regex.reg_url,*/ message: '網址格式錯誤', trigger: 'blur' },
  program_type: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  program_unit: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  program_criteria: { required: true, message: '請輸入修畢條件', trigger: 'blur' },
  program_minCredit: { required: true, message: '請輸入最低應修學分數', trigger: 'blur' },
  program_nonSelfCredit: { required: true, message: '請輸入非本系學分數', trigger: 'blur' }
})
const labelPosition = ref('right')

const checkDynamicValidateForm = () => {
  console.log(JSON.stringify(dynamicValidateForm))
}

const go_setSubject = () => {
  router.push({ path: '/setSubject' })
}
</script>

<template>
  <!--
  <font-awesome-icon icon="circle-plus" />
  <font-awesome-icon icon="trash-can" />
-->
  <div class="page-container">
    <pagetitle
      >學程設定
      <el-button @click="loadFromServer">由SERVER讀取</el-button>
    </pagetitle>
    <!-- 隱藏星號 :hide-required-asterisk="true" -->
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      :label-position="labelPosition"
      label-width="auto"
      class="demo-dynamic"
      :hide-required-asterisk="true"
      :rules="rules"
    >
      <!-- :rules="rules" -->
      <div class="program-setting">
        <el-form-item class="my-grid-item" prop="name" label="學程名稱" clearable>
          <el-input v-model="dynamicValidateForm.program_name" placeholder="請輸入學程名稱" />
        </el-form-item>
        <el-form-item class="my-grid-item" prop="url" label="學程網址" clearable>
          <el-input v-model="dynamicValidateForm.program_url" placeholder="請輸入學程網址" />
        </el-form-item>
        <el-form-item class="my-grid-item" prop="type" label="學程類型">
          <el-segmented v-model="dynamicValidateForm.program_type" :options="programOptions" />
        </el-form-item>

        <el-form-item class="my-grid-item" prop="criteria" label="修畢條件">
          <el-segmented v-model="dynamicValidateForm.program_criteria" :options="criteriaOptions" />
        </el-form-item>
        <el-form-item class="my-grid-item" prop="minCredit" label="">
          <template #label
            ><span class="lineHeight1">最低應修<br />學分數</span></template
          >
          <el-input-number v-model="dynamicValidateForm.program_minCredit" :min="1" :max="30" />
        </el-form-item>
        <el-form-item class="my-grid-item" prop="nonSelfCredit" label="非本系學分數">
          <template #label
            ><span class="lineHeight1">非本系學<br />分數</span></template
          >
          <el-input-number v-model="dynamicValidateForm.program_nonSelfCredit" :min="1" :max="10" />
        </el-form-item>
        <el-form-item class="my-grid-item" prop="unit" label="設置單位">
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

      <!-- 學程類別 -->
      <div class="outer-box">
        <template v-for="(category, categoryIndex) in dynamicValidateForm.category" :key="category.key">
          <div class="dynamicFormArea">
            <div class="form-title-container">
              <div class="formTitle-1">
                學程類別{{ categoryIndex + 1 }}&nbsp;
                <span class="delCategory" @click="removeCategory(category)">
                  <font-awesome-icon icon="circle-xmark" /> 刪除
                </span>
              </div>
              <!-- <div class="delCategory" @click="removeCategory(category)">
                <font-awesome-icon icon="circle-xmark" /> 刪除類別
              </div> -->
            </div>
            <div class="CategoryPanel">
              <!-- <div class="leftDomain" @click.prevent="removeCategory(category)">
                <span>刪除</span>
              </div> -->
              <div class="CategoryPanelRight">
                <!-- 類別名稱 -->
                <el-form-item
                  :label="'類別名稱'"
                  :prop="'category.' + categoryIndex + '.category_name'"
                  :rules="{
                    required: true,
                    message: '類別名稱不可為空',
                    trigger: 'blur'
                  }"
                >
                  <el-input v-model="category.category_name" placeholder="請輸入類別名稱" />
                </el-form-item>
                <!-- 最低學分數/課程數 -->
                <el-form-item
                  label=""
                  :prop="'category.' + categoryIndex + '.category_minCredit'"
                  :rules="{
                    required: true,
                    message: '類別最低學分數不可為空',
                    trigger: 'blur'
                  }"
                >
                  <template #label
                    ><span class="lineHeight1">最低學分數<br />/課程數</span></template
                  >
                  <el-input-number v-model="category.category_minCredit" :min="1" :max="30" />
                </el-form-item>
                <!-- 類別需求數 -->
                <el-form-item
                  :label="'類別需求數'"
                  :prop="'category.' + categoryIndex + '.category_requireNum'"
                  :rules="{
                    required: true,
                    message: '類別最低學分數不可為空',
                    trigger: 'blur'
                  }"
                >
                  <el-input-number v-model="category.category_requireNum" :min="1" :max="10" />
                </el-form-item>
              </div>
            </div>

            <!-- <hr /> -->
            <!-- 學程領域 -->
            <div class="indent">
              <div class="formTitle-2">學程領域</div>
              <template v-for="(domain, index) in category.domain" :key="domain.key">
                <div class="dynamicFormArea2">
                  <!-- <div class="delDomain" @click="removeDomain(categoryIndex, domain)">
                    <font-awesome-icon icon="circle-xmark" /> 刪除領域
                  </div>
                  <div class="formTitle-1">學程領域{{ categoryIndex + 1 }}-{{ index + 1 }}</div> -->

                  <div class="domainpanel">
                    <div class="leftDomain" @click="removeDomain(categoryIndex, domain)">
                      <div class="delDomainIcon">
                        <font-awesome-icon icon="circle-xmark" />
                      </div>
                    </div>
                    <div class="rightDomain">
                      <!-- 領域名稱 -->
                      <!-- :label="'學程領域' + (categoryIndex + 1) + '-' + (index + 1)" -->
                      <el-form-item
                        :label="'類別' + (categoryIndex + 1) + '>領域' + (index + 1)"
                        :prop="'category.' + categoryIndex + '.domain.' + index + '.domain_name'"
                        :rules="{
                          required: true,
                          message: '領域名稱不可為空',
                          trigger: 'blur'
                        }"
                      >
                        <el-input v-model="domain.domain_name" placeholder="請輸入領域名稱" />
                      </el-form-item>
                      <!-- 最低學分數/課程數 -->
                      <el-form-item
                        label=""
                        :prop="'category.' + categoryIndex + '.domain.' + index + '.domain_minCredit'"
                        :rules="{
                          required: true,
                          message: '領域最低學分數不可為空',
                          trigger: 'blur'
                        }"
                      >
                        <template #label
                          ><span class="lineHeight1">最低學分數<br />/課程數</span></template
                        >
                        <el-input-number v-model="domain.domain_minCredit" :min="1" :max="30" />
                      </el-form-item>
                      <!-- 領域需求數 -->
                      <el-form-item
                        :label="'領域需求數'"
                        :prop="'category.' + categoryIndex + '.domain.' + index + '.domain_requireNum'"
                        :rules="{
                          required: true,
                          message: '領域最低學分數不可為空',
                          trigger: 'blur'
                        }"
                      >
                        <el-input-number v-model="domain.domain_requireNum" :min="1" :max="10" />
                      </el-form-item>
                    </div>
                  </div>
                  <!-- <div class="commandarea">
                    <div class="delDomain" @click="removeDomain(categoryIndex, domain)">
                      <font-awesome-icon icon="circle-xmark" /> 刪除
                    </div>
                  </div> -->
                </div>
              </template>
              <div class="addDomain" @click="addDomain(categoryIndex)">
                <font-awesome-icon icon="circle-plus" /> 新增領域
              </div>
              <!-- <el-form-item style="margin-top: 10px">
                <el-button type="success" @click="addDomain(categoryIndex)">新增領域</el-button>
              </el-form-item> -->
            </div>
          </div>
        </template>
        <div class="addCategory" @click="addCategory"><font-awesome-icon icon="circle-plus" /> 新增類別</div>
      </div>
    </el-form>
    <el-button type="primary" @click="submitForm(formRef)">送出表單</el-button>
    <el-button @click="resetForm(formRef)">重設表單</el-button>
    <el-button @click="checkDynamicValidateForm">check result</el-button>
    <el-button @click="go_setSubject">go setSubject</el-button>
  </div>
  <el-backtop :right="30" :bottom="70" />
</template>

<style lang="scss" scoped>
$domain-border-color: rgb(133 133 133 / 40%);
$domain-border-radius: 10px;
$left-domain-size: 5%;
hr {
  border: 1px solid #4b4b4b60;
  margin: 20px 0;
}

.blankspace:empty {
  content: 'blank';
  color: red;
  line-height: 1;
}
.indent {
  margin-left: 5vw;
}
.dynamicFormArea {
  position: relative;
  border: 3px dotted rgba(73, 73, 73, 0.404);
  // border-radius: 10px;
  padding: 10px;
  margin-top: 50px;
}
.form-title-container {
  display: flex;
  justify-content: space-between;
  .formTitle-1 {
    position: absolute;
    background-color: var(--el-bg-color-page);
    top: -18px;
    left: 1rem;
    font-size: 22px;
    font-weight: bold;
    padding: 0 5px;
    margin-bottom: 10px;
  }
  .delCategory {
    // position: absolute;
    // display: none;
    // right: 10px;
    // top: -1.5rem;
    text-align: center;
    padding: 2px 5px;
    border: 2px solid $domain-border-color;
    border-radius: calc($domain-border-radius / 2);
    color: #4b4b4be0;
    font-size: 18px;
    font-weight: bold;
    background-color: var(--el-color-warning);
    border: 2px solid $domain-border-color;
    &:hover {
      background-color: var(--el-color-warning-light-3);
      // border: 2px solid white;
      color: #4b4b4b;
      cursor: pointer;
    }
  }
}

.formTitle-2 {
  font-size: 22px;
  font-weight: bold;
}
.dynamicFormArea2 {
  // background-color: #f9f3e3;
  // padding: 10px;
  // border-radius: 10px;
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

.domainpanel {
  display: flex;
  margin-bottom: 5px;
  .leftDomain {
    flex: $left-domain-size;
    border: 1px solid $domain-border-color;
    border-radius: $domain-border-radius 0 0 $domain-border-radius;
    // border-radius: $domain-border-radius;
    // padding: 20px 0;
    // margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--el-color-warning);
    color: #4b4b4be0;
    span {
      font-size: 18px;
    }
    .delDomainIcon {
      font-size: 30px;
    }
    &:hover {
      background-color: var(--el-color-warning-light-3);
      cursor: pointer;
    }
  }
  .rightDomain {
    flex: calc(100% - $left-domain-size);
    border: 1px solid $domain-border-color;
    border-left: none;
    border-radius: 0 $domain-border-radius $domain-border-radius 0;
    // border-radius: $domain-border-radius;
    // padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
.CategoryPanel {
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  .CategoryPanelRight {
    flex: calc(100% - $left-domain-size);
    border: 1px solid $domain-border-color;
    // border-left: none;
    // border-radius: 0 $domain-border-radius $domain-border-radius 0;
    border-radius: $domain-border-radius;
    // padding: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
}
.outer-box {
  // width: 70%;
  // display: grid;
  // grid-template-columns: 0.3fr minmax(100px, 1fr) minmax(100px, 1fr) 0.3fr;
}

.commandarea {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  .addDomain {
    flex: 50%;
  }
  .delDomain {
    flex: 50%;
  }
  &:last-child {
    margin-bottom: 0px;
  }
  &:first-of-type:is(:last-of-type) {
    margin-bottom: 0px;
  }
}

.addDomain,
.addCategory,
.delDomain {
  background-color: var(--el-color-primary);
  text-align: center;
  padding: 5px;
  border: 1px solid $domain-border-color;
  border-radius: calc($domain-border-radius);
  // color: #4b4b4be0;
  color: white;
  font-size: 18px;
  // font-weight: bold;
  &:hover {
    background-color: var(--el-color-primary-light-3);
    cursor: pointer;
  }
}
.delDomain {
  float: right;
  text-align: center;
  padding: 2px 10px;
  border: 1px solid $domain-border-color;
  border-radius: calc($domain-border-radius / 2);
  background-color: var(--el-color-warning);
  &:hover {
    background-color: var(--el-color-warning-light-3);
  }
}
.addCategory {
  margin: 20px 0;
}

.categoryCommand {
  margin: 20px 0;
}

.formTitle_area {
  font-size: 18px;
  font-weight: bold;
}
:deep(.el-input__inner::placeholder) {
  color: var(--el-text-color-placeholder);
}

:deep(.el-segmented) {
  background-color: rgb(255, 255, 255);
}
:deep(.el-form-item) {
  margin-top: 18px;
}
:deep(.el-form-item__label) {
  font-size: 16px;
}
:deep(.el-input__inner) {
  font-size: 16px;
}
:deep(.el-form-item__label-wrap) {
  padding-left: 10px;
}

// 處理label沒有垂直居中的問題
.lineHeight1 {
  height: auto;
  line-height: 1;
}

@media screen and (max-width: 767px) {
  :deep(.el-form-item) {
    margin-top: 5px;
    margin-right: 5px;
  }
  .program-setting {
    grid-template-columns: 1fr;
    padding: 0;
  }
  .domainpanel .rightDomain {
    display: block;
  }
  .CategoryPanel {
    .CategoryPanelRight {
      gap: 0px;
    }
  }
}
</style>
