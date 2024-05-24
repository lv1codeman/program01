<script setup>
import { ref } from 'vue'
// import { rgbToHex, hexToRgb, rgbToHex_obj, rgbaToHex, genPrimaryLevel } from '@/utils/color/convertColorCode.js'
import generateShades from '@/utils/color/genColorGrade.js'
const setColor = (target, colorCode) => {
  console.log('change primary color')
  const el = document.documentElement
  // console.log(getComputedStyle(el).getPropertyValue('--el-color-primary'))

  const colorTable = generateShades(colorCode)
  console.log(colorTable)

  console.log('target=', target)

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
  colorTable.unshift(colorCode)
  //#endregion

  const target_list = []
  for (let i = 0; i < postfix.length; i++) target_list.push({ key: postfix[i], value: colorTable[i] })

  console.log(target_list)

  target_list.forEach((item) => {
    getComputedStyle(el).getPropertyValue(item.key)
    el.style.setProperty(item.key, item.value)
  })
}

const setTextColor = (target, colorCode) => {
  console.log('change primary color')
  const el = document.documentElement
  getComputedStyle(el).getPropertyValue(target)
  el.style.setProperty(target, colorCode)
}
// $primaryColor: #6bb1cc;
// $successColor: #ffbd41;
// $warningColor: #ffeccc;
// $dangerColor: #a33131;
// $errorColor: #d41414;
// $infoColor: #8b8b8b;

//#region 顏色變數宣告
const primaryColor = ref('#6bb1cc')
const successColor = ref('#ffbd41')
const warningColor = ref('#ffeccc')
const dangerColor = ref('#a33131')
const errorColor = ref('#d41414')

const infoColor = ref('#8b8b8b')
const textColor = ref('#074b5f')
//#endregion

const predefineColors = ref(['#6bb1cc', '#1e90ff', 'rgba(255, 69, 0, 0.68)'])
// const colorresult = ref()
</script>
<template>
  <div class="page-container">
    <div class="themeBox">
      <div class="colorBox">
        <div class="title">主色 --el-color-primary</div>
        <div class="showPalette-primary">
          <div class="palette">
            <el-color-picker
              v-model="primaryColor"
              :predefine="predefineColors"
              @change="setColor('--el-color-primary', primaryColor)"
              color-format="hex"
            />
          </div>
          <div class="primary-light9">light9</div>
          <div class="primary-light8">light8</div>
          <div class="primary-light7">light7</div>
          <div class="primary-light5">light5</div>
          <div class="primary-light3">light3</div>
          <div class="primary-origin">origin</div>
          <div class="primary-dark">dark</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title">成功色 --el-color-success</div>
        <div class="showPalette-success">
          <div class="palette">
            <el-color-picker
              v-model="successColor"
              :predefine="predefineColors"
              @change="setColor('--el-color-success', successColor)"
              color-format="hex"
            />
          </div>
          <div class="success-light9">light9</div>
          <div class="success-light8">light8</div>
          <div class="success-light7">light7</div>
          <div class="success-light5">light5</div>
          <div class="success-light3">light3</div>
          <div class="success-origin">origin</div>
          <div class="success-dark">dark</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title">警告色 --el-color-warning</div>
        <div class="showPalette-warning">
          <div class="palette">
            <el-color-picker
              v-model="warningColor"
              :predefine="predefineColors"
              @change="setColor('--el-color-warning', warningColor)"
              color-format="hex"
            />
          </div>
          <div class="warning-light9">light9</div>
          <div class="warning-light8">light8</div>
          <div class="warning-light7">light7</div>
          <div class="warning-light5">light5</div>
          <div class="warning-light3">light3</div>
          <div class="warning-origin">origin</div>
          <div class="warning-dark">dark</div>
        </div>
      </div>
      <el-divider />

      <div class="colorBox">
        <div class="title">危險色 --el-color-danger</div>
        <div class="showPalette-danger">
          <div class="palette">
            <el-color-picker
              v-model="dangerColor"
              :predefine="predefineColors"
              @change="setColor('--el-color-danger', dangerColor)"
              color-format="hex"
            />
          </div>
          <div class="danger-light9">light9</div>
          <div class="danger-light8">light8</div>
          <div class="danger-light7">light7</div>
          <div class="danger-light5">light5</div>
          <div class="danger-light3">light3</div>
          <div class="danger-origin">origin</div>
          <div class="danger-dark">dark</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title">錯誤色 --el-color-error</div>
        <div class="showPalette-error">
          <div class="palette">
            <el-color-picker
              v-model="errorColor"
              :predefine="predefineColors"
              @change="setColor('--el-color-error', errorColor)"
              color-format="hex"
            />
          </div>
          <div class="error-light9">light9</div>
          <div class="error-light8">light8</div>
          <div class="error-light7">light7</div>
          <div class="error-light5">light5</div>
          <div class="error-light3">light3</div>
          <div class="error-origin">origin</div>
          <div class="error-dark">dark</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title">資訊色 --el-color-info</div>
        <div class="showPalette-info">
          <div class="palette">
            <el-color-picker
              v-model="infoColor"
              :predefine="predefineColors"
              @change="setColor('--el-color-info', infoColor)"
              color-format="hex"
            />
          </div>
          <div class="info-light9">light9</div>
          <div class="info-light8">light8</div>
          <div class="info-light7">light7</div>
          <div class="info-light5">light5</div>
          <div class="info-light3">light3</div>
          <div class="info-origin">origin</div>
          <div class="info-dark">dark</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title">文字色 --el-text-color-regular</div>
        <div class="showPalette-text">
          <div class="palette">
            <el-color-picker
              v-model="textColor"
              :predefine="predefineColors"
              @change="setTextColor('--el-text-color-regular', textColor)"
              color-format="hex"
            />
          </div>
        </div>
      </div>
      <el-divider />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.showPalette-text {
  padding-left: 8px;
}
:deep(.el-divider--horizontal) {
  margin: 5px 0;
}
// Define color maps
$colors: (
  primary: var(--el-color-primary),
  success: var(--el-color-success),
  warning: var(--el-color-warning),
  danger: var(--el-color-danger),
  error: var(--el-color-error),
  info: var(--el-color-info)
);

$lightLevels: (3, 5, 7, 8, 9);
$darkLevel: 2;

// Generate classes
@each $name, $value in $colors {
  .showPalette-#{$name} {
    display: flex;
    margin: 5px 0;
    gap: 5px;
    justify-content: center;
    align-items: center;
    text-align: center;

    .palette {
      width: 50px;
    }

    .#{$name}-origin {
      background-color: $value;
      width: 50px;
    }

    @each $level in $lightLevels {
      .#{$name}-light#{$level} {
        background-color: var(--el-color-#{$name}-light-#{$level});
        width: 50px;
      }
    }

    .#{$name}-dark {
      background-color: var(--el-color-#{$name}-dark-#{$darkLevel});
      width: 50px;
    }
  }
}
</style>
