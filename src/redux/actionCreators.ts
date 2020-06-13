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

export function changeStyles(data) {
  return {
    type: T.CHANGE_STYLES,
    data,
  }
}

//value, ids
export function applyStyle(data) {
  return {
    type: T.APPLY_STYLE,
    data,
  }
}

export function changeTitle(data) {
  return {
    type: T.CHANGE_TITLE,
    data,
  }
}
