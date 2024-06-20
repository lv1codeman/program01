import { defineStore } from 'pinia'

export const useProgramStore = defineStore('program', {
  state: () => ({
    programData: null,
    currentPGId: null
  }),
  actions: {
    setProgramData(data) {
      this.programData = data
    },
    setCurrentPGId(data) {
      this.currentPGId = data
    }
  }
})
