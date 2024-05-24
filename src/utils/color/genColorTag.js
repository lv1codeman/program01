export default function genColorTag(target) {
  const postfix = []
  const wanted = [3, 5, 7, 8, 9]
  postfix[0] = target
  for (let i = 0; i < 9; i++) {
    if (wanted.includes(i + 1)) {
      postfix[i + 1] = target + '-light-' + (i + 1)
    }
  }
  postfix.push(target + '-dark-2')

  postfix.filter((item) => {
    // 过滤掉 undefined、null 和空字符串
    return item !== undefined && item !== null && item !== ''
  })
  // filter(Boolean)以删除所有虚假值包括 null 、 undefined 、 0 、空字符串、 NaN 和 false
  const filtered = postfix.filter(Boolean)
  // console.log(postfix)
  return filtered
}
