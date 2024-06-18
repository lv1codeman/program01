<script setup>
import { useRouter } from 'vue-router'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { reactive, ref } from 'vue'
import { useProgramStore } from '@/stores/agentData.js'

const router = useRouter()
const store = useProgramStore()

const go_createStructure = () => {
  router.push({ path: '/createStructure' })
}

const go_loadStructure = () => {
  router.push({ path: '/loadStructure' })
}

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
])

const deleteRow = (index) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  tableData.value.push({
    date: 'now',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  })
}
</script>
<template>
  <div class="page-container">
    <pagetitle>學程管理</pagetitle>
    <el-button @click="go_createStructure">新增學程</el-button>
    <el-button @click="go_loadStructure">load學程</el-button>

    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> Remove </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem"> Add Item </el-button>
  </div>
</template>
<style lang="scss" scoped></style>
