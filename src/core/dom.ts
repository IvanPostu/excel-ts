/**
 *
 * Custom methods for convenient work with a DOM tree.
 *
 */

class Dom {
  private $el: Element

  constructor(selector?: string | Element) {
    if (selector) {
      this.$el = selector as Element
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
