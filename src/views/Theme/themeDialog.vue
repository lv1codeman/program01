<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
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

// dialog自適應
const dialogWidth = ref(500)
const setDialogWidth = () => {
  let windowSize = document.body.clientWidth
  // console.log(windowSize)
  const defaultWidth = 500 // 預設寬度
  if (windowSize < defaultWidth) {
    dialogWidth.value = '100%'
  } else {
    dialogWidth.value = defaultWidth + 'px'
  }
}
onMounted(() => {
  window.onresize = () => {
    return (() => {
      setDialogWidth()
    })()
  }
})

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

const colorObj = ref({
  primaryColor: '#6bb1cc',
  successColor: '#ffbd41',
  warningColor: '#ffeccc',
  dangerColor: '#a33131',
  errorColor: '#d41414',
  infoColor: '#8b8b8b',
  textColorRegular: '#276075',
  textColorPrimary: '#074b5f',
  textColorSecondary: '#568da3',
  textColorPlaceholder: '#a0a0a0',
  bgPageColor: '#f7fafb',
  navbgColor: '#22668d'
})

const colorOriginObj = ref({
  primaryColor: '#6bb1cc',
  successColor: '#ffbd41',
  warningColor: '#ffeccc',
  dangerColor: '#a33131',
  errorColor: '#d41414',
  infoColor: '#8b8b8b',
  textColorRegular: '#276075',
  textColorPrimary: '#074b5f',
  textColorSecondary: '#568da3',
  textColorPlaceholder: '#a0a0a0',
  bgPageColor: '#f7fafb',
  navbgColor: '#22668d'
})
//#endregion

const predefineColors = ref(['#6bb1cc', '#1e90ff', 'rgba(255, 69, 0, 0.68)'])

const resetColor = () => {
  console.log('resetColor event start')
  //#region 變數重製回origin並以origin重設
  colorObj.value = { ...colorOriginObj.value }

  setTemplateColor()
  //#endregion
  showDialog.value = false
}

const setTemplateColor = () => {
  setMainColor('--el-color-primary', colorObj.value.primaryColor)
  setMainColor('--el-color-success', colorObj.value.successColor)
  setMainColor('--el-color-warning', colorObj.value.warningColor)
  setMainColor('--el-color-danger', colorObj.value.dangerColor)
  setMainColor('--el-color-error', colorObj.value.errorColor)
  setMainColor('--el-color-info', colorObj.value.infoColor)

  setSingleColor('--el-text-color-regular', colorObj.value.textColorRegular)
  setSingleColor('--el-text-color-primary', colorObj.value.textColorPrimary)
  setSingleColor('--el-text-color-secondary', colorObj.value.textColorSecondary)
  setSingleColor('--el-text-color-placeholder', colorObj.value.textColorPlaceholder)
  setSingleColor('--el-bg-color-page', colorObj.value.bgPageColor)
  setSingleColor('--nav-bg-color', colorObj.value.navbgColor)
}

const setTemplate = (templateNumber) => {
  switch (templateNumber) {
    case 1:
      colorObj.value.primaryColor = '#6bb1cc'
      colorObj.value.successColor = '#ffbd41'
      colorObj.value.warningColor = '#ffeccc'
      colorObj.value.dangerColor = '#a33131'
      colorObj.value.errorColor = '#d41414'
      colorObj.value.infoColor = '#8b8b8b'
      colorObj.value.textColorRegular = '#276075'
      colorObj.value.textColorPrimary = '#074b5f'
      colorObj.value.textColorSecondary = '#568da3'
      colorObj.value.textColorPlaceholder = '#a0a0a0'
      colorObj.value.bgPageColor = '#f7fafb'
      colorObj.value.navbgColor = '#22668d'
      setTemplateColor()
      break
    case 2:
      colorObj.value.primaryColor = '#94af64'
      colorObj.value.successColor = '#df9348'
      colorObj.value.warningColor = '#ffeccc'
      colorObj.value.dangerColor = '#ae3243'
      colorObj.value.errorColor = '#2b2118'
      colorObj.value.infoColor = '#828282'
      colorObj.value.textColorRegular = '#556b2e'
      colorObj.value.textColorPrimary = '#42610d'
      colorObj.value.textColorSecondary = '#668a28'
      colorObj.value.textColorPlaceholder = '#C7C7C7'
      colorObj.value.bgPageColor = '#f2f2f2'
      colorObj.value.navbgColor = '#6f8745'
      setTemplateColor()
      break
    case 3:
      colorObj.value.primaryColor = '#7B77C6'
      colorObj.value.successColor = '#BF72C1'
      colorObj.value.warningColor = '#ABE0D2'
      colorObj.value.dangerColor = '#ae3243'
      colorObj.value.infoColor = '#E4D1D1'
      colorObj.value.textColorRegular = '#424144'
      colorObj.value.textColorPrimary = '#4D769C'
      colorObj.value.textColorSecondary = '#CF8CAC'
      colorObj.value.textColorPlaceholder = '#1F1F1D'
      colorObj.value.bgPageColor = '#F2F2F2'
      colorObj.value.navbgColor = '#5696A0'
      setTemplateColor()
      break
    case 4:
      colorObj.value.primaryColor = '#80A0E4'
      colorObj.value.successColor = '#E6A566'
      colorObj.value.warningColor = '#FFECCC'
      colorObj.value.dangerColor = '#CC273D'
      colorObj.value.infoColor = '#B4B4B4'
      colorObj.value.textColorRegular = '#1F6888'
      colorObj.value.textColorPrimary = '#306B91'
      colorObj.value.textColorSecondary = '#197280'
      colorObj.value.textColorPlaceholder = '#ACACAC'
      colorObj.value.bgPageColor = '#F8F8F8'
      colorObj.value.navbgColor = '#133988'
      setTemplateColor()
      break
    case 5:
      // 姿妤
      // primaryColor.value = '#439266'
      // successColor.value = '#EB9C2D'
      // warningColor.value = '#EFAB96'
      // dangerColor.value = '#C21717'
      // // errorColor.value = '#AE3243'
      // infoColor.value = '#161D3B'

      // textColorRegular.value = '#01010C'
      // textColorPrimary.value = '#0A5712'
      // textColorSecondary.value = '#446ACC'
      // textColorPlaceholder.value = '#A0A0A0'
      // bgPageColor.value = '#DCEBF0'
      // navbgColor.value = '#417D5E'
      colorObj.value.primaryColor = '#6567AA'
      colorObj.value.successColor = '#82CD5C'
      colorObj.value.warningColor = '#FFCC5E'
      colorObj.value.dangerColor = '#B44242'
      colorObj.value.infoColor = '#B44242'
      colorObj.value.textColorRegular = '#0C0739'
      colorObj.value.textColorPrimary = '#2F2E67'
      colorObj.value.textColorSecondary = '#3B3872'
      colorObj.value.textColorPlaceholder = '#C2C0C0'
      colorObj.value.bgPageColor = '#F3F3F4'
      colorObj.value.navbgColor = '#4A459B'
      setTemplateColor()
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
    :width="dialogWidth"
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
      <div class="template4" @click="setTemplate(4)">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
      <div class="template5" @click="setTemplate(5)">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
      <div class="template5" @click="setTemplate(6)">
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
              v-model="colorObj.primaryColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-primary', colorObj.primaryColor)"
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
              v-model="colorObj.successColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-success', colorObj.successColor)"
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
              v-model="colorObj.warningColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-warning', colorObj.warningColor)"
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
              v-model="colorObj.dangerColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-danger', colorObj.dangerColor)"
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
      <!-- <div class="colorBox">
        <div class="title">錯誤色 --el-color-error</div>
        <div class="showPalette-error">
          <div class="palette">
            <el-color-picker
              v-model="colorObj.errorColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-error', colorObj.errorColor)"
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
      <el-divider /> -->
      <div class="colorBox">
        <div class="title">資訊色 --el-color-info</div>
        <div class="showPalette-info">
          <div class="palette">
            <el-color-picker
              v-model="colorObj.infoColor"
              :predefine="predefineColors"
              @change="setMainColor('--el-color-info', colorObj.infoColor)"
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
              v-model="colorObj.textColorRegular"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-regular', colorObj.textColorRegular)"
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
              v-model="colorObj.textColorPrimary"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-primary', colorObj.textColorPrimary)"
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
              v-model="colorObj.textColorSecondary"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-secondary', colorObj.textColorSecondary)"
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
              v-model="colorObj.textColorPlaceholder"
              :predefine="predefineColors"
              @change="setSingleColor('--el-text-color-placeholder', colorObj.textColorPlaceholder)"
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
              v-model="colorObj.bgPageColor"
              :predefine="predefineColors"
              @change="setSingleColor('--el-bg-color-page', colorObj.bgPageColor)"
              color-format="hex"
            />
          </div>
          <div>頁面背景色 --el-bg-color-page</div>
        </div>
      </div>
      <el-divider />
      <div class="colorBox">
        <div class="title"></div>
        <div class="showPalette-single">
          <div class="palette">
            <el-color-picker
              v-model="colorObj.navbgColor"
              :predefine="predefineColors"
              @change="setSingleColor('--nav-bg-color', colorObj.navbgColor)"
              color-format="hex"
            />
          </div>
          <div>導覽列顏色 --nav-bg-color</div>
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
// .theme-dialog {
//   width: 390px !important;
// }
.templateSelect {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
      background-color: #6bb1cc;
    }
    & > div:nth-child(2) {
      background-color: #ffbd41;
    }
    & > div:nth-child(3) {
      background-color: #ffeccc;
    }
    & > div:nth-child(4) {
      background-color: #a33131;
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
      background-color: #7b77c6;
    }
    & > div:nth-child(2) {
      background-color: #bf72c1;
    }
    & > div:nth-child(3) {
      background-color: #abe0d2;
    }
    & > div:nth-child(4) {
      background-color: #c86c78;
    }
    & > div:nth-child(5) {
      background-color: #c86c78;
    }
    & > div:nth-child(6) {
      background-color: #e4d1d1;
    }
  }
  .template4 {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
    & > div:nth-child(1) {
      background-color: #7b77c6;
    }
    & > div:nth-child(2) {
      background-color: #bf72c1;
    }
    & > div:nth-child(3) {
      background-color: #abe0d2;
    }
    & > div:nth-child(4) {
      background-color: #c86c78;
    }
    & > div:nth-child(5) {
      background-color: #c86c78;
    }
    & > div:nth-child(6) {
      background-color: #e4d1d1;
    }
  }
  .template5 {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
    & > div:nth-child(1) {
      background-color: #439266;
    }
    & > div:nth-child(2) {
      background-color: #eb9c2d;
    }
    & > div:nth-child(3) {
      background-color: #efab96;
    }
    & > div:nth-child(4) {
      background-color: #c21717;
    }
    & > div:nth-child(5) {
      background-color: #c21717;
    }
    & > div:nth-child(6) {
      background-color: #161d3b;
    }
  }
  .template6 {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
    & > div:nth-child(1) {
      background-color: #439266;
    }
    & > div:nth-child(2) {
      background-color: #eb9c2d;
    }
    & > div:nth-child(3) {
      background-color: #efab96;
    }
    & > div:nth-child(4) {
      background-color: #c21717;
    }
    & > div:nth-child(5) {
      background-color: #c21717;
    }
    & > div:nth-child(6) {
      background-color: #161d3b;
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
