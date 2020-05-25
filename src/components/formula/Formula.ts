import { Component } from '@/core/Component'

export class Formula extends Component {
  static className = 'excel__formula'

  toHTML() {
    return `
    <div class="formula_info">
      fx
    </div>
    <div class="formula_input" contenteditable="true" spellcheck="false"></div>
    `
  }
}
