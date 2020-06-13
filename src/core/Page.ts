export class Page {
  protected params

  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented.')
  }

  afterRender() {}

  destroy() {}
}
