<script setup>
import themeView from '@/views/Theme/themeDialog.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { checkToken } from '@/apis/programAPI'

const isLogin = ref(false)
const username = ref()

const checkUserToken = async () => {
  let res = await checkToken()
  console.log('checkToken in LayoutNav res = ', res)
  isLogin.value = res ? true : false
}
checkUserToken()

onMounted(() => {
  username.value = sessionStorage.getItem('user_name')
  console.log(`isLogin.value = ${isLogin.value}`)
})

// if (store.studentData.isLogin) {
//   console.log(store.studentData.isLogin)
//   isLogin.value = true
// } else {
//   console.log('not login yet.')
//   isLogin.value = false
// }

// isLogin.value = store.studentData.isLogin

const dialogVisible = ref(false)
const handleDialogUpdate = (newVal) => {
  dialogVisible.value = newVal
}

const btnLogout = () => {
  sessionStorage.removeItem('token')
  router.push({ path: '/login' })
}
const btnLogin = () => {
  router.push({ path: '/login' })
}
</script>

<template>
  <nav class="app-topnav">
    <div class="page-container">
      <ul>
        <li>
          <font-awesome-icon class="palette" icon="fa-palette" @click="dialogVisible = !dialogVisible" />
          <!-- <el-button type="primary" plain>color</el-button> -->
        </li>
        <li>
          <a href="https://webap0.ncue.edu.tw/deanv2/other/ob010" target="_blank">開課查詢</a>
        </li>
        <template v-if="isLogin">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>{{ username }}</a>
          </li>
          <li>
            <el-popconfirm title="確認退出嗎?" confirm-button-text="確認" cancel-button-text="取消">
              <template #reference>
                <el-button class="btnLogout" type="success" color="var(--el-color-primary-light-3)" @click="btnLogout"
                  >登出</el-button
                >
              </template>
            </el-popconfirm>
          </li>
        </template>
        <template v-else>
          <li>
            <el-button type="primary" @click="btnLogin">登入</el-button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
  <themeView :isShowDialog="dialogVisible" @update:isShowDialog="handleDialogUpdate" />
</template>

<style scoped lang="scss">
.palette {
  color: white;
  font-size: 24px;
  margin-right: 5px;
  border-radius: 42px;
  cursor: pointer;
  padding: 5px;

  &:hover {
    transform: scale(1.2);
    transition-duration: 0.3s;
    background-color: var(--el-color-primary-dark-2);
  }
}

.app-topnav {
  background: var(--nav-bg-color);

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #f7fafb;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: var(--el-color-primary-light-3);
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
.btnLogout {
  text-shadow: 0px 0px 2px black;
  font-weight: bold;
  &:hover {
    // color: var(--el-color-primary-light-3);
    background-color: var(--el-color-primary);
  }
}
</style>
