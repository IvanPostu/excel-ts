import { defaultCellStyles } from '@/components/constants'
import toInlineStyles from '@/utils/toInlineStyles'
import { parse } from '@/components/table/cellParser'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 140
const DEFAULT_HEIGHT = 24

/**
 *
 */
function createCell(state: any, row: number): (_, col) => string {
  return function (_, col) {
    const width = state.colState[col] || DEFAULT_WIDTH
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultCellStyles,
      ...state.stylesState[id],
    })

    return `
      <div
        style="${styles} width: ${width}px; "
        class="cell"
        contenteditable="true"
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        data-value="${data || ''}">
        ${parse(data) || ''}
      </div>
    `
  }
}

/**
 *
 */
function createColumn(col, index, width: string): string {
  return `
    <div class="column" style="width: ${width}px;" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col_resize" data-resize="col"></div>
    </div>
  `
}

/**
 *
 */
function createRow(index: string, content, rowState: any): string {
  const resizer = index ? `<div class="row_resize" data-resize="row"></div>` : ''
  const height = rowState[index] || DEFAULT_HEIGHT

  return `
    <div style="height: ${height}px;" class="row" data-type="resizable" data-row="${index}">
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
export function createTable(rowsCount = 15, state: any = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map((a, i) => {
      const width = state.colState[i] || DEFAULT_WIDTH

      return createColumn(String.fromCharCode(CODES.A + i), i, width)
    })
    .join('')
  rows.push(createRow('', cols, {}))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell(state, i)).join('')
    rows.push(createRow(String(i + 1), cells, state.rowState))
  }

  return rows.join('')
}
