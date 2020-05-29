const CODES = {
  A: 65,
  Z: 90,
}

/**
 *
 */
function createCell(): string {
  return `
    <div class="cell" contenteditable="true"></div>
  `
}

/**
 *
 */
function createColumn(col): string {
  return `
    <div class="column">
      ${col}
    </div>
  `
}

/**
 *
 */
function createRow(index: string, content): string {
  return `
    <div class="row">
      <div class="row_info">${index ? index : ''}</div>
      <div class="row_data">${content}</div>
    </div>
  `
}

/**
 *
 * @param rowsCount
 */
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map((a, i) => createColumn(String.fromCharCode(CODES.A + i)))
    .join('')
  rows.push(createRow('', cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('')
    rows.push(createRow(String(i + 1), cells))
  }

  return rows.join('')
}
