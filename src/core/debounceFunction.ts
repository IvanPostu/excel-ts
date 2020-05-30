/**
 *
 * @param func
 * @param timeout
 */
export default function <Params extends any[]>(
  func: (...args: Params) => void,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params): void => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
