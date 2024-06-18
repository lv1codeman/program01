<script setup>
import { useRouter } from 'vue-router'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
// import { reactive, ref } from 'vue'
import { useProgramStore } from '@/stores/agentData.js'
import { ref, onMounted } from 'vue'
import { getUnitPG } from '@/apis/programAPI.js'

const router = useRouter()
const store = useProgramStore()

const go_createStructure = () => {
  router.push({ path: '/createStructure' })
}

const go_loadStructure = () => {
  router.push({ path: '/loadStructure' })
}

const tableData = ref([])

const deleteRow = (index) => {
  tableData.value.splice(index, 1)
  // 刪除學程
}

onMounted(async () => {
  let unit = sessionStorage.getItem('user_unit')
  const res = await getUnitPG({ unit: unit })
  console.log(res)
  tableData.value = res
})
</script>
<template>
  <div class="page-container">
    <pagetitle>學程管理</pagetitle>
    <el-button @click="go_createStructure">新增學程</el-button>
    <el-button @click="go_loadStructure">load學程</el-button>

    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="program_id" label="學程ID" width="150" />
      <el-table-column prop="program_name" label="學程名稱" width="120" />
      <el-table-column prop="program_type" label="學程類型" width="120" />
      <el-table-column prop="program_unit" label="學程單位" width="120" />
      <el-table-column prop="program_url" label="學程網址" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> 刪除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped></style>
