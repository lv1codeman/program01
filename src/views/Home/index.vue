<script setup>
import pageTitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, onMounted } from 'vue'
import { getAllPrograms } from '@/apis/programAPI.js'

const programNum = ref(0)
const miniProgramNum = ref(0)

onMounted(async () => {
  const res = await getAllPrograms()
  res.forEach((item) => {
    if (item.program_type == '學分學程') {
      programNum.value++
    } else {
      miniProgramNum.value++
    }
  })
})
</script>
<template>
  <div class="page-container">
    <pageTitle>學程檢查平台</pageTitle>
    <p>
      本校至今已有設置15個學分學程、12個微學程，為使本校學生在畢業前了解自身所學課程與各學程間的相關性，故建立本平台以利同學查詢。
    </p>
    <p class="warn">
      部分學程因規則複雜，故本系統資訊僅供參考，認證時仍須依各學程規定辦理，且申請認證的科目須至少1門非學生主系的專業科目。<br />
      (目前本平台涵蓋了{{ programNum }}個學分學程、{{ miniProgramNum }}個微學程)
    </p>
    <el-row class="tabGroup" justify="space-evenly">
      <el-col class="tab" :span="7" :xs="11">
        <RouterLink to="/programs"><el-button class="tab1">學分學程檢查</el-button></RouterLink>
      </el-col>
      <el-col class="tab" :span="7" :xs="11">
        <RouterLink to="/miniprograms"><el-button class="tab1">微學程檢查</el-button></RouterLink>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
p {
  font-size: medium;
  &.warn {
    font-size: 14px;
    display: inline;
    font-weight: bold;
    background-color: var(--el-color-warning-light-7);
    color: var(--el-color-danger);
  }
}

.tabGroup {
  margin-top: 50px;
}
.tab {
  /* background-color: red; */
  text-align: center;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.5s;
  }
}
.tab1 {
  font-size: 40px;
  border-radius: 20px;
  padding: 100px 50px;
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 767px) {
  .tabGroup {
    margin-top: 20px;
  }
  .tab1 {
    font-size: 20px;
    padding: 50px 20px;
  }
}
</style>
