<script setup>
import { useProgramStore } from '@/stores/agentData.js'
import pagetitle from '@/views/Layout/components/LayoutPageTitle.vue'
import { ref, onUnmounted, computed } from 'vue'
import IconChild_more from '@/components/icons/IconChild_more.vue'
import IconChild_end from '@/components/icons/IconChild_end.vue'
import transToTree from '@/utils/tree/objToTree.js'
import { submitProgram } from '@/apis/programAPI'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useProgramStore()
const programstruct = ref(store.programData)
console.log('programstruct= ', programstruct.value)
console.log('programstruct= ', JSON.stringify(programstruct.value))

const data = transToTree(programstruct.value)

const defaultProps = {
  children: 'children',
  label: 'label'
}

const descriptionColNum = ref(3)
const descriptDirection = ref('horizontal')
const updateColumnNum = () => {
  if (window.innerWidth < 800) {
    descriptionColNum.value = 1
    descriptDirection.value = 'vertical'
  } else {
    descriptionColNum.value = 3
    descriptDirection.value = 'horizontal'
  }
}
updateColumnNum()
window.addEventListener('resize', updateColumnNum)

// 确保在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateColumnNum)
})
const submit = async () => {
  // 送出前檢查
  console.log(store.programData)
  let resultMsg = ''
  let p = store.programData

  p.category.forEach((c) => {
    // 如果類別沒有課程(代表要有領域)
    if (!c.course || c.course.length <= 0) {
      // 如果類別沒有領域，顯示訊息
      if (c.domain.length <= 0) {
        // console.log(`類別 ${c.category_name} 尚未指定科目`)
        resultMsg += '類別 ' + c.category_name + ' 尚未指定科目<br/>'
      } else {
        // 如果有領域，檢查領域
        c.domain.forEach((d) => {
          // 每個領域中，沒有科目的項目，顯示訊息
          if (!d.course || d.course.length <= 0) {
            // console.log(`領域 ${d.domain_name} 尚未指定科目`)
            resultMsg += '領域 ' + d.domain_name + ' 尚未指定科目<br/>'
          }
        })
      }
    }

    // if (c.course && c.course.length > 0) {
    //   // c.course.forEach((crs) => {
    //   //   console.log(`科目: ${crs.subject_sub_id} ${crs.subject_name}`)
    //   // })
    // } else {
    //   if (c.domain.length > 0) {
    //     // console.log('有領域')
    //     c.domain.forEach((d) => {
    //       if (d.course && d.course.length > 0) {
    //         // console.log('領域有課程')
    //       } else {
    //         console.log(`領域 ${d.domain_name} 尚未指定科目`)
    //       }
    //     })
    //   } else {
    //     console.log(`類別 ${c.category_name} 尚未指定科目`)
    //   }
    // }
  })
  console.log(resultMsg)
  if (!resultMsg) {
    // 回傳到server端
    console.log('學程資料: ', JSON.stringify(store.programData))
    let res = await submitProgram(JSON.stringify(store.programData))
    console.log('submit response=', res)
    router.push({ path: '/managePrograms' })
  } else {
    ElMessageBox.alert(resultMsg, '學程架構錯誤', {
      confirmButtonText: '確認',
      dangerouslyUseHTMLString: true,
      draggable: true
    })
      .then((res) => {
        console.log('user click  OK.', res)
      })
      .catch((e) => {
        console.log('user click cancel.', e)
      })
  }
}

const getClass = (c) => {
  return {
    noSubject: !c.domain.length > 0 && (!c.course || c.course.length == 0)
  }
}
const getClassD = (d) => {
  return {
    noSubject: (d.course && !d.course.length > 0) || !d.course
  }
}
</script>
<template>
  <div class="page-container">
    <pagetitle>學程資訊<el-button type="success" @click="submit" style="margin-left: 10px">送出</el-button></pagetitle>

    <el-descriptions
      class="margin-top"
      :column="descriptionColNum"
      size="default"
      border
      :direction="descriptDirection"
    >
      <!-- <template #extra>
        <el-button type="primary">Operation</el-button>
      </template> -->
      <el-descriptions-item label="名稱" label-align="center"> {{ programstruct.program_name }}</el-descriptions-item>
      <el-descriptions-item label="網址" label-align="center"> {{ programstruct.program_url }}</el-descriptions-item>
      <el-descriptions-item label="類型" label-align="center"> {{ programstruct.program_type }}</el-descriptions-item>
      <el-descriptions-item label="修畢條件" label-align="center">
        {{ programstruct.program_criteria }}</el-descriptions-item
      >
      <el-descriptions-item label="最低應修學分數" label-align="center">
        {{ programstruct.program_minCredit }}</el-descriptions-item
      >
      <el-descriptions-item label="非本系學分數" label-align="center">
        {{ programstruct.program_nonSelfCredit }}</el-descriptions-item
      >
      <el-descriptions-item label="設置單位" label-align="center">
        {{ programstruct.program_unit }}</el-descriptions-item
      >
    </el-descriptions>
    <pagetitle>學程架構</pagetitle>
    <div class="program-structure" v-for="category in programstruct.category" :key="category.key">
      <div v-if="category.domain.length === 0">
        <el-tooltip class="box-item" effect="dark" content="點我開始設定課程" placement="right">
          <router-link
            class="baseItem islink"
            :class="getClass(category)"
            style="margin-bottom: 10px"
            :to="{ name: 'setSubject', params: { category_name: category.category_name } }"
            >{{ category.category_name }}</router-link
          >
        </el-tooltip>
      </div>
      <div v-else>
        <div class="baseItem" :class="getClass(category)">{{ category.category_name }}</div>
      </div>

      <div class="domainblock" v-for="(domain, index) in category.domain" :key="domain.index">
        <div class="domainblock_left">
          <span v-if="!(category.domain.length == index + 1)"
            ><IconChild_more class="set-icon-size"></IconChild_more
          ></span>
          <span v-else> <IconChild_end class="set-icon-size"></IconChild_end></span>
        </div>
        <div class="domainblock_right">
          <el-tooltip class="box-item" effect="dark" content="點我開始設定課程" placement="right">
            <router-link
              class="baseItem islink domain"
              :class="getClassD(domain)"
              :to="{
                name: 'setSubject',
                params: { category_name: category.category_name, domain_name: domain.domain_name }
              }"
            >
              {{ domain.domain_name }}</router-link
            >
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="description">請在以下樹形結構檢查學程架構是否正確</div>

    <el-tree class="tree" style="max-width: 600px" :data="data" :props="defaultProps" default-expand-all />
    <el-button type="success" @click="submit">送出</el-button>
  </div>
</template>
<style lang="scss" scoped>
.description {
  margin: 30px 0;
}
:deep(.el-tree-node__content) {
  padding: 15px;
}
.tree {
  margin: 20px 0 20px 50px;
}
.program-structure {
  padding-left: 50px;
}

.domainblock {
  display: flex;
  padding-left: 10px;
  // flex-wrap: wrap;
}
.domainblock_right {
  display: flex;
  align-items: center;
  width: 85%;
  padding: 5px 0;
}

.courseblock {
  display: flex;
  padding-left: 40px;
}
.courseblock_right {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.set-icon-size {
  // float: left;
  // margin-right: 50px;
  height: 100%;
}

.blank {
  height: 1rem;
}

.cell-item {
  text-align: center;
}
.baseItem {
  // <router-link>最終是產生<a>，而<a>預設display: inline;所以要改成block
  display: block;
  padding: 5px 10px;
  font-size: 16px;
  width: fit-content;
  border-radius: 5px;
  // margin-top: 5px;
  background-color: #ccc;
  border: none;
}
.domain {
  // margin-left: 50px;
}
// .nonlink {
//   background-color: #ccc;
//   border: none;
// }
.islink {
  display: block;
  background-color: $primaryColor;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  // margin-top: 5px;
  // margin-left: 20px;
  width: fit-content;
  border: 1px solid var(--el-color-primary-light-3);
  color: white;
  &:hover {
    background-color: var(--el-color-primary-dark-2);

    cursor: pointer;
  }
}
.hasSubject {
  color: green;
}
.noSubject {
  color: red;
}
</style>
