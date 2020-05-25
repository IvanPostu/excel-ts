import { Component } from '@/core/Component'

export class Excel extends Component {
  /**
   *
   */
  private $el: Element
  private components

  constructor(htmlId: string, options: any) {
    super()
    this.$el = document.querySelector(htmlId)
    this.components = options.components || []
  }
}
