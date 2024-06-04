<script setup>
import { fetchToken } from '@/utils/fetchToken.js'

await fetchToken()
</script>

<template>
  <div>Login page</div>
  <RouterLink to="/">學程平台首頁</RouterLink>
  <el-button></el-button>
</template>
