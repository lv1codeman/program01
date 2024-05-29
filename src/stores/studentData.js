import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
  state: () => ({
    studentData: null
  }),
  actions: {
    setStudentData(data) {
      this.studentData = data
    }
  }
})
