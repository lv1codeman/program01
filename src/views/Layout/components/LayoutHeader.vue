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
import { ref, computed } from 'vue'
const router = useRouter()

const activeName = ref('index')
const handleClick = () => {
  switch (event.target.innerText) {
    case '學程管理':
      // window.open('https://webap0.ncue.edu.tw/deanv2/other/ob010', '_blank')
      router.push({ path: '/managePrograms' })
      break
    case '學分學程檢查':
      router.push({ path: '/programs' })
      break
    case '微學程檢查':
      router.push({ path: '/miniprograms' })
      break
  }
}
const btnHome = () => {
  activeName.value = null
}

const showlist = ref([])
const userRole = sessionStorage.getItem('user_role')

switch (userRole) {
  case 'admin':
    showlist.value = [true, true, true]
    break
  case 'staff':
    showlist.value = [false, false, true]
    break
  case 'student':
    showlist.value = [true, true, false]
    break
  default:
    showlist.value = [false, false, false] // 預設情況下，所有選項卡都不可見
    break
}
const tabs = [
  { label: '學分學程檢查', name: 'programs' },
  { label: '微學程檢查', name: 'miniprograms' },
  { label: '學程管理', name: 'setprogram' }
]
const filteredTabs = computed(() => {
  return tabs.filter((_, index) => showlist.value[index])
})
</script>
<template>
  <header class="app-header">
    <div class="page-container">
      <div class="header-container">
        <div class="logo" @click="btnHome">
          <RouterLink to="/">學程平台首頁</RouterLink>
        </div>
        <div class="app-header-nav2">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="tab in filteredTabs" :key="tab.name" :label="tab.label" :name="tab.name"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
:deep(.el-tabs__item) {
  // font-weight: bold;
  display: flex;
  padding: 0 0 0 40px;
  font-size: var(--el-font-size-medium);
  &:hover {
    color: var(--el-text-color-secondary);
  }
}
:deep(.el-tabs__item.is-active) {
  color: var(nav-bg-color);
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
    font-size: 14px;
  }
}
</style>
