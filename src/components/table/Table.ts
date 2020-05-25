import { Component } from '@/core/Component'

export class Table extends Component {
  static className = 'excel__table'

  toHTML() {
    return `
      <div class="row">
      <div class="row_info"></div>
      <div class="row_data">
        <div class="column">A</div>
        <div class="column">B</div>
        <div class="column">C</div>
        <div class="column">D</div>
        <div class="column">E</div>
        <div class="column">F</div>
        <div class="column">G</div>
        <div class="column">H</div>
        <div class="column">I</div>
      </div>
      </div>
      <div class="row">
        <div class="row_info">1</div>
        <div class="row_data">
          <div class="cell selected" contenteditable="true">A1</div>
          <div class="cell" contenteditable="true">B1</div>
          <div class="cell" contenteditable="true">C1</div>
          <div class="cell" contenteditable="true">B1</div>
          <div class="cell" contenteditable="true">C1</div>
          <div class="cell" contenteditable="true">B1</div>
          <div class="cell" contenteditable="true">C1</div>
          <div class="cell" contenteditable="true">B1</div>
          <div class="cell" contenteditable="true">C1</div>
        </div>
      </div>
      <div class="row">
      <div class="row_info">2</div>
      <div class="row_data">
        <div class="cell" contenteditable="true">AA1</div>
        <div class="cell" contenteditable="true">BA1</div>
        <div class="cell" contenteditable="true">CA1</div>
        <div class="cell" contenteditable="true">BA1</div>
        <div class="cell" contenteditable="true">CA1</div>
        <div class="cell" contenteditable="true">BA1</div>
        <div class="cell" contenteditable="true">CA1</div>
        <div class="cell" contenteditable="true">BA1</div>
        <div class="cell" contenteditable="true">CA1</div>
      </div>
    </div>
    `
  }
}
