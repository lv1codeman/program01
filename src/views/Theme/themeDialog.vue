<script setup>
import { ref, watch, defineProps } from 'vue'
import mixColor from '@/utils/color/epColorMix.js'
import genColorTag from '@/utils/color/genColorTag.js'
const showDialog = ref(false)

const props = defineProps({
  isShowDialog: Boolean
})
const emit = defineEmits(['update:isShowDialog'])

watch(
  () => props.isShowDialog,
  (newValue) => {
    showDialog.value = newValue
  },
  { immediate: true }
)

const handleDialogClose = () => {
  showDialog.value = false
  emit('update:isShowDialog', false)
}

const setMainColor = (colorTag, colorCode) => {
  console.log('change color by target tag')
  const white = '#ffffff'
  const black = '#000000'

  const el = document.documentElement
  let colorTagList = genColorTag(colorTag)

  console.log(colorTagList)
  // 0.7 = (10-3)*0.1
  let colorCodeList = [
    colorCode,
    mixColor(white, colorCode, (10 - 3) * 0.1),
    mixColor(white, colorCode, (10 - 5) * 0.1),
    mixColor(white, colorCode, (10 - 7) * 0.1),
    mixColor(white, colorCode, (10 - 8) * 0.1),
    mixColor(white, colorCode, (10 - 9) * 0.1),
    mixColor(black, colorCode, (10 - 2) * 0.1)
  ]

  const colorList = []
  for (let i = 0; i < 7; i++) {
    colorList.push({ key: colorTagList[i], value: colorCodeList[i] })
  }

  colorList.forEach((item) => {
    getComputedStyle(el).getPropertyValue(item.key)
    el.style.setProperty(item.key, item.value)
  })
}

const setSingleColor = (colorTag, colorCode) => {
  const el = document.documentElement
  getComputedStyle(el).getPropertyValue(colorTag)
  el.style.setProperty(colorTag, colorCode)
}

//#region 顏色變數宣告
// origin用於resetColor, 非origin用於el-color-picker的v-modal，所以這邊都不能省略
const primaryColor = ref('#6bb1cc')
const successColor = ref('#ffbd41')
const warningColor = ref('#ffeccc')
const dangerColor = ref('#a33131')
const errorColor = ref('#d41414')
const infoColor = ref('#8b8b8b')
const textColorRegular = ref('#276075')
const textColorPrimary = ref('#074b5f')
const textColorSecondary = ref('#568da3')
const textColorPlaceholder = ref('#cce6ed')
const bgPageColor = ref('#f7fafb')
const navbgColor = ref('#22668d')

const origin_primaryColor = ref('#6bb1cc')
const origin_successColor = ref('#ffbd41')
const origin_warningColor = ref('#ffeccc')
const origin_dangerColor = ref('#a33131')
const origin_errorColor = ref('#d41414')
const origin_infoColor = ref('#8b8b8b')
const origin_textColorRegular = ref('#074b5f')
const origin_textColorPrimary = ref('#074b5f')
const origin_textColorSecondary = ref('#568da3')
const origin_textColorPlaceholder = ref('#cce6ed')
const origin_bgPageColor = ref('#f7fafb')
const origin_navbgColor = ref('#22668d')
//#endregion

const predefineColors = ref(['#6bb1cc', '#1e90ff', 'rgba(255, 69, 0, 0.68)'])

const resetColor = () => {
  console.log('resetColor event start')
  //#region 變數重製回origin並以origin重設
  primaryColor.value = origin_primaryColor.value
  successColor.value = origin_successColor.value
  warningColor.value = origin_warningColor.value
  dangerColor.value = origin_dangerColor.value
  errorColor.value = origin_errorColor.value
  infoColor.value = origin_infoColor.value
  textColorRegular.value = origin_textColorRegular.value
  textColorPrimary.value = origin_textColorPrimary.value
  textColorSecondary.value = origin_textColorSecondary.value
  textColorPlaceholder.value = origin_textColorPlaceholder.value

  bgPageColor.value = origin_bgPageColor.value
  navbgColor.value = origin_navbgColor.value

  setMainColor('--el-color-primary', primaryColor.value)
  setMainColor('--el-color-success', successColor.value)
  setMainColor('--el-color-warning', warningColor.value)
  setMainColor('--el-color-danger', dangerColor.value)
  setMainColor('--el-color-error', errorColor.value)
  setMainColor('--el-color-info', infoColor.value)
  setSingleColor('--el-text-color-regular', textColorRegular.value)
  setSingleColor('--el-text-color-primary', textColorPrimary.value)
  setSingleColor('--el-text-color-secondary', textColorSecondary.value)
  setSingleColor('--el-text-color-placeholder', textColorPlaceholder.value)
  setSingleColor('--el-bg-color-page', bgPageColor.value)
  setSingleColor('--nav-bg-color', navbgColor.value)
  //#endregion
  showDialog.value = false
}

const setTemplate = (templateNumber) => {
  switch (templateNumber) {
    case 1:
      primaryColor.value = '#94af64'
      successColor.value = '#df9348'
      warningColor.value = '#ffeccc'
      dangerColor.value = '#ae3243'
      errorColor.value = '#2b2118'
      infoColor.value = '#828282'

      textColorRegular.value = '#556b2e'
      textColorPrimary.value = '#42610d'
      textColorSecondary.value = '#668a28'
      textColorPlaceholder.value = '#99c74a'
      bgPageColor.value = '#f2f2f2'
      navbgColor.value = '#6f8745'
      setMainColor('--el-color-primary', primaryColor.value)
      setMainColor('--el-color-success', successColor.value)
      setMainColor('--el-color-warning', warningColor.value)
      setMainColor('--el-color-danger', dangerColor.value)
      setMainColor('--el-color-error', errorColor.value)
      setMainColor('--el-color-info', infoColor.value)

      setSingleColor('--el-text-color-regular', textColorRegular.value)
      setSingleColor('--el-text-color-primary', textColorPrimary.value)
      setSingleColor('--el-text-color-secondary', textColorSecondary.value)
      setSingleColor('--el-text-color-placeholder', textColorPlaceholder.value)
      setSingleColor('--el-bg-color-page', bgPageColor.value)
      setSingleColor('--nav-bg-color', navbgColor.value)

      break
    case 2:
      break
    case 3:
      break
    default:
      break
  }
}
</script>
<template>
  <el-dialog
    class="theme-dialog"
    v-model="showDialog"
    @close="handleDialogClose"
    title="樣板配置"
    width="500"
    top="50px"
    draggable
    overflow
  >
    <div class="templateSelect">
      <div class="template1" @click="setTemplate(1)">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
      <div class="template2" @click="setTemplate(2)">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
      <div class="template3" @click="setTemplate(3)">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    </div>
    <!-- <div class="primary">&nbsp;</div>
        <div class="success">&nbsp;</div>
        <div class="warning">&nbsp;</div>
        <div class="danger">&nbsp;</div>
        <div class="error">&nbsp;</div>
        <div class="info">&nbsp;</div> -->
    <div class="themeBox">
      <div class="colorBox">
        <div class="title">主色 --el-color-primary</div>
        <div class="showPalette-primary">
          <div class="palette">
            <el-color-picker
              v-model="primaryColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-primary', primaryColor)"
              color-format="hex"
            />
          </div>
          <div class="primary-dark">dark</div>
          <div class="primary-origin">origin</div>
          <div class="primary-light3">light3</div>
          <div class="primary-light5">light5</div>
          <div class="primary-light7">light7</div>
          <div class="primary-light8">light8</div>
          <div class="primary-light9">light9</div>
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
              @change="setMainColor('--el-color-success', successColor)"
              color-format="hex"
            />
          </div>
          <div class="success-dark">dark</div>
          <div class="success-origin">origin</div>
          <div class="success-light3">light3</div>
          <div class="success-light5">light5</div>
          <div class="success-light7">light7</div>
          <div class="success-light8">light8</div>
          <div class="success-light9">light9</div>
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
              @change="setMainColor('--el-color-warning', warningColor)"
              color-format="hex"
            />
          </div>
          <div class="warning-dark">dark</div>
          <div class="warning-origin">origin</div>
          <div class="warning-light3">light3</div>
          <div class="warning-light5">light5</div>
          <div class="warning-light7">light7</div>
          <div class="warning-light8">light8</div>
          <div class="warning-light9">light9</div>
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
              @change="setMainColor('--el-color-danger', dangerColor)"
              color-format="hex"
            />
          </div>
          <div class="danger-dark">dark</div>
          <div class="danger-origin">origin</div>
          <div class="danger-light3">light3</div>
          <div class="danger-light5">light5</div>
          <div class="danger-light7">light7</div>
          <div class="danger-light8">light8</div>
          <div class="danger-light9">light9</div>
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
              @change="setMainColor('--el-color-error', errorColor)"
              color-format="hex"
            />
          </div>
          <div class="error-dark">dark</div>
          <div class="error-origin">origin</div>
          <div class="error-light3">light3</div>
          <div class="error-light5">light5</div>
          <div class="error-light7">light7</div>
          <div class="error-light8">light8</div>
          <div class="error-light9">light9</div>
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
              @change="setMainColor('--el-color-info', infoColor)"
              color-format="hex"
            />
          </div>
          <div class="info-dark">dark</div>
          <div class="info-origin">origin</div>
          <div class="info-light3">light3</div>
          <div class="info-light5">light5</div>
          <div class="info-light7">light7</div>
          <div class="info-light8">light8</div>
          <div class="info-light9">light9</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title"></div>
        <div class="showPalette-single">
          <div class="palette">
            <el-color-picker
              v-model="textColorRegular"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-regular', textColorRegular)"
              color-format="hex"
            />
          </div>
          <div>一般文字色 --el-text-color-regular</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title"></div>
        <div class="showPalette-single">
          <div class="palette">
            <el-color-picker
              v-model="textColorPrimary"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-primary', textColorPrimary)"
              color-format="hex"
            />
          </div>
          <div>主要文字色 --el-text-color-primary</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title"></div>
        <div class="showPalette-single">
          <div class="palette">
            <el-color-picker
              v-model="textColorSecondary"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-secondary', textColorSecondary)"
              color-format="hex"
            />
          </div>
          <div>次要文字色 --el-text-color-secondary</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title"></div>
        <div class="showPalette-single">
          <div class="palette">
            <el-color-picker
              v-model="textColorPlaceholder"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-placeholder', textColorPlaceholder)"
              color-format="hex"
            />
          </div>
          <div>提示文字色 --el-text-color-placeholder</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title"></div>
        <div class="showPalette-single">
          <div class="palette">
            <el-color-picker
              v-model="bgPageColor"
              :predefine="predefineColors"
              @change="setSingleColor('--el-bg-color-page', bgPageColor)"
              color-format="hex"
            />
          </div>
          <div>頁面背景色 --el-bg-color-page</div>
        </div>
      </div>
      <el-divider />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetColor">Cancel</el-button>
        <el-button type="primary" @click="showDialog = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.templateSelect {
  display: flex;
  justify-content: space-around;

  .template1 {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
    & > div:nth-child(1) {
      background-color: #94af64;
    }
    & > div:nth-child(2) {
      background-color: #ffbd41;
    }
    & > div:nth-child(3) {
      background-color: #ffeccc;
    }
    & > div:nth-child(4) {
      background-color: #ae3243;
    }
    & > div:nth-child(5) {
      background-color: #d41414;
    }
    & > div:nth-child(6) {
      background-color: #8b8b8b;
    }
  }
  .template2 {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
    & > div:nth-child(1) {
      background-color: #409eff;
    }
    & > div:nth-child(2) {
      background-color: #67c23a;
    }
    & > div:nth-child(3) {
      background-color: #e6a23c;
    }
    & > div:nth-child(4) {
      background-color: #f56c6c;
    }
    & > div:nth-child(5) {
      background-color: #a79277;
    }
    & > div:nth-child(6) {
      background-color: #909399;
    }
  }
  .template3 {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
    & > div:nth-child(1) {
      background-color: #27ba9b;
    }
    & > div:nth-child(2) {
      background-color: #1dc779;
    }
    & > div:nth-child(3) {
      background-color: #ffb302;
    }
    & > div:nth-child(4) {
      background-color: #e26237;
    }
    & > div:nth-child(5) {
      background-color: #cf4444;
    }
    & > div:nth-child(6) {
      background-color: #909399;
    }
  }
}
.showPalette-single {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
  text-align: center;
  .palette {
    width: 50px;
  }
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
    justify-content: flex-start;
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
