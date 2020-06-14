export class Page {
  protected params

  constructor(params = null) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented.')
  }

  afterRender() {}

  destroy() {}
}
