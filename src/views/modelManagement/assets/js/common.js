import Axios from '@/assets/js/AxiosPlugin'
import {Loading} from 'element-ui'

export const MOCK_API_URL = '/modelmgmtcomponent'
export const BASE_PATH = '/egc-modelmgmtcomponent'

// export const SUCCESS_CODE = '0000'

export const ERROR_MESSAGE_MAP = {
  'scp.modelmgmt.modeltask.timeout': '执行命令发送超时'
}

export const FILE_SIZE = {
  'MAX_STRUCT': 50 * 1024 * 1024, // 50M
  'MAX_VIDEO': 5 * 1024 * 1024 * 1024 // 5G
}

// export const BASE_PATH = '/modelmgmtcomponent'
// export const SYSTEM_PUBSTATUS = 'mm.pubstatus'
export const SYSTEM_PRMCAT = 'mm.prmcat'
export const SYSTEM_FILESTORETYPE = 'mm.fustyp'
export const SYSTEM_PROGRAMTYPE = 'mm.prmcat'
export const SYSTEM_FILEUSETYPE = 'mm.fsttyp'
export const SYSTEM_EVENTTYPE = 'mm.evttyp'
export const SYSTEM_VERSSTATUS = 'mm.versts'
export const SYSTEM_MODELCAT = 'mm.modcat'
export const SYSTEM_MODELSTATUS = 'mm.modsts'
export const SYSTEM_VALUETYPE = 'mm.valtyp'
export const SYSTEM_NODESTAT = 'mm.nodsts'
export const SYSTEM_RUNTIMETYPE = 'mm.rtmtyp'
export const SYSTEM_NODETYPE = 'mm.nodtyp'
// export const SYSTEM_DEPSTATUS = 'mm.depstatus'
export const SYSTEM_PLANSTATUS = 'mm.plnsts'
export const SYSTEM_TASKSTATUS = 'mm.tsksts'
export const SYSTEM_TASKTYPE = 'mm.tsktyp'
export const SYSTEM_DEPLOYSTATUS = 'mm.depsts'
export const SYSTEM_PUBLISHSTATUS = 'mm.pubsts'
export const SYSTEM_TASKSOURCE = 'mm.tsksrc'
export const SYSTEM_FREQUENTTYPE = 'mm.frqtyp'
export const SYSTEM_RESULTTYPE = 'mm.restyp'
export const SYSTEM_ASYNCTYPE = 'mm.asytyp'

export const SYSTEM_NODESTATUS_ENABLE = 'mm.nodsts.enable'
export const SYSTEM_NODESTATUS_DISABLE = 'mm.nodsts.disable'
export const SYSTEM_DEPLOY_STATUS_DEPLOY = 'mm.depsts.deploy'
export const SYSTEM_PUBLISH_STATUS_PUBLISH = 'mm.pubsts.publish'
export const SYSTEM_NODETYPE_STRUCTURED = 'mm.nodtyp.structured'
export const SYSTEM_NODETYPE_VIDEO = 'mm.nodtyp.video'
export const SYSTEM_VERSIONSTATUS_ENABLE = 'mm.versts.enable'
export const SYSTEM_VERSIONSTATUS_DISABLE = 'mm.versts.disable'
export const SYSTEM_VERSIONSTATUS_INIT = 'mm.versts.init'
export const SYSTEM_MODELSTATUS_ENABLE = 'mm.modsts.enable'
export const COMMUNITY = 'community'

export const SYSTEM_MGMTNODE_DEVICEID_PREFIX = 'MM_'
export const SYSTEM_MGMTNODE_NODETYPE_STRUCTURED = 'mm.nodtyp.structured'

export const getSystemSettings = (params) => {
  return Axios.get(BASE_PATH + '/modelmgmt/systemsettings/getsystemsettingsbycatcode', {params}).then(res => res.data)
}

export const getSystemCodeNameMap = (data) => {
  var codeNameMap = {}
  if (data && data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      // if (isCommunity) {
      codeNameMap[data[i].item_code] = data[i].item_name
      // } else {
      //   codeNameMap[data[i].itemSysCode] = data[i].itemCustName
      // }
    }
  }
  return codeNameMap
}

export let startSystemLoading = () => {
  return Loading.service({
    lock: true,
    fullscreen: true,
    text: '拼命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)'
  })
}

export const getSystemDataByCode = (data, code) => {
  if (data && data[code]) {
    return data[code].meta_item_list
  }
  return []
}
