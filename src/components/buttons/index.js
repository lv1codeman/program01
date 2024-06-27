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
  name: 'CustomButtonWrapper', // 组件名称
  props: {
    is: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      // 确保默认组件存在
      const defaultComponent = BKbutton.BtnIconLeft
      if (!defaultComponent) {
        console.error('Default component BtnIconLeft is not found')
        return null
      }

      // 使用 props.is 指定的组件或默认组件 BKbutton.BtnIconLeft
      const componentToRender = props.is || defaultComponent
      return h(componentToRender, attrs, slots.default ? { default: () => slots.default() } : {})
    }
  }
})

// 导出 CustomButtonWrapper 和 BKbutton 对象
// export { CustomButtonWrapper, BKbutton }

export default CustomButtonWrapper
export { BKbutton }
