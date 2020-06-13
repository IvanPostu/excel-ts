export function storage(key: string, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }

  localStorage.setItem(key, JSON.stringify(data))
}
