export default function (camelCaseStr: string) {
  return camelCaseStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}
