<script setup></script>

<template>
  <nav class="app-topnav">
    <div class="page-container">
      <ul>
        <template v-if="true">
          <li>
            <a href="https://webapt.ncue.edu.tw/deanv2/other/ob010" target="_blank">開課查詢</a>
          </li>
          <li>
            <RouterLink to="/setprogram">學程設置(系辦)</RouterLink>
          </li>
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>周杰倫</a>
          </li>
          <li>
            <el-popconfirm title="確認退出嗎?" confirm-button-text="確認" cancel-button-text="取消">
              <template #reference>
                <el-button class="btnLogout" type="success" color="var(--el-color-primary-light-3)">登出</el-button>
              </template>
            </el-popconfirm>
          </li>
        </template>
        <template v-else>
          <li><a href="javascript:;">請先登錄</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: $nav-bg-color;

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
