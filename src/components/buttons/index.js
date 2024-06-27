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
  props: {
    is: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      // 确保 BtnIconLeft 存在于 BKbutton 中
      const defaultComponent = BKbutton.BtnIconLeft
      if (!defaultComponent) {
        console.error('Default component BtnIconLeft is not found')
        return null
      }

      // 使用默认组件 BKbutton.BtnIconLeft 或 props.is 指定的组件
      const componentToRender = props.is || defaultComponent
      return h(componentToRender, attrs, slots.default ? { default: () => slots.default() } : {})
    }
  }
})

// 将 CustomButtonWrapper 和按钮组件一起导出
BKbutton.CustomButtonWrapper = CustomButtonWrapper

// export default BKbutton
export { CustomButtonWrapper as isLeft, BKbutton }
