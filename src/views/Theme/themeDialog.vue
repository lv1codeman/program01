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
const domStyle = getComputedStyle(document.documentElement)
const setMainColor = (colorTag, colorCode) => {
  const white = '#ffffff'
  const black = '#000000'

  // const el = document.documentElement
  let colorTagList = genColorTag(colorTag)

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
    // getComputedStyle(el).getPropertyValue(item.key)
    domStyle.getPropertyValue(item.key)
    document.documentElement.style.setProperty(item.key, item.value)
  })
}

const setSingleColor = (colorTag, colorCode) => {
  // const el = document.documentElement
  // getComputedStyle(el).getPropertyValue(colorTag)
  // el.style.setProperty(colorTag, colorCode)
  document.documentElement.style.setProperty(colorTag, colorCode)
}

//#region 顏色變數宣告
// origin用於resetColor, 非origin用於el-color-picker的v-modal，所以這邊都不能省略
// 初始值都是讀取root值
const colorObj = ref({
  primaryColor: domStyle.getPropertyValue('--el-color-primary'),
  successColor: domStyle.getPropertyValue('--el-color-success'),
  warningColor: domStyle.getPropertyValue('--el-color-warning'),
  dangerColor: domStyle.getPropertyValue('--el-color-danger'),
  errorColor: domStyle.getPropertyValue('--el-color-error'),
  infoColor: domStyle.getPropertyValue('--el-color-info'),
  textColorRegular: domStyle.getPropertyValue('--el-text-color-regular'),
  textColorPrimary: domStyle.getPropertyValue('--el-text-color-primary'),
  textColorSecondary: domStyle.getPropertyValue('--el-text-color-secondary'),
  textColorPlaceholder: domStyle.getPropertyValue('--el-text-color-placeholder'),
  bgPageColor: domStyle.getPropertyValue('--el-bg-color-page'),
  navbgColor: domStyle.getPropertyValue('--nav-bg-color')
})
const colorOriginObj = ref({
  primaryColor: domStyle.getPropertyValue('--el-color-primary'),
  successColor: domStyle.getPropertyValue('--el-color-success'),
  warningColor: domStyle.getPropertyValue('--el-color-warning'),
  dangerColor: domStyle.getPropertyValue('--el-color-danger'),
  errorColor: domStyle.getPropertyValue('--el-color-error'),
  infoColor: domStyle.getPropertyValue('--el-color-info'),
  textColorRegular: domStyle.getPropertyValue('--el-text-color-regular'),
  textColorPrimary: domStyle.getPropertyValue('--el-text-color-primary'),
  textColorSecondary: domStyle.getPropertyValue('--el-text-color-secondary'),
  textColorPlaceholder: domStyle.getPropertyValue('--el-text-color-placeholder'),
  bgPageColor: domStyle.getPropertyValue('--el-bg-color-page'),
  navbgColor: domStyle.getPropertyValue('--nav-bg-color')
})
//#endregion

const predefineColors = ref(['#6bb1cc', '#1e90ff', 'rgba(255, 69, 0, 0.68)'])

const resetColor = () => {
  // console.log('resetColor event start')
  //#region 變數重製回origin並以origin重設
  colorObj.value = { ...colorOriginObj.value }

  setColorByColorObj()
  //#endregion
  showDialog.value = false
}

const setColorByColorObj = () => {
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
      colorProperties.forEach((property, index) => {
        colorObj.value[property] = template1Colors.value[index]
      })
      setColorByColorObj()
      break
    case 2:
      colorProperties.forEach((property, index) => {
        colorObj.value[property] = template2Colors.value[index]
      })
      setColorByColorObj()
      break
    case 3:
      colorProperties.forEach((property, index) => {
        colorObj.value[property] = template3Colors.value[index]
      })
      setColorByColorObj()
      break
    case 4:
      colorProperties.forEach((property, index) => {
        colorObj.value[property] = template4Colors.value[index]
      })
      setColorByColorObj()
      break
    case 5:
      colorProperties.forEach((property, index) => {
        colorObj.value[property] = template5Colors.value[index]
      })
      setColorByColorObj()
      break
    case 6:
      colorProperties.forEach((property, index) => {
        colorObj.value[property] = template6Colors.value[index]
      })
      setColorByColorObj()
      break
    default:
      break
  }
}

const colorProperties = [
  'primaryColor',
  'successColor',
  'warningColor',
  'dangerColor',
  'infoColor',
  'textColorRegular',
  'textColorPrimary',
  'textColorSecondary',
  'textColorPlaceholder',
  'bgPageColor',
  'navbgColor'
]
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
  // '#6567AA',
  // '#82CD5C',
  // '#FFCC5E',
  // '#B44242',
  // '#B44242',
  // '#0C0739',
  // '#2F2E67',
  // '#3B3872',
  // '#C2C0C0',
  // '#F3F3F4',
  // '#4A459B'
  '#B4667A',
  '#F1B975',
  '#FFECCC',
  '#A33131',
  '#B09797',
  '#2A0D0E',
  '#074B5F',
  '#568DA3',
  '#A0A0A0',
  '#F2F2F2',
  '#8B626C'
])
const template6Colors = ref([
  // '#439266',
  // '#EB9C2D',
  // '#EFAB96',
  // '#C21717',
  // '#161D3B',
  // '#01010C',
  // '#0A5712',
  // '#446ACC',
  // '#A0A0A0',
  // '#DCEBF0',
  // '#417D5E'
  '#BC8055',
  '#C54F4F',
  '#E6C4A6',
  '#9A2736',
  '#CDA68E',
  '#424144',
  '#715030',
  '#D09484',
  '#1F1F1D',
  '#F2F2F2',
  '#916542'
])
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
    <p style="text-align: center; margin: 10px 0; font-size: 16px; background-color: var(--el-color-warning-light-3)">
      點選以上樣板套用，或於下方自訂色碼
    </p>
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
