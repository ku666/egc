import index from '@/views/MapAnalysisApp/index'
import courtInfo from '@/views/MapAnalysisApp/CourtInfo'

export default [
  {
    path: '/mapanalysisapp/index',
    name: 'mapanalyindex',
    component: index
  },
  {
    path: '/mapanalysisapp/courtinfo/:courtUuid',
    name: 'mapanalycourtinfo',
    component: courtInfo
  }
]
