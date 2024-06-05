import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
  state: () => ({
    studentData: {
      id: '',
      password: '',
      isLogin: false
    }
  }),
  actions: {
    setStudentData(data) {
      this.studentData = data
    },
    addStudentData(key, value) {
      if (this.studentData) {
        this.studentData[key] = value
      } else {
        this.studentData = { [key]: value }
      }
    },
    updateStudentData(key, value) {
      if (this.studentData) {
        this.studentData[key] = value
      }
    }
  }
})
