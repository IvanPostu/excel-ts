import { Page } from '@/core/Page'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@/core/store/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage } from '@/core/storage'
import { normalizeInitialstate } from '@/redux/initialState'
import debounce from '@/utils/debounceFunction'

function storageName(param) {
  return 'excel:' + param
}

class StateProcessor {
  private client

  constructor(client = null, delay = 300) {
    if (!client) throw new Error('client arg. is not defined')
    this.listen = debounce(this.listen.bind(this), delay)
    this.client = client
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}

class LocalStorageClient {
  private name

  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(storage(this.name))
  }
}

export class ExcelPage extends Page {
  private excel
  private storeSub
  private processor

  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(param))
  }

  async getRoot() {
    // const excelParam = this.params[1] ? this.params[1] : Date.now().toString()
    // const storageName = `excel:${excelParam}`

    // const state = storage(storageName)
    const state = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialstate(state))

    // const stateListener = debounce((state) => {
    //   storage(storageName, state)
    // }, 330)

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub.unsubscribe()
  }
}
