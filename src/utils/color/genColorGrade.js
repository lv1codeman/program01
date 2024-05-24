// 將 HEX 轉換為 RGB
function hexToRgb(hex) {
  // 去掉 #
  hex = hex.replace(/^#/, '')
  // 如果是三位數的HEX碼
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  const bigint = parseInt(hex, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

// 將 RGB 轉換為 HEX
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

// 調整亮度/深度
function adjustColor(color, factor) {
  return Math.min(255, Math.max(0, Math.round(color * factor)))
}

// 生成不同亮度和深度的色碼
export default function generateShades(hex, shades = 9, tints = 2) {
  const { r, g, b } = hexToRgb(hex)
  const colors = []

  // 生成淺色
  for (let i = 1; i <= shades; i++) {
    const factor = 1 + i * 0.03
    colors.push(rgbToHex(adjustColor(r, factor), adjustColor(g, factor), adjustColor(b, factor)))
  }

  // 生成深色
  for (let i = 1; i <= tints; i++) {
    const factor = 1 - i * 0.03
    colors.push(rgbToHex(adjustColor(r, factor), adjustColor(g, factor), adjustColor(b, factor)))
  }

  return colors
}
