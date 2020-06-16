export default function faviconLoad() {
  import('./favicon.ico')
    .then((favicon) => {
      const faviconSrc = favicon.default
      const head = document.querySelector('head')
      const faviconNode = document.createElement('link')
      faviconNode.rel = 'icon'
      faviconNode.type = 'image/ico'
      faviconNode.href = faviconSrc
      head.appendChild(faviconNode)
    })
    .catch()
}
