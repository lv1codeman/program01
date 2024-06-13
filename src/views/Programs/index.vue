<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, computed, watch, onMounted } from 'vue'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { useStudentStore } from '@/stores/studentData.js'
const store = useStudentStore()
const programList = ref([])

import { getfakePrograms, getProgramById } from '@/apis/programAPI'
import { checkToken } from '@/apis/loginAPI'

const checkUserToken = async () => {
  let res = await checkToken()
  console.log('jwt token auth result = ', res)
  if (!res) {
    console.log(`user not login`)
    router.push({ path: '/login' })
  }
}
const isTokenGood = checkUserToken()

const fetchAllPrograms = async () => {
  try {
    programList.value = await getfakePrograms()
  } catch (error) {
    console.error('Error fetching programs:', error)
    router.push({ path: '/login' })
  }
}
fetchAllPrograms()
// const temp = ref()
// const fetchSingleProgram = async () => {
//   try {
//     temp.value = await getProgramById('3')
//     // console.log('Program:', temp.value)
//   } catch (error) {
//     console.error(`Error fetching program with ID=3 :`, error)
//   }
// }
// console.log(`session token: ${sessionStorage.getItem('token')}`)

// fetchSingleProgram()

const fakeStudent = {
  id: 'S1234567',
  name: '周杰倫',
  unit: '美術學系'
}

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

const goResult = (item) => {
  const res = {}
  res['program'] = item
  res['student'] = fakeStudent
  store.setStudentData(res)
  router.push({ path: '/result' })
}

const ref1 = ref([])
const ref2 = ref([])
const ref3 = ref([])

const open = ref(false)
const currentStep = ref(0)
const elTourChanged = (step) => {
  currentStep.value = step
}
const btnName = computed(() => {
  let btnNameList = []
  if (!currentStep.value || currentStep.value === 0) {
    btnNameList = ['', '下一步']
  } else if (currentStep.value == 1) {
    btnNameList = ['上一步', '下一步']
  } else if (currentStep.value == 2) {
    btnNameList = ['上一步', '完成']
  }

  return btnNameList
})

watch(open, (open_value) => {
  if (open_value) {
    currentStep.value = 0
  }
})

const show = ref(false)
onMounted(() => {
  // 設定Zoom 縮放的時間
  document.documentElement.style.setProperty('--el-transition-duration', '.5s')
  // 設定Fade 淡入淡出的時間
  document.documentElement.style.setProperty('--el-transition-duration-fast', '.5s')
  // cubic-bezier
  document.documentElement.style.setProperty('--el-transition-function-ease-in-out-bezier', 'cubic-bezier(.42,0,.58,1)')

  show.value = true
})
</script>
<template>
  <el-tour v-model="open" @change="elTourChanged">
    <el-tour-step
      :target="ref1[0]"
      title="學分學程"
      description="點選進度條可查看結果"
      :next-button-props="{
        children: btnName[1]
      }"
    />
    <el-tour-step
      :target="ref2[0]"
      title="學分學程網址"
      description="點擊後連至該學分學程網站"
      :prev-button-props="{
        children: btnName[0]
      }"
      :next-button-props="{
        children: btnName[1]
      }"
    />
    <el-tour-step
      :target="ref3[0]"
      title="修習進度"
      :prev-button-props="{
        children: btnName[0]
      }"
      :next-button-props="{
        children: btnName[1]
      }"
    >
      <div style="color: var(--el-color-success)">已完成 = 100%</div>
      <div style="color: var(--el-color-primary)">即將完成 >= 50%</div>
    </el-tour-step>
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
  </el-tour>
  <div class="page-container">
    <!-- <div class="pageTitle">學分學程檢查</div> -->

    <pagetitle>
      學分學程檢查
      <el-button type="primary" @click="open = true">使用教學</el-button>
    </pagetitle>
    <div class="out-outer-box-container">
      <div class="out-outer-box">
        <div
          class="outer-box"
          v-for="(item, index) in programList"
          :key="item.id"
          :style="
            item.percent == 100
              ? { border: '2px solid var(--el-color-success)' }
              : { border: '2px solid var(--el-color-primary)' }
          "
          @click="goResult(item)"
          :ref="(el) => (ref1[index] = el)"
        >
          <transition name="el-fade-in-linear">
            <div class="box" v-show="show">
              <el-tag type="success" size="" effect="dark" style="float: right" v-show="item.percent === 100"
                >已完成 !!</el-tag
              >
              <el-tag
                type="success"
                size=""
                effect="plain"
                style="float: right; border: 1px solid var(--el-color-success-light-3); color: var(--el-color-success)"
                v-show="(item.percent >= 50) & (item.percent != 100)"
                >即將完成</el-tag
              >
              <div class="subjectName">
                <a :href="item.url" target="_blank" :ref="(el) => (ref2[index] = el)"
                  >{{ item.name }}<font-awesome-icon icon="fa-link" style="font-size: 14px; margin-left: 2px"
                /></a>
              </div>
              <div class="subjectUnit">{{ item.unit }}</div>
              <div :ref="(el) => (ref3[index] = el)">
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
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.out-outer-box-container {
  // padding-bottom: 20px;
  .out-outer-box {
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
        // background-color: rgba(223, 223, 223, 0.06);
        background-color: rgb(255 247 224 / 76%);
      }
      .box {
        display: relative;
        // width: 400px;
        margin-top: 12px; //outer-box有marginTop:10px，加上border的2px
        .subjectName {
          font-size: 18px;
          font-weight: bold;
          & a:hover {
            // background-color: #dae7ff;
            background-color: #1088c630;
          }
        }

        .subjectUnit {
          font-size: 14px;
        }
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
  color: var(--el-text-color-secondary);
  min-width: 0;
  display: flex;
  align-items: center;
}
:deep(div.el-progress__text span) {
  font-size: 18px;
}

@media screen and (max-width: 1200px) {
  .out-outer-box-container {
    .out-outer-box {
      // height: 900px;
      height: calc($baseNum * 9);
    }
  }
}
@media screen and (max-width: 818px) {
  .out-outer-box-container {
    .out-outer-box {
      // height: 1700px;
      height: calc($baseNum * 17);
      justify-content: center;
    }
  }
}
</style>
