function toPercent(numerator, denominator) {
  // return Math.round((num / total) * 10000) / 100.0 + '%'
  return Math.round((numerator / denominator) * 10000) / 100.0
}

export default toPercent
