<script setup>
import themeView from '@/views/Theme/themeDialog.vue'
import { ref } from 'vue'
const dialogOverflowVisible = ref(false)
</script>

<template>
  <nav class="app-topnav">
    <div class="page-container">
      <ul>
        <template v-if="true">
          <!-- <li>
            <a href="https://webapt.ncue.edu.tw/deanv2/other/ob010" target="_blank">開課查詢</a>
          </li> -->
          <li>
            <font-awesome-icon class="palette" icon="fa-palette" @click="dialogOverflowVisible = true" />
            <!-- <el-button type="primary" plain>color</el-button> -->
          </li>
          <li>
            <a href="https://webap0.ncue.edu.tw/deanv2/other/ob010" target="_blank">開課查詢</a>
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
.palette {
  color: white;
  font-size: 24px;
  margin-right: 5px;
  border-radius: 42px;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: var(--el-color-primary-dark-2);
  }
}

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
