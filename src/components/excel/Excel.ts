import $, { AppNode } from '@/core'

export class Excel {
  /**
   *
   */
  private $el: AppNode
  private components: Array<any>

  constructor(selector: string, options: any) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot(): AppNode {
    const $root = $.create('div', ['excel'])

    this.components = this.components.map((componecomponentClass) => {
      const $el = $.create('div', [componecomponentClass.className])
      const component = new componecomponentClass($el)

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render(): void {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }
}
