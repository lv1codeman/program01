<script setup>
//#region 從DB讀取列表
/* import { getCategoryAPI } from '@/apis/layout'
import { getServerData } from '@/apis/testAPI'
import { ref, onMounted } from 'vue'

const categorylist = ref([])
const getCategory = async () => {
  const res = await getCategoryAPI()
  console.log(res)
  categorylist.value = res.result
}

復原以下程式碼：執行從自己的DB讀取Header列表
const getCategory = async () => {
  const res = await getServerData()
  console.log(res)
  categorylist.value = res.data
}

onMounted(() => {
  getCategory()
}) */
//#endregion
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import themeView from '@/views/Theme/themeDialog.vue'
const router = useRouter()

const activeName = ref('index')
const handleClick = () => {
  switch (event.target.innerText) {
    case '首頁':
      router.push({ path: '/' })
      break
    case '學分學程檢查':
      router.push({ path: '/programs' })
      break
    case '微學程檢查':
      router.push({ path: '/miniprograms' })
      break
  }
}

const dialogOverflowVisible = ref(false)
</script>

<template>
  <header class="app-header">
    <div class="page-container">
      <div class="header-container">
        <div class="logo">
          <RouterLink to="/">學程平台首頁</RouterLink>
        </div>
        <div class="app-header-nav2">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首頁" name="index"></el-tab-pane>
            <el-tab-pane label="學分學程檢查" name="programs"></el-tab-pane>
            <el-tab-pane label="微學程檢查" name="miniprograms"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="app-header-nav2">
          <el-button type="primary" plain @click="dialogOverflowVisible = true">color</el-button>
        </div>
      </div>
    </div>
  </header>
  <el-dialog v-model="dialogOverflowVisible" title="樣板配置" width="500" draggable overflow>
    <themeView />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogOverflowVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogOverflowVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
:deep(.el-tabs__item) {
  // font-weight: bold;
  padding: 0 0 0 40px;
  font-size: var(--el-font-size-medium);
  &:hover {
    color: var(--el-text-color-secondary);
  }
}
:deep(.el-tabs__item.is-active) {
  color: $nav-bg-color;
}

.app-header {
  background: #fff;

  .page-container {
    display: flex;
    align-items: center;
  }
}
.header-container {
  display: flex;
}
.logo {
  width: 200px;

  a {
    display: block;
    height: 80px;
    text-indent: -9999px;
    background: url('@/assets/images/ncue-logo.png') no-repeat center / contain;
  }
}
.app-header-nav2 {
  margin: 20px 0 0 0;
  padding: 0px 0px 0px 40px;
}

.app-header-nav {
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  ul {
    display: flex;
    gap: 40px;
  }
  li {
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $baseColor;
        border-bottom: 1px solid $baseColor;
      }
    }

    .active {
      color: $baseColor;
      border-bottom: 1px solid $baseColor;
    }
  }
}

@media screen and (max-width: 767px) {
  .logo {
    width: 50px;
  }
  .app-header {
    .logo {
      a {
        background: url('@/assets/images/ncue-logo-notext.png') no-repeat center / contain;
      }
    }
  }
}
@media screen and (max-width: 391px) {
  .app-header-nav2 {
    padding: 0px 0px 0px 10px;
  }
  :deep(.el-tabs__item) {
    padding: 0 0 0 20px;
  }
}
</style>
