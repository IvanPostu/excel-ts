import { Component } from '@/core/Component'
import { createTable } from './table.template'
import { $ } from '@/core/dom'
import debounce from '@/core/debounceFunction'

export class Table extends Component {
  static className = 'excel__table'

  /**
   *
   */
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }

  onMousedown(event): void {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCords()
    const type = $resizer.data.resize

    const onMouseMoveDebounce = debounce((e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = String(value) + 'px'

        const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
        cells.forEach((el: any) => (el.style.width = String(value) + 'px'))
      } else if (type === 'row') {
        console.log(2)
        const delta = e.pageY - coords.bottom
        const value = coords.height + delta
        $parent.$el.style.height = String(value) + 'px'
      }
    }, 7)

    document.onmousemove = onMouseMoveDebounce

    document.onmouseup = () => {
      document.onmousemove = null
    }
  }

  // onMousedown() {
  //   console.log('down')
  // }

  // onMousemove() {
  //   console.log('move')
  // }

  // onMouseup() {
  //   console.log('up')
  // }

  toHTML(): string {
    return createTable(10)
  }
}
