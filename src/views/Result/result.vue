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

const domStyle = getComputedStyle(document.documentElement)
const colorObj = ref({
  primaryColor: domStyle.getPropertyValue('--el-color-primary'),
  successColor: domStyle.getPropertyValue('--el-color-success'),
  warningColor: domStyle.getPropertyValue('--el-color-warning'),
  dangerColor: domStyle.getPropertyValue('--el-color-danger'),
  errorColor: domStyle.getPropertyValue('--el-color-error'),
  infoColor: domStyle.getPropertyValue('--el-color-info'),
  textColorRegular: domStyle.getPropertyValue('--el-text-color-regular'),
  textColorPrimary: domStyle.getPropertyValue('--el-text-color-primary'),
  textColorSecondary: domStyle.getPropertyValue('--el-text-color-secondary'),
  textColorPlaceholder: domStyle.getPropertyValue('--el-text-color-placeholder'),
  bgPageColor: domStyle.getPropertyValue('--el-bg-color-page'),
  navbgColor: domStyle.getPropertyValue('--nav-bg-color')
  // tableHeaderTextColor: domStyle.getPropertyValue('--el-table-header-text-color')
})

onMounted(() => {})
const getRootStyle = () => {
  colorObj.value.primaryColor = domStyle.getPropertyValue('--el-color-primary')
  colorObj.value.successColor = domStyle.getPropertyValue('--el-color-success')
  colorObj.value.warningColor = domStyle.getPropertyValue('--el-color-warning')
  colorObj.value.dangerColor = domStyle.getPropertyValue('--el-color-danger')
  colorObj.value.errorColor = domStyle.getPropertyValue('--el-color-error')
  colorObj.value.infoColor = domStyle.getPropertyValue('--el-color-info')
  colorObj.value.textColorRegular = domStyle.getPropertyValue('--el-text-color-regular')
  colorObj.value.textColorPrimary = domStyle.getPropertyValue('--el-text-color-primary')
  colorObj.value.textColorSecondary = domStyle.getPropertyValue('--el-text-color-secondary')
  colorObj.value.textColorPlaceholder = domStyle.getPropertyValue('--el-text-color-placeholder')
  colorObj.value.bgPageColor = domStyle.getPropertyValue('--el-bg-color-page')
  colorObj.value.navbgColor = domStyle.getPropertyValue('--nav-bg-color')
}
// console.log(tableData)

// const domStyle = getComputedStyle(document.documentElement)
// console.log(domStyle.getPropertyValue('--el-primary-color'))
/*
body {
  -webkit-print-color-adjust: exact;
}
解決chrome預設關閉背景圖形造成background-color失效的問題
*/
const printstyle = `
body {
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
  }
.headtext1 {
  color: ${colorObj.value.primaryColor};
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 10px 0;
}
.headtext2{
  color: ${colorObj.value.successColor};
  font-size: 24px;
  // font-weight: bold;
  margin: 20px 0 10px 0;

}

.el-table__header th{
  color: black !important;
  background-color: #dfdfdf !important;
}


.el-table__cell{
  border: 1px solid black;
  text-align: left;
}
.flex-center{
  // margin-bottom: 100px;
}
.resTable {
    page-break-inside: avoid;
    // width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }

.print{
  display: block;
  margin-top: 50px;
}
.forlogo{
  position: relative;
}
.logo {
  position: relative;
  // top: -108px;
  // left: -10px;
  width: 200px;
  background: url('https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/ncue-logo.png') no-repeat center / contain;
  height: 80px;
}
.headerContent{
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.watermark {
  display: block;
  top: 0;
  left: 0;
  background: url('https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/watermark.png') no-repeat center / 700px 700px;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.7;
}
`

const goPrint = () => {
  // getRootStyle()

  printJS({
    // printable: 'printDom',
    printable: printItem.value.id,
    header:
      '<div class="logo"></div>' +
      '<div class="headerContent">' +
      store.studentData.student.id +
      '/' +
      store.studentData.program.name +
      ' 檢查結果' +
      '</div>',

    // '<p>' + store.studentData.student.id + '/' + store.studentData.program.name + ' 檢查結果' + '</p>',
    headerStyle: 'text-align: center;',
    // ignoreElements: ['noprint1'],
    // style: '.headtext { color: red; } .el-table__header{border: 1px solid black; text-align: left;}',
    style: printstyle,
    scanStyles: false,
    documentTitle: 'NCUE學分學程檢查平台',
    type: 'html',
    targetStyles: ['*'],
    onPrintDialogClose: () => {
      // const printElement = document.getElementById(printItem.value.id)
      // if (printElement) {
      //   console.log(printElement.outerHTML) // 打印頁面的HTML
      // } else {
      //   console.error(`Element with id ${printItem.value.id} not found.`)
      // }
    }
  })
}
</script>
<template>
  <div class="page-container">
    <pagetitle
      >檢查結果
      <el-button @click="goPrint"
        ><font-awesome-icon class="iconfont" icon="fa-print" />&nbsp;列印</el-button
      ></pagetitle
    >

    <div id="printDom" ref="printItem">
      <div class="watermark"></div>
      <!-- <div class="forlogo">
        <div class="logo print"></div>
      </div> -->
      <!-- <div class="printContainer"> -->
      <div class="headtext1">
        <el-text type="primary">缺少的科目</el-text>
        <!-- 缺少的科目 -->
      </div>
      <div class="flex-center">
        <el-table class="resTable" :data="tableData" header-cell-class-name="table_header_style">
          <el-table-column fixed prop="subjectID" label="科目代碼" width="150px"></el-table-column>
          <el-table-column prop="subjectName" label="課程名稱" width="300px"></el-table-column>
          <el-table-column prop="unit" label="開課單位" width="200px"></el-table-column>
          <el-table-column prop="sys" label="學制" width="100px"></el-table-column>
          <el-table-column prop="credit" label="學分" width="55px"></el-table-column>
          <el-table-column prop="hour" label="學時" width="55px"></el-table-column>
        </el-table>
      </div>
      <div class="headtext2">
        <el-text type="success" class="headtext">已完成的科目</el-text>
      </div>
      <div class="flex-center">
        <el-table class="resTable" :data="tableData2" header-cell-class-name="table_header_style">
          <el-table-column fixed prop="subjectID" label="科目代碼" width="150px"></el-table-column>
          <el-table-column prop="subjectName" label="課程名稱" width="250px"></el-table-column>
          <el-table-column prop="unit" label="開課單位" width="200px"></el-table-column>
          <el-table-column prop="sys" label="學制" width="70px"></el-table-column>
          <el-table-column prop="credit" label="學分" width="55px"></el-table-column>
          <el-table-column prop="hour" label="學時" width="55px"></el-table-column>
          <el-table-column prop="finishtime" label="學年度-學期" width="110px"></el-table-column>
          <el-table-column prop="score" label="成績" width="55px"></el-table-column>
        </el-table>
      </div>
      <div class="print">
        部分學程因規則複雜，故本系統資訊僅供參考，認證時仍須依各學程規定辦理，且申請認證的科目須至少1門非學生主系的專業科目。
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style lang="scss" scoped>
.watermark {
  display: none;
  background: url('https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/watermark.png') no-repeat center / 700px 700px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 10vh;
  left: 0vw;
  // z-index: 1;
  // opacity: 1;
}
.print {
  display: none;
  margin-top: 50px;
}
.logo {
  width: 200px;
  height: 80px;
  background: url('https://acadaff.ncue.edu.tw/var/file/2/1002/img/786/ncue-logo.png') no-repeat center / contain;
}
// .printContainer {
//   print-color-adjust: exact;
//   -webkit-print-color-adjust: exact;
// }
:deep(.table_header_style) {
  background-color: #dfdfdf !important;
}

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
  width: auto;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 20px;
}
@media screen and (max-width: 818px) {
  .resTable {
    width: 90%;
    // height: auto !important;
  }
}
</style>
