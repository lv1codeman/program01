<script setup>
import BKbuttons from '@/components/buttons'
import { useRouter } from 'vue-router'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
// import { reactive, ref } from 'vue'
import { useProgramStore } from '@/stores/agentData.js'
import { ref, onMounted } from 'vue'
import { getUnitPG, getUnitPGById, deleteProgram } from '@/apis/programAPI.js'
import { InfoFilled } from '@element-plus/icons-vue'
import transformServerJSON from '@/utils/transformServerJSON.js'
const router = useRouter()
const store = useProgramStore()

onMounted(async () => {
  let unit = sessionStorage.getItem('user_unit')
  const res = await getUnitPG({ unit: unit })
  console.log(res)
  tableData.value = res
})

const go_createStructure = () => {
  router.push({ path: '/agent/create' })
}

const tableData = ref([])

const deleteRow = async (index, row) => {
  console.log('deleteRow start...')

  const res = await deleteProgram({ program_id: row.program_id })
  console.log('delete result = ', res)
  tableData.value.splice(index, 1)
  // 刪除學程
}
const editRow = async (row) => {
  // 編輯學程
  // 從server讀取這筆資料(by program_id)存到store.programData
  store.setCurrentPGId(row.program_id)

  let user_unit = sessionStorage.getItem('user_unit')
  console.log('user_unit=', user_unit)
  console.log('store.currentPGId=', store.currentPGId)

  let res = await getUnitPGById({ unit: user_unit, program_id: store.currentPGId })
  console.log('res= ', res.data)
  let resJson = transformServerJSON(res.data)
  store.setProgramData(resJson)

  router.push({ path: '/agent/edit' })
}

const tableRowClicked = (row, event, column) => {
  // console.log('row', row)
}
</script>
<template>
  <div class="page-container">
    <pagetitle>學程管理</pagetitle>

    <BKbuttons.CustomButtonWrapper
      type="success"
      icon="fa-plus"
      iconClass="mr-4 mb-2 fontsize-16"
      @click="go_createStructure"
      :style="{ marginBottom: '10px', padding: '0 10px' }"
    >
      新增学程
    </BKbuttons.CustomButtonWrapper>

    <!-- <el-button class="btn_create" type="success" @click="go_createStructure">
      <el-icon :size="15" class="mr-2"> <Plus /> </el-icon>新增學程
    </el-button> -->

    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="350"
      @row-click="tableRowClicked"
      :header-cell-style="{ 'text-align': 'left' }"
    >
      <el-table-column fixed prop="program_id" label="學程ID" width="150" />
      <el-table-column prop="program_name" label="學程名稱" width="120" />
      <el-table-column prop="program_type" label="學程類型" width="120" />
      <el-table-column prop="program_unit" label="學程單位" width="120" />
      <el-table-column prop="program_url" label="學程網址" />

      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" class="op_button" @click.prevent="editRow(scope.row)">
            <el-icon class="mr-2" :size="16"><Edit /></el-icon>
            編輯
          </el-button>
          <!-- <el-button type="primary" size="small" @click.prevent="deleteRow(scope.$index, scope.row)"> 刪除 </el-button> -->
          <el-popconfirm
            title="確定要刪除嗎?"
            confirmButtonText="確認"
            cancelButtonText="取消"
            @confirm="deleteRow(scope.$index, scope.row)"
            iconColor="var(--el-color-warning)"
            :icon="InfoFilled"
          >
            <!-- icon="el-icon-info" -->
            <template #reference>
              <el-button type="primary" class="op_button">
                <el-icon class="mr-2" :size="16"><Delete /></el-icon>
                刪除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.op_button {
  padding: 5px 10px;
}

.btn_create {
  margin: 10px 0;
}

.center {
  text-align: center;
}
</style>
