<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { subjectList } from '@/assets/data/subjectList.js'
import { result } from '@/assets/data/result.js'
const tableData = []
for (let i = 0; i < 10; i++) {
  tableData.push(subjectList[i])
}
const tableData2 = []
for (let i = 0; i < 20; i++) {
  tableData2.push(result[i])
}
console.log(tableData)
</script>
<template>
  <div class="page-container">
    <pagetitle>檢查結果</pagetitle>
    <el-text type="primary" class="headtext">缺少的科目</el-text>
    <div class="flex-center">
      <el-table class="resTable" :data="tableData">
        <el-table-column fixed prop="subjectID" label="科目代碼" />
        <el-table-column prop="subjectName" label="課程名稱" />
        <el-table-column prop="sys" label="學制" />
        <el-table-column prop="unit" label="開課單位" />
        <el-table-column prop="credit" label="學分" />
        <el-table-column prop="hour" label="學時" />
      </el-table>
    </div>
    <el-text type="success" class="headtext">已完成的科目</el-text>
    <div class="flex-center">
      <el-table class="resTable" :data="tableData2">
        <el-table-column fixed prop="subjectID" label="科目代碼" />
        <el-table-column prop="subjectName" label="課程名稱" />
        <el-table-column prop="sys" label="學制" />
        <el-table-column prop="unit" label="開課單位" />
        <el-table-column prop="credit" label="學分" />
        <el-table-column prop="hour" label="學時" />
        <el-table-column prop="finishtime" label="學年度-學期" />
        <el-table-column prop="score" label="成績" />
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.headtext {
  font-size: 22px;
  font-weight: bold;
}
.resTable {
  width: 80%;
  height: 400px;
  margin-top: 10px;
  margin-bottom: 20px;
}
@media screen and (max-width: 818px) {
  .resTable {
    width: 90%;
  }
}
</style>
