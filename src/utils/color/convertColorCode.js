function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function rgbToHex_obj(obj) {
  return '#' + componentToHex(obj.r) + componentToHex(obj.g) + componentToHex(obj.b)
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

export function rgbaToHex(orig) {
  var a,
    // isPercent,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || '').trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig

  if (alpha !== '') {
    a = alpha
  } else {
    a = 1
  }
  hex = hex + a

  return hex
}
/** 產生EP中的淺色色階
 * @param {int} r - red
 * @param {int} g - green
 * @param {int} b - blue
 * @param {int} level - 要產生第幾階的色階
 * @returns
 */
export function genPrimaryLevel(r, g, b, level) {
  switch (level) {
    case -2:
      r = r - 21
      g = g - 35
      b = b - 41
      break
    case 3:
      r = r + 44
      g = g + 23
      b = b + 15
      break
    case 5:
      r = r + 74
      g = g + 39
      b = b + 26
      break
    case 7:
      r = r + 104
      g = g + 55
      b = b + 36
      break
    case 8:
      r = r + 118
      g = g + 62
      b = b + 41
      break
    case 9:
      r = r + 133
      g = g + 70
      b = b + 46
      break
    default:
      break
  }
  let res = { r, g, b }
  return res
}
