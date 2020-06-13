import './index.scss'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@/redux/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage } from '@/core/storage'
import { initialState } from '@/redux/initialState'
import debounce from '@/utils/debounceFunction'

const store = createStore(rootReducer, initialState)

const stateListener = debounce((state) => {
  console.log('App state: ', state)
  storage('excel-state', state)
}, 330)

store.subscribe(stateListener)

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
