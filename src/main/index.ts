import './index.scss'
import { Router } from '@/core/routes/Router'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExcelPage } from '@/pages/ExcelPage'

new Router('#root', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
