import * as T from '@/redux/types'

export function rootReducer(state, action) {
  let prevState
  let field
  switch (action.type) {
    case T.TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        [field]: prevState,
      }
    case T.CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value
      return { ...state, currentText: action.data.value, dataState: prevState }
    default:
      return state
  }
}
