export default function sqlresToObj(input) {
  //   console.log('input get', input)
  // Initialize the output structure with values from the first item in the input array
  const processedData = {}
  input.forEach((item, index) => {
    // 使用对象的键和值来动态添加到 processedData 中
    for (const [key, value] of Object.entries(item)) {
      if (!processedData[key]) {
        processedData[key] = []
      }
      processedData[key].push(value)
    }
  })

  return processedData
}
