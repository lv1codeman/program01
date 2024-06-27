import { defineComponent, h } from 'vue'

// 动态导入所有 .vue 文件
const modules = import.meta.glob('./*.vue', { eager: true })
const BKbuttons = {}

// 提取组件名称并存入 BKbuttons
for (const path in modules) {
  const componentName = path.split('/').pop().replace('.vue', '')
  BKbuttons[componentName] = modules[path].default || modules[path]
}

// 创建一个包装组件
BKbuttons.CustomButtonWrapper = defineComponent({
  props: {
    is: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      const componentToRender = props.is || BKbuttons.BtnIconLeft
      // 检查组件是否定义
      if (!componentToRender) {
        console.error('Component to render is undefined')
        return null
      }
      return h(componentToRender, attrs, {
        default: slots.default ? () => slots.default() : undefined
      })
    }
  }
})

export default BKbuttons
