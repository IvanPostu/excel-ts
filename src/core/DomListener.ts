import { $ } from '@/core/dom'

export class DomListener {
  public $root: ReturnType<typeof $>
  private listeners: Array<string>
  /**
   *
   */
  constructor($root: ReturnType<typeof $>, listeners = []) {
    if (!$root) {
      throw Error('No $root provided from DomListener')
    }

    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener)

      if (!this[methodName]) {
        throw new Error(
          `Method ${methodName} is not implemented in ${this['name'] || ''} Component.`,
        )
      }

      this[methodName] = this[methodName].bind(this)
      this.$root.on(listener, this[methodName])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

/**
 *
 * @param str
 *
 * convert listener name to event method name
 * ex: 'input' => 'onInput'
 *
 */
function getMethodName(str: string): string {
  return 'on' + str.charAt(0).toUpperCase() + str.slice(1)
}
