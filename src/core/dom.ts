/**
 *
 * Custom methods for convenient work with a DOM tree.
 *
 */

class Dom {
  public $el: HTMLElement

  constructor(selector?: string | Element) {
    if (selector) {
      this.$el = selector as HTMLElement
    }
    if (selector && typeof selector === 'string') {
      this.$el = document.querySelector(selector)
    }
  }

  html(html?: string) {
    if (html) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text: string): void {
    this.$el.textContent = text
  }

  clear() {
    this.html('')
    return this
  }

  append(node: Dom | Element) {
    let elm: Element
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

  addClass(className: string): void {
    this.$el.classList.add(className)
  }

  removeClass(className: string): void {
    this.$el.classList.remove(className)
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
export function $(selector: string | Element): Dom {
  return new Dom(selector)
}

/**
 *  Create node with class properties.
 */
$.create = function (tagName: string, classes: Array<string>): Dom {
  const el = document.createElement(tagName)
  if (classes.length) {
    el.classList.add(classes.join(' '))
  }

  return $(el)
}
