<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { unitList } from '@/assets/data/unitList.js'
import { reactive, ref } from 'vue'

const formRef = ref()
const dynamicValidateForm = reactive({
  name: '',
  type: '',
  unit: '',
  minCredit: 0,
  nonSelfCredit: 1,
  domains: [
    {
      key: 1,
      value: '',
      name: '',
      criteria: ''
    }
  ]
})

const removeDomain = (item) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
    name: ''
  })
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(dynamicValidateForm)
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
// console.log(unitList)
const unitListAll = unitList
</script>

<template>
  <div class="page-container">
    <pagetitle>學程設定</pagetitle>

    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="dynamicValidateForm"
      label-width="auto"
      class="demo-dynamic"
    >
      <div class="formarea">
        <el-form-item prop="name" label="學程名稱">
          <el-input v-model="dynamicValidateForm.name" />
        </el-form-item>
        <el-form-item prop="type" label="學程類型">
          <el-segmented v-model="dynamicValidateForm.type" :options="programOptions" />
        </el-form-item>
        <el-form-item prop="unit" label="設置單位">
          <el-select
            v-model="dynamicValidateForm.unit"
            filterable
            placeholder="Select"
            style="width: 240px"
          >
            <el-option v-for="item in unitListAll" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item prop="minCredit" label="最低應修學分數">
          <el-input-number v-model="dynamicValidateForm.minCredit" :min="1" :max="10" />
        </el-form-item>
        <el-form-item prop="nonSelfCredit" label="非本系學分數">
          <el-input-number v-model="dynamicValidateForm.nonSelfCredit" :min="1" :max="10" />
        </el-form-item>
      </div>
      <div class="formTitle">基礎課程</div>
      <template v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
        <div class="dynamicFormArea">
          <el-form-item
            :label="'類別' + (index + 1) + '名稱'"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.value" />
          </el-form-item>
          <el-form-item
            :label="'層級' + (index + 1) + '最低學分數'"
            :prop="'domains.' + index + '.name'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.name" />
          </el-form-item>
          <el-button class="mt-2" @click.prevent="removeDomain(domain)"> Delete </el-button>
        </div>
      </template>

      <el-form-item style="margin-top: 10px">
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="addDomain">New domain</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.formarea {
  padding: 0 10px;
}
.formTitle {
  font-size: 18px;
  font-weight: bold;
}
.dynamicFormArea {
  border: 2px dotted rgba(73, 73, 73, 0.404);
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}
:deep(.el-segmented) {
  background-color: rgb(255, 255, 255);
}
@media screen and (max-width: 767px) {
}
</style>
