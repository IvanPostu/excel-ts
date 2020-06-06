import { DomListener } from '@/core/DomListener'
import { Emitter } from '@/core/Emitter'

export class Component extends DomListener {
  public name: string
  protected emitter: Emitter
  private unsubscribers = []
  protected store: any
  private storeSub: any

  constructor($root, options = {} as any) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.storeSub = null
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn: CallableFunction) {
    this.storeSub = this.store.subscribe(fn)
  }

  destroy(): void {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
    this.storeSub.unsubscribe()
  }

  toHTML(): string {
    return ''
  }
}
