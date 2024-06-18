<script setup>
import { useStudentStore } from '@/stores/studentData.js'
// import { fetchToken } from '@/utils/fetchToken.js'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { login } from '@/apis/loginAPI'
import CryptoJS from 'crypto-js'
const router = useRouter()

const crypt_key = import.meta.env.VITE_SECRET_AES_KEY

// AES加密
const encrypt = (data) => {
  let aes_key = CryptoJS.enc.Utf8.parse(crypt_key)
  let encrypted = CryptoJS.AES.encrypt(data, aes_key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  })
  return encrypted.toString()
}
// AES解密
const decrypt = (data) => {
  let aes_key = CryptoJS.enc.Utf8.parse(crypt_key)
  let baseResult = CryptoJS.enc.Base64.parse(data)
  let ciphertext = CryptoJS.enc.Base64.stringify(baseResult)
  let decryptResult = CryptoJS.AES.decrypt(ciphertext, aes_key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  })

  let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString()
  return resData
}

const btnLogin = async () => {
  let en = encrypt(form.value.password)
  console.log('加密後的密碼=', en)
  if (await login(form.value.id, en)) {
    ElMessage({
      showClose: true,
      message: '登入成功',
      type: 'success',
      customClass: 'msg-zindex',
      duration: 3000,
      offset: window.screen.height / 50
    })
    router.push({ path: '/' })
  } else {
    // 在http.js由攔截器統一處理
  }
}
const goHome = () => {
  router.push({ path: '/' })
}

const form = ref({
  id: '',
  password: ''
})
const msgTimeController = ref({
  max: 3
})
</script>

<template>
  <div class="login-form">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <div class="card-header-title">登入</div>
          <div class="card-header-subtitle">請輸入帳號密碼以登入系統</div>
        </div>
      </template>
      <el-form class="form" :model="form" label-width="auto" label-position="right">
        <el-form-item label="帳號">
          <el-input v-model="form.id" placeholder="學生請輸入學號" clearable autofocus @keyup.enter="btnLogin" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="請輸入密碼"
            show-password
            clearable
            @keyup.enter="btnLogin"
          />
        </el-form-item>
      </el-form>
      <div class="form-footer">忘記密碼</div>
      <template #footer>
        <div class="card-footer">
          <!-- <el-button type="primary"></el-button> -->
          <el-button type="primary" style="width: 30%" @click="goHome">回首頁</el-button>
          <el-config-provider :message="msgTimeController">
            <el-button type="primary" @click="btnLogin" style="width: 30%">登入</el-button>
          </el-config-provider>
        </div>
      </template>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-card__footer) {
  border: none;
  padding: 0px var(--el-card-padding) var(--el-card-padding) var(--el-card-padding);
}
:deep(.el-card__header) {
  border: none;
  // padding: var(--el-card-padding) var(--el-card-padding) 0 var(--el-card-padding);
}

.login-form {
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--el-bg-color-page);
  padding-bottom: 300px;
  .card {
    min-width: 350px;
    .card-header {
      text-align: center;
      .card-header-title {
        font-size: 20px;
      }
      .card-header-subtitle {
        font-size: 14px;
      }
    }
    .form-footer {
      text-align: right;
    }
    .card-footer {
      text-align: right;
    }
  }
}
@media screen and (max-width: 818px) {
  .login-form {
    padding-bottom: 0px;
  }
}
</style>
<!-- message是動態生成的，只好寫在全局中 -->
<style lang="scss">
.el-message--error .el-message__content {
  white-space: nowrap;
}
</style>
