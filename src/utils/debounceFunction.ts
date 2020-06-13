// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function <Params extends any[]>(fn: (...args: Params) => void, wait: number) {
  let timeoutId
  return function (...args) {
    const later = () => {
      clearTimeout(timeoutId)
      fn.apply(this, args)
    }

    clearTimeout(timeoutId)
    timeoutId = setTimeout(later, wait)
  }
}
