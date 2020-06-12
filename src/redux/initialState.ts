import { storage } from '@/core/storage'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState
