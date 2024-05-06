<script setup>
// import { getCategoryAPI } from '@/apis/layout'
import { getServerData } from '@/apis/testAPI'
import { ref, onMounted } from 'vue'

const categorylist = ref([])
// const getCategory = async () => {
//   const res = await getCategoryAPI()
//   console.log(res)
//   categorylist.value = res.result
// }

const getCategory = async () => {
  const res = await getServerData()
  console.log(res)
  categorylist.value = res.data
}

onMounted(() => {
  getCategory()
})
</script>

<template>
  <header class="app-header">
    <div class="page-container">
      <h1 class="logo">
        <RouterLink to="/">學程平台首頁</RouterLink>
      </h1>
      <!-- <ul class="app-header-nav">
        <li class="home" v-for="item in categorylist" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
        </li>
      </ul>-->
      <div class="app-header-nav2">
        <div class="nav-list"><RouterLink to="/programs">學分學程檢查</RouterLink></div>
        <div class="nav-list"><RouterLink to="/miniprograms">微學程檢查</RouterLink></div>
      </div>
      <!-- <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div> -->
      <!-- 头部购物车 -->
      <!-- <HeaderCart /> -->
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;

  .page-container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 80px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/ncue-logo.png') no-repeat center 14px / contain;
    }
  }
}

.app-header-nav2 {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  padding: 10px 20px 10px 40px;
  .nav-list {
    // flex: 1;
  }
}

.app-header-nav {
  // width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  ul {
    display: flex;
    gap: 40px;
  }
  li {
    // margin-right: 40px;
    // width: 38px;
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
  .app-header-nav2 {
    gap: 20px;
  }
}
</style>
