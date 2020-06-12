import * as T from '@/redux/types'

export function tableResize(data) {
  return {
    type: T.TABLE_RESIZE,
    data,
  }
}

export function changeText(data: any) {
  return {
    type: T.CHANGE_TEXT,
    data,
  }
}
