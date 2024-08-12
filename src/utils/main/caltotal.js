// 更新後的資料
const data = [
  { cate_id: 1, dom_id: 0, req: 0, credit: 6 },
  { cate_id: 2, dom_id: 1, req: 1, credit: 10 },
  { cate_id: 2, dom_id: 2, req: 1, credit: 10 },
  { cate_id: 3, dom_id: 3, req: 2, credit: 7 },
  { cate_id: 3, dom_id: 4, req: 2, credit: 8 },
  { cate_id: 3, dom_id: 5, req: 2, credit: 9 },
  { cate_id: 4, dom_id: 6, req: 3, credit: 10 },
  { cate_id: 4, dom_id: 7, req: 3, credit: 5 },
  { cate_id: 4, dom_id: 8, req: 3, credit: 10 },
  { cate_id: 4, dom_id: 9, req: 3, credit: 5 },
  { cate_id: 5, dom_id: 10, req: 1, credit: 7 },
  { cate_id: 5, dom_id: 11, req: 1, credit: 8 }
]

// 計算每個類別所需的學分數
function calculateTotalCredits(data) {
  const categoryCredits = {}

  // 按 cate_id 將數據分組
  data.forEach((item) => {
    // 將item中的這三個參數解構
    const { cate_id, req, credit } = item

    if (!categoryCredits[cate_id]) {
      categoryCredits[cate_id] = []
    }

    categoryCredits[cate_id].push({ req, credit })
  })

  // 計算總學分數
  let totalCredits = 0

  Object.values(categoryCredits).forEach((items) => {
    const sortedItems = items.sort((a, b) => a.credit - b.credit)
    const req = sortedItems[0].req
    // 取 req 個最低學分數，若 req 為 0 則取 1 個
    const creditsToCount = sortedItems.slice(0, req || 1).reduce((sum, item) => sum + item.credit, 0)
    totalCredits += creditsToCount
  })

  return totalCredits
}

// 計算結果
const totalCredits = calculateTotalCredits(data)
console.log(`完成全部類別需要的總學分數是：${totalCredits}`)
