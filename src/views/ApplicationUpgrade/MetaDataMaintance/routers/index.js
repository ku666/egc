// 引用pages
import CodeInstanceMaintance from '@/views/ApplicationUpgrade/MetaDataMaintance/CodeInstanceMaintance'
import CommCodeMaintance from '@/views/ApplicationUpgrade/MetaDataMaintance/CommCodeMaintance'
import ConfigInfoMaintance from '@/views/ApplicationUpgrade/MetaDataMaintance/ConfigInfoMaintance'
import SoftwarePckBatchMaintance from '@/views/ApplicationUpgrade/MetaDataMaintance/SoftwarePckBatchMaintance'

export default[
  {
    // 代码实例维护
    path: '/applicationupgrade/codeinstancemaintance',
    name: 'CodeInstanceMaintance',
    component: CodeInstanceMaintance
  },
  {
    // 公共代码维护
    path: '/applicationupgrade/commcodemaintance',
    name: 'CommCodeMaintance',
    component: CommCodeMaintance
  },
  {
    // 配置信息维护
    path: '/applicationupgrade/configinfomaintance',
    name: 'ConfigInfoMaintance',
    component: ConfigInfoMaintance
  },
  {
    // 软件包批次维护
    path: '/applicationupgrade/softwarepckbatchmaintance',
    name: 'SoftwarePckBatchMaintance',
    component: SoftwarePckBatchMaintance
  }
]
