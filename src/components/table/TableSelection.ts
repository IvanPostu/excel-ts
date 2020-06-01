import { $ } from '@/core/dom'
import { AppNode } from '@/core'

export class TableSelection {
  private static selectedClassName = 'selected'
  private group: Array<AppNode>
  private _current: AppNode
  /**
   *
   */
  constructor() {
    this.group = []
    this._current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this._current = $el
    $el.focus().addClass(TableSelection.selectedClassName)
  }

  selectGroup($group: Array<AppNode>) {
    this.clear()
    this.group = $group
    this.group.forEach(($el) => $el.addClass(TableSelection.selectedClassName))
  }

  clear(): void {
    this.group.forEach(($e) => $e.removeClass(TableSelection.selectedClassName))
    this.group = []
  }

  get current(): ReturnType<typeof $> {
    return this._current
  }
}
