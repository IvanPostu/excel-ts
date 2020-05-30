const CODES = {
  A: 65,
  Z: 90,
}

/**
 *
 */
function createCell(_, colIndex: number): string {
  return `
    <div class="cell" contenteditable="true" data-col="${colIndex}"></div>
  `
}

/**
 *
 */
function createColumn(col, index): string {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col_resize" data-resize="col"></div>
    </div>
  `
}

/**
 *
 */
function createRow(index: string, content): string {
  const resizer = index ? `<div class="row_resize" data-resize="row"></div>` : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row_info">
        ${index ? index : ''}
        ${resizer}
      </div>
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
    .map((a, i) => createColumn(String.fromCharCode(CODES.A + i), i))
    .join('')
  rows.push(createRow('', cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('')
    rows.push(createRow(String(i + 1), cells))
  }

  return rows.join('')
}
