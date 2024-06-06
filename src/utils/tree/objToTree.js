function transformProgramStruct(programstruct) {
  return programstruct.category.map((category) => ({
    label: category.categoryName,
    children: category.domain.map((domain) => ({
      label: domain.domainName,
      children: domain.course.map((course) => ({
        label: `${course.subjectID} ${course.subjectName}`
      }))
    }))
  }))
}

export default transformProgramStruct
