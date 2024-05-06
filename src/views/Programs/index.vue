<script setup>
import { ref } from 'vue'
const programList = ref([])

programList.value = [
  { id: 1, name: '復健諮商學分學程', percent: 70 },
  { id: 2, name: '員工協助方案學分學程', percent: 80 },
  { id: 3, name: '金融證照與實務學分學程', percent: 20 },
  { id: 4, name: '空間資訊學分學程', percent: 40 },
  { id: 5, name: '環境教育暨觀光遊憩學分學程', percent: 50 },
  { id: 6, name: '歷史與文化產業學分學程', percent: 60 },
  { id: 7, name: '文化創意設計學分學程', percent: 20 },
  { id: 8, name: '性別平權學分學程', percent: 10 },
  { id: 9, name: '全英語物理博碩士班學分學程', percent: 0 },
  { id: 10, name: '全英語光電博碩士班學分學程', percent: 0 },
  { id: 11, name: '半導體產業學分學程', percent: 0 },
  { id: 12, name: '管理學院全英語商管學分學程', percent: 0 },
  { id: 13, name: '公職人員培育學分學程', percent: 20 },
  { id: 14, name: '國際工程學分學程', percent: 10 },
  { id: 15, name: '表創性藝術治療碩士學分學程', percent: 50 }
]

const setItemText = (percentage) => {
  return '已完成: ' + percentage + '%'
}
</script>
<template>
  <div class="page-container">
    <h2>學分學程檢查</h2>
    <div class="outouter-box">
      <div class="outer-box" v-for="item in programList" :key="item.id">
        <div class="box">
          <h4>{{ item.name }}</h4>
          <el-progress
            :text-inside="true"
            :show-text="true"
            :stroke-width="26"
            :percentage="item.percent"
            :format="setItemText"
            :stroke-linecap="square"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outouter-box {
  // height: 500px;
  .outer-box {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    // width: 400px;

    .box {
      display: relative;
      // width: 400px;
      margin-top: 20px;

      .item {
        flex: 1;
      }
    }
  }
}
:deep(.el-progress-bar__innerText) {
  color: rgb(201, 106, 29);
  font-weight: bold;
}
</style>
