import { DomListener } from '@/core/DomListener'
import { Emitter } from '@/core/Emitter'

export class Component extends DomListener {
  public name: string
  protected emitter: Emitter
  private unsubscribers = []

  constructor($root, options = {} as any) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.prepare()
  }

  prepare(): void {}

  init(): void {
    this.initDOMListeners()
  }

  $emit(event, ...args): void {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  destroy(): void {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }

  toHTML(): string {
    return ''
  }
}
