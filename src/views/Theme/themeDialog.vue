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
      colorObj.value.primaryColor = template1Colors.value[0]
      colorObj.value.successColor = template1Colors.value[1]
      colorObj.value.warningColor = template1Colors.value[2]
      colorObj.value.dangerColor = template1Colors.value[3]
      colorObj.value.infoColor = template1Colors.value[4]
      colorObj.value.textColorRegular = template1Colors.value[5]
      colorObj.value.textColorPrimary = template1Colors.value[6]
      colorObj.value.textColorSecondary = template1Colors.value[7]
      colorObj.value.textColorPlaceholder = template1Colors.value[8]
      colorObj.value.bgPageColor = template1Colors.value[9]
      colorObj.value.navbgColor = template1Colors.value[10]
      setTemplateColor()
      break
    case 2:
      colorObj.value.primaryColor = template2Colors.value[0]
      colorObj.value.successColor = template2Colors.value[1]
      colorObj.value.warningColor = template2Colors.value[2]
      colorObj.value.dangerColor = template2Colors.value[3]
      colorObj.value.infoColor = template2Colors.value[4]
      colorObj.value.textColorRegular = template2Colors.value[5]
      colorObj.value.textColorPrimary = template2Colors.value[6]
      colorObj.value.textColorSecondary = template2Colors.value[7]
      colorObj.value.textColorPlaceholder = template2Colors.value[8]
      colorObj.value.bgPageColor = template2Colors.value[9]
      colorObj.value.navbgColor = template2Colors.value[10]
      setTemplateColor()
      break
    case 3:
      colorObj.value.primaryColor = template3Colors.value[0]
      colorObj.value.successColor = template3Colors.value[1]
      colorObj.value.warningColor = template3Colors.value[2]
      colorObj.value.dangerColor = template3Colors.value[3]
      colorObj.value.infoColor = template3Colors.value[4]
      colorObj.value.textColorRegular = template3Colors.value[5]
      colorObj.value.textColorPrimary = template3Colors.value[6]
      colorObj.value.textColorSecondary = template3Colors.value[7]
      colorObj.value.textColorPlaceholder = template3Colors.value[8]
      colorObj.value.bgPageColor = template3Colors.value[9]
      colorObj.value.navbgColor = template3Colors.value[10]
      setTemplateColor()
      break
    case 4:
      colorObj.value.primaryColor = template4Colors.value[0]
      colorObj.value.successColor = template4Colors.value[1]
      colorObj.value.warningColor = template4Colors.value[2]
      colorObj.value.dangerColor = template4Colors.value[3]
      colorObj.value.infoColor = template4Colors.value[4]
      colorObj.value.textColorRegular = template4Colors.value[5]
      colorObj.value.textColorPrimary = template4Colors.value[6]
      colorObj.value.textColorSecondary = template4Colors.value[7]
      colorObj.value.textColorPlaceholder = template4Colors.value[8]
      colorObj.value.bgPageColor = template4Colors.value[9]
      colorObj.value.navbgColor = template4Colors.value[10]
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
      colorObj.value.primaryColor = template5Colors.value[0]
      colorObj.value.successColor = template5Colors.value[1]
      colorObj.value.warningColor = template5Colors.value[2]
      colorObj.value.dangerColor = template5Colors.value[3]
      colorObj.value.infoColor = template5Colors.value[4]
      colorObj.value.textColorRegular = template5Colors.value[5]
      colorObj.value.textColorPrimary = template5Colors.value[6]
      colorObj.value.textColorSecondary = template5Colors.value[7]
      colorObj.value.textColorPlaceholder = template5Colors.value[8]
      colorObj.value.bgPageColor = template5Colors.value[9]
      colorObj.value.navbgColor = template5Colors.value[10]
      setTemplateColor()
      break
    default:
      break
  }
}
const template1Colors = ref([
  '#6bb1cc',
  '#ffbd41',
  '#ffeccc',
  '#a33131',
  '#8b8b8b',
  '#276075',
  '#074b5f',
  '#568da3',
  '#a0a0a0',
  '#f7fafb',
  '#22668d'
])
const template2Colors = ref([
  '#94af64',
  '#df9348',
  '#ffeccc',
  '#ae3243',
  '#828282',
  '#556b2e',
  '#42610d',
  '#668a28',
  '#C7C7C7',
  '#f2f2f2',
  '#6f8745'
])
const template3Colors = ref([
  '#7B77C6',
  '#BF72C1',
  '#ABE0D2',
  '#ae3243',
  '#E4D1D1',
  '#424144',
  '#4D769C',
  '#CF8CAC',
  '#1F1F1D',
  '#F2F2F2',
  '#5696A0'
])
const template4Colors = ref([
  '#80A0E4',
  '#E6A566',
  '#FFECCC',
  '#CC273D',
  '#B4B4B4',
  '#1F6888',
  '#306B91',
  '#197280',
  '#ACACAC',
  '#F8F8F8',
  '#133988'
])
const template5Colors = ref([
  '#6567AA',
  '#82CD5C',
  '#FFCC5E',
  '#B44242',
  '#B44242',
  '#0C0739',
  '#2F2E67',
  '#3B3872',
  '#C2C0C0',
  '#F3F3F4',
  '#4A459B'
])
// const template4Colors = ref(['#4674D7', '#EE8A5F', '#B4D39C', '#C86C78', '#EDC0C0', '#EDC0C0'])
// const template5Colors = ref(['#439266', '#eb9c2d', '#efab96', '#c21717', '#161d3b'])
// const template6Colors = ref(['#439266', '#eb9c2d', '#efab96', '#c21717', '#161d3b'])
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
        <div v-for="(color, index) in template1Colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
      </div>
      <div class="template2" @click="setTemplate(2)">
        <div v-for="(color, index) in template2Colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
      </div>
      <div class="template3" @click="setTemplate(3)">
        <div v-for="(color, index) in template3Colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
      </div>
      <div class="template4" @click="setTemplate(4)">
        <div v-for="(color, index) in template4Colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
      </div>
      <div class="template5" @click="setTemplate(5)">
        <div v-for="(color, index) in template5Colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
      </div>
      <div class="template6" @click="setTemplate(6)">
        <div v-for="(color, index) in template6Colors" :key="index" :style="{ backgroundColor: color }">&nbsp;</div>
      </div>
    </div>
    <p style="text-align: center; margin: 10px 0; font-size: 16px">--點選以上樣板套用，或於下方自訂色碼--</p>
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
        <el-button @click="resetColor">恢復預設</el-button>
        <el-button type="primary" @click="showDialog = false">確認</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<!-- 錯誤色目前專案沒用到，先隱藏
      <div class="colorBox">
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
<style lang="scss" scoped>
// .theme-dialog {
//   width: 390px !important;
// }
.templateSelect {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
  .template {
    display: flex;
    border: 1px solid black;
    &:hover {
      cursor: pointer;
    }
    > div {
      width: 20px;
    }
  }

  @for $i from 1 through 6 {
    .template#{$i} {
      @extend .template;
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
