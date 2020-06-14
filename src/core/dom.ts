/**
 *
 * Custom methods for convenient work with a DOM tree.
 *
 */

class Dom<K extends keyof HTMLElementTagNameMap> {
  public $el: HTMLElementTagNameMap[K]

  /**
   *
   * @param selector can be string format ex. #id or div or .classname,
   * in addition, there may be a html node, ex. document.createElement('div')
   */
  constructor(selector?: string | HTMLElementTagNameMap[K]) {
    if (selector && typeof selector !== 'string') {
      this.$el = selector as HTMLElementTagNameMap[K]
    }
    if (selector && typeof selector === 'string') {
      this.$el = document.querySelector(selector)
    }
  }

  /**
   *
   * @param html if param is not defined this method will be getter
   * else will be setter
   *
   * Set or get html to node.
   */
  html(html: string | null = null): Dom<K> | string {
    if (html === null) {
      return this.$el.outerHTML.trim()
    } else {
      this.$el.innerHTML = html
      return this
    }
  }

  /**
   *
   * @param text if param is not defined this method will be getter
   * else will be setter.
   *
   * Set or get text to node.
   *
   * Special case for input tag, will be return value
   */
  text(text: string | null = null): Dom<K> | string {
    if (this.$el.tagName.toLowerCase() === 'input') {
      return (this.$el as HTMLInputElement).value.trim()
    }

    if (text === null) {
      return this.$el.textContent
    }

    this.$el.textContent = text
    return this
  }

  /**
   * Clear current AppNode.
   */
  clear(): Dom<K> {
    this.html('')
    return this
  }

  /**
   *
   * @param node type AppNode or nativeHtmlNode
   *
   * append clild to AppNode
   */
  append(node: Dom<K> | HTMLElement): Dom<K> {
    let elm: HTMLElement
    if (node instanceof Dom) {
      elm = node.$el
    } else {
      elm = node
    }

    this.$el.appendChild(elm)
    return this
  }

  /**
   *
   * @param eventType
   * @param callback
   *
   * Short analog for addEventListener function
   */
  on(eventType: string, callback: () => void): void {
    this.$el.addEventListener(eventType, callback)
  }

  /**
   *
   * @param eventType
   * @param callback
   *
   * Short analog for removeEventListener function
   */
  off(eventType: string, callback: () => void): void {
    this.$el.removeEventListener(eventType, callback)
  }

  /**
   *
   * @param selector
   *
   * Wrapper for closest function.
   */
  closest(selector): Dom<K> {
    return $(this.$el.closest(selector))
  }

  /**
   * Wrapper for getBoundingClientRect function.
   */
  getCords(): DOMRect {
    return this.$el.getBoundingClientRect()
  }

  /**
   * Wrapper for dataset function.
   */
  get data(): DOMStringMap {
    return this.$el.dataset
  }

  /**
   * Wrapper for querySelectorAll function.
   */
  findAll(selector): NodeListOf<any> {
    return this.$el.querySelectorAll(selector)
  }

  /**
   * Wrapper for querySelector function.
   */
  findOne(selector): Dom<K> {
    return $(this.$el.querySelector(selector))
  }

  /**
   *
   * @param styles object ex. {background-color: 'red', top: '15px'}
   */
  css(styles = {}): void {
    Object.entries(styles).forEach(([key, val]) => (this.$el.style[key] = val))
  }

  /**
   * accept dash-case and camelCase
   * @param styles ex. ['backgroundColor', 'color'] return {
   *  'backgroundColor': 'color' or '' if is not defined
   *  'color': 'color' or '' if is not defined
   * }
   */
  getStyles(styles = []) {
    return styles.reduce((acc, s) => {
      acc[s] = this.$el.style[s]
      return acc
    }, {})
  }

  /**
   * Wrapper for classList.add function.
   */
  addClass(className: string): Dom<K> {
    this.$el.classList.add(className)
    return this
  }

  attr(name: string, value?: string): Dom<K> | string {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }

    return this.$el.getAttribute(name)
  }

  /**
   * Wrapper for classList.remove function.
   */
  removeClass(className: string): Dom<K> {
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

  focus(): Dom<K> {
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
