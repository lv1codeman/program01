<script setup>
import { ref } from 'vue'
const programList = ref([])
// const state = ref()
programList.value = [
  {
    id: 1,
    name: '復健諮商學分學程',
    percent: 100,
    url: 'https://www.google.com.tw',
    state: 'success'
  },
  {
    id: 2,
    name: '員工協助方案學分學程',
    percent: 80,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 3,
    name: '金融證照與實務學分學程',
    percent: 20,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 4,
    name: '空間資訊學分學程',
    percent: 40,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 5,
    name: '環境教育暨觀光遊憩學分學程',
    percent: 50,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 6,
    name: '歷史與文化產業學分學程',
    percent: 60,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 7,
    name: '文化創意設計學分學程',
    percent: 20,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 8,
    name: '性別平權學分學程',
    percent: 10,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 9,
    name: '全英語物理博碩士班學分學程',
    percent: 0,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 10,
    name: '全英語光電博碩士班學分學程',
    percent: 0,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 11,
    name: '半導體產業學分學程',
    percent: 100,
    url: 'https://www.google.com.tw',
    state: 'success'
  },
  {
    id: 12,
    name: '管理學院全英語商管學分學程',
    percent: 0,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 13,
    name: '公職人員培育學分學程',
    percent: 20,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 14,
    name: '國際工程學分學程',
    percent: 10,
    url: 'https://www.google.com.tw',
    state: 'normal'
  },
  {
    id: 15,
    name: '表創性藝術治療碩士學分學程',
    percent: 50,
    url: 'https://www.google.com.tw',
    state: 'normal'
  }
]

const setItemText = (percentage) => {
  if (percentage == 100) {
    return '已完成!'
  } else {
    return '目前進度: ' + percentage + '%'
  }
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
    <div class="pageTitle">學分學程檢查</div>

    <div class="outouter-box">
      <div class="outer-box" v-for="item in programList" :key="item.id">
        <div class="box">
          <div class="subjectName">
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </div>
          <div class="subjectUnit">{{ item.url }}</div>
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
.pageTitle {
  font-size: 26px;
  font-weight: bolder;
  margin: 30px 0 20px 0;
}

.outouter-box {
  // height: 550px;
  height: calc($baseNum * 5.6);

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
        font-size: larger;
      }
      .subjectUnit {
        font-size: medium;
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
  color: rgb(201, 106, 29);
  font-weight: bold;
}
:deep(.el-progress__text) {
  color: rgba(223, 135, 20, 0.945);
}
@media screen and (max-width: 1200px) {
  .outouter-box {
    height: calc($baseNum * 9);
  }
}
@media screen and (max-width: 818px) {
  .outouter-box {
    height: calc($baseNum * 17);
    justify-content: center;
  }
}
</style>
