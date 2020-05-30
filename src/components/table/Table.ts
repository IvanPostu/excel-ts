import { Component } from '@/core/Component'
import { createTable } from './table.template'
import { resizeHandler } from '@/components/table/table.resize'

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
    if (event.target.dataset.resize) {
      resizeHandler.call(this, event)
    }
  }

  toHTML(): string {
    return createTable(10)
  }
}
