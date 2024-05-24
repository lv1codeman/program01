export default function mixColors(color1, color2, weight) {
  // 解析颜色值
  const parseColor = (color) => {
    const hex = color.charAt(0) === '#' ? color.substring(1, 7) : color
    return [
      parseInt(hex.substring(0, 2), 16), // Red
      parseInt(hex.substring(2, 4), 16), // Green
      parseInt(hex.substring(4, 6), 16) // Blue
    ]
  }

  // 计算混合后的颜色
  const rgb1 = parseColor(color1)
  const rgb2 = parseColor(color2)

  const r = Math.round((1 - weight) * rgb1[0] + weight * rgb2[0])
  const g = Math.round((1 - weight) * rgb1[1] + weight * rgb2[1])
  const b = Math.round((1 - weight) * rgb1[2] + weight * rgb2[2])

  // 转换为十六进制格式
  const componentToHex = (c) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  const hexColor = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)

  return hexColor
}

// 示例使用
// const color1 = '#ff0000'; // 红色
// const color2 = '#0000ff'; // 蓝色
// const weight = 0.5; // 混合权重，0.5 表示均匀混合

// const mixedColor = mixColors(color1, color2, weight);
// console.log('Mixed Color:', mixedColor); // 输出混合后的颜色值
