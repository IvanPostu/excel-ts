export class Page {
  private params

  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented.')
  }

  afterRender() {}

  destroy() {}
}
