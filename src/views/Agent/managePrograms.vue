<script setup>
import { useRouter } from 'vue-router'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
// import { reactive, ref } from 'vue'
import { useProgramStore } from '@/stores/agentData.js'
import { ref, onMounted } from 'vue'
import { getUnitPG, getUnitPrograms, deleteProgram } from '@/apis/programAPI.js'
const router = useRouter()
const store = useProgramStore()

const go_createStructure = () => {
  router.push({ path: '/createStructure' })
}

const tableData = ref([])

const deleteRow = async (index, row) => {
  const res = await deleteProgram({ program_id: row.program_id })
  console.log('delete result = ', res)
  tableData.value.splice(index, 1)
  // 刪除學程
}
const editRow = (row) => {
  // 編輯學程
  store.setCurrentPGId(row.program_id)
  router.push({ path: '/loadStructure' })
}

onMounted(async () => {
  let unit = sessionStorage.getItem('user_unit')
  const res = await getUnitPG({ unit: unit })
  console.log(res)
  tableData.value = res
})
const tableRowClicked = (row, event, column) => {
  // console.log('row', row)
}
</script>
<template>
  <div class="page-container">
    <pagetitle>學程管理</pagetitle>
    <el-button class="btn_create" type="success" @click="go_createStructure">新增學程</el-button>

    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="350"
      @row-click="tableRowClicked"
      :header-cell-style="{ 'text-align': 'left' }"
      :cell-style="{ 'text-align': 'left' }"
    >
      <el-table-column fixed prop="program_id" label="學程ID" width="150" />
      <el-table-column prop="program_name" label="學程名稱" width="120" />
      <el-table-column prop="program_type" label="學程類型" width="120" />
      <el-table-column prop="program_unit" label="學程單位" width="120" />
      <el-table-column prop="program_url" label="學程網址" />

      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click.prevent="editRow(scope.row)"> 查看 </el-button>
          <el-button type="primary" size="small" @click.prevent="deleteRow(scope.$index, scope.row)"> 刪除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.btn_create {
  margin: 10px 0;
}

.center {
  text-align: center;
}
</style>
