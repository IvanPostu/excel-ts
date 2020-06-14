import { defaultCellStyles, defaultTitle } from '@/components/constants'

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultCellStyles,
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultCellStyles,
  currentText: '',
})

export function normalizeInitialstate(state?: any) {
  return state ? normalize(state) : JSON.parse(JSON.stringify(defaultState))
}
