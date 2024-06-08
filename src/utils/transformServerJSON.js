export default function transformServerJSON(input) {
  // Initialize the output structure with values from the first item in the input array
  const output = {
    program_name: input[0].program_name,
    program_url: input[0].program_url || '預設網址',
    program_type: input[0].program_type || '學分學程',
    program_unit: input[0].program_unit || '預設單位',
    program_minCredit: input[0].program_minCredit || 1,
    program_nonSelfCredit: input[0].program_nonSelfCredit || 1,
    program_criteria: input[0].program_criteria || '以學分數',
    category: []
  }

  // Create a map to easily find categories and domains
  const categoryMap = {}

  input.forEach((item) => {
    let category = categoryMap[item.category_id]
    if (!category) {
      category = {
        category_id: item.category_id,
        category_name: item.category_name,
        category_minCredit: 1,
        category_requireNum: 1,
        domain: [],
        course: []
      }
      categoryMap[item.category_id] = category
      output.category.push(category)
    }

    if (item.domain_id === 0) {
      category.course.push({
        subject_id: item.subject_id,
        subject_unit: item.subject_unit,
        subject_sub_id: item.subject_sub_id,
        subject_sys: item.subject_sys,
        subject_name: item.subject_name,
        subject_eng_name: item.subject_eng_name,
        subject_credit: item.subject_credit,
        subject_hour: item.subject_hour
      })
    } else {
      let domain = category.domain.find((d) => d.domain_id === item.domain_id)
      if (!domain) {
        domain = {
          domain_id: item.domain_id,
          domain_name: item.domain_name,
          domain_minCredit: 1,
          domain_requireNum: 1,
          course: []
        }
        category.domain.push(domain)
      }
      domain.course.push({
        subject_id: item.subject_id,
        subject_unit: item.subject_unit,
        subject_sub_id: item.subject_sub_id,
        subject_sys: item.subject_sys,
        subject_name: item.subject_name,
        subject_eng_name: item.subject_eng_name,
        subject_credit: item.subject_credit,
        subject_hour: item.subject_hour
      })
    }
  })

  return output
}
