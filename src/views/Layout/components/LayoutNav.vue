<script setup></script>

<template>
  <nav class="app-topnav">
    <div class="page-container">
      <ul>
        <template v-if="true">
          <li><a href="javascript:;">首頁</a></li>
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
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <el-button type="success">登出</el-button>
              </template>
            </el-popconfirm>
          </li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $baseColor;
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
</style>
