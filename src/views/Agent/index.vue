<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { reactive, ref } from 'vue'

const formRef = ref()
const dynamicValidateForm = reactive({
  domains: [
    {
      key: 1,
      value: '',
      name: ''
    }
  ],
  email: ''
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
        <el-form-item
          prop="email"
          label="Email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            }
          ]"
        >
          <el-input v-model="dynamicValidateForm.email" />
        </el-form-item>
      </div>
      <template v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
        <div class="dynamicFormArea">
          <el-form-item
            :label="'Domain' + index"
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
            :label="'Name' + index"
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
.dynamicFormArea {
  border: 2px dotted rgba(73, 73, 73, 0.404);
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

@media screen and (max-width: 767px) {
}
</style>
