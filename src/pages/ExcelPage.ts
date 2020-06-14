import { Page } from '@/core/Page'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@/redux/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage } from '@/core/storage'
import { normalizeInitialstate } from '@/redux/initialState'
import debounce from '@/utils/debounceFunction'

export class ExcelPage extends Page {
  private excel

  getRoot() {
    const excelParam = this.params[1] ? this.params[1] : Date.now().toString()
    const storageName = `excel:${excelParam}`

    const state = storage(storageName)
    const store = createStore(rootReducer, normalizeInitialstate(state))

    const stateListener = debounce((state) => {
      console.log('App state: ', state)
      storage(storageName, state)
    }, 330)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
