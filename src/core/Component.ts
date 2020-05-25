import { DomListener } from '@/core/DomListener'

export class Component extends DomListener {
  public name: string

  constructor($root, options = {} as any) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  init(): void {
    this.initDOMListeners()
  }

  toHTML(): string {
    return ''
  }
}
