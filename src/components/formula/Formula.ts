import { Component } from '@/core/Component'

export class Formula extends Component {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  onInput(event): void {
    const text = event.target.textContent.trim()
    this.$emit('formula:working', text)
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
