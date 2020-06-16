import { createStore } from '@/core/store/createStore'

describe('Create store module test: ', () => {
  let store
  let spy

  const initialState = {
    count: 0,
  }

  const reducer = (state = initialState, action = { type: 'ADD' }) => {
    if (action.type === 'ADD') {
      return { ...state, count: state.count + 1 }
    }

    return state
  }

  beforeEach(() => {
    store = createStore(reducer, initialState)
    spy = jest.fn()
  })

  test('store object is defined', () => {
    expect(store).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  test('store is instanceof Object', () => {
    expect(store).toBeInstanceOf(Object)
  })

  test('store.getState() method test', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if action exists', () => {
    store.dispatch({ type: 'ADD' })
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(2)
  })

  test('should call subscriber function', () => {
    store.subscribe(spy)
    store.dispatch({ type: 'ADD' })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(store.getState())
  })

  test('should NOT call subscriber function', () => {
    const unsub = store.subscribe(spy)
    unsub.unsubscribe()

    store.dispatch({ type: 'ADD' })
    expect(spy).toHaveBeenCalledTimes(0)
    expect(spy).not.toHaveBeenCalledWith(store.getState())
  })
})
