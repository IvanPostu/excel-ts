import { StateComponent } from '@/core/StateComponent'
import { createToolbar } from '@/components/toolbar/toolbar.template'
import $ from '@/core'

export class Toolbar extends StateComponent {
  static className = 'excel__toolbar'

  /**
   *
   */
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    })
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    }
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]
      this.setState({ [key]: value[key] })
      console.log(this.state)
    }
  }

  toHTML(): string {
    return this.template
  }
}
