import { Component } from '@/core/Component'
import $, { AppNode } from '@/core'

export class Formula extends Component {
  static className = 'excel__formula'
  private $formula: AppNode

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.findOne('#formula')
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text())
    })
    this.$on('table:input', ($cell) => {
      this.$formula.text($cell.text())
    })
  }

  onInput(event): void {
    this.$emit('formula:working', $(event.target).text())
  }

  onKeydown(event: KeyboardEvent) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  toHTML() {
    return `
    <div class="formula_info">
      fx
    </div>
    <div id="formula" class="formula_input" contenteditable="true" spellcheck="false"></div>
    `
  }
}
