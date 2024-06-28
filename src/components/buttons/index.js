import { defineComponent, h } from 'vue'

// 动态导入所有 .vue 文件
const modules = import.meta.glob('./*.vue', { eager: true })
const BKbutton = {}

// 提取组件名称并存入 BKbutton
for (const path in modules) {
  const componentName = path.split('/').pop().replace('.vue', '')
  BKbutton[componentName] = modules[path].default
}

// 创建一个包装组件
const CustomButtonWrapper = defineComponent({
  name: 'CustomButtonWrapper',
  props: {
    is: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      const componentToRender = props.is ? BKbutton[props.is] : BKbutton.BtnIconLeft
      return h(componentToRender, attrs, slots.default ? { default: () => slots.default() } : {})
    }
  }
})

// 将 CustomButtonWrapper 重命名为 default 并加入 BKbutton
BKbutton.default = CustomButtonWrapper

export { BKbutton }
export default CustomButtonWrapper
