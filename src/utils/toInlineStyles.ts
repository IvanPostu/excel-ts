import camelToDashCase from '@/utils/camelToDashCase'

export default function (styles = {}): string {
  return Object.keys(styles)
    .map((k) => `${camelToDashCase(k)}: ${styles[k]}`)
    .join(';')
}
