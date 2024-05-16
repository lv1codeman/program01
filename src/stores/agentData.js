import { defineStore } from 'pinia'

export const useProgramStore = defineStore('program', {
  state: () => ({
    programData: null
  }),
  actions: {
    setProgramData(data) {
      this.programData = data
    }
  }
})
