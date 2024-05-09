<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { unitList } from '@/assets/data/unitList.js'
// import regex from '@/assets/regex/regex.js'
import { reactive, ref } from 'vue'

const formRef = ref()
const dynamicValidateForm = reactive({
  name: '',
  url: '',
  type: '',
  unit: '',
  minCredit: 0,
  nonSelfCredit: 0,
  criteria: '',
  category: [
    {
      key: 1,
      categoryName: '',
      categoryMinCredit: 0,
      categoryRequireNum: 0,
      domain: [
        {
          key: 1,
          domainName: '',
          domainMinCredit: 0,
          domainRequireNum: 0
        }
      ]
    }
  ]
})

const removeCategory = (item) => {
  const index = dynamicValidateForm.category.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.category.splice(index, 1)
  }
}
const removeDomain = (categoryIndex, domain) => {
  const index = dynamicValidateForm.category[categoryIndex].domain.indexOf(domain)
  if (index !== -1) {
    dynamicValidateForm.category[categoryIndex].domain.splice(index, 1)
  }
}

const addCategory = () => {
  dynamicValidateForm.category.push({
    key: Date.now(),
    categoryMinCredit: 0,
    categoryRequireNum: 0,
    domain: [
      {
        key: 1,
        domainName: '',
        domainMinCredit: 0,
        domainRequireNum: 0
      }
    ]
  })
}

const addDomain = (item) => {
  console.log('before add Domain: ', dynamicValidateForm)
  dynamicValidateForm.category[item].domain.push({
    key: Date.now(),
    categoryMinCredit: 0,
    categoryRequireNum: 0
  })
  console.log('After add Domain: ', dynamicValidateForm)
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(dynamicValidateForm)
      resAB.value = dynamicValidateForm

      console.log(dynamicValidateForm.category)
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
  name: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  url: { required: true, /*pattern: regex.reg_url,*/ message: '網址格式錯誤', trigger: 'blur' },
  type: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  unit: { required: true, message: '請輸入學程名稱', trigger: 'blur' },
  criteria: { required: true, message: '請輸入修畢條件', trigger: 'blur' },
  minCredit: { required: true, message: '請輸入最低應修學分數', trigger: 'blur' },
  nonSelfCredit: { required: true, message: '請輸入非本系學分數', trigger: 'blur' }
})
const labelPosition = ref('right')
const resAB = ref()

const checkDynamicValidateForm = () => {
  console.log(dynamicValidateForm)
}
</script>

<template>
  <div class="page-container">
    <pagetitle>學程設定</pagetitle>
    <!-- 隱藏星號 :hide-required-asterisk="true" -->
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      :label-position="labelPosition"
      label-width="auto"
      class="demo-dynamic"
      :hide-required-asterisk="true"
    >
      <!-- :rules="rules" -->
      <div class="program-setting">
        <el-form-item class="grid-item" prop="name" label="學程名稱" clearable>
          <el-input v-model="dynamicValidateForm.name" />
        </el-form-item>
        <el-form-item class="grid-item" prop="url" label="學程網址" clearable>
          <el-input v-model="dynamicValidateForm.url" />
        </el-form-item>
        <el-form-item class="grid-item" prop="type" label="學程類型">
          <el-segmented v-model="dynamicValidateForm.type" :options="programOptions" />
        </el-form-item>

        <el-form-item class="grid-item" prop="criteria" label="修畢條件">
          <el-segmented v-model="dynamicValidateForm.criteria" :options="criteriaOptions" />
        </el-form-item>
        <el-form-item class="grid-item" prop="minCredit" label="">
          <template #label
            ><span class="lineHeight1">最低應修<br />學分數</span></template
          >
          <el-input-number v-model="dynamicValidateForm.minCredit" :min="1" :max="30" />
        </el-form-item>
        <el-form-item class="grid-item" prop="nonSelfCredit" label="非本系學分數">
          <el-input-number v-model="dynamicValidateForm.nonSelfCredit" :min="1" :max="10" />
        </el-form-item>
        <el-form-item class="grid-item" prop="unit" label="設置單位">
          <el-select
            v-model="dynamicValidateForm.unit"
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
        <template
          v-for="(category, categoryIndex) in dynamicValidateForm.category"
          :key="category.key"
        >
          <div class="dynamicFormArea">
            <div class="formTitle-1">學程類別{{ categoryIndex + 1 }}</div>
            <div class="domainpanel">
              <div class="leftDomain" @click.prevent="removeCategory(category)">
                <span>刪除</span>
              </div>
              <div class="rightDomain">
                <el-form-item
                  :label="'類別名稱'"
                  :prop="'category.' + categoryIndex + '.categoryName'"
                  :rules="{
                    required: true,
                    message: '類別名稱不可為空',
                    trigger: 'blur'
                  }"
                >
                  <el-input v-model="category.categoryName" />
                </el-form-item>
                <el-form-item
                  :label="'類別最低學分數/課程數'"
                  :prop="'category.' + categoryIndex + '.categoryMinCredit'"
                  :rules="{
                    required: true,
                    message: '類別最低學分數不可為空',
                    trigger: 'blur'
                  }"
                >
                  <el-input-number v-model="category.categoryMinCredit" :min="1" :max="30" />
                </el-form-item>
                <el-form-item
                  :label="'類別需求數'"
                  :prop="'category.' + categoryIndex + '.categoryRequireNum'"
                  :rules="{
                    required: true,
                    message: '類別最低學分數不可為空',
                    trigger: 'blur'
                  }"
                >
                  <el-input-number v-model="category.categoryRequireNum" :min="1" :max="10" />
                </el-form-item>
              </div>
            </div>
            <hr style="border: 1px solid black" />
            <!-- 學程領域 -->
            <div class="indent">
              <template v-for="(domain, index) in category.domain" :key="domain.key">
                <div class="formTitle-1">學程領域{{ categoryIndex + 1 }}-{{ index + 1 }}</div>
                <div class="domainpanel">
                  <div class="leftDomain" @click.prevent="removeDomain(categoryIndex, domain)">
                    <span>刪除</span>
                  </div>
                  <div class="rightDomain">
                    <el-form-item
                      :label="'領域名稱'"
                      :prop="'category.' + categoryIndex + '.domain.' + index + '.domainName'"
                      :rules="{
                        required: true,
                        message: '領域名稱不可為空',
                        trigger: 'blur'
                      }"
                    >
                      <el-input v-model="domain.domainName" />
                    </el-form-item>
                    <el-form-item
                      :label="'領域最低學分數/課程數'"
                      :prop="'category.' + categoryIndex + '.domain.' + index + '.domainMinCredit'"
                      :rules="{
                        required: true,
                        message: '領域最低學分數不可為空',
                        trigger: 'blur'
                      }"
                    >
                      <el-input-number v-model="domain.domainMinCredit" :min="1" :max="30" />
                    </el-form-item>
                    <el-form-item
                      :label="'領域需求數'"
                      :prop="'category.' + categoryIndex + '.domain.' + index + '.domainRequireNum'"
                      :rules="{
                        required: true,
                        message: '領域最低學分數不可為空',
                        trigger: 'blur'
                      }"
                    >
                      <el-input-number v-model="domain.domainRequireNum" :min="1" :max="10" />
                    </el-form-item>
                  </div>
                </div>
              </template>
              <el-form-item style="margin-top: 10px">
                <el-button type="success" @click="addDomain(categoryIndex)">新增領域</el-button>
              </el-form-item>
            </div>
          </div>
        </template>
        <el-form-item style="margin-top: 10px">
          <el-button type="success" @click="addCategory" style="">新增類別</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-button type="primary" @click="submitForm(formRef)">送出表單</el-button>
    <el-button @click="resetForm(formRef)">重設表單</el-button>
    <el-button @click="checkDynamicValidateForm">check result</el-button>
  </div>
</template>
<style lang="scss" scoped>
.blankspace:empty {
  content: 'blank';
  color: red;
  line-height: 1;
}

.program-setting {
  display: grid;
  grid-template-columns: 0.3fr minmax(100px, 1fr) minmax(100px, 1fr) 0.3fr;
  column-gap: 10px;
  .grid-item {
    grid-column-start: 2;
    &:nth-child(odd) {
      grid-column-start: 2; /* 开始于第二列 */
      grid-column-end: 3; /* 结束于第三列 */
    }

    &:nth-child(even) {
      grid-column-start: 3; /* 开始于第三列 */
      grid-column-end: 4; /* 结束于第四列 */
    }
  }
}
$domain-border-color: rgb(133, 133, 133);
$domain-border-radius: 20px;
$left-domain-size: 6%;
.domainpanel {
  display: flex;
  margin-bottom: 5px;
  .leftDomain {
    flex: $left-domain-size;
    border: 2px solid $domain-border-color;
    border-radius: $domain-border-radius 0 0 $domain-border-radius;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f63d53c9;
    color: white;
    span {
      font-size: 18px;
    }
    &:hover {
      background-color: #f63d53b7;
      cursor: pointer;
    }
  }
  .rightDomain {
    flex: calc(100% - $left-domain-size);
    border: 2px solid $domain-border-color;
    border-left: none;
    border-radius: 0 $domain-border-radius $domain-border-radius 0;
    padding: 10px;
  }
}

.outer-box {
  // width: 70%;
  // display: grid;
  // grid-template-columns: 0.3fr minmax(100px, 1fr) minmax(100px, 1fr) 0.3fr;
}

.formTitle-1 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}
.formTitle_area {
  font-size: 18px;
  font-weight: bold;
}
.dynamicFormArea {
  border: 2px dotted rgba(73, 73, 73, 0.404);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
:deep(.el-segmented) {
  background-color: rgb(255, 255, 255);
}
:deep(.el-form-item__label) {
  font-size: 16px;
}
// 處理label沒有垂直居中的問題
.lineHeight1 {
  height: auto;
  line-height: 1;
}
.indent {
  margin-left: 10vw;
}
@media screen and (max-width: 767px) {
  program-setting {
    display: grid;
    grid-template-columns: 1fr;
  }
  .grid-item {
    grid-column-start: auto;
    grid-column-end: auto;
  }

  .grid-item:nth-child(odd) {
    grid-column-start: auto;
    grid-column-end: auto;
  }

  .grid-item:nth-child(even) {
    grid-column-start: auto;
    grid-column-end: auto;
  }
}
</style>
