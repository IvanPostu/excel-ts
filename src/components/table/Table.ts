import { Component } from '@/core/Component'
import { createTable } from './table.template'

export class Table extends Component {
  static className = 'excel__table'

  toHTML() {
    return createTable(10)
  }
}
