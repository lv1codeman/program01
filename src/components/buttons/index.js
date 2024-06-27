// src/components/buttons/index.js
const BKbuttons = {}

const modules = import.meta.glob('./*.vue', { eager: true })
for (const path in modules) {
  const componentName = path.split('/').pop().replace('.vue', '')
  BKbuttons[componentName] = modules[path].default
}

export default BKbuttons
