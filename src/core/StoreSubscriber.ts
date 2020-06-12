function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}

export class StoreSubscriber {
  private store: any
  private sub: any
  private prevState: any
  /**
   *
   */
  constructor(store) {
    this.store = store
    this.sub = null
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.subscribe.includes(key)) {
              const changes = { [key]: state[key] }
              component.storeChanged(changes)
            }
          })
        }
      })

      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
