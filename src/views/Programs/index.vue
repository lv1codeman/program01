<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref } from 'vue'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { programData } from '@/assets/data/programData.js'
const programList = ref([])

programList.value = programData

const setItemText = (percentage) => {
  // if (percentage == 100) {
  //   return '已完成!'
  // } else {
  //   return '目前進度: ' + percentage + '%'
  // }
  return ' ' + percentage + '%'
}
const setStatus = (item) => {
  if (item.state === 'success') return 'success'
  else {
    return ''
  }
}
console.log(programList)

const goResult = () => {
  router.push({ path: '/result' })
}
</script>
<template>
  <div class="page-container">
    <!-- <div class="pageTitle">學分學程檢查</div> -->
    <pagetitle>學分學程檢查</pagetitle>
    <div style="max-width: 600px">
      <el-alert title="點擊進度條可查看課程明細" type="info" />
    </div>
    <div class="outouter-box">
      <div
        class="outer-box"
        v-for="item in programList"
        :key="item.id"
        :style="
          item.percent == 100
            ? { border: '2px solid var(--el-color-success)' }
            : { border: '2px solid var(--el-color-primary)' }
        "
        @click="goResult"
      >
        <div class="box">
          <el-tag
            type="success"
            size=""
            effect="dark"
            style="float: right"
            v-show="item.percent === 100"
            >已完成 !!</el-tag
          >
          <el-tag
            type="success"
            size=""
            effect="light"
            style="
              float: right;

              border: 1px solid var(--el-color-success);
              color: var(--el-color-success);
            "
            v-show="(item.percent >= 50) & (item.percent != 100)"
            >即將完成</el-tag
          >
          <div class="subjectName">
            <a :href="item.url" target="_blank"
              >{{ item.name
              }}<font-awesome-icon icon="fa-link" style="font-size: 14px; margin-left: 2px"
            /></a>
          </div>

          <div class="subjectUnit">{{ item.unit }}</div>
          <el-progress
            class="progressbar"
            :show-text="true"
            :text-inside="false"
            :stroke-width="26"
            :percentage="item.percent"
            :format="setItemText"
            :status="setStatus(item)"
          >
          </el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --success-color: #ccc;
}
// .warningborder {
//   border: 2px solid $successColor !important;
// }

.outouter-box {
  // height: 550px;
  height: calc($baseNum * 5.6);

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .outer-box {
    padding: 0 20px;
    width: 380px;
    // border: 2px solid rgb(137, 137, 137);
    border: 2px solid $primaryColor;
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 1px;
    &:hover {
      cursor: pointer;
      background-color: rgba(223, 223, 223, 0.06);
    }
    .box {
      display: relative;
      // width: 400px;
      margin-top: 12px; //outer-box有marginTop:10px，加上border的2px
      .subjectName {
        font-size: 18px;
        font-weight: bold;
        & a:hover {
          background-color: #dae7ff;
        }
      }

      .subjectUnit {
        font-size: 14px;
      }
    }
  }
}
// :deep(.last-box) {
//   margin-right: auto; /* 加上 !important 以确保优先级 */
//   margin-left: 80px;
// }

:deep(.el-progress-bar__outer) {
  background-color: var(--el-color-info-light-7);
}

$--neon-text-light: rgb(0, 0, 0);
$--neon-text-color: #04f;
:deep(.el-progress-bar__innerText) {
  color: white;
  font-weight: bold;
  text-shadow: 0px 0px 2px black;
  padding: 0 5px;
  font-size: 14px;
}
:deep(.el-progress__text) {
  color: var(--el-color-primary);
  min-width: 0;
  display: flex;
  align-items: center;
}
:deep(div.el-progress__text span) {
  font-size: 18px;
}

@media screen and (max-width: 1200px) {
  .outouter-box {
    // height: 900px;
    height: calc($baseNum * 9);
  }
}
@media screen and (max-width: 818px) {
  .outouter-box {
    // height: 1700px;
    height: calc($baseNum * 17);
    justify-content: center;
  }
}
</style>
