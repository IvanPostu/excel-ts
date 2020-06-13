import { storage } from '@/core/storage'
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

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
