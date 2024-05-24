<script setup>
import { ref } from 'vue'
// import { rgbToHex, hexToRgb, rgbToHex_obj, rgbaToHex, genPrimaryLevel } from '@/utils/color/convertColorCode.js'
import generateShades from '@/utils/color/genColorGrade.js'
const setColor = (target, colorCode) => {
  console.log('change primary color')
  const el = document.documentElement
  console.log(getComputedStyle(el).getPropertyValue('--el-color-primary'))

  const shadesAndTints = generateShades(colorCode)
  console.log(shadesAndTints)

  //#region 建立色階表
  const postfix = []
  postfix[0] = target
  for (let i = 0; i < 9; i++) {
    postfix[i + 1] = target + '-light-' + (i + 1)
  }
  for (let i = 10; i < 12; i++) {
    postfix[i] = target + '-dark-' + (i - 9)
  }
  // 第一個顏色放原本的色碼
  shadesAndTints.unshift(colorCode)
  //#endregion

  const target_list = []
  for (let i = 0; i < postfix.length; i++) target_list.push({ key: postfix[i], value: shadesAndTints[i] })

  console.log(target_list)

  target_list.forEach((item) => {
    getComputedStyle(el).getPropertyValue(item.key)
    el.style.setProperty(item.key, item.value)
  })

  //#region
  // const target_list = []
  // target_list.push({ key: target, value: colorCode })
  // target_list.push({
  //   key: target + '-light-3',
  //   value: rgbToHex_obj(genPrimaryLevel(hexToRgb(colorCode).r, hexToRgb(colorCode).g, hexToRgb(colorCode).b, 3))
  // })
  // target_list.push({
  //   key: target + '-light-5',
  //   value: rgbToHex_obj(genPrimaryLevel(hexToRgb(colorCode).r, hexToRgb(colorCode).g, hexToRgb(colorCode).b, 5))
  // })
  // target_list.push({
  //   key: target + '-light-7',
  //   value: rgbToHex_obj(genPrimaryLevel(hexToRgb(colorCode).r, hexToRgb(colorCode).g, hexToRgb(colorCode).b, 7))
  // })
  // target_list.push({
  //   key: target + '-light-8',
  //   value: rgbToHex_obj(genPrimaryLevel(hexToRgb(colorCode).r, hexToRgb(colorCode).g, hexToRgb(colorCode).b, 8))
  // })
  // target_list.push({
  //   key: target + '-light-9',
  //   value: rgbToHex_obj(genPrimaryLevel(hexToRgb(colorCode).r, hexToRgb(colorCode).g, hexToRgb(colorCode).b, 9))
  // })
  // target_list.push({
  //   key: target + '-dark-2',
  //   value: rgbToHex_obj(genPrimaryLevel(hexToRgb(colorCode).r, hexToRgb(colorCode).g, hexToRgb(colorCode).b, -2))
  // })
  //#endregion
  //#region

  // target_list.forEach((item) => {
  //   getComputedStyle(el).getPropertyValue(item.key)
  //   el.style.setProperty(item.key, item.value)
  // })

  //#endregion
  // console.log(getComputedStyle(el).getPropertyValue('--el-color-error'))
  // console.log(colorCode)

  // 使用範例
  // const hexColor = "#3498db";
  // const shadesAndTints = generateShades(hexColor);
  // console.log(shadesAndTints);
}

// $primaryColor: #6bb1cc;
// $successColor: #ffbd41;
// $warningColor: #ffeccc;
// $dangerColor: #a33131;
// $errorColor: #d41414;
// $infoColor: #8b8b8b;

//#region 顏色變數宣告
const primarycolor = ref('#6bb1cc')
const successcolor = ref('#ffbd41')
const warningcolor = ref('#ffeccc')
const dangercolor = ref('#a33131')
const infocolor = ref('#8b8b8b')
const textprimarycolor = ref('#074b5f')
//#endregion

const predefineColors = ref(['#6bb1cc', '#1e90ff', 'rgba(255, 69, 0, 0.68)'])
// const colorresult = ref()
</script>
<template>
  <div class="page-container">
    <div class="themebox">
      <div class="title">主色</div>
      <div class="description">--el-color-primary</div>

      <div class="showPalette">
        <div class="palette">
          <el-color-picker
            v-model="primarycolor"
            :predefine="predefineColors"
            @change="setColor('--el-color-primary', primarycolor)"
            color-format="hex"
          />
        </div>
        <div class="light9">light9</div>
        <div class="light8">light8</div>
        <div class="light7">light7</div>
        <div class="light5">light5</div>
        <div class="light3">light3</div>
        <div class="origin">origin</div>
        <div class="dark">dark</div>
      </div>
      <div class="title">成功色</div>
      <div class="description">--el-color-success</div>
      <div class="palette">
        <el-color-picker
          v-model="successcolor"
          :predefine="predefineColors"
          @change="setColor('--el-color-success', primarycolor)"
          color-format="hex"
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
<style lang="scss" scoped>
.showPalette {
  display: flex;
  margin: 5px 0;
  gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  .palette {
    width: 50px;
  }
  .origin {
    background-color: var(--el-color-primary);
    width: 50px;
  }
  .light3 {
    background-color: var(--el-color-primary-light-3);
    width: 50px;
  }
  .light5 {
    background-color: var(--el-color-primary-light-5);
    width: 50px;
  }
  .light7 {
    background-color: var(--el-color-primary-light-7);
    width: 50px;
  }
  .light8 {
    background-color: var(--el-color-primary-light-8);
    width: 50px;
  }
  .light9 {
    background-color: var(--el-color-primary-light-9);
    width: 50px;
  }
  .dark {
    background-color: var(--el-color-primary-dark-2);
    width: 50px;
  }
}
</style>
