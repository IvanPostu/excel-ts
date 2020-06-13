import $, { AppNode } from '@/core'
import { ActiveRoute } from '@/core/routes/ActiveRoute'

export class Router {
  private $placeholder: AppNode
  private routes
  private page

  constructor(selector: string, routes: any) {
    if (!selector) {
      throw new Error('Selector is not defined.')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear()
    const PageClass = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard

    this.page = new PageClass(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
