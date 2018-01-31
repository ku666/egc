import index from '@/views/MapAnalysisApp/index'
import index2 from '@/views/MapAnalysisApp/index2'
import courtInfo from '@/views/MapAnalysisApp/courtInfo'

export default [
  {
    path: '/mapanalysisapp/index',
    name: 'mapanalyindex',
    component: index
  },
  {
    path: '/mapanalysisapp/index2',
    name: 'mapanalyindex2',
    component: index2
  },
  {
    path: '/mapanalysisapp/courtinfo/:courtID',
    name: 'mapanalycourtinfo',
    component: courtInfo
  }
]
