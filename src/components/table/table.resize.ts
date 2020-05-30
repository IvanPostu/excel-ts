import { $ } from '@/core/dom'

/**
 *
 */
export function resizeHandler(event): void {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCords()
  const type = $resizer.data.resize
  const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value: number
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: String(-delta) + 'px' })
    } else if (type === 'row') {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: String(-delta) + 'px',
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({
        width: String(value) + 'px',
      })
      cells.forEach((el: any) => (el.style.width = String(value) + 'px'))
    } else if (type === 'row') {
      $parent.css({
        height: String(value) + 'px',
      })
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}
