<script setup>
import { fetchToken } from '@/utils/fetchToken.js'

const login = async () => {
  await fetchToken()
}
</script>

<template>
  <div>Login page</div>
  <RouterLink to="/">學程平台首頁</RouterLink>
  <el-button type="primary" @click="login">登入</el-button>
</template>
