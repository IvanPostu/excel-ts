/**
 *
 * Custom methods for convenient work with a DOM tree.
 *
 */

class Dom<K extends keyof HTMLElementTagNameMap> {
  public $el: HTMLElementTagNameMap[K]

  constructor(selector?: string | HTMLElementTagNameMap[K]) {
    if (selector && typeof selector !== 'string') {
      this.$el = selector as HTMLElementTagNameMap[K]
    }
    if (selector && typeof selector === 'string') {
      this.$el = document.querySelector(selector)
    }
    // const z = document.createElement('input')
  }

  html(html?: string) {
    if (html) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text?: string): string | any {
    if (text) {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return (this.$el as HTMLInputElement).value.trim()
    }
    return this.$el.textContent
  }

  clear() {
    this.html('')
    return this
  }

  append<K extends keyof HTMLElementTagNameMap>(node: Dom<K> | HTMLElementTagNameMap[K]) {
    let elm: HTMLElementTagNameMap[K]
    if (node instanceof Dom) {
      elm = node.$el
    } else {
      elm = node
    }

    this.$el.appendChild(elm)
    return this
  }

  on(eventType: string, callback: () => void) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType: string, callback: () => void) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  findOne(selector) {
    return $(this.$el.querySelector(selector))
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, val]) => (this.$el.style[key] = val))
  }

  addClass(className: string) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className: string) {
    this.$el.classList.remove(className)
    return this
  }

  tableDataId(parse?: boolean) {
    if (parse) {
      const id = this.tableDataId()
      const [row, col] = id.split(':')
      return {
        row: Number(row),
        col: Number(col),
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }
}

/**
 *
 */
export function $<K extends keyof HTMLElementTagNameMap>(
  selector: HTMLElementTagNameMap[K] | string,
): Dom<K> {
  return new Dom(selector)
}

/**
 *  Create node with class properties.
 */
$.create = function <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classes: Array<string>,
): Dom<K> {
  const el = document.createElement(tagName)
  if (classes.length) {
    el.classList.add(classes.join(' '))
  }

  return $(el)
}
