import { Component } from '@/core/Component'

export class StateComponent extends Component {
  protected state: any

  constructor($root, options = {} as any) {
    super($root, options)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = initialState
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.$root.html(this.template)
  }
}
