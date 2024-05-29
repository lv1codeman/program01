<script setup>
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { useStudentStore } from '@/stores/studentData.js'
import { subjectList } from '@/assets/data/subjectList.js'
import { result } from '@/assets/data/result.js'
import printJS from 'print-js'
import { onMounted, ref } from 'vue'

const store = useStudentStore()

console.log(`store data= ${store.studentData.student.id}`)
console.log(`selected program name= ${store.studentData.program.name}`)

const tableData = []
for (let i = 0; i < 10; i++) {
  tableData.push(subjectList[i])
}
const tableData2 = []
for (let i = 0; i < 20; i++) {
  tableData2.push(result[i])
}
const printItem = ref(null)

onMounted(() => {
  // console.log(`on mounted`)
  // console.log(printItem.value.id)
  const printContent = printItem.value.id
  // console.log(`id: ${printContent}`)
  // console.log(`width: ${printContent.clientWidth}`)
  if (printItem.value) {
    // console.log(`seeeeet`)
    // printItem.value.style.height = 'auto'
  }
})
// console.log(tableData)

const printstyle = `
.headtext1 { 
  color: red;
  font-size: 24px;
  margin: 20px 0 10px 0;
} 
.headtext2{
  color: blue;
  font-size: 24px;
  margin: 20px 0 10px 0;
}
.el-table thead{
  color: green;
}

.el-table__cell{
  border: 1px solid black;
  text-align: left;
}
.flex-center{
  // margin-bottom: 100px;
}
`
const printPage = () => {
  // console.log(document.styleSheets)
  printJS({
    // printable: 'printDom',
    printable: printItem.value.id,
    header: store.studentData.student.id + '/' + store.studentData.program.name + ' 檢查結果',
    headerStyle: 'text-align: center;',
    // ignoreElements: ['noprint1'],
    // style: '.headtext { color: red; } .el-table__header{border: 1px solid black; text-align: left;}',
    style: printstyle,
    scanStyles: false,
    documentTitle: 'NCUE學分學程檢查平台',
    type: 'html',
    targetStyles: ['*']
  })
}
</script>
<template>
  <div class="page-container">
    <pagetitle>檢查結果</pagetitle>
    <el-button @click="printPage">print</el-button>
    <div id="printDom" ref="printItem">
      <div class="headtext1">
        <el-text type="primary">缺少的科目</el-text>
      </div>
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
      <div class="headtext2">
        <el-text type="success" class="headtext">已完成的科目</el-text>
      </div>
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
  </div>
</template>
<style lang="scss" scoped>
.headtext1 {
  span {
    font-size: 22px;
    font-weight: bold;
  }
}
.headtext2 {
  span {
    font-size: 22px;
    font-weight: bold;
  }
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
    // height: auto !important;
  }
}
@media print {
  .headtext {
    color: red;
  }
  .resTable {
    page-break-inside: avoid;
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }
}
</style>
