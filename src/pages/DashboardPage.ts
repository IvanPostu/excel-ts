import { Page } from '@/core/Page'
import $ from '@/core'

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', ['dashboard']).html(`
      <div class="dashboard__header">
        <h1>Excel Dashboard</h1>
      </div>
      <div class="dashboard__new">
        <div class="dashboard__view">
          <a href="#" class="dashboard__create">
            Create <br/> new table
          </a>
        </div>
      </div>
      <div class="dashboard__table dashboard__view">

        <div class="dashboard__list-header">
          <span>Title</span>
          <span>Date of change</span>
        </div>

        <ul class="dashboard__list">
          <li class="dashboard__record">
            <a href="#">Table number 1</a>
            <strong>11.11.2011</strong>
          </li>
          <li class="dashboard__record">
            <a href="#">Table number 1</a>
            <strong>11.11.2011</strong>
          </li>
        </ul>

      </div>
    `)
  }
}
