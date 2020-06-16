import { Component } from '@/core/Component'
import { changeTitle } from '@/redux/actionCreators'
import $ from '@/core'
import { defaultTitle } from '@/components/constants'
import debounce from '@/utils/debounceFunction'
import { ActiveRoute } from '@/core/routes/ActiveRoute'

export class Header extends Component {
  static className = 'excel__header'

  /**
   *
   */
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 330)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision: boolean = confirm('Are you sure you want to delete this table?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param[1])
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle

    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `
  }
}
