import { Component } from '@/core/Component'

export class Formula extends Component {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  onInput(event): void {
    console.log(`formula event: ${event.target.textContent.trim()}`)
  }

  onClick(event: MouseEvent) {
    console.log('click: ', event)
  }

  toHTML() {
    return `
    <div class="formula_info">
      fx
    </div>
    <div class="formula_input" contenteditable="true" spellcheck="false"></div>
    `
  }
}
