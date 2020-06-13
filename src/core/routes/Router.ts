import $ from '@/core'

export class Router {
  private $placeholder
  private routes

  constructor(selector: string, routes: any) {
    if (!selector) {
      throw new Error('Selector is not defined.')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    const PageClass = this.routes.excel
    const page = new PageClass()
    this.$placeholder.append(page.getRoot())
    page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
