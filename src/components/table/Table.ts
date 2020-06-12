import { Component } from '@/core/Component'
import { createTable } from './table.template'
import { resizeHandler } from '@/components/table/table.resize'
import { TableSelection } from '@/components/table/TableSelection'
import { $ } from '@/core/dom'
import * as actions from '@/redux/actionCreators'

/**
 *
 */
function generateGroupOfCells(x1: number, x2: number, y1: number, y2: number): Array<string> {
  if (x1 > x2) {
    const tmp = x1
    x1 = x2
    x2 = tmp
  }

  if (y1 > y2) {
    const tmp = y1
    y1 = y2
    y2 = tmp
  }

  const result: Array<string> = new Array(x2 - x1 + y2 - y1)

  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      result.push(`${i}:${j}`)
    }
  }

  return result
}

/**
 *
 * @param key
 * @param param1
 */
function nextSelector(key, { row, col }): string {
  const MIN_VAL = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col <= MIN_VAL ? 0 : col - 1
      break
    case 'ArrowUp':
      row = row <= MIN_VAL ? 0 : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}

export class Table extends Component {
  static className = 'excel__table'

  private selection: TableSelection

  /**
   *
   */
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init(): void {
    super.init()

    const $cell = this.$root.findOne('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    // this.$subscribe((state) => {
    //   console.log('TabState: ', state)
    // })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler.call(this, event)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn(error.message)
    }
  }

  onMousedown(event): void {
    const shouldResize = event.target.dataset.resize
    const isCell = event.target.dataset.type === 'cell'
    const $target = $(event.target)
    if (shouldResize) {
      this.resizeTable(event)
    } else if (isCell) {
      if (event.shiftKey) {
        const target = $target.tableDataId(true)
        const current = this.selection.current.tableDataId(true)

        const $cells = generateGroupOfCells(
          current.row,
          target.row,
          current.col,
          target.col,
        ).map((dataId) => this.$root.findOne(`[data-id="${dataId}"]`))
        this.selection.selectGroup($cells)
      } else {
        // this.selection.select($target)
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys: Array<string> = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const cellId = this.selection.current.tableDataId(true)
      const $next = this.$root.findOne(nextSelector(key, cellId))
      this.selectCell($next)
      // this.selection.select($next)
      // this.$emit('table:select', $next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.tableDataId(),
        value,
      }),
    )
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
    // this.$emit('table:input', $(event.target))
    // this.$dispatch(
    //   actions.changeText({
    //     id: this.selection.current.tableDataId(),
    //     value: $(event.target).text(),
    //   }),
    // )
  }

  toHTML(): string {
    return createTable(10, this.store.getState())
  }
}
