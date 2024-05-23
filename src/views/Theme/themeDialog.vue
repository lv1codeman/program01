<script setup>
import { ref } from 'vue'

const setColor = (target, colorcode) => {
  console.log('change primary color')
  const el = document.documentElement
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  el.style.setProperty(target, colorcode)

  //#region 印出所有css
  // const cssVariables = {}
  // const sheets = document.styleSheets
  // console.log(sheets.length)
  // for (let i = 0; i < sheets.length; i++) {
  //   const sheet = sheets[i]
  //   // console.log(sheet.cssRules.length)
  //   try {
  //     const rules = sheet.cssRules
  //     for (let j = 0; j < rules.length; j++) {
  //       const rule = rules[j]
  //       if (rule.style) {
  //         for (let k = 0; k < rule.style.length; k++) {
  //           const propName = rule.style[k]
  //           if (propName.startsWith('--')) {
  //             console.log('i=', i)
  //             console.log('j=', j)
  //             console.log('k=', k)
  //             cssVariables[propName] = rule.style.getPropertyValue(propName).trim()
  //           }
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     // console.warn(`無法存取樣式表：${sheet.href}`, e)
  //   }
  // }
  // console.log(cssVariables)
  //#endregion
}
const primarycolor = ref('#6bb1cc')
const primarycolor_light_3 = ref('#b5d8e6')
const primarycolor_light_5 = ref('#b5d8e6')
const primarycolor_light_7 = ref('#d3e8f0')
const primarycolor_light_8 = ref('#e1eff5')
const primarycolor_light_9 = ref('#f0f7fa')
const primarycolor_dark_2 = ref('#568ea3')

// const successcolor = ref('#ffbd41')
// const warningcolor = ref('#ffeccc')
// const dangercolor = ref('#a33131')
// const infocolor = ref('#8b8b8b')
// const textprimarycolor = ref('#074b5f')
const predefineColors = ref(['#6bb1cc', '#1e90ff', 'rgba(255, 69, 0, 0.68)'])
</script>
<template>
  <div class="page-container">
    <div class="themebox">
      <div class="title">主色</div>
      <div class="description">--el-color-primary</div>
      <div class="palette">
        <el-color-picker
          v-model="primarycolor"
          show-alpha
          :predefine="predefineColors"
          @change="setColor('--el-color-primary', primarycolor)"
        />
      </div>
      <div class="title">主色-淡3階</div>
      <div class="description">--el-color-primary-light-3</div>
      <div class="palette">
        <el-color-picker
          v-model="primarycolor_light_3"
          show-alpha
          :predefine="predefineColors"
          @change="setColor('--el-color-primary-light-3', primarycolor_light_3)"
        />
      </div>
      <div class="title">主色-淡5階</div>
      <div class="description">--el-color-primary-light-5</div>
      <div class="palette">
        <el-color-picker
          v-model="primarycolor_light_5"
          show-alpha
          :predefine="predefineColors"
          @change="setColor('--el-color-primary-light-5', primarycolor_light_5)"
        />
      </div>
      <div class="title">主色-淡7階</div>
      <div class="description">--el-color-primary-light-7</div>
      <div class="palette">
        <el-color-picker
          v-model="primarycolor_light_7"
          show-alpha
          :predefine="predefineColors"
          @change="setColor('--el-color-primary-light-7', primarycolor_light_7)"
        />
      </div>
      <div class="title">主色-淡8階</div>
      <div class="description">--el-color-primary-light-8</div>
      <div class="palette">
        <el-color-picker
          v-model="primarycolor_light_8"
          show-alpha
          :predefine="predefineColors"
          @change="setColor('--el-color-primary-light-8', primarycolor_light_8)"
        />
      </div>
      <div class="title">主色-淡9階</div>
      <div class="description">--el-color-primary-light-9</div>
      <div class="palette">
        <el-color-picker
          v-model="primarycolor_light_9"
          show-alpha
          :predefine="predefineColors"
          @change="setColor('--el-color-primary-light-9', primarycolor_light_9)"
        />
      </div>
    </div>

    <!-- 成功色success:<el-color-picker
      v-model="successcolor"
      show-alpha
      :predefine="predefineColors"
      @change="setPrimary(color)"
    /><br />
    警告色success:<el-color-picker
      v-model="warningcolor"
      show-alpha
      :predefine="predefineColors"
      @change="setPrimary(color)"
    /><br />
    危險色danger:<el-color-picker
      v-model="dangercolor"
      show-alpha
      :predefine="predefineColors"
      @change="setPrimary(color)"
    /><br />
    資訊色info:<el-color-picker
      v-model="infocolor"
      show-alpha
      :predefine="predefineColors"
      @change="setPrimary(color)"
    /><br />
    文字主色text-color-primary:<el-color-picker
      v-model="textprimarycolor"
      show-alpha
      :predefine="predefineColors"
      @change="setPrimary(color)"
    /><br /> -->
  </div>
</template>
<style lang="scss" scoped></style>
