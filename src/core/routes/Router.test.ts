import { Router } from '@/core/routes/Router'
import { Page } from '@/core/Page'

describe('Router module: ', () => {
  class DashboardPageMock extends Page {
    getRoot() {
      const root = document.createElement('div')
      root.innerHTML = 'dashboard'
      return root
    }
  }

  class ExcelPageMock extends Page {
    getRoot() {
      const root = document.createElement('div')
      root.innerHTML = 'excel'
      return root
    }
  }

  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPageMock,
      excel: ExcelPageMock,
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render dashboard page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
