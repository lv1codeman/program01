// function transformProgramStruct(programstruct) {
//   return (programstruct.category || []).map((category) => ({
//     label: category.categoryName,
//     children: (category.domain || []).map((domain) => ({
//       label: domain.domainName,
//       children: (domain.course || []).map((course) => ({
//         label: `${course.subjectID} ${course.subjectName}`
//       }))
//     }))
//   }))
// }
function transformProgramStruct(programstruct) {
  return programstruct.category.map((category) => {
    const categoryNode = {
      label: category.category_name,
      children: []
    }

    // 添加 category 层级的课程
    if (category.course && category.course.length > 0) {
      categoryNode.children.push(
        ...category.course.map((course) => ({
          label: `${course.subject_sub_id} ${course.subject_name}`
        }))
      )
    }

    // 添加 domain 层级及其课程
    if (category.domain && category.domain.length > 0) {
      categoryNode.children.push(
        ...category.domain.map((domain) => {
          const domainNode = {
            label: domain.domain_name,
            children: []
          }

          if (domain.course && domain.course.length > 0) {
            domainNode.children.push(
              ...domain.course.map((course) => ({
                label: `${course.subject_sub_id} ${course.subject_name}`
              }))
            )
          }

          return domainNode
        })
      )
    }

    return categoryNode
  })
}
export default transformProgramStruct
