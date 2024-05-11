<script setup>
import { ref } from 'vue'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { miniProgramData } from '@/assets/data/programData.js'
const programList = ref([])

programList.value = miniProgramData

const setItemText = (percentage) => {
  // if (percentage == 100) {
  //   return '已完成!'
  // } else {
  //   return '目前進度: ' + percentage + '%'
  // }
  return percentage + '%'
}
const setStatus = (item) => {
  if (item.state === 'success') return 'success'
  else {
    return ''
  }
}
</script>
<template>
  <div class="page-container">
    <!-- <div class="pageTitle">學分學程檢查</div> -->
    <pagetitle>微學程檢查</pagetitle>
    <div class="outouter-box">
      <div class="outer-box" v-for="item in programList" :key="item.id">
        <div class="box">
          <el-tag
            type="success"
            size="large"
            effect="dark"
            style="float: right"
            v-show="item.percent === 100"
            >已完成 !!</el-tag
          >
          <el-tag
            type="warning"
            size="large"
            effect="light"
            style="float: right"
            v-show="(item.percent >= 50) & (item.percent != 100)"
            >即將完成</el-tag
          >
          <div class="subjectName">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </div>
          <div class="subjectUnit">{{ item.unit }}</div>
          <el-progress
            :show-text="true"
            :text-inside="true"
            :stroke-width="26"
            :percentage="item.percent"
            :format="setItemText"
            :status="setStatus(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outouter-box {
  // height: 550px;
  height: calc($baseNum * 4.5);

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .outer-box {
    padding: 0 20px;
    width: 380px;
    border: 2px solid rgb(137, 137, 137);
    background-color: rgb(239, 239, 239);
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 1px;
    .box {
      // display: relative;
      // width: 400px;
      margin-top: 10px;
      .subjectName {
        font-size: 18px;
        font-weight: bold;
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
  background-color: #a9adb6;
}

:deep(.el-progress-bar__innerText) {
  color: white;
  font-weight: bold;
}
:deep(.el-progress__text) {
  color: rgba(223, 135, 20, 0.945);
}
@media screen and (max-width: 1200px) {
  .outouter-box {
    // height: 900px;
    height: calc($baseNum * 6.5);
  }
}
@media screen and (max-width: 818px) {
  .outouter-box {
    // height: 1700px;
    height: calc($baseNum * 13);
    justify-content: center;
  }
}
</style>
