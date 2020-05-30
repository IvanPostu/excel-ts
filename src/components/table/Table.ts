import { Component } from '@/core/Component'
import { createTable } from './table.template'

export class Table extends Component {
  static className = 'excel__table'

  /**
   *
   */
  constructor($root) {
    super($root, {
      listeners: ['click'],
    })
  }

  onClick(event) {
    console.log('click', event.target)
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
