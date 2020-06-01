import { DomListener } from '@/core/DomListener'

export class Component extends DomListener {
  public name: string

  constructor($root, options = {} as any) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
  }

  prepare(): void {}

  init(): void {
    this.initDOMListeners()
  }

  destroy(): void {
    this.removeDOMListeners()
  }

  toHTML(): string {
    return ''
  }
}
