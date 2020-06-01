import $, { AppNode } from '@/core'
import { Emitter } from '@/core'

export class Excel {
  /**
   *
   */
  private $el: AppNode
  private components: Array<any>
  private emitter: Emitter

  constructor(selector: string, options: any) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot(): AppNode {
    const $root = $.create('div', ['excel'])
    const componentOptions = {
      emitter: this.emitter,
    }

    this.components = this.components.map((componecomponentClass) => {
      const $el = $.create('div', [componecomponentClass.className])
      const component = new componecomponentClass($el, componentOptions)

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
  }

  render(): void {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }
}
